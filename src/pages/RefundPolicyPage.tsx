import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const RefundPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
        Politicas de Reembolso
      </h1>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Direito ao Reembolso</h2>
          <p>
            Voce tem direito ao reembolso integral caso desista da compra em ate 7 dias
            apos o recebimento do produto, conforme o Codigo de Defesa do Consumidor (Art. 49).
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Como Solicitar</h2>
          <p>
            Para solicitar o reembolso, envie um e-mail para contato@verdecasa.com.br
            informando o numero do pedido e o motivo da devolucao.
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Entre em contato pelo e-mail ou telefone</li>
            <li>Aguarde a aprovacao e as instrucoes de envio</li>
            <li>Envie o produto na embalagem original</li>
            <li>Apos recebermos, o reembolso sera processado</li>
          </ol>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Prazo para Reembolso</h2>
          <p>
            O reembolso sera efetuado em ate 10 dias uteis apos o recebimento e analise
            do produto devolvido.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cartao de credito: estorno na fatura seguinte</li>
            <li>PIX: devolucao na mesma chave em ate 5 dias uteis</li>
            <li>Boleto: transferencia bancaria em ate 10 dias uteis</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Condicoes</h2>
          <p>
            O produto deve estar em perfeitas condicoes, sem sinais de uso, na embalagem
            original e com todos os acessorios. Produtos personalizados nao sao elegíveis
            para reembolso.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default RefundPolicyPage;
