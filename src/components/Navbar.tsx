'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, BarChart3, GraduationCap } from 'lucide-react';

const navLinkClass = (active: boolean) =>
  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
    active
      ? 'bg-slate-100 text-slate-900 shadow-sm'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
  }`;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-extrabold text-slate-900">
          <GraduationCap size={28} className="text-slate-700" />
          <span>
            TRACER STUDY <span className="bg-gradient-to-r from-slate-700 to-sky-500 bg-clip-text text-transparent">UNIPAS</span>
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className={navLinkClass(pathname === '/')}> 
            <ClipboardList size={18} />
            Isi Formulir
          </Link>
          <Link href="/dashboard" className={navLinkClass(pathname === '/dashboard')}>
            <BarChart3 size={18} />
            Dashboard Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
}
