import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import Navbar from './(shared)/Navbar';
import Footer from './(shared)/Footer';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auto Nabu',
  description:
    'Auto Nabu is a versatile blog that covers a wide range of topics while empowering content creators with advanced AI-driven tools. Explore insightful articles on technology, lifestyle, business, and more, with built-in AI features designed to enhance writing, streamline content creation, and boost productivity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={openSans.className} lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
