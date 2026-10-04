import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-champagne-200">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-champagne-100 flex items-center justify-center text-champagne-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-normal text-stone-800 tracking-wide mb-3">
          Confirmação de Presença
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed mb-6">
          Por favor, utilize o link de convite personalizado que você recebeu pelo WhatsApp ou mensagem para confirmar sua presença.
        </p>
        <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
          <Link
            href="/convite/exemplo"
            className="text-xs text-champagne-600 hover:text-champagne-700 underline"
          >
            Ver demonstração de convite (/convite/exemplo)
          </Link>
          <Link
            href="/adm"
            className="text-xs text-stone-400 hover:text-stone-600"
          >
            Área do Organizador (/adm)
          </Link>
        </div>
      </div>
    </main>
  );
}
