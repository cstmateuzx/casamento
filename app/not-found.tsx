'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import InviteForm from '@/components/InviteForm';

export default function NotFound() {
  const [extractedConvite, setExtractedConvite] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      // Tratar URLs do tipo /convite/nome-do-convite no GitHub Pages
      const match = pathname.match(/\/convite\/([^/?#]+)/i);
      if (match && match[1]) {
        setExtractedConvite(decodeURIComponent(match[1]));
      }
    }
    setIsChecking(false);
  }, []);

  if (extractedConvite) {
    return (
      <main className="min-h-screen py-10 px-4 sm:px-6 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-sm border border-champagne-200">
          <InviteForm convite={extractedConvite} />
        </div>
      </main>
    );
  }

  if (isChecking) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-stone-500 font-sans text-sm animate-pulse">
          Carregando convite...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
        <h1 className="font-serif text-3xl text-stone-800 mb-2">404</h1>
        <p className="text-stone-600 text-sm mb-6">Página não encontrada.</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
