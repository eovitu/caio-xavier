import type { Metadata, Viewport } from 'next';
import './style.css';
import { ServiceWorker } from './service-worker';
import { siteUrl } from './site-url';

const title = 'SaiDaReta | Portfólio de Caio Xavier';
const description = 'Veja as bolsas e peças que Caio Xavier costura, com fotos do ateliê e das criações em uso.';
const cover = {
  url: '/capa-saidareta.jpg',
  width: 1200,
  height: 630,
  alt: 'Assinatura SaiDaReta ao lado de uma bolsa jeans em uso.',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'SaiDaReta', url: '/', title, description, images: [cover] },
  twitter: { card: 'summary_large_image', title, description, images: [cover] },
  manifest: '/manifest.webmanifest',
};
export const viewport: Viewport = { themeColor: '#171417' };

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>{children}<ServiceWorker /></body></html>;
}
