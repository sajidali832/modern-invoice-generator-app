"use client";

import React from 'react';
import { InvoiceData } from '@/types/invoice';
import { calculateSubtotal, calculateTotalTax, calculateGrandTotal, formatCurrency } from '@/lib/invoiceCalculations';

interface TemplateProps {
  data: InvoiceData;
}

export const CorporateTemplate = ({ data }: TemplateProps) => {
  const subtotal = calculateSubtotal(data.lineItems);
  const totalTax = calculateTotalTax(data.lineItems);
  const grandTotal = calculateGrandTotal(data.lineItems, data.discount);
  const discountAmount = ((subtotal + totalTax) * data.discount) / 100;

  return (
    <div className="bg-white min-h-[1000px] text-gray-900" id="invoice-preview">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-12">
        <div className="flex justify-between items-start">
          <div>
            {data.business.logo && (
              <img src={data.business.logo} alt="Logo" className="h-16 mb-4 object-contain brightness-0 invert" />
            )}
            <h1 className="text-5xl font-bold">INVOICE</h1>
            <p className="text-blue-100 mt-2">{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
              <p className="text-blue-100 text-sm">Issue Date</p>
              <p className="font-semibold text-lg">{new Date(data.date).toLocaleDateString()}</p>
              <p className="text-blue-100 text-sm mt-2">Due Date</p>
              <p className="font-semibold text-lg">{new Date(data.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* Business and Client Info */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">From</h3>
            <p className="font-bold text-lg text-gray-900">{data.business.name}</p>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{data.business.address}</p>
            <p className="text-sm text-gray-600 mt-1">{data.business.email}</p>
            <p className="text-sm text-gray-600">{data.business.phone}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">Bill To</h3>
            <p className="font-bold text-lg text-gray-900">{data.client.name}</p>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{data.client.address}</p>
            <p className="text-sm text-gray-600 mt-1">{data.client.email}</p>
            <p className="text-sm text-gray-600">{data.client.phone}</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="text-left py-4 px-4 text-xs font-bold uppercase tracking-wider">Description</th>
                <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider">Qty</th>
                <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider">Price</th>
                <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider">Tax</th>
                <th className="text-right py-4 px-4 text-xs font-bold uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-4 px-4 text-sm">{item.description}</td>
                  <td className="py-4 px-4 text-sm text-right">{item.quantity}</td>
                  <td className="py-4 px-4 text-sm text-right">{formatCurrency(item.unitPrice, data.currency.symbol)}</td>
                  <td className="py-4 px-4 text-sm text-right">{item.tax}%</td>
                  <td className="py-4 px-4 text-sm text-right font-semibold">{formatCurrency(item.total, data.currency.symbol)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-80 bg-gray-50 p-6 rounded-lg">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatCurrency(subtotal, data.currency.symbol)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">{formatCurrency(totalTax, data.currency.symbol)}</span>
            </div>
            {data.discount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Discount ({data.discount}%)</span>
                <span className="font-semibold">-{formatCurrency(discountAmount, data.currency.symbol)}</span>
              </div>
            )}
            <div className="flex justify-between py-4 border-t-2 border-blue-900 mt-3">
              <span className="font-bold text-xl">Total Due</span>
              <span className="font-bold text-2xl text-blue-900">{formatCurrency(grandTotal, data.currency.symbol)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Notes</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};
