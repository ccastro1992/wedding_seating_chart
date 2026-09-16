import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat, Great_Vibes } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cursive',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Asignación de Mesas | Nuestra Boda',
  description: 'Consulta tu mesa asignada para la recepción de nuestra boda.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <body className="bg-[#2a2e2b] text-charcoal min-h-screen">
        {children}
      </body>
    </html>
  );
}

