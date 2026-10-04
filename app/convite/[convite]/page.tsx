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
    <main className="invitation-page">
      <div className="invitation-card-container">
        <div className="invitation-card">
          <InviteForm convite={conviteId} />
        </div>
      </div>
    </main>
  );
}
