// Dates are stored as plain ISO dates in the content files and formatted here,
// using UTC to keep the day from shifting.
function format(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...options }).format(date);
}

/** "Jun 2026" — the news list. */
export function monthYear(date: Date): string {
  return format(date, { year: "numeric", month: "short" });
}

/** "Aug 20, 2026" — blog posts. */
export function fullDate(date: Date): string {
  return format(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
