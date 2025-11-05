"use client";

import React, { useState } from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CURRENCIES, TEMPLATES } from '@/types/invoice';
import { Download, Printer, Moon, Sun, FileText, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceNavbarProps {
  onDownload: () => void;
  onPrint: () => void;
}

export const InvoiceNavbar = ({ onDownload, onPrint }: InvoiceNavbarProps) => {
  const { invoiceData, updateInvoiceData, selectedTemplate, setSelectedTemplate, resetInvoice } = useInvoice();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SmartInvoice</h1>
              <p className="text-xs text-muted-foreground">Professional Invoice Generator</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Currency Selector */}
            <Select
              value={invoiceData.currency.code}
              onValueChange={(value) => {
                const currency = CURRENCIES.find(c => c.code === value);
                if (currency) {
                  updateInvoiceData({ currency });
                }
              }}
            >
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Template Selector */}
            <Select
              value={selectedTemplate}
              onValueChange={(value: any) => setSelectedTemplate(value)}
            >
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Template" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={resetInvoice}
              title="Reset Invoice"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>

            {/* Print Button */}
            <Button
              variant="outline"
              onClick={onPrint}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>

            {/* Download PDF Button */}
            <Button
              onClick={onDownload}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
