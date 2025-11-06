import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "SmartInvoice - Free Professional Invoice Generator & Creator",
    template: "%s | SmartInvoice"
  },
  description: "Create professional invoices online for free. Multi-currency support, 5+ templates, instant PDF download. Perfect for freelancers, small businesses & entrepreneurs. No signup required.",
  keywords: [
    "invoice generator",
    "free invoice maker",
    "professional invoice creator",
    "online invoice tool",
    "invoice template",
    "PDF invoice",
    "business invoice",
    "freelance invoice",
    "invoice download",
    "multi-currency invoice",
    "invoice software",
    "billing tool",
    "receipt maker",
    "tax invoice generator"
  ],
  authors: [{ name: "SmartInvoice" }],
  creator: "SmartInvoice",
  publisher: "SmartInvoice",
  applicationName: "SmartInvoice",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "Business & Finance",
  classification: "Invoice Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://smartinvoice.com",
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '512x512', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.png',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartinvoice.com",
    siteName: "SmartInvoice",
    title: "SmartInvoice - Free Professional Invoice Generator",
    description: "Create professional invoices online for free. Multi-currency support, 5+ templates, instant PDF download. No signup required.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "SmartInvoice - Professional Invoice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartInvoice - Free Professional Invoice Generator",
    description: "Create professional invoices online for free. Multi-currency support, 5+ templates, instant PDF download.",
    images: ["/icon.png"],
    creator: "@smartinvoice",
  },
  verification: {
    google: 'uH5P7tslZa0wHKJFlk7nKBDqU0KDdv1g304h486Z1Nk',
  },
  other: {
    'monetag': 'c861cd9d38303fd82eb2a0c82ffe1450',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://smartinvoice.com/#webapp",
        "name": "SmartInvoice",
        "url": "https://smartinvoice.com",
        "description": "Professional invoice generator with multi-currency support and customizable templates",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Multi-currency support",
          "5+ professional templates",
          "Instant PDF download",
          "Real-time preview",
          "No signup required",
          "Auto-save functionality",
          "Print support",
          "Dark mode"
        ],
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "screenshot": "https://smartinvoice.com/screenshot.png"
      },
      {
        "@type": "Organization",
        "@id": "https://smartinvoice.com/#organization",
        "name": "SmartInvoice",
        "url": "https://smartinvoice.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://smartinvoice.com/logo.png"
        },
        "sameAs": [
          "https://twitter.com/smartinvoice",
          "https://facebook.com/smartinvoice"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://smartinvoice.com/#website",
        "url": "https://smartinvoice.com",
        "name": "SmartInvoice",
        "description": "Free professional invoice generator and creator",
        "publisher": {
          "@id": "https://smartinvoice.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://smartinvoice.com/?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://smartinvoice.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://smartinvoice.com"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="c861cd9d38303fd82eb2a0c82ffe1450" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://smartinvoice.com" />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script src="https://fpyf8.com/88/tag.min.js" data-zone="183178" async data-cfasync="false"></script>
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}