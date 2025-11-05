import { LineItem } from '@/types/invoice';

export const calculateLineItemTotal = (quantity: number, unitPrice: number, tax: number): number => {
  const subtotal = quantity * unitPrice;
  const taxAmount = (subtotal * tax) / 100;
  return subtotal + taxAmount;
};

export const calculateSubtotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
};

export const calculateTotalTax = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => {
    const subtotal = item.quantity * item.unitPrice;
    return sum + (subtotal * item.tax) / 100;
  }, 0);
};

export const calculateGrandTotal = (lineItems: LineItem[], discount: number): number => {
  const subtotal = calculateSubtotal(lineItems);
  const tax = calculateTotalTax(lineItems);
  const total = subtotal + tax;
  const discountAmount = (total * discount) / 100;
  return total - discountAmount;
};

export const formatCurrency = (amount: number, symbol: string): string => {
  return `${symbol}${amount.toFixed(2)}`;
};
