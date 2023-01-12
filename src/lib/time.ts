export const MS_PER_DAY = 86_400_000;
export const MS_PER_MINUTE = 60_000;
export const MINUTES_PER_HOUR = 60;

export function minutesToMilliseconds(minutes: number): number {
  return minutes * MS_PER_MINUTE;
}

export function minutesToHours(minutes: number): number {
  return minutes / MINUTES_PER_HOUR;
}
