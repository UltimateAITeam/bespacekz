export const ITEMS_PER_PAGE = 10;

/** Email used for sales / purchase enquiries (e.g. resume database access). */
export const SALES_EMAIL = "support@bespace.kz";

/**
 * WhatsApp number in international format without "+" or spaces (e.g. "77001234567").
 * Overridable via NEXT_PUBLIC_WHATSAPP_NUMBER; falls back to the default below.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "77055558673";
