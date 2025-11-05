"use client";

import React, { useState } from 'react';
import { InvoiceProvider } from '@/context/InvoiceContext';
import { InvoiceNavbar } from '@/components/InvoiceNavbar';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { AdPlacement } from '@/components/AdPlacement';
import { AboutSection } from '@/components/AboutSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PrivacySection } from '@/components/PrivacySection';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setShowDownloadModal(false);

    try {
      const element = document.getElementById('invoice-preview');
      if (!element) {
        throw new Error('Invoice preview not found');
      }

      // Create a clone to avoid modifying the visible element
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.width = element.offsetWidth + 'px';
      document.body.appendChild(clone);

      // Helper function to convert oklch/color values to rgb
      const convertColorToRGB = (color: string): string => {
        if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
          return color;
        }

        // If already RGB/RGBA/hex, return as is
        if (color.startsWith('rgb') || color.startsWith('#')) {
          return color;
        }

        // Create a temporary element to compute the color
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        const computed = window.getComputedStyle(temp).color;
        document.body.removeChild(temp);
        
        return computed || color;
      };

      // Get all elements and convert their colors recursively
      const processElement = (el: Element) => {
        const htmlEl = el as HTMLElement;
        const computedStyle = window.getComputedStyle(htmlEl);
        
        // List of all color-related properties
        const colorProperties = [
          'color',
          'backgroundColor',
          'borderColor',
          'borderTopColor',
          'borderRightColor',
          'borderBottomColor',
          'borderLeftColor',
          'outlineColor',
          'textDecorationColor',
          'caretColor',
          'columnRuleColor'
        ];

        // Convert each color property
        colorProperties.forEach(prop => {
          const value = computedStyle.getPropertyValue(prop);
          if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
            const rgbValue = convertColorToRGB(value);
            htmlEl.style.setProperty(prop, rgbValue, 'important');
          }
        });

        // Remove CSS custom properties that might contain oklch
        const cssVars = [
          '--background', '--foreground', '--border', '--card', '--card-foreground',
          '--popover', '--popover-foreground', '--primary', '--primary-foreground',
          '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
          '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
          '--ring', '--radius', '--input'
        ];
        
        cssVars.forEach(varName => {
          htmlEl.style.removeProperty(varName);
        });

        // Process all child elements
        Array.from(el.children).forEach(child => processElement(child));
      };

      // Process the clone
      processElement(clone);

      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ignoreElements: (element) => {
          return element.classList?.contains('no-pdf');
        }
      });

      // Remove the clone
      document.body.removeChild(clone);

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF';
      
      // Show user-friendly error using a toast-like notification
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      errorDiv.textContent = `PDF Generation Error: ${errorMessage}`;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv);
        }
      }, 5000);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <InvoiceNavbar
          onDownload={() => setShowDownloadModal(true)}
          onPrint={handlePrint}
        />

        {/* Top Ad Placement - Above Main Content */}
        <div className="py-6 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <AdPlacement 
              slot="1234567890" 
              format="horizontal"
              className="mb-2"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
          <div className="w-full lg:w-1/2 overflow-hidden">
            <InvoiceForm />
          </div>

          <div className="w-full lg:w-1/2 overflow-hidden border-l border-border/50">
            <InvoicePreview />
          </div>
        </div>

        {/* Ad Placement After Main Content */}
        <div className="py-8 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AdPlacement 
              slot="0987654321" 
              format="auto"
              className="mb-4"
            />
          </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Ad Placement Between Sections */}
        <div className="py-8 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-7xl mx-auto">
            <AdPlacement 
              slot="1122334455" 
              format="auto"
              className="mb-4"
            />
          </div>
        </div>

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Ad Placement Between Sections */}
        <div className="py-8 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <AdPlacement 
              slot="5544332211" 
              format="auto"
              className="mb-4"
            />
          </div>
        </div>

        {/* Privacy Section */}
        <PrivacySection />

        {/* Bottom Ad Placement Before Footer */}
        <div className="py-8 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <AdPlacement 
              slot="6677889900" 
              format="horizontal"
              className="mb-4"
            />
          </div>
        </div>

        <ConfirmationModal
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
          onConfirm={handleDownloadPDF}
          title="Download Invoice"
          description="Are you ready to download your invoice as a PDF?"
          confirmText="Download"
          cancelText="Cancel"
        />

        {isGeneratingPDF && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <p className="text-lg font-semibold text-foreground">Generating PDF...</p>
              <p className="text-sm text-muted-foreground">Please wait a moment</p>
            </div>
          </div>
        )}

        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-border py-8 px-6 text-center print:hidden">
          <div className="max-w-7xl mx-auto space-y-4">
            <p className="text-sm text-muted-foreground">
              Made with love by SmartInvoice
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="#about" className="hover:text-foreground transition-colors">About</a>
              <span>•</span>
              <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </InvoiceProvider>
  );
}