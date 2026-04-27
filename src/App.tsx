import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
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

const App = () => (
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

export default App;
