const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ZUCK_PAY_API_URL = "https://zuckpay.com.br/conta/v3/pix/qrcode";
const UTMIFY_ORDERS_URL = "https://api.utmify.com.br/api-credentials/orders";

function nowUtcSql(): string {
  // YYYY-MM-DD HH:mm:ss em UTC, formato exigido pela Utmify
  return new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
}

async function sendUtmifyOrder(payload: Record<string, unknown>) {
  const UTMIFY_API_KEY = Deno.env.get("UTMIFY_API_KEY");
  if (!UTMIFY_API_KEY) {
    console.warn("UTMIFY_API_KEY não configurada — pulando envio para Utmify");
    return;
  }
  try {
    const r = await fetch(UTMIFY_ORDERS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": UTMIFY_API_KEY,
      },
      body: JSON.stringify(payload),
    });
    const txt = await r.text();
    console.log(`Utmify status: ${r.status} | body: ${txt}`);
  } catch (err) {
    console.error("Erro enviando para Utmify:", err);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ZUCK_CLIENT_ID = Deno.env.get("ZUCK_PAY_CLIENT_ID");
    const ZUCK_CLIENT_SECRET = Deno.env.get("ZUCK_PAY_CLIENT_SECRET");

    if (!ZUCK_CLIENT_ID || !ZUCK_CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ error: "Credenciais da API de pagamento não configuradas" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const {
      valor, nome, cpf, email, telefone,
      produto, hash, fbp, fbc,
      utm_source, utm_campaign, utm_content, utm_medium,
      src, sck, urlnoty
    } = body;

    const telefoneLimpo = (telefone || "").replace(/\D/g, "");

    if (!valor || !nome || !cpf || !email) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios: valor, nome, cpf, email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (telefoneLimpo.length < 10) {
      return new Response(
        JSON.stringify({ error: "Telefone inválido. Informe DDD + número." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const credentials = btoa(`${ZUCK_CLIENT_ID}:${ZUCK_CLIENT_SECRET}`);

    const zuckBody: Record<string, any> = {
      nome: nome.trim(),
      cpf: cpf.replace(/\D/g, ""),
      valor: parseFloat(parseFloat(valor).toFixed(2)),
      email: email.trim(),
      telefone: telefoneLimpo,
    };

    if (hash) {
      zuckBody.hash       = hash;
      zuckBody.product_id = hash;
      zuckBody.produto_id = hash;
    }
    if (utm_source)   zuckBody.utm_source   = utm_source;
    if (utm_campaign) zuckBody.utm_campaign = utm_campaign;
    if (utm_medium)   zuckBody.utm_medium   = utm_medium;
    if (produto)      zuckBody.utm_content  = produto;
    else if (utm_content) zuckBody.utm_content = utm_content;
    if (fbp)          zuckBody.fbp          = fbp;
    if (fbc)          zuckBody.fbc          = fbc;
    if (src)          zuckBody.src          = src;
    if (sck)          zuckBody.sck          = sck;
    if (urlnoty)      zuckBody.urlnoty      = urlnoty;

    console.log("=== BODY ENVIADO PARA ZUCKPAY ===");
    console.log(JSON.stringify(zuckBody, null, 2));

    const response = await fetch(ZUCK_PAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`,
      },
      body: JSON.stringify(zuckBody),
    });

    const responseText = await response.text();
    console.log(`ZuckPay status: ${response.status}`);
    console.log(`ZuckPay response: ${responseText}`);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Erro na API: ${response.status}`, details: responseText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let data: any;
    try {
      data = JSON.parse(responseText);
    } catch {
      return new Response(
        JSON.stringify({ error: "Resposta inválida da API", details: responseText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = {
      pix_code: data.pix_code || data.qrcode || data.copia_e_cola || data.copiaecola || data.payload || data.emv || "",
      qrcode_image: data.qrcode_image || data.qrcode_base64 || data.imagemQrcode || data.image || data.qr_code_url || "",
      transactionId: data.transactionId || data.transaction_id || data.id || data.txid || "",
      expiration: data.expiration || data.expiresIn || data.expires_in || 1200,
      raw: data,
    };

    console.log(`PIX gerado. Transaction: ${result.transactionId}`);

    // Envia "waiting_payment" para a Utmify em background (não bloqueia resposta)
    const utmifyTask = (async () => {
      try {
        const valorCentavos = Math.round(parseFloat(String(valor)) * 100);
        const productName = produto || "Produto";
        const productId = String(hash || result.transactionId || "produto");

        await sendUtmifyOrder({
          orderId: result.transactionId || `order_${Date.now()}`,
          platform: "VerdeCasa",
          paymentMethod: "pix",
          status: "waiting_payment",
          createdAt: nowUtcSql(),
          approvedDate: null,
          refundedAt: null,
          customer: {
            name: nome,
            email,
            phone: telefoneLimpo,
            document: (cpf || "").replace(/\D/g, ""),
            country: "BR",
            ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
          },
          products: [
            {
              id: productId,
              name: productName,
              planId: null,
              planName: null,
              quantity: 1,
              priceInCents: valorCentavos,
            },
          ],
          trackingParameters: {
            src: src || null,
            sck: sck || null,
            utm_source: utm_source || null,
            utm_campaign: utm_campaign || null,
            utm_medium: utm_medium || null,
            utm_content: utm_content || null,
            utm_term: null,
          },
          commission: {
            totalPriceInCents: valorCentavos,
            gatewayFeeInCents: 0,
            userCommissionInCents: valorCentavos,
            currency: "BRL",
          },
          isTest: false,
        });
      } catch (err) {
        console.error("Falha ao notificar Utmify (waiting_payment):", err);
      }
    })();

    // @ts-ignore - EdgeRuntime is provided by Deno Deploy / Supabase Edge runtime
    if (typeof EdgeRuntime !== "undefined" && EdgeRuntime.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(utmifyTask);
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Erro ao gerar PIX:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao gerar PIX" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
