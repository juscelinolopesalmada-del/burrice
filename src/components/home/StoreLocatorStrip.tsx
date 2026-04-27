import { CreditCard, MapPin, Headphones } from "lucide-react";

const items = [
  { icon: CreditCard, title: "Pagamento Seguro", desc: "Em ate 8x sem juros no cartao" },
  { icon: MapPin, title: "Lojas Fisicas", desc: "Sao Paulo, Rio de Janeiro e Minas Gerais" },
  { icon: Headphones, title: "Atendimento", desc: "Fale com nossos consultores" },
];

const StoreLocatorStrip = () => (
  <section className="relative z-20 -mt-6 md:-mt-8">
    <div className="container px-4">
      {/* Desktop: 3 columns */}
      <div className="hidden md:grid mx-auto max-w-5xl grid-cols-3 rounded-xl border border-border bg-card shadow-card overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex items-center gap-3 px-6 py-4 ${
              i < items.length - 1 ? "border-r border-border" : ""
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <item.icon size={20} />
            </span>
            <div>
              <p className="font-heading text-sm font-bold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: single "Lojas fisicas" card like Cetro */}
      <div className="md:hidden mx-auto max-w-md rounded-xl border border-border bg-card px-5 py-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <MapPin size={20} />
          </span>
          <div>
            <p className="font-heading text-sm font-bold text-foreground">Lojas fisicas</p>
            <p className="text-xs text-muted-foreground">Sao Paulo, Rio de Janeiro e Minas Gerais</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StoreLocatorStrip;
