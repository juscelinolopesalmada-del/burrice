import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FlashSaleProductsPage from "./pages/FlashSaleProductsPage";
import GiftProductsPage from "./pages/GiftProductsPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import ReturnsPage from "./pages/ReturnsPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import DeliveryPolicyPage from "./pages/DeliveryPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add UTMify script
    const pixelId = "69fabe754bf33b7660a289f3";
    (window as any).pixelId = pixelId;
    
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produtos" element={<ProductsPage />} />
              <Route path="/produto/:id" element={<ProductDetailPage />} />
              <Route path="/oferta-produto/:id" element={<ProductDetailPage />} />
              <Route path="/brinde-produto/:id" element={<ProductDetailPage />} />
              <Route path="/ofertas" element={<FlashSaleProductsPage />} />
              <Route path="/brinde" element={<GiftProductsPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
              <Route path="/trocas-e-devolucoes" element={<ReturnsPage />} />
              <Route path="/termos-de-uso" element={<TermsPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/politica-de-entrega" element={<DeliveryPolicyPage />} />
              <Route path="/politica-de-reembolso" element={<RefundPolicyPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
