import './globals.css';
import type { Metadata } from 'next';
import { Amiko } from 'next/font/google';

const nunito = Amiko({ weight: ['400'], subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Movies Database',
  description: 'Made with sample data from mongodb.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
