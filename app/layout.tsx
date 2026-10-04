import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Confirmação de Presença',
  description: 'Confirmação de presença em evento especial',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-champagne-50 flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
