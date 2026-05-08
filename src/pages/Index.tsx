import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/home/HeroSection";
import StoreLocatorStrip from "@/components/home/StoreLocatorStrip";
import CategoriesSection from "@/components/home/CategoriesSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import VideoCarousel from "@/components/home/VideoCarousel";
import PromoBanner from "@/components/home/PromoBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main>
      <HeroSection />
      <StoreLocatorStrip />
      <CategoriesSection />
      <VideoCarousel />

      <FeaturedProducts
        title="Mais Vendidos da Semana"
        subtitle="Os queridinhos dos nossos clientes"
        filter={(p) => p.rating >= 4.7}
        limit={4}
      />

      <CategoryShowcase />

      <PromoBanner
        collection="Coleção"
        title="Linha Organização"
        priceFrom="9,99"
        buttonText="Encher o Carrinho"
      />

      <FeaturedProducts
        title="Essencial, Elegante e Sempre à Mão"
        limit={8}
      />

      <PromoBanner
        collection="Novidades"
        title="Linha Cozinha Premium"
        priceFrom="59,90"
        description="Produtos selecionados com design exclusivo. Parcele em até 10x sem juros."
        buttonText="Conferir Agora"
        bgClassName="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/40"
      />

      <PromoBanner
        collection="Especial"
        title="Decoração & Utilidades"
        priceFrom="39,90"
        description="Transforme sua casa com peças que unem design e funcionalidade."
        buttonText="Explorar"
        bgClassName="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/40"
      />

      <FeaturedProducts
        title="Preços que Cabem no Bolso"
        subtitle="Aproveite antes que acabe"
        filter={(p) => !!p.originalPrice}
        limit={4}
      />

      <TestimonialsSection />
      <NewsletterSection />
    </main>
    <Footer />
  </div>
);

export default Index;
