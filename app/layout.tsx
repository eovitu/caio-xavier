import type { Metadata, Viewport } from 'next';
import './style.css';
import { ServiceWorker } from './service-worker';

export const metadata: Metadata = {
  title: 'SaiDaReta — Caio Xavier',
  description: 'Costura, skate e os caminhos criativos de Caio Xavier.',
  manifest: '/manifest.webmanifest',
};
export const viewport: Viewport = { themeColor: '#171417' };

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}<ServiceWorker /></body></html>;
}

