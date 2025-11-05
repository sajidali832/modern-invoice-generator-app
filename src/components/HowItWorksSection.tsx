"use client";

import React from 'react';
import { Edit3, Eye, Download } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      icon: Edit3,
      title: "Fill in Details",
      description: "Enter your business information, client details, and line items. Choose from multiple currencies and templates."
    },
    {
      number: "2",
      icon: Eye,
      title: "Preview in Real-Time",
      description: "Watch your invoice come to life with instant preview. See exactly how it will look when printed or downloaded."
    },
    {
      number: "3",
      icon: Download,
      title: "Download & Share",
      description: "Download your professional invoice as PDF or print it directly. It's that simple!"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 print:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional invoices in three simple steps. No registration, no complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 -translate-x-1/2 z-0" />
                )}
                
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow z-10">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full text-2xl font-bold mb-4 mx-auto">
                    {step.number}
                  </div>
                  
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
