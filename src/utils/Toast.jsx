'use client';

import React, { useEffect } from 'react';
import useGlobalStore from '@/stores/globalStore';

const types = {
  info: 'alert-info',
  success: 'alert-success',
  error: 'alert-error',
};

function Toast() {
  const { message, type, visible, hideToast } = useGlobalStore();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visible, hideToast]);

  if (!visible) return null;

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${types[type] || types.info}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
