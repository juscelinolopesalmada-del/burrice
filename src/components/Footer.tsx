import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Plus, Minus } from "lucide-react";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionSection = ({ title, children }: AccordionSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-background/10">
      {/* Mobile: accordion */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-heading font-semibold text-xs uppercase tracking-wider">
          {title}
        </span>
        {open ? <Minus size={16} /> : <Plus size={16} />}
      </button>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
        {children}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden md:block">
        <h4 className="font-heading font-semibold text-xs uppercase tracking-wider mb-4">
          {title}
        </h4>
        {children}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    {/* Top color bar */}
    <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/40" />

    <div className="container mx-auto px-4 py-10 md:py-14">
      {/* Atendimento ao Cliente */}
      <div className="mb-8">
        <p className="font-heading font-semibold text-xs uppercase tracking-wider mb-6 text-background/80">
          Atendimento ao Cliente
        </p>
        <h3 className="font-heading font-bold text-2xl mb-5">
          <span className="text-primary">verde</span>casa
        </h3>

        <div className="space-y-3 text-sm text-background/80">
          <div>
            <p className="font-bold text-background">Horario de Atendimento:</p>
            <p>Seg. a Sex. <span className="font-bold text-background">8:00h</span> as <span className="font-bold text-background">19:00h</span></p>
          </div>
          <div>
            <p>
              <span className="font-bold text-background">E-mail: </span>
              <a href="mailto:contato@verdecasa.com.br" className="hover:text-primary transition-colors">
                contato@verdecasa.com.br
              </a>
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          {[
            { Icon: Instagram, href: "https://www.instagram.com/verdecasa.lojas/" },
            { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61576946395072" },
            { Icon: Mail, href: "mailto:contato@verdecasa.com.br" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="md:grid md:grid-cols-3 md:gap-12 md:mt-10">
        <AccordionSection title="Menu de Rodape">
          <ul className="space-y-2.5">
            <li><Link to="/faq" className="text-sm text-background/70 hover:text-primary transition-colors">Duvidas Frequentes</Link></li>
            <li><Link to="/termos-de-uso" className="text-sm text-background/70 hover:text-primary transition-colors">Termos de Servicos</Link></li>
            <li><Link to="/trocas-e-devolucoes" className="text-sm text-background/70 hover:text-primary transition-colors">Trocas e Devoluções</Link></li>
            <li><Link to="/politica-de-entrega" className="text-sm text-background/70 hover:text-primary transition-colors">Politicas de Entrega</Link></li>
            <li><Link to="/politica-de-reembolso" className="text-sm text-background/70 hover:text-primary transition-colors">Politicas de Reembolso</Link></li>
            <li><Link to="/politica-de-privacidade" className="text-sm text-background/70 hover:text-primary transition-colors">Politicas de Privacidade</Link></li>
          </ul>
        </AccordionSection>

        <AccordionSection title="Menu Principal">
          <ul className="space-y-2.5">
            <li><Link to="/" className="text-sm text-background/70 hover:text-primary transition-colors">Inicio</Link></li>
            <li><Link to="/produtos" className="text-sm text-background/70 hover:text-primary transition-colors">Produtos</Link></li>
            <li><Link to="/sobre" className="text-sm text-background/70 hover:text-primary transition-colors">Sobre nos</Link></li>
            <li><Link to="/contato" className="text-sm text-background/70 hover:text-primary transition-colors">Fale Conosco</Link></li>
          </ul>
        </AccordionSection>

        <AccordionSection title="Sobre a Verde Casa">
          <p className="text-sm text-background/70 leading-relaxed">
            Produtos para deixar sua casa mais pratica, organizada e elegante. Qualidade e design que transformam seu dia a dia.
          </p>
        </AccordionSection>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-background/10 py-6 text-center space-y-1">
      <p className="text-xs text-background/50">
        © 2026 Verde Casa
      </p>
      <p className="text-xs text-background/40">
        Verde Casa Comercio LTDA — CNPJ: 45.372.528/0004-12. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
