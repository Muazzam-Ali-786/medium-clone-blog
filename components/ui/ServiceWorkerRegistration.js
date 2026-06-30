'use client';
import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isProduction = process.env.NODE_ENV === 'production';
    const isSecureContext = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

    if (!isProduction || !isSecureContext || !('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      })
      .catch(() => {});
  }, []);

  return null;
}
