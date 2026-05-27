import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

// Sayfa basligi - okul projesi gibi basit
export const metadata: Metadata = {
  title: 'Envanter Takip Sistemi',
  description: 'Stok ve envanter yonetim paneli',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
