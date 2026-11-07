import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SaiDaReta', short_name: 'SaiDaReta', start_url: '/', display: 'standalone',
    background_color: '#f1eee7', theme_color: '#f1eee7',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
