import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">Termos de Uso</h1>
      <div className="prose prose-sm text-muted-foreground space-y-6">
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">1. Aceitacao dos Termos</h2>
          <p>Ao acessar e utilizar o site verdecasa, voce concorda com os presentes Termos de Uso. Caso nao concorde com alguma condicao, recomendamos que nao utilize nossos servicos.</p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">2. Uso do Site</h2>
          <p>O site destina-se exclusivamente para uso pessoal e nao comercial. E proibido reproduzir, distribuir ou modificar qualquer conteudo sem autorizacao previa.</p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">3. Precos e Pagamento</h2>
          <p>Os precos podem ser alterados sem aviso previo. Aceitamos pagamento via PIX e cartao de credito em ate 8x sem juros.</p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">4. Entrega</h2>
          <p>Os prazos de entrega variam conforme a regiao. Frete gratis em todo o site.</p>
        </section>
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">5. Contato</h2>
          <p>Para duvidas, entre em contato pelo e-mail contato@verdecasa.com.br.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsPage;
