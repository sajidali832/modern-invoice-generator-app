"use client";

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateSubtotal, calculateTotalTax, calculateGrandTotal, formatCurrency } from '@/lib/invoiceCalculations';

interface TemplateProps {
  data: InvoiceData;
}

export const ModernTemplate = ({ data }: TemplateProps) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const totalTax = calculateTotalTax(data.lineItems);
  const grandTotal = calculateGrandTotal(data.lineItems, data.discount);
  const discountAmount = ((subtotal + totalTax) * data.discount) / 100;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 min-h-[1000px]" id="invoice-preview">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-xl p-10 mb-8">
        <div className="flex justify-between items-start">
          <div>
            {data.business.logo && (
              <img src={data.business.logo} alt="Logo" className="h-16 mb-4 object-contain" />
            )}
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              INVOICE
            </h1>
            <p className="text-gray-500 mt-2 font-medium">{data.invoiceNumber}</p>
          </div>
          <div className="text-right bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Issue Date</p>
            <p className="font-bold text-lg text-gray-900">{new Date(data.date).toLocaleDateString()}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-3">Due Date</p>
            <p className="font-bold text-lg text-gray-900">{new Date(data.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Business and Client Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            From
          </div>
          <p className="font-bold text-xl text-gray-900 mb-2">{data.business.name}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.business.address}</p>
          <p className="text-sm text-gray-600 mt-1">{data.business.email}</p>
          <p className="text-sm text-gray-600">{data.business.phone}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            Bill To
          </div>
          <p className="font-bold text-xl text-gray-900 mb-2">{data.client.name}</p>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.client.address}</p>
          <p className="text-sm text-gray-600 mt-1">{data.client.email}</p>
          <p className="text-sm text-gray-600">{data.client.phone}</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="text-right py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-right py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="text-right py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tax</th>
              <th className="text-right py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 text-sm text-gray-900">{item.description}</td>
                <td className="py-4 text-sm text-right text-gray-600">{item.quantity}</td>
                <td className="py-4 text-sm text-right text-gray-600">{formatCurrency(item.unitPrice, data.currency.symbol)}</td>
                <td className="py-4 text-sm text-right text-gray-600">{item.tax}%</td>
                <td className="py-4 text-sm text-right font-semibold text-gray-900">{formatCurrency(item.total, data.currency.symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-96 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">{formatCurrency(subtotal, data.currency.symbol)}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold text-gray-900">{formatCurrency(totalTax, data.currency.symbol)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-3 text-sm">
              <span className="text-gray-600">Discount ({data.discount}%)</span>
              <span className="font-semibold text-gray-900">-{formatCurrency(discountAmount, data.currency.symbol)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl px-6">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl">{formatCurrency(grandTotal, data.currency.symbol)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Notes</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
};
