import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import { Providers } from '../components/Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DriveMatch - Automotive Marketplace',
  description: 'Buy and sell vehicles with price intelligence',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
