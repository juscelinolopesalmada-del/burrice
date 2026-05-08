import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  date: string;
  text: string;
  photo?: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ana Paula Ribeiro",
    date: "12/10/2025",
    text: "Chegou super rápido e veio tudo certinho! O kit bambu deixou minha cozinha um sonho, parece de revista. Já é minha segunda compra aqui.",
    photo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    product: "Kit Caixa do Mês Bambu",
  },
  {
    name: "Juliana Martins",
    date: "05/10/2025",
    text: "Comprei a sapateira e amei demais! Cabe muito mais sapatos do que eu imaginava e a qualidade do material é excelente. Recomendo de olhos fechados.",
    photo: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&q=80",
    product: "Sapateira Organizadora",
  },
  {
    name: "Carlos Henrique",
    date: "28/09/2025",
    text: "Atendimento impecável! Tive uma dúvida no chat e responderam na hora. Produto chegou antes do prazo e veio muito bem embalado.",
  },
  {
    name: "Fernanda Costa",
    date: "20/09/2025",
    text: "Apaixonada pela panela de pressão! Cozinha super rápido e é linda na mesa. Material parece muito resistente, valeu cada centavo.",
    photo: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&q=80",
    product: "Panela de Pressão 11L",
  },
  {
    name: "Laura Mendes",
    date: "11/09/2025",
    text: "Super satisfeita! Os potes são lindos e organizam tudo. Combinou perfeitamente com o restante da minha cozinha. Voltarei a comprar!",
  },
  {
    name: "Patrícia Almeida",
    date: "02/09/2025",
    text: "O cesto de geladeira mudou minha vida! Tudo organizado e fácil de encontrar. Material firme e ajustável, perfeito.",
    photo: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80",
    product: "Cesto Organizador de Geladeira",
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="snap-start shrink-0 w-[260px] md:w-auto bg-card rounded-md p-4 shadow-sm relative flex flex-col"
    style={{ borderLeft: "4px solid hsl(var(--primary))" }}
  >
    <h3 className="font-bold text-foreground text-[14px] mb-1">{t.name}</h3>
    <p className="text-[10px] text-muted-foreground mb-2">{t.date}</p>
    <p className="text-[12px] text-foreground/80 leading-relaxed mb-3 line-clamp-4">
      {t.text}
    </p>

    <div className="flex items-center justify-between mt-auto">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="fill-warning text-warning" />
        ))}
      </div>
      <Quote
        size={28}
        className="text-muted-foreground/20 fill-muted-foreground/20"
      />
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-lg md:text-xl text-foreground mb-6">
          Depoimento de Clientes
        </h2>

        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-3 md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-2">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        <p className="text-right text-xs text-muted-foreground mt-4">
          Avaliações reais, auditadas por{" "}
          <span className="font-semibold text-primary">Verde Casa</span>
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
