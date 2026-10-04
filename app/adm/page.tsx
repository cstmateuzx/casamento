'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminTable from '@/components/AdminTable';
import ExportButton from '@/components/ExportButton';
import { ConfirmacaoRecord, obterConfirmacoes } from '@/lib/sheetsApi';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [confirmacoes, setConfirmacoes] = useState<ConfirmacaoRecord[]>([]);

  const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const carregarConfirmacoes = useCallback(async () => {
    setLoading(true);
    setLoginError(null);

    try {
      const data = await obterConfirmacoes();
      setConfirmacoes(data);
    } catch (err) {
      console.error('Erro ao buscar confirmações:', err);
      setLoginError('Não foi possível carregar as confirmações.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError('Informe a senha do organizador.');
      return;
    }

    if (password.trim() !== expectedPassword) {
      setLoginError('Senha incorreta. Acesso não autorizado.');
      return;
    }

    setIsAuthenticated(true);
    sessionStorage.setItem('admin_auth_pass', password.trim());
    await carregarConfirmacoes();
  };

  // Restaurar sessão
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth_pass');
    if (saved && saved === expectedPassword) {
      setIsAuthenticated(true);
      carregarConfirmacoes();
    }
  }, [expectedPassword, carregarConfirmacoes]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth_pass');
    setIsAuthenticated(false);
    setPassword('');
    setConfirmacoes([]);
  };

  // Contadores (Seção 12)
  const total = confirmacoes.length;
  const confirmados = confirmacoes.filter((c) => c.presenca === true).length;
  const naoIrao = confirmacoes.filter((c) => c.presenca === false).length;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-200">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-serif text-xl font-normal text-stone-800 text-center mb-1">
            Área do Organizador
          </h1>
          <p className="text-stone-500 text-xs text-center mb-6">
            Digite a senha para visualizar as confirmações
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de acesso"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 text-sm"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Acessar Painel'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-stone-500 font-medium">
            Painel Administrativo
          </span>
          <h1 className="font-serif text-3xl font-normal text-stone-900 mt-1">
            Confirmações de Presença
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton confirmacoes={confirmacoes} />
          <button
            onClick={carregarConfirmacoes}
            disabled={loading}
            title="Atualizar lista"
            className="p-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 transition"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-stone-500 hover:text-stone-800 px-3 py-2 rounded-xl hover:bg-stone-100 transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Contadores (Seção 12) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 uppercase tracking-wider font-medium">
            Total de Respostas
          </span>
          <p className="text-3xl font-serif text-stone-900 mt-2 font-normal">
            {total}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-800 uppercase tracking-wider font-medium">
              ✓ Confirmados
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-3xl font-serif text-emerald-900 mt-2 font-normal">
            {confirmados}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-800 uppercase tracking-wider font-medium">
              ✕ Não Irão
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <p className="text-3xl font-serif text-rose-900 mt-2 font-normal">
            {naoIrao}
          </p>
        </div>
      </div>

      {/* Tabela de Confirmações (Seção 12) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-stone-700 uppercase tracking-wider">
            Lista de Convidados
          </h2>
          <span className="text-xs text-stone-400">
            {confirmacoes.length} {confirmacoes.length === 1 ? 'registro' : 'registros'}
          </span>
        </div>
        <AdminTable confirmacoes={confirmacoes} />
      </div>
    </main>
  );
}
