export const MS_PER_DAY = 86_400_000;
export const MS_PER_MINUTE = 60_000;
export const MINUTES_PER_HOUR = 60;

export function minutesToMilliseconds(minutes: number): number {
  return minutes * MS_PER_MINUTE;
}

export function daysToMilliseconds(days: number): number {
  return days * MS_PER_DAY;
}

export function minutesToHours(minutes: number): number {
  return minutes / MINUTES_PER_HOUR;
}

/**
 * @param days An offset from now.
 * @returns A date ISO string;
 *
 * @example
 * const yesterday = relativeDate(-1);
 * const tomorrow = relativeDate(1);
 */
export function relativeDate(days: number): Date {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date;
}
