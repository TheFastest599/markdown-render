'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { initGA, trackPageView } from '@/hooks/useAnalytics';

function AnalyticsWrapper() {
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initGA();
      trackPageView(pathname, document.title);
    }
  }, [pathname]); // Trigger useEffect when pathname changes

  return null;
}

export { AnalyticsWrapper };
