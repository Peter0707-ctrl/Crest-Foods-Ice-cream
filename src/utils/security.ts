/**
 * Centralized High-Security Utilities for Crest Food & Beverage
 * Protects against XSS, HTML/script injection, protocol spoofing, bot spam, and integer/buffer abuse.
 */

const BIDI_AND_ZERO_WIDTH_REGEX = /[\u200B-\u200F\u202A-\u202E]/g;
const HTML_TAG_REGEX = /<[^>]*>/g;
const DANGEROUS_PROTOCOLS_REGEX = /\b(?:javascript|vbscript|data)\s*:/gi;

function stripControlChars(str: string): string {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const isAsciiCtrl = (code >= 0 && code <= 8) || code === 11 || code === 12 || (code >= 14 && code <= 31);
    const isC1Ctrl = code >= 127 && code <= 159;
    if (!isAsciiCtrl && !isC1Ctrl) {
      out += str[i];
    }
  }
  return out.replace(BIDI_AND_ZERO_WIDTH_REGEX, '');
}

/**
 * Sanitizes free-form user text by stripping control characters, bidi overrides,
 * HTML tags, and dangerous URI schemes, then enforcing a strict maximum character length.
 */
export function sanitizeText(input: string, maxLength = 180): string {
  if (typeof input !== 'string') return '';
  return stripControlChars(input)
    .replace(HTML_TAG_REGEX, '')
    .replace(DANGEROUS_PROTOCOLS_REGEX, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes phone numbers to digits and standard dial symbols only.
 */
export function sanitizePhone(input: string, maxLength = 24): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[^\d+\-\s()]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Sanitizes and validates email addresses.
 */
export function sanitizeEmail(input: string, maxLength = 120): string {
  if (typeof input !== 'string') return '';
  return stripControlChars(input)
    .replace(/\s+/g, '')
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  if (!email) return true; // Optional field unless required
  return /^[^\s@<>()[\]\\.,;:@"]+(\.[^\s@<>()[\]\\.,;:@"]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(
    email
  );
}

/**
 * Clamps item quantities to safe integer bounds (1..50) to prevent overflow or negative state manipulation.
 */
export function clampQuantity(qty: number, min = 1, max = 50): number {
  if (!Number.isFinite(qty)) return min;
  return Math.max(min, Math.min(max, Math.floor(qty)));
}

/**
 * Safely constructs a verified https://wa.me/ URL with strict recipient digit validation and payload capping.
 */
export function buildSafeWhatsAppUrl(rawPhoneNumber: string, lines: string[]): string {
  const cleanRecipient = rawPhoneNumber.replace(/\D/g, '').slice(0, 15);
  if (!/^\d{8,15}$/.test(cleanRecipient)) {
    return '#';
  }
  const safePayload = lines
    .map((line) => sanitizeText(line, 240))
    .filter(Boolean)
    .join('\n')
    .slice(0, 1800);

  return `https://wa.me/${cleanRecipient}?text=${encodeURIComponent(safePayload)}`;
}

/**
 * Anti-bot honeypot check: returns true if a hidden trap field was filled by an automated bot.
 */
export function isBotHoneypotTriggered(honeypotValue: string): boolean {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

/**
 * Rolling-window client-side rate limiter to throttle rapid automated submissions.
 */
const actionTimestamps = new Map<string, number[]>();

export function checkRateLimit(
  actionKey: string,
  maxRequests = 4,
  windowMs = 60_000
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const prev = actionTimestamps.get(actionKey) ?? [];
  const recent = prev.filter((ts) => now - ts < windowMs);

  if (recent.length >= maxRequests) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  recent.push(now);
  actionTimestamps.set(actionKey, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}
