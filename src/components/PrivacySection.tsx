"use client";

import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export function PrivacySection() {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 print:hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We take your privacy seriously. Your invoice data stays on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Data Collection
            </h3>
            <p className="text-muted-foreground">
              We don't store your invoice data on our servers. Everything is processed locally in your browser.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Full Transparency
            </h3>
            <p className="text-muted-foreground">
              No hidden tracking, no cookies, no third-party analytics. Just a simple invoice generator.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
              <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Local Storage Only
            </h3>
            <p className="text-muted-foreground">
              Your invoices are saved in your browser's local storage for convenience, never on external servers.
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Privacy Policy</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">Information We Collect:</strong> We do not collect any personal information. 
              The SmartInvoice app runs entirely in your browser and does not transmit your invoice data to our servers.
            </p>
            <p>
              <strong className="text-foreground">Local Storage:</strong> Your invoice data is stored locally on your device 
              using browser local storage. This data remains on your device and is never sent to external servers.
            </p>
            <p>
              <strong className="text-foreground">Third-Party Services:</strong> We may display advertisements through Google AdSense. 
              Please refer to Google's Privacy Policy for information about how they collect and use data.
            </p>
            <p>
              <strong className="text-foreground">Your Rights:</strong> You can clear your invoice data at any time by clearing 
              your browser's local storage or cache.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
