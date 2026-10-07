import type {Metadata, Viewport} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-growth-coach.vercel.app'),
  title: 'AI Growth Coach — Learn. Do. Improve.',
  description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
  applicationName: 'AI Growth Coach',
  openGraph: {
    title: 'AI Growth Coach — Learn. Do. Improve.',
    description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Growth Coach — Learn. Do. Improve.',
    description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FAF8F5',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

