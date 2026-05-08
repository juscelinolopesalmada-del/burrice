import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { EmailInput } from "@/components/EmailInput";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-14 md:py-20 bg-secondary/40 border-t border-border">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <Mail size={22} className="text-primary" />
        </div>
        <h2 className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-2">
          Receba nossas novidades
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Cadastre-se e receba ofertas exclusivas e lancamentos em primeira mao.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Cadastrado com sucesso!", {
              description: "Voce recebera nossas novidades em primeira mao.",
            });
            setEmail("");
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <EmailInput
            value={email}
            onChangeValue={setEmail}
            placeholder="Seu melhor e-mail"
            required
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <Button type="submit" size="lg" className="shrink-0 px-8 rounded-lg">
            Cadastrar
          </Button>
        </form>
      </div>
    </section>
  );
};


export default NewsletterSection;
