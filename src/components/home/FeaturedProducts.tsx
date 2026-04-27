import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Props {
  title: string;
  subtitle?: string;
  filter?: (p: typeof products[0]) => boolean;
  limit?: number;
  sectionClassName?: string;
  scrollable?: boolean;
}

const FeaturedProducts = ({
  title,
  subtitle,
  filter,
  limit = 4,
  sectionClassName = "",
  scrollable = false,
}: Props) => {
  const filtered = filter ? products.filter(filter) : products;
  const display = filtered.slice(0, limit);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className={`py-10 md:py-16 ${sectionClassName}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground leading-tight">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {scrollable && (
            <div className="hidden md:flex gap-2">
              <button onClick={() => scroll("left")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll("right")} className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {scrollable ? (
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory">
            {display.map((p) => (
              <div key={p.id} className="w-[200px] md:w-[240px] shrink-0 snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4 md:gap-5">
            {display.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/produtos">
            <Button variant="outline" size="lg" className="rounded-full px-10 text-xs uppercase tracking-wider border-foreground text-foreground hover:bg-foreground hover:text-background">
              Ver todos os produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
