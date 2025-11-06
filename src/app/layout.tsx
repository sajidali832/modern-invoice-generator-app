import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SmartInvoice - Professional Invoice Generator",
  description: "Create, customize, and download professional invoices with multiple templates and currencies",
  other: {
    'monetag': 'c861cd9d38303fd82eb2a0c82ffe1450',
  },
  verification: {
    google: 'uH5P7tslZa0wHKJFlk7nKBDqU0KDdv1g304h486Z1Nk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="monetag" content="c861cd9d38303fd82eb2a0c82ffe1450" />
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