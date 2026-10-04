import InviteForm from '@/components/InviteForm';

interface ConvitePageProps {
  params: {
    convite: string;
  };
}

export function generateStaticParams() {
  return [
    { convite: 'familia-silva' },
    { convite: 'familia-souza' },
    { convite: 'familia-santos' },
    { convite: 'exemplo' },
    { convite: 'geral' },
  ];
}

export default function ConvitePage({ params }: ConvitePageProps) {
  const conviteId = decodeURIComponent(params.convite || 'geral');

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-sm border border-champagne-200">
        <InviteForm convite={conviteId} />
      </div>
    </main>
  );
}
