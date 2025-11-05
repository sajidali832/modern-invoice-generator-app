"use client";

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateSubtotal, calculateTotalTax, calculateGrandTotal, formatCurrency } from '@/lib/invoiceCalculations';

interface TemplateProps {
  data: InvoiceData;
}

export const GradientTemplate = ({ data }: TemplateProps) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const totalTax = calculateTotalTax(data.lineItems);
  const grandTotal = calculateGrandTotal(data.lineItems, data.discount);
  const discountAmount = ((subtotal + totalTax) * data.discount) / 100;

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-12 min-h-[1000px]" id="invoice-preview">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-3xl p-10 mb-8 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            {data.business.logo && (
              <img src={data.business.logo} alt="Logo" className="h-16 mb-4 object-contain brightness-0 invert" />
            )}
            <h1 className="text-6xl font-black mb-2">INVOICE</h1>
            <div className="bg-white/20 backdrop-blur-sm inline-block px-4 py-2 rounded-full">
              <p className="font-semibold">{data.invoiceNumber}</p>
            </div>
          </div>
          <div className="text-right bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">Issue Date</p>
            <p className="font-bold text-lg">{new Date(data.date).toLocaleDateString()}</p>
            <p className="text-xs font-bold uppercase tracking-wider mt-3 opacity-90">Due Date</p>
            <p className="font-bold text-lg">{new Date(data.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Business and Client Info */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            From
          </div>
          <p className="font-bold text-xl text-gray-900 mb-2">{data.business.name}</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.business.address}</p>
          <p className="text-sm text-gray-700 mt-1">{data.business.email}</p>
          <p className="text-sm text-gray-700">{data.business.phone}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            Bill To
          </div>
          <p className="font-bold text-xl text-gray-900 mb-2">{data.client.name}</p>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.client.address}</p>
          <p className="text-sm text-gray-700 mt-1">{data.client.email}</p>
          <p className="text-sm text-gray-700">{data.client.phone}</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg mb-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Description
              </th>
              <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Qty
              </th>
              <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Price
              </th>
              <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Tax
              </th>
              <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white/50' : 'bg-transparent'}>
                <td className="py-4 px-4 text-sm text-gray-900 rounded-l-lg">{item.description}</td>
                <td className="py-4 px-4 text-sm text-right text-gray-700">{item.quantity}</td>
                <td className="py-4 px-4 text-sm text-right text-gray-700">{formatCurrency(item.unitPrice, data.currency.symbol)}</td>
                <td className="py-4 px-4 text-sm text-right text-gray-700">{item.tax}%</td>
                <td className="py-4 px-4 text-sm text-right font-semibold text-gray-900 rounded-r-lg">{formatCurrency(item.total, data.currency.symbol)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-96 bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between py-3">
            <span className="text-gray-700">Subtotal</span>
            <span className="font-semibold text-gray-900">{formatCurrency(subtotal, data.currency.symbol)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-700">Tax</span>
            <span className="font-semibold text-gray-900">{formatCurrency(totalTax, data.currency.symbol)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-3">
              <span className="text-gray-700">Discount ({data.discount}%)</span>
              <span className="font-semibold text-gray-900">-{formatCurrency(discountAmount, data.currency.symbol)}</span>
            </div>
          )}
          <div className="flex justify-between py-4 mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl px-6 shadow-lg">
            <span className="font-bold text-xl">Total</span>
            <span className="font-bold text-3xl">{formatCurrency(grandTotal, data.currency.symbol)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg mt-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Notes
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.notes}</p>
        </div>
      )}
    </div>
  );
};
