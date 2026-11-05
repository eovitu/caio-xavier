import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SaiDaReta', short_name: 'SaiDaReta', start_url: '/', display: 'standalone',
    background_color: '#171417', theme_color: '#171417',
    icons: [{ src: '/desvio.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
