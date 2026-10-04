import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Growth Coach — Learn. Do. Improve.',
  description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
  openGraph: {
    title: 'AI Growth Coach — Learn. Do. Improve.',
    description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Growth Coach — Learn. Do. Improve.',
    description: 'Turn your business goal into a guided marketing workflow with AI tools and your friendly alpaca coach.',
  },
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

