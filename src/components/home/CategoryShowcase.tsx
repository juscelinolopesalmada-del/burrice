import { Link } from "react-router-dom";
import showcaseCozinha from "@/assets/showcase-cozinha.jpg";
import showcaseOrganizacao from "@/assets/showcase-organizacao.jpg";
import showcaseUtilidades from "@/assets/showcase-utilidades.jpg";
import showcaseDecoracao from "@/assets/showcase-decoracao.jpg";

const showcaseItems = [
  { title: "Cozinha", image: showcaseCozinha, link: "/produtos?categoria=cozinha" },
  { title: "Organização", image: showcaseOrganizacao, link: "/produtos?categoria=organizacao" },
  { title: "Utilidades", image: showcaseUtilidades, link: "/produtos?categoria=utilidades" },
  { title: "Decoração", image: showcaseDecoracao, link: "/produtos?categoria=decoracao" },
];

const CategoryShowcase = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-6 text-center">
          Veja nossos produtos
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {showcaseItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group relative rounded-2xl overflow-hidden aspect-square block"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                width={800}
                height={800}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
