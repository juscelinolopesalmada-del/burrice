import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { label: "Mais relevantes", value: "relevance" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
  { label: "Mais avaliados", value: "rating" },
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("categoria");
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (categorySlug) {
      const catName = categories.find((c) => c.slug === categorySlug)?.name;
      if (catName) result = result.filter((p) => p.category === catName);
    }

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [categorySlug, query, sort, priceRange]);

  const currentCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6 flex gap-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground">{currentCategory?.name || "Todos os Produtos"}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters - hidden on mobile */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={18} className="text-primary" />
              <h2 className="font-heading font-semibold text-foreground">Filtros</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Categorias</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/produtos"
                    className={`text-sm ${!categorySlug ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Todas
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/produtos?categoria=${c.slug}`}
                      className={`text-sm ${categorySlug === c.slug ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Preço</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-20 px-2 py-1.5 border border-border rounded text-xs text-foreground bg-background"
                  placeholder="Min"
                />
                <span className="text-muted-foreground text-xs">—</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-20 px-2 py-1.5 border border-border rounded text-xs text-foreground bg-background"
                  placeholder="Max"
                />
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{filtered.length} produtos</p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none text-sm border border-border rounded-lg px-4 py-2 pr-8 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">Nenhum produto encontrado</p>
                <p className="text-sm mt-2">Tente ajustar seus filtros</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
