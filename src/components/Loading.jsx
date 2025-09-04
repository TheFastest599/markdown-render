'use client';

import React from 'react';
import useGlobalStore from '@/stores/globalStore';

function Loading() {
  const { loading } = useGlobalStore();

  return (
    <>
      {loading && (
        <span className="fixed z-10 top-16 left-1/2 -translate-x-1/2 loading loading-dots loading-lg"></span>
      )}
    </>
  );
}

export default Loading;
