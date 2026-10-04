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
    <main className="invitation-page">
      <div className="invitation-card-container">
        <div className="invitation-card">
          <Suspense fallback={<div className="text-center py-8 text-slate-500">Carregando convite...</div>}>
            <ConviteQueryContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
