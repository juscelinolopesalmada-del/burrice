import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const faqs = [
  { q: "Quais sao as formas de pagamento?", a: "Aceitamos cartao de credito em ate 8x sem juros e PIX com 5% de desconto." },
  { q: "Qual o prazo de entrega?", a: "O prazo varia de acordo com a regiao. Em media, de 3 a 10 dias uteis apos a confirmacao do pagamento." },
  { q: "Como funciona a troca ou devolucao?", a: "Voce tem ate 30 dias apos o recebimento para solicitar troca ou devolucao. O produto deve estar em perfeitas condicoes." },
  { q: "Tem frete gratis?", a: "Sim! Frete gratis em todo o site para qualquer regiao do Brasil." },
  { q: "Como rastrear meu pedido?", a: "Apos o envio, voce recebera o codigo de rastreamento por e-mail para acompanhar a entrega." },
];

const FAQPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">Perguntas Frequentes</h1>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-border pb-6">
            <h3 className="font-heading font-semibold text-base text-foreground mb-2">{f.q}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default FAQPage;
