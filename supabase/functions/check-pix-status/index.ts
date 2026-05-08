const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ZUCK_PAY_BASE = "https://zuckpay.com.br/conta/v3/pix";
const UTMIFY_ORDERS_URL = "https://api.utmify.com.br/api-credentials/orders";

function nowUtcSql(): string {
  return new Date().toISOString().replace("T", " ").replace(/\.\d+Z$/, "");
}

// Cache simples em memória para evitar duplicar "paid" para o mesmo txid
const notifiedPaid = new Set<string>();

async function notifyUtmifyPaid(txid: string, raw: any) {
  if (notifiedPaid.has(txid)) return;
  const UTMIFY_API_KEY = Deno.env.get("UTMIFY_API_KEY");
  if (!UTMIFY_API_KEY) {
    console.warn("UTMIFY_API_KEY não configurada — pulando paid");
    return;
  }
  try {
    const amount = Number(raw?.amount ?? raw?.valor ?? 0);
    const valorCentavos = Math.round(amount * 100);
    const debtor = raw?.debtor ?? {};
    const payload = {
      orderId: txid,
      platform: "VerdeCasa",
      paymentMethod: "pix",
      status: "paid",
      createdAt: nowUtcSql(),
      approvedDate: nowUtcSql(),
      refundedAt: null,
      customer: {
        name: debtor?.name ?? "Cliente",
        email: raw?.email ?? "no-email@verdecasa.com",
        phone: raw?.phone ?? null,
        document: debtor?.document ?? null,
        country: "BR",
        ip: null,
      },
      products: [
        {
          id: txid,
          name: "Pedido VerdeCasa",
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: valorCentavos,
        },
      ],
      trackingParameters: {
        src: null, sck: null,
        utm_source: null, utm_campaign: null,
        utm_medium: null, utm_content: null, utm_term: null,
      },
      commission: {
        totalPriceInCents: valorCentavos,
        gatewayFeeInCents: 0,
        userCommissionInCents: valorCentavos,
        currency: "BRL",
      },
      isTest: false,
    };
    const r = await fetch(UTMIFY_ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-token": UTMIFY_API_KEY },
      body: JSON.stringify(payload),
    });
    const txt = await r.text();
    console.log(`Utmify PAID status=${r.status} body=${txt}`);
    if (r.ok) notifiedPaid.add(txid);
  } catch (err) {
    console.error("Erro Utmify paid:", err);
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
        JSON.stringify({ error: "Credenciais não configuradas" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { txid } = await req.json();
    if (!txid) {
      return new Response(
        JSON.stringify({ error: "txid obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const credentials = btoa(`${ZUCK_CLIENT_ID}:${ZUCK_CLIENT_SECRET}`);
    const response = await fetch(`${ZUCK_PAY_BASE}/${encodeURIComponent(txid)}`, {
      method: "GET",
      headers: { "Authorization": `Basic ${credentials}` },
    });

    const text = await response.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch { /* ignore */ }

    const status = data.status || data.state || "PENDENTE";
    const upper = String(status).toUpperCase();
    if (["CONCLUIDA", "ATIVA", "PAID", "APPROVED"].includes(upper)) {
      await notifyUtmifyPaid(txid, data);
    }
    return new Response(
      JSON.stringify({ status, raw: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error checking PIX status:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao consultar status" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
