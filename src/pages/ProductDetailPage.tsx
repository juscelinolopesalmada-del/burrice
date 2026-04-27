import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { trackViewContent, trackAddToCart } from "@/lib/pixels";
import { ShoppingBag, Heart, Truck, Shield, Star, Minus, Plus, ChevronLeft, ChevronRight, Zap, CreditCard, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import LoadingOverlay from "@/components/LoadingOverlay";
import FormattedDescription from "@/components/FormattedDescription";
import LowStockIndicator from "@/components/LowStockIndicator";
import { products } from "@/data/products";
import { getReviewsForProduct } from "@/data/reviews";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [navigating, setNavigating] = useState(false);
  const [selectedOpts, setSelectedOpts] = useState<number[]>([]);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (product) {
      trackViewContent({ id: product.id, name: product.name, price: product.price });
      setSelectedOpts((product.options ?? []).map(() => 0));
      setSelectedImage(0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          Produto não encontrado
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const primaryVariant = product.options?.[0]?.variants[selectedOpts[0] ?? 0];
  const currentPrice = primaryVariant?.price ?? product.price;
  const currentOriginal = primaryVariant?.originalPrice ?? product.originalPrice;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discountPercent = currentOriginal
    ? Math.round(((currentOriginal - currentPrice) / currentOriginal) * 100)
    : 0;
  const pixPrice = (currentPrice * 0.95).toFixed(2).replace(".", ",");
  const installment3x = (currentPrice / 10).toFixed(2).replace(".", ",");

  const selectOption = (groupIdx: number, variantIdx: number) => {
    setSelectedOpts((prev) => {
      const next = [...prev];
      next[groupIdx] = variantIdx;
      return next;
    });
    if (groupIdx === 0) {
      const v = product.options?.[0]?.variants[variantIdx];
      if (v?.imageIndex !== undefined && v.imageIndex < images.length) {
        setSelectedImage(v.imageIndex);
      }
    }
  };

  const variantSuffix = product.options?.length
    ? " — " + product.options.map((o, i) => o.variants[selectedOpts[i] ?? 0]?.label).filter(Boolean).join(" / ")
    : "";

  const buildVariantProduct = () => ({
    ...product,
    name: product.name + variantSuffix,
    price: currentPrice,
    originalPrice: currentOriginal,
  });

  const handleBuyNow = () => {
    const variantProduct = buildVariantProduct();
    for (let i = 0; i < qty; i++) addItem(variantProduct);
    trackAddToCart({ id: product.id, name: variantProduct.name, price: currentPrice, quantity: qty });
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    const variantProduct = buildVariantProduct();
    for (let i = 0; i < qty; i++) addItem(variantProduct);
    trackAddToCart({ id: product.id, name: variantProduct.name, price: currentPrice, quantity: qty });
  };

  const reviews = getReviewsForProduct(product.id);

  return (
    <div className="min-h-screen bg-background">
      {/* removed loading overlay */}
      <Header hideSearch />
      <CartDrawer />
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Image Gallery */}
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-primary shadow-sm" : "border-border/50 hover:border-border"
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative">
                <div
                  className="aspect-square rounded-xl overflow-hidden bg-secondary/30 touch-pan-y select-none"
                  onTouchStart={(e) => {
                    (e.currentTarget as any)._sx = e.touches[0].clientX;
                  }}
                  onTouchEnd={(e) => {
                    const sx = (e.currentTarget as any)._sx ?? 0;
                    const diff = sx - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                      setSelectedImage((i) =>
                        diff > 0 ? (i + 1) % images.length : (i - 1 + images.length) % images.length
                      );
                    }
                  }}
                >
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    width={800}
                    height={800}
                    draggable={false}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                {/* Prev/Next arrows */}
                <button
                  type="button"
                  aria-label="Imagem anterior"
                  onClick={() => setSelectedImage((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-background transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Próxima imagem"
                  onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/90 border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-background transition"
                >
                  <ChevronRight size={18} />
                </button>
                {/* Mobile thumbnail dots */}
                <div className="flex md:hidden justify-center gap-1.5 mt-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === i ? "bg-primary w-5" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badge */}
              {discountPercent > 0 && (
                <div className="mb-3">
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Ofertas Relâmpago
                  </span>
                </div>
              )}

              <h1 className="font-heading font-bold text-xl md:text-2xl text-foreground leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-warning text-warning" : "fill-muted text-muted"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} Comentários)
                </span>
              </div>

              {/* Price Block */}
              <div className="mb-5">
                {currentOriginal && (
                  <p className="text-sm text-muted-foreground line-through mb-0.5">
                    R$ {currentOriginal.toFixed(2).replace(".", ",")}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <p className="font-heading font-bold text-3xl text-foreground">
                    R$ {currentPrice.toFixed(2).replace(".", ",")}
                  </p>
                  {discountPercent > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  ou até <strong>10x</strong> de <strong>R$ {installment3x}</strong> sem juros
                </p>
              </div>

              {/* PIX Discount */}
              <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 mb-6 w-fit">
                <Zap size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary">5% OFF no PIX</span>
                <span className="text-sm text-muted-foreground">— R$ {pixPrice}</span>
              </div>

              {/* Variant Options */}
              {product.options && product.options.length > 0 && (
                <div className="mb-6 space-y-4">
                  {product.options.map((opt, gi) => (
                    <div key={opt.name}>
                      <p className="text-sm text-foreground mb-2">
                        <span className="font-semibold">{opt.name}:</span>{" "}
                        <span className="text-muted-foreground">
                          {opt.variants[selectedOpts[gi] ?? 0]?.label}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {opt.variants.map((v, vi) => {
                          const active = (selectedOpts[gi] ?? 0) === vi;
                          return (
                            <button
                              key={v.label}
                              type="button"
                              onClick={() => selectOption(gi, vi)}
                              className={`px-4 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                                active
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border bg-background text-muted-foreground hover:border-foreground/40"
                              }`}
                            >
                              {v.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <LowStockIndicator productId={`${product.id}-${selectedOpts.join('-')}`} className="mb-6" />

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 h-11 flex items-center justify-center text-sm font-medium border-x border-border">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">Quantidade</span>
              </div>

              {/* Buy Now + Add to Cart */}
              <div className="flex flex-col gap-2.5 mb-4">
                <Button
                  size="lg"
                  className="w-full h-12 text-sm font-bold uppercase tracking-wider rounded-lg"
                  onClick={handleBuyNow}
                >
                  Comprar Agora
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full h-12 text-sm font-bold uppercase tracking-wider rounded-lg bg-primary/10 text-primary hover:bg-primary/15 border border-primary/20"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <Heart size={16} className={liked ? "fill-sale text-sale" : ""} />
                {liked ? "Adicionado aos favoritos" : "Adicionar aos favoritos"}
              </button>

              {/* Trust Signals */}
              <div className="border-t border-border pt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Frete Grátis</p>
                    <p className="text-xs text-muted-foreground">Em todo o site</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Compra Garantida</p>
                    <p className="text-xs text-muted-foreground">Você tem até 30 dias de garantia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Pagamento Seguro</p>
                    <p className="text-xs text-muted-foreground">Ambiente 100% protegido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 bg-card rounded-2xl border border-border/50 p-6 md:p-8">
          <h2 className="font-heading font-bold text-lg text-foreground mb-4">Descrição do Produto</h2>
          <div className="mb-5">
            <FormattedDescription text={product.description} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-foreground bg-secondary/50 rounded-lg px-4 py-3">
                <CheckCircle size={15} className="text-primary shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <ProductReviews reviews={reviews} />

        {/* Brand Story Banner */}
        <div className="mt-8 bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-80">
              <img 
                src="/loja-verdecasa.jpeg" 
                alt="Verde Casa Store" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
              <h3 className="font-medium text-2xl text-foreground mb-4 tracking-tight">Com amor, Verde Casa</h3>
              <div className="space-y-1 text-base md:text-lg text-muted-foreground font-medium">
                <p>Há 10 anos presente no mercado,</p>
                <p>levando beleza e conforto para seu lar.</p>
                <p>Com a confiança de quem possui</p>
                <p>lojas físicas em mais de 3 estados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 md:mt-16">
            <h2 className="font-heading font-bold text-xl text-foreground mb-6">Produtos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
