export const toRunTimeString = (minutes: number) =>
  `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
