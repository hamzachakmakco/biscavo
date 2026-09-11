import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      'https://biscavo-club.dreamy-vole-5554.chatgpt.site',
  ),
  title: 'Biscavo — Dessert, done differently.',
  description:
    'Premium desserts, exclusive rewards and one club. Discover Biscavo.',
  openGraph: {
    title: 'Biscavo — Dessert, done differently.',
    description:
      'Premium desserts, exclusive rewards and one club. Discover Biscavo.',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 628,
        alt: 'Biscavo — Dessert, done differently.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biscavo — Dessert, done differently.',
    description:
      'Premium desserts, exclusive rewards and one club. Discover Biscavo.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
