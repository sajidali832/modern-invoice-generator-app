"use client";

import React, { useEffect, useRef } from 'react';

interface AdPlacementProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

export function AdPlacement({ 
  slot, 
  format = 'auto', 
  style, 
  className = '' 
}: AdPlacementProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('Ad loading error:', err);
    }
  }, []);

  return (
    <div className={`ad-container print:hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '90px',
          ...style
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your Google AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Declare window.adsbygoogle type
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
