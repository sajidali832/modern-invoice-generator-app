"use client";

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateSubtotal, calculateTotalTax, calculateGrandTotal, formatCurrency } from '@/lib/invoiceCalculations';

interface TemplateProps {
  data: InvoiceData;
}

export const ClassicTemplate = ({ data }: TemplateProps) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const totalTax = calculateTotalTax(data.lineItems);
  const grandTotal = calculateGrandTotal(data.lineItems, data.discount);
  const discountAmount = ((subtotal + totalTax) * data.discount) / 100;

  return (
    <div className="bg-white p-12 min-h-[1000px] text-gray-900 border-8 border-gray-800" id="invoice-preview">
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
        {data.business.logo && (
          <img src={data.business.logo} alt="Logo" className="h-20 mx-auto mb-4 object-contain" />
        )}
        <h1 className="text-5xl font-serif font-bold text-gray-800 mb-2">INVOICE</h1>
        <p className="text-lg text-gray-600">{data.invoiceNumber}</p>
      </div>

      {/* Business and Client Info */}
      <div className="grid grid-cols-2 gap-12 mb-10">
        <div className="border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-300 pb-2">From</h3>
          <p className="font-bold text-lg">{data.business.name}</p>
          <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{data.business.address}</p>
          <p className="text-sm text-gray-600 mt-1">{data.business.email}</p>
          <p className="text-sm text-gray-600">{data.business.phone}</p>
        </div>
        <div className="border-2 border-gray-300 p-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-3 border-b border-gray-300 pb-2">Bill To</h3>
          <p className="font-bold text-lg">{data.client.name}</p>
          <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{data.client.address}</p>
          <p className="text-sm text-gray-600 mt-1">{data.client.email}</p>
          <p className="text-sm text-gray-600">{data.client.phone}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-end gap-8 mb-8">
        <div className="text-center">
          <p className="text-xs font-bold text-gray-500 uppercase">Issue Date</p>
          <p className="text-sm font-semibold">{new Date(data.date).toLocaleDateString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-gray-500 uppercase">Due Date</p>
          <p className="text-sm font-semibold">{new Date(data.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full border-2 border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4 text-sm font-bold uppercase">Description</th>
              <th className="text-center py-3 px-4 text-sm font-bold uppercase">Qty</th>
              <th className="text-right py-3 px-4 text-sm font-bold uppercase">Price</th>
              <th className="text-center py-3 px-4 text-sm font-bold uppercase">Tax</th>
              <th className="text-right py-3 px-4 text-sm font-bold uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="py-3 px-4 text-sm">{item.description}</td>
                <td className="py-3 px-4 text-sm text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-sm text-right">{formatCurrency(item.unitPrice, data.currency.symbol)}</td>
                <td className="py-3 px-4 text-sm text-center">{item.tax}%</td>
                <td className="py-3 px-4 text-sm text-right font-semibold">{formatCurrency(item.total, data.currency.symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80 border-2 border-gray-800">
          <div className="flex justify-between py-2 px-4 border-b border-gray-300">
            <span className="text-sm font-semibold">Subtotal</span>
            <span className="text-sm font-semibold">{formatCurrency(subtotal, data.currency.symbol)}</span>
          </div>
          <div className="flex justify-between py-2 px-4 border-b border-gray-300">
            <span className="text-sm font-semibold">Tax</span>
            <span className="text-sm font-semibold">{formatCurrency(totalTax, data.currency.symbol)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-2 px-4 border-b border-gray-300">
              <span className="text-sm font-semibold">Discount ({data.discount}%)</span>
              <span className="text-sm font-semibold">-{formatCurrency(discountAmount, data.currency.symbol)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 px-4 bg-gray-800 text-white">
            <span className="font-bold text-lg">TOTAL DUE</span>
            <span className="font-bold text-xl">{formatCurrency(grandTotal, data.currency.symbol)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="border-t-2 border-gray-800 pt-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase mb-2">Notes</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
};
