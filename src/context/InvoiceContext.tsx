"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { InvoiceData, CURRENCIES, TemplateType } from '@/types/invoice';

interface InvoiceContextType {
  invoiceData: InvoiceData;
  updateInvoiceData: (data: Partial<InvoiceData>) => void;
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
  resetInvoice: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${year}-${random}`;
};

const getDefaultInvoiceData = (): InvoiceData => ({
  invoiceNumber: generateInvoiceNumber(),
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  business: {
    name: '',
    address: '',
    email: '',
    phone: '',
  },
  client: {
    name: '',
    email: '',
    address: '',
    phone: '',
  },
  lineItems: [
    {
      id: '1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    },
  ],
  currency: CURRENCIES[0],
  discount: 0,
  notes: '',
});

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(getDefaultInvoiceData());
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('minimal');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('invoiceData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedData) {
      try {
        setInvoiceData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved invoice data:', e);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate as TemplateType);
    }
  }, []);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const updateInvoiceData = (data: Partial<InvoiceData>) => {
    setInvoiceData((prev) => ({ ...prev, ...data }));
  };

  const resetInvoice = () => {
    const newData = getDefaultInvoiceData();
    setInvoiceData(newData);
    setSelectedTemplate('minimal');
    localStorage.removeItem('invoiceData');
    localStorage.removeItem('selectedTemplate');
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        updateInvoiceData,
        selectedTemplate,
        setSelectedTemplate,
        resetInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
