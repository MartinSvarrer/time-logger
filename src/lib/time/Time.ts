export interface Time<Unit extends 'minutes' | 'seconds' | 'hours' | 'days'> {
  value: number;
  unit: Unit;
}

export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60_000;
}

export function minutesToHours(minutes: number): number {
  return minutes / 60;
}
