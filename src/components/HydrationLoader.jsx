'use client';

import { useStoreHydration } from '@/stores/globalStore';

function HydrationLoader({ children }) {
  const isHydrated = useStoreHydration();

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-500">Loading your content...</p>
        </div>
      </div>
    );
  }

  return children;
}

export default HydrationLoader;
