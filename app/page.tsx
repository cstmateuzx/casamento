'use client';

import { useEffect, useState } from 'react';
import InviteForm from '@/components/InviteForm';

export default function HomePage() {
  const [stage, setStage] = useState<'closed' | 'opening' | 'open' | 'fading' | 'form'>('closed');

  useEffect(() => {
    if (stage === 'closed') {
      // Coreografia suave e visível com duração exata de 3 segundos
      const t1 = window.setTimeout(() => setStage('opening'), 350);
      const t2 = window.setTimeout(() => setStage('open'), 1150);
      const t3 = window.setTimeout(() => setStage('fading'), 2250);
      const t4 = window.setTimeout(() => setStage('form'), 3000);

      return () => {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
        window.clearTimeout(t4);
      };
    }
  }, [stage]);

  const handleSkip = () => {
    setStage('form');
  };

  const handleReplay = () => {
    setStage('closed');
  };

  const stageClass = stage === 'opening'
    ? 'is-opening'
    : stage === 'open'
    ? 'is-open'
    : stage === 'fading'
    ? 'is-fading'
    : '';

  return (
    <main className="invitation-page">
      {stage !== 'form' ? (
        <section
          className={`envelope-scene ${stageClass}`}
          aria-label="Abertura do convite de casamento"
        >
          {/* Botão sutil para pular caso queira ir direto */}
          <div className="w-full flex justify-end mb-3">
            <button
              type="button"
              onClick={handleSkip}
              className="text-xs text-slate-500 hover:text-slate-800 transition px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-sm flex items-center gap-1.5"
            >
              <span>Pular abertura</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* O envelope inteiro é clicável para abrir imediatamente se desejar */}
          <div
            className="envelope-wrapper"
            onClick={handleSkip}
            title="Clique para ir direto ao formulário"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSkip();
            }}
          >
            {/* Base cinza escura traseira */}
            <div className="envelope-back" />

            {/* Forro interior em amarelo bem claro */}
            <div className="envelope-lining" />

            {/* Carta do convite que sobe suavemente */}
            <div className="envelope-letter">
              <div className="envelope-letter-border" />
              <span className="letter-eyebrow">Com carinho</span>
              <h1 className="letter-title">Nosso Casamento</h1>
              <p className="letter-subtitle">Você é nosso convidado especial</p>
              <div className="letter-ornament">
                <span className="w-8 h-px bg-yellow-400/50" />
                <span className="text-[11px] text-yellow-700/80">✧</span>
                <span className="w-8 h-px bg-yellow-400/50" />
              </div>
            </div>

            {/* Bolso frontal em cinza sofisticado */}
            <div className="envelope-pocket" />
            <div className="envelope-pocket-crease-left" />
            <div className="envelope-pocket-crease-right" />

            {/* Aba superior triangular (gira em 3D revelando o forro amarelo) */}
            <div className="envelope-flap">
              <div className="envelope-flap-front" />
              <div className="envelope-flap-back" />
            </div>

            {/* Selo / Lacre central em amarelo claro com dourado */}
            <div className="envelope-seal" aria-hidden="true">
              <svg className="w-5 h-5 text-yellow-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          <p className="mt-8 text-xs text-slate-400 font-sans tracking-wide">
            Uma celebração inesquecível espera por você
          </p>
        </section>
      ) : (
        <section className="invitation-card-container" aria-label="Confirmação de presença">
          <div className="invitation-card">
            <InviteForm convite="geral" />

            {/* Rodapé com botão para rever a animação */}
            <div className="mt-8 pt-4 border-t border-slate-200/60 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <button
                type="button"
                onClick={handleReplay}
                className="hover:text-slate-800 transition inline-flex items-center gap-1.5 underline decoration-slate-300 underline-offset-4"
              >
                <span>↺ Rever abertura do convite</span>
              </button>

              <span className="text-[11px] text-slate-400">
                Comemore este momento único conosco
              </span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
