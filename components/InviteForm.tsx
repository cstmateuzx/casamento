'use client';

import { useState } from 'react';
import { salvarConfirmacao } from '@/lib/sheetsApi';
import ConfirmationMessage from './ConfirmationMessage';

interface InviteFormProps {
  convite: string;
  nomeEvento?: string;
}

export default function InviteForm({ convite, nomeEvento = 'Nosso Casamento' }: InviteFormProps) {
  const [nome, setNome] = useState('');
  const [acompanhante1, setAcompanhante1] = useState('');
  const [acompanhante2, setAcompanhante2] = useState('');
  const [acompanhante3, setAcompanhante3] = useState('');
  const [presenca, setPresenca] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setValidationError(null);
    setErrorMessage(null);

    // Validação essencial (Seção 8)
    if (!nome.trim()) {
      setValidationError('Por favor, informe seu nome.');
      return;
    }

    if (presenca === null) {
      setValidationError('Por favor, selecione se você irá comparecer.');
      return;
    }

    setIsSubmitting(true);

    // Formatar acompanhantes (Seção 4)
    const listaAcompanhantes = [acompanhante1, acompanhante2, acompanhante3]
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const acompanhantesTexto = listaAcompanhantes.length > 0
      ? listaAcompanhantes.join(', ')
      : 'Não possui';

    const resultado = await salvarConfirmacao({
      convite,
      nome: nome.trim(),
      acompanhantes: acompanhantesTexto,
      presenca,
    });

    if (resultado.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(resultado.error || 'Não foi possível registrar sua resposta. Tente novamente.');
    }

    setIsSubmitting(false);
  };

  if (isSuccess && presenca !== null) {
    return <ConfirmationMessage presenca={presenca} nome={nome} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center pb-2 border-b border-champagne-100">
        <span className="text-xs uppercase tracking-widest text-champagne-600 font-medium">
          Convite Especial
        </span>
        <h1 className="font-serif text-3xl font-normal text-stone-800 mt-1">
          {nomeEvento}
        </h1>
        <p className="text-stone-500 text-sm mt-2">
          Você está convidado!
        </p>
      </div>

      {/* Campo: Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-stone-700 mb-1.5">
          Seu Nome Completo <span className="text-red-500">*</span>
        </label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: João Silva"
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:border-transparent transition text-base disabled:bg-stone-50"
        />
      </div>

      {/* Campo: Quem irá com você? */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Quem irá com você? <span className="text-xs font-normal text-stone-400">(Acompanhantes)</span>
        </label>
        <div className="space-y-2">
          <input
            type="text"
            value={acompanhante1}
            onChange={(e) => setAcompanhante1(e.target.value)}
            placeholder="Nome do acompanhante 1 (opcional)"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-champagne-300 focus:border-transparent transition text-sm disabled:bg-stone-50"
          />
          <input
            type="text"
            value={acompanhante2}
            onChange={(e) => setAcompanhante2(e.target.value)}
            placeholder="Nome do acompanhante 2 (opcional)"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-champagne-300 focus:border-transparent transition text-sm disabled:bg-stone-50"
          />
          <input
            type="text"
            value={acompanhante3}
            onChange={(e) => setAcompanhante3(e.target.value)}
            placeholder="Nome do acompanhante 3 (opcional)"
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-champagne-300 focus:border-transparent transition text-sm disabled:bg-stone-50"
          />
        </div>
      </div>

      {/* Campo: Você irá comparecer? */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Você irá comparecer? <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setPresenca(true)}
            className={`py-3 px-4 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 ${
              presenca === true
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold shadow-sm'
                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
            }`}
          >
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              presenca === true ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'
            }`}>
              {presenca === true && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            Sim, eu vou
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setPresenca(false)}
            className={`py-3 px-4 rounded-xl border text-sm font-medium transition flex items-center justify-center gap-2 ${
              presenca === false
                ? 'border-stone-600 bg-stone-100 text-stone-800 font-semibold shadow-sm'
                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
            }`}
          >
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              presenca === false ? 'border-stone-600 bg-stone-600' : 'border-stone-400'
            }`}>
              {presenca === false && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            Não poderei ir
          </button>
        </div>
      </div>

      {/* Mensagens de validação e erro amigável */}
      {validationError && (
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          {validationError}
        </div>
      )}

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMessage}
        </div>
      )}

      {/* Botão Principal: Confirmar presença */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-base tracking-wide transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Salvando...
          </span>
        ) : (
          'Confirmar presença'
        )}
      </button>

      <div className="text-center">
        <span className="text-[11px] text-stone-400 tracking-wider">
          Link do convite: #{convite}
        </span>
      </div>
    </form>
  );
}
