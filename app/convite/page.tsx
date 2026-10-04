'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import InviteForm from '@/components/InviteForm';

function ConviteQueryContent() {
  const searchParams = useSearchParams();
  const conviteId = searchParams.get('id') || searchParams.get('convite') || searchParams.get('c') || 'geral';

  return <InviteForm convite={conviteId} />;
}

export default function ConviteQueryPage() {
  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-sm border border-champagne-200">
        <Suspense fallback={<div className="text-center py-8 text-stone-500">Carregando convite...</div>}>
          <ConviteQueryContent />
        </Suspense>
      </div>
    </main>
  );
}
