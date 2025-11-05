"use client";

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateSubtotal, calculateTotalTax, calculateGrandTotal, formatCurrency } from '@/lib/invoiceCalculations';

interface TemplateProps {
  data: InvoiceData;
}

export const MinimalTemplate = ({ data }: TemplateProps) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const totalTax = calculateTotalTax(data.lineItems);
  const grandTotal = calculateGrandTotal(data.lineItems, data.discount);
  const discountAmount = ((subtotal + totalTax) * data.discount) / 100;

  return (
    <div className="bg-white p-12 min-h-[1000px] text-gray-900" id="invoice-preview">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          {data.business.logo && (
            <img src={data.business.logo} alt="Logo" className="h-16 mb-4 object-contain" />
          )}
          <h1 className="text-4xl font-light text-gray-800">INVOICE</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Invoice Number</p>
          <p className="font-semibold text-lg">{data.invoiceNumber}</p>
          <p className="text-sm text-gray-600 mt-2">Date</p>
          <p className="font-medium">{new Date(data.date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600 mt-2">Due Date</p>
          <p className="font-medium">{new Date(data.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Business and Client Info */}
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">From</h3>
          <p className="font-semibold text-lg">{data.business.name}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.business.address}</p>
          <p className="text-sm text-gray-600">{data.business.email}</p>
          <p className="text-sm text-gray-600">{data.business.phone}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bill To</h3>
          <p className="font-semibold text-lg">{data.client.name}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.client.address}</p>
          <p className="text-sm text-gray-600">{data.client.email}</p>
          <p className="text-sm text-gray-600">{data.client.phone}</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="text-right py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 text-sm">{item.description}</td>
                <td className="py-4 text-sm text-right">{item.quantity}</td>
                <td className="py-4 text-sm text-right">{formatCurrency(item.unitPrice, data.currency.symbol)}</td>
                <td className="py-4 text-sm text-right">{item.tax}%</td>
                <td className="py-4 text-sm text-right font-medium">{formatCurrency(item.total, data.currency.symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal, data.currency.symbol)}</span>
          </div>
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatCurrency(totalTax, data.currency.symbol)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-600">Discount ({data.discount}%)</span>
              <span className="font-medium">-{formatCurrency(discountAmount, data.currency.symbol)}</span>
            </div>
          )}
          <div className="flex justify-between py-3 border-t border-gray-300 mt-2">
            <span className="font-semibold text-lg">Total</span>
            <span className="font-bold text-xl">{formatCurrency(grandTotal, data.currency.symbol)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
};
