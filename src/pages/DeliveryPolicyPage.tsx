import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const DeliveryPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <CartDrawer />
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
        Politicas de Entrega
      </h1>

      <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Prazos de Entrega</h2>
          <p>
            Os prazos de entrega variam de acordo com a regiao e o tipo de frete selecionado.
            Apos a confirmacao do pagamento, o pedido sera processado em ate 2 dias uteis.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sedex Expresso: 3 a 5 dias uteis</li>
            <li>Correios (Frete Gratis): 5 a 9 dias uteis</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Rastreamento</h2>
          <p>
            Apos o envio, voce recebera um codigo de rastreamento por e-mail para acompanhar
            o status da entrega em tempo real.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Tentativas de Entrega</h2>
          <p>
            A transportadora realizara ate 3 tentativas de entrega. Caso nao haja ninguem
            para receber, o pedido sera encaminhado para a agencia mais proxima para retirada.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Frete Gratis</h2>
          <p>
            Oferecemos frete gratis em todo o site para qualquer regiao do Brasil.
            Promocoes especiais de frete podem ser aplicadas em datas comemorativas.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-lg text-foreground">Problemas na Entrega</h2>
          <p>
            Caso o produto chegue danificado ou com defeito, entre em contato conosco em ate
            7 dias apos o recebimento atraves do e-mail contato@verdecasa.com.br.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default DeliveryPolicyPage;
