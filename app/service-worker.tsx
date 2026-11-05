'use client';

import { useEffect } from 'react';

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
        console.warn('Falha ao registrar o modo offline.', error);
      });
    }
  }, []);
  return null;
}
