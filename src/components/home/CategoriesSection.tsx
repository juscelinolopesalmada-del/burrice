import { Link } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Ofertas", slug: "ofertas" },
  { name: "Organização", slug: "organizacao" },
  { name: "Cozinha", slug: "cozinha" },
  { name: "Banheiro", slug: "utilidades" },
  { name: "Decoração", slug: "decoracao" },
  { name: "Lixeiras", slug: "utilidades" },
];

const CategoriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4 relative">
        <div 
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1 pr-12"
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/produtos?categoria=${cat.slug}`}
              className="shrink-0 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <button 
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-10 w-12 justify-end bg-gradient-to-l from-background via-background/80 to-transparent md:hidden"
        >
          <ChevronRight 
            className="w-5 h-5 text-muted-foreground animate-pulse" 
          />
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
