import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const ReturnsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Trocas e Devolucoes</h1>
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>Na Verde Casa, queremos que voce esteja 100% satisfeito com sua compra. Por isso, oferecemos uma politica de trocas e devolucoes simples e transparente.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Prazo</h2>
        <p>Voce tem ate 30 dias corridos apos o recebimento do produto para solicitar a troca ou devolucao.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Condicoes</h2>
        <p>O produto deve estar em sua embalagem original, sem sinais de uso, acompanhado da nota fiscal.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Como solicitar</h2>
        <p>Entre em contato pelo e-mail contato@verdecasa.com.br informando o numero do pedido e o motivo da solicitacao.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnsPage;
