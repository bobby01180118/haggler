export const TIMING = {
  parseDelay: 200,
  systemMessageDelay: 400,
  venueGap: 300,
  // CEX
  binanceCheck: [800, 1200] as [number, number],
  coinbaseCheck: [900, 1300] as [number, number],
  okxCheck: [1000, 1400] as [number, number],
  bybitCheck: [850, 1250] as [number, number],
  krakenCheck: [950, 1350] as [number, number],
  // DEX
  uniswapCheck: [1200, 1600] as [number, number],
  jupiterCheck: [1100, 1500] as [number, number],
  pancakeswapCheck: [1300, 1700] as [number, number],
  curveCheck: [1400, 1800] as [number, number],
  inchCheck: [1200, 1600] as [number, number],
  // Broker
  robinhoodCheck: [600, 1000] as [number, number],
  // Other
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
