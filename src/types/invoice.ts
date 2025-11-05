export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export interface BusinessInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  logo?: string;
}

export interface ClientInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  business: BusinessInfo;
  client: ClientInfo;
  lineItems: LineItem[];
  currency: Currency;
  discount: number;
  notes: string;
  signature?: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

export type TemplateType = 'minimal' | 'corporate' | 'classic' | 'modern' | 'gradient';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
}

export const TEMPLATES: Template[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
  { id: 'corporate', name: 'Corporate', description: 'Professional business style' },
  { id: 'classic', name: 'Classic', description: 'Traditional invoice layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary and bold' },
  { id: 'gradient', name: 'Gradient', description: 'Colorful gradient theme' },
];
