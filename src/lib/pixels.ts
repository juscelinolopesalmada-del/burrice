// ─── Facebook Pixel ───────────────────────────────────────────────
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    pixelId: string;
  }
}

export const FB_PIXEL_ID = '1461996125389793';

export function fbEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}

// ─── Utmify Pixel ─────────────────────────────────────────────────
// O pixel da Utmify (window.pixelId no index.html) faz rastreamento
// automático de pageviews e UTMs no client. As conversões
// (waiting_payment / paid) são enviadas server-side a partir das
// edge functions `generate-pix` e `check-pix-status` usando a API
// /api-credentials/orders com o header x-api-token (UTMIFY_API_KEY).
export const UTMIFY_PIXEL_ID = '69e1720af6a236505bce2b6f';
export const UTMIFY_WEBHOOK_URL = `https://api.utmify.com.br/api-credentials/orders?pixel_id=${UTMIFY_PIXEL_ID}`;

// ─── Disparo unificado (somente FB no client) ─────────────────────
export function trackEvent(eventName: string, params?: Record<string, any>) {
  fbEvent(eventName, params);
}

// ─── Eventos padrão do funil ──────────────────────────────────────

export function trackViewContent(product: {
  id: string;
  name: string;
  price: number;
  currency?: string;
}) {
  trackEvent('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: product.currency ?? 'BRL',
  });
}

export function trackAddToCart(product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  currency?: string;
}) {
  trackEvent('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price * product.quantity,
    currency: product.currency ?? 'BRL',
    num_items: product.quantity,
  });
}

export function trackInitiateCheckout(cart: {
  totalValue: number;
  numItems: number;
  contentIds: string[];
  contentName?: string;
  currency?: string;
}) {
  trackEvent('InitiateCheckout', {
    content_ids: cart.contentIds,
    content_name: cart.contentName,
    num_items: cart.numItems,
    value: cart.totalValue,
    currency: cart.currency ?? 'BRL',
  });
}

export function trackContact(info?: Record<string, any>) {
  trackEvent('Contact', info);
}

export function trackAddPaymentInfo(order: {
  totalValue: number;
  contentIds: string[];
  contentName?: string;
  numItems?: number;
  currency?: string;
}) {
  trackEvent('AddPaymentInfo', {
    content_ids: order.contentIds,
    content_name: order.contentName ?? '',
    value: order.totalValue,
    currency: order.currency ?? 'BRL',
    num_items: order.numItems,
    payment_type: 'PIX',
  });
}

export function trackPurchase(order: {
  orderId: string;
  totalValue: number;
  contentIds: string[];
  contentName?: string;
  numItems?: number;
  currency?: string;
}) {
  trackEvent('Purchase', {
    content_ids: order.contentIds,
    content_name: order.contentName ?? '',
    content_type: 'product',
    value: order.totalValue,
    currency: order.currency ?? 'BRL',
    num_items: order.numItems ?? 1,
    order_id: order.orderId,
  });
}

export function trackLead(info?: Record<string, any>) {
  trackEvent('Lead', info);
}

export function trackCompleteRegistration(info?: Record<string, any>) {
  trackEvent('CompleteRegistration', info);
}
