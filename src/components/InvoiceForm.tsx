"use client";

import React, { useRef } from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Upload } from 'lucide-react';
import { calculateLineItemTotal } from '@/lib/invoiceCalculations';
import { LineItem } from '@/types/invoice';

export const InvoiceForm = () => {
  const { invoiceData, updateInvoiceData } = useInvoice();
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateInvoiceData({
          business: { ...invoiceData.business, logo: reader.result as string }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0,
    };
    updateInvoiceData({
      lineItems: [...invoiceData.lineItems, newItem]
    });
  };

  const removeLineItem = (id: string) => {
    if (invoiceData.lineItems.length > 1) {
      updateInvoiceData({
        lineItems: invoiceData.lineItems.filter(item => item.id !== id)
      });
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const updatedItems = invoiceData.lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate total
        updated.total = calculateLineItemTotal(updated.quantity, updated.unitPrice, updated.tax);
        return updated;
      }
      return item;
    });
    updateInvoiceData({ lineItems: updatedItems });
  };

  return (
    <div className="space-y-6 p-6 h-full overflow-y-auto">
      {/* Invoice Details */}
      <Card className="p-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Invoice Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={(e) => updateInvoiceData({ invoiceNumber: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date">Issue Date</Label>
            <Input
              id="date"
              type="date"
              value={invoiceData.date}
              onChange={(e) => updateInvoiceData({ date: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => updateInvoiceData({ dueDate: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Business Information */}
      <Card className="p-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Your Business</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={invoiceData.business.name}
              onChange={(e) => updateInvoiceData({
                business: { ...invoiceData.business, name: e.target.value }
              })}
              placeholder="Your Company Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="businessAddress">Address</Label>
            <Textarea
              id="businessAddress"
              value={invoiceData.business.address}
              onChange={(e) => updateInvoiceData({
                business: { ...invoiceData.business, address: e.target.value }
              })}
              placeholder="Street Address, City, State, ZIP"
              className="mt-1"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessEmail">Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={invoiceData.business.email}
                onChange={(e) => updateInvoiceData({
                  business: { ...invoiceData.business, email: e.target.value }
                })}
                placeholder="email@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessPhone">Phone</Label>
              <Input
                id="businessPhone"
                value={invoiceData.business.phone}
                onChange={(e) => updateInvoiceData({
                  business: { ...invoiceData.business, phone: e.target.value }
                })}
                placeholder="+1 234 567 890"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Logo</Label>
            <div className="mt-2 flex items-center gap-4">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              {invoiceData.business.logo && (
                <div className="relative w-16 h-16 rounded border border-border overflow-hidden">
                  <img
                    src={invoiceData.business.logo}
                    alt="Business Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Client Information */}
      <Card className="p-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Bill To</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={invoiceData.client.name}
              onChange={(e) => updateInvoiceData({
                client: { ...invoiceData.client, name: e.target.value }
              })}
              placeholder="Client Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="clientAddress">Address</Label>
            <Textarea
              id="clientAddress"
              value={invoiceData.client.address}
              onChange={(e) => updateInvoiceData({
                client: { ...invoiceData.client, address: e.target.value }
              })}
              placeholder="Street Address, City, State, ZIP"
              className="mt-1"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoiceData.client.email}
                onChange={(e) => updateInvoiceData({
                  client: { ...invoiceData.client, email: e.target.value }
                })}
                placeholder="client@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                value={invoiceData.client.phone}
                onChange={(e) => updateInvoiceData({
                  client: { ...invoiceData.client, phone: e.target.value }
                })}
                placeholder="+1 234 567 890"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Line Items */}
      <Card className="p-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Items</h2>
        <div className="space-y-4">
          {invoiceData.lineItems.map((item, index) => (
            <div key={item.id} className="p-4 border border-border/50 rounded-lg bg-background/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">Item {index + 1}</span>
                {invoiceData.lineItems.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLineItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2">
                  <Label htmlFor={`desc-${item.id}`}>Description</Label>
                  <Input
                    id={`desc-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`qty-${item.id}`}>Quantity</Label>
                  <Input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`price-${item.id}`}>Unit Price</Label>
                  <Input
                    id={`price-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`tax-${item.id}`}>Tax %</Label>
                  <Input
                    id={`tax-${item.id}`}
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={item.tax}
                    onChange={(e) => updateLineItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mt-3 text-right">
                <span className="text-sm text-muted-foreground">Total: </span>
                <span className="font-semibold text-foreground">
                  {invoiceData.currency.symbol}{item.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addLineItem}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </Card>

      {/* Additional Details */}
      <Card className="p-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Additional Details</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={invoiceData.discount}
              onChange={(e) => updateInvoiceData({ discount: parseFloat(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoiceData.notes}
              onChange={(e) => updateInvoiceData({ notes: e.target.value })}
              placeholder="Payment terms, thank you note, etc."
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
