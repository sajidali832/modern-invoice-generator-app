"use client";

import React from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CorporateTemplate } from './templates/CorporateTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { GradientTemplate } from './templates/GradientTemplate';

export const InvoicePreview = () => {
  const { invoiceData, selectedTemplate } = useInvoice();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'minimal':
        return <MinimalTemplate data={invoiceData} />;
      case 'corporate':
        return <CorporateTemplate data={invoiceData} />;
      case 'classic':
        return <ClassicTemplate data={invoiceData} />;
      case 'modern':
        return <ModernTemplate data={invoiceData} />;
      case 'gradient':
        return <GradientTemplate data={invoiceData} />;
      default:
        return <MinimalTemplate data={invoiceData} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto shadow-2xl">
        {renderTemplate()}
      </div>
    </div>
  );
};
