export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}

export function calculateInterest(
  principal: number,
  rate: number,
  months: number
): number {
  const monthlyRate = rate / 100 / 12;
  return principal * monthlyRate * months;
}

export function calculateRepayment(
  principal: number,
  rate: number,
  months: number
): number {
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return payment;
}

export function calculateTotalRepayment(
  principal: number,
  rate: number,
  months: number
): number {
  const monthlyPayment = calculateRepayment(principal, rate, months);
  return monthlyPayment * months;
}

export function calculateTotalInterest(
  principal: number,
  rate: number,
  months: number
): number {
  return calculateTotalRepayment(principal, rate, months) - principal;
}
