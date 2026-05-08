import { Link } from "react-router-dom";

interface PromoBannerProps {
  collection?: string;
  title?: string;
  priceFrom?: string;
  description?: string;
  buttonText?: string;
  bgClassName?: string;
}

const PromoBanner = ({
  collection = "Coleção",
  title = "Linha Organização",
  priceFrom = "9,99",
  description = "Frete grátis em todo o site. 5% off no PIX",
  buttonText = "Encher o Carrinho",
  bgClassName = "bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60",
}: PromoBannerProps) => (
  <section className="py-6 md:py-10">
    <div className="container mx-auto px-4">
      <div className={`relative rounded-2xl overflow-hidden ${bgClassName} min-h-[220px] md:min-h-[280px] flex items-center`}>
        <div className="relative z-10 p-8 md:p-12 max-w-lg">
          <p className="font-heading text-sm text-muted-foreground italic mb-1">{collection}</p>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">A partir de</p>
          <p className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            R$ <span className="text-5xl md:text-6xl">{priceFrom.split(",")[0]}</span>,{priceFrom.split(",")[1] || "00"}
          </p>
          <p className="text-xs text-muted-foreground mb-5">{description}</p>
          <Link
            to="/produtos"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-semibold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanner;
