export const TIMING = {
  parseDelay: 200,
  systemMessageDelay: 400,
  venueGap: 500,
  okxCheck: [1000, 1400] as [number, number],
  binanceCheck: [1100, 1500] as [number, number],
  inchCheck: [1400, 1800] as [number, number],
  negotiationStepDelay: [800, 1200] as [number, number],
  analysisDelay: 700,
  confirmDelay: 500,
  executeDelay: 1500,
}

export function randomInRange([min, max]: [number, number]): number {
  return min + Math.random() * (max - min)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
