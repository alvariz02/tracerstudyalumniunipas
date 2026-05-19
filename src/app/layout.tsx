import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Tracer Study Alumni UNIPAS',
  description: 'Tracer Study Alumni Universitas Pasifik Morotai. Berkontribusi pada pelaporan IKU, IKT, Akreditasi, dan DIKTI/DIKSI.',
  keywords: 'tracer study, alumni, unipas, universitas pasifik morotai, iku, ikt, akreditasi, dikti, diksi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between">
              <p>&copy; {new Date().getFullYear()} Universitas Pasifik Morotai. All rights reserved.</p>
              <p>Dikembangkan untuk Pelaporan IKU, IKT, Akreditasi, DIKTI, dan DIKSI.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
