"use client";

import React from 'react';
import { FileText, Zap, Download, Globe } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: FileText,
      title: "Professional Invoices",
      description: "Create beautiful, professional invoices in minutes with our easy-to-use templates."
    },
    {
      icon: Zap,
      title: "Instant Preview",
      description: "See your invoice update in real-time as you type. What you see is what you get."
    },
    {
      icon: Download,
      title: "Download & Print",
      description: "Export your invoices as PDF or print them directly from your browser."
    },
    {
      icon: Globe,
      title: "Multi-Currency",
      description: "Support for multiple currencies including USD, EUR, GBP, INR, and more."
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900 print:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose SmartInvoice?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional invoices for your business with our free, easy-to-use invoice generator. 
            No signup required, completely free forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
