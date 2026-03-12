export function formatCurrency(value: number, decimals?: number): string {
  const d = decimals ?? (value >= 100 ? 2 : value >= 1 ? 4 : 6)
  return '$' + value.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  })
}

export function formatPercent(value: number): string {
  return (value * 100).toFixed(2) + '%'
}

export function formatSavings(savings: number): string {
  if (savings <= 0) return '$0.00'
  return '$' + savings.toFixed(2)
}

export function formatTokenAmount(amount: number, token: string): string {
  return `${amount} ${token}`
}
