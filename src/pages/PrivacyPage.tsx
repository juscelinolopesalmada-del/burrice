import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Politica de Privacidade</h1>
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>A Verde Casa valoriza a privacidade dos seus clientes. Coletamos apenas informacoes necessarias para processar pedidos e melhorar sua experiencia de compra.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Dados coletados</h2>
        <p>Nome, e-mail, endereco de entrega e informacoes de pagamento sao coletados exclusivamente para processar seus pedidos.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Seguranca</h2>
        <p>Utilizamos criptografia de ponta a ponta para proteger todas as transacoes. Seus dados nunca sao compartilhados com terceiros sem sua autorizacao.</p>
        <h2 className="font-heading font-semibold text-base text-foreground pt-2">Cookies</h2>
        <p>Utilizamos cookies para melhorar a navegacao e personalizar sua experiencia. Voce pode desabilita-los nas configuracoes do navegador.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPage;
