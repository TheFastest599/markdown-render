'use client';

import React, { useEffect } from 'react';
import { initGA, trackPageView, trackEvent } from '@/hooks/useAnalytics';

function AnalyticsWrapper() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initGA();
      trackPageView(window.location.pathname, document.title);
    }
  }, []);
  return null;
}

export { AnalyticsWrapper };
