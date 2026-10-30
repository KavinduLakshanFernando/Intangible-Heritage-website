// lib/utils.ts — Utility helpers

/** Format a price in LKR */
export function formatLKR(amount: number): string {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format an ISO date string to a readable format */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Build a WhatsApp order message URL */
export function buildWhatsAppUrl(items: { name: string; quantity: number; price: number }[], total: number): string {
  const phone = '94773409787'; // WhatsApp contact
  const lines = items.map(i => `• ${i.name} × ${i.quantity} — LKR ${i.price.toLocaleString()}`);
  const message = [
    'Hello Intangible Heritage,',
    'I would like to order the following:',
    '',
    ...lines,
    '',
    `Total: LKR ${total.toLocaleString()}`,
    '',
    'Please confirm availability and payment details. Thank you!',
  ].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Truncate text to a given word count */
export function truncate(text: string, words: number): string {
  const arr = text.split(' ');
  if (arr.length <= words) return text;
  return arr.slice(0, words).join(' ') + '…';
}
