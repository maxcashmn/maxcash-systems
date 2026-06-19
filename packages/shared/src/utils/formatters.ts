export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const formatPhoneNumber = (phone: string): string => {
  // Simple formatting - can be extended
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};
