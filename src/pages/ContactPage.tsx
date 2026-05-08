import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EmailInput } from "@/components/EmailInput";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">Fale Conosco</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">E-mail</p>
                <p className="text-sm text-muted-foreground">contato@verdecasa.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Horario de Atendimento</p>
                <p className="text-sm text-muted-foreground">Seg a Sex: 9h as 18h</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setForm({ name: "", email: "", message: "" });
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Seu nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <EmailInput
              value={form.email}
              onChangeValue={(val) => setForm({ ...form, email: val })}
              placeholder="Seu e-mail"
              required
              className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              placeholder="Sua mensagem"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
            <Button type="submit" size="lg" className="w-full">
              Enviar mensagem
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default ContactPage;
