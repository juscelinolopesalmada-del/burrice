import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { trackAddToCart } from "@/lib/pixels";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 hover:shadow-lg hover:border-border transition-all duration-300 flex flex-col h-full">
      {/* Discount badge */}
      {discountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-sale text-sale-foreground text-[11px] font-bold px-2.5 py-1 rounded-full">
            -{discountPercent}%
          </span>
        </div>
      )}

      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-sm"
      >
        <Heart size={16} className={liked ? "fill-sale text-sale" : "text-muted-foreground"} />
      </button>

      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <Link to={`/produto/${product.id}`}>
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            loading="lazy"
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Navigation arrows removed as requested */}

      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/produto/${product.id}`}>
          <h3
            className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-2 break-words"
            style={{ lineHeight: "1.35", height: "calc(1.35em * 2)" }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={`${i < Math.round(product.rating) ? "fill-warning text-warning" : "fill-muted text-muted"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>


        <div className="mt-auto">
          {product.originalPrice && (
            <p className="text-xs text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="font-heading font-bold text-base text-foreground leading-tight">
            R$ {product.price.toFixed(2).replace(".", ",")} <span className="text-xs font-normal text-pix">no pix</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            ou 10x de R$ {(product.price / 10).toFixed(2).replace(".", ",")} sem juros
          </p>
        </div>

        <button
          onClick={() => {
            addItem(product);
            trackAddToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
          }}
          className="mt-3 w-full flex items-center justify-center h-12 rounded-full text-[13px] font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md active:scale-[0.97] transition-all duration-200"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
