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
      const match = pathname.match(/\/convite\/([^/?#]+)/i);
      if (match && match[1]) {
        setExtractedConvite(decodeURIComponent(match[1]));
      }
    }
    setIsChecking(false);
  }, []);

  if (extractedConvite) {
    return (
      <main className="invitation-page">
        <div className="invitation-card-container">
          <div className="invitation-card">
            <InviteForm convite={extractedConvite} />
          </div>
        </div>
      </main>
    );
  }

  if (isChecking) {
    return (
      <main className="invitation-page">
        <div className="text-center text-slate-500 font-sans text-sm animate-pulse">
          Carregando convite...
        </div>
      </main>
    );
  }

  return (
    <main className="invitation-page">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="font-serif text-3xl text-slate-800 mb-2">404</h1>
        <p className="text-slate-600 text-sm mb-6">Página não encontrada.</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
