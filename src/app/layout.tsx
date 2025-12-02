import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/providers/app-providers';
import AuthProvider from '@/providers/auth-provider';
// import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Powered by SF Pro & Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className='antialiased min-h-screen' data-scroll-behavior='smooth'>
        <AppProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
