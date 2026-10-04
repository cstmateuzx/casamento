'use client';

interface ConfirmationMessageProps {
  presenca: boolean;
  nome: string;
}

export default function ConfirmationMessage({ presenca, nome }: ConfirmationMessageProps) {
  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="font-serif text-2xl font-normal text-stone-800 mb-2">
        {presenca ? 'Presença confirmada!' : 'Resposta registrada.'}
      </h2>

      <p className="text-stone-600 text-base leading-relaxed mb-4">
        {presenca
          ? 'Obrigado por confirmar sua presença.'
          : 'Obrigado por nos avisar.'}
      </p>

      {nome && (
        <p className="text-xs text-stone-400">
          Resposta registrada para: <span className="font-medium text-stone-600">{nome}</span>
        </p>
      )}
    </div>
  );
}
