import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NPN Transistor Circuit Presentation',
    short_name: 'NPN Circuit',
    description: 'Interactive animated presentation showing NPN transistor circuit operation',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a12',
    theme_color: '#22d3ee',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['education', 'electronics', 'science'],
    orientation: 'landscape',
  }
}
