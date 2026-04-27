import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-6">Sobre nos</h1>
      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>A Verde Casa nasceu da vontade de transformar lares com produtos praticos, elegantes e acessiveis. Acreditamos que cada detalhe faz diferenca na organizacao e no bem-estar do dia a dia.</p>
        <p>Nossa missao e oferecer solucoes inteligentes para casa e cozinha, com design moderno e qualidade que voce pode confiar. Trabalhamos com fornecedores selecionados para garantir o melhor em cada produto.</p>
        <p>Estamos presentes em Sao Paulo, Rio de Janeiro e Minas Gerais com lojas fisicas, alem de atender todo o Brasil pela nossa loja online.</p>
        <p>Obrigado por fazer parte da nossa historia!</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
