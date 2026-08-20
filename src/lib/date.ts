import type { Lang } from "../i18n";

const locales: Record<Lang, string> = { en: "en-US", zh: "zh-CN" };

// Dates are stored as plain ISO dates in the content files and formatted here,
// so the two languages can't drift apart. UTC keeps the day from shifting.
function format(lang: Lang, date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locales[lang], { timeZone: "UTC", ...options }).format(date);
}

/** "Jun 2026" / "2026年6月" — the news list. */
export function monthYear(lang: Lang, date: Date): string {
  return format(lang, date, { year: "numeric", month: lang === "zh" ? "long" : "short" });
}

/** "Aug 20, 2026" / "2026年8月20日" — blog posts. */
export function fullDate(lang: Lang, date: Date): string {
  return format(lang, date, {
    year: "numeric",
    month: lang === "zh" ? "long" : "short",
    day: "numeric",
  });
}
