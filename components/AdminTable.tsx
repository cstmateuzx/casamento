'use client';

import { ConfirmacaoRecord } from '@/lib/sheetsApi';

interface AdminTableProps {
  confirmacoes: ConfirmacaoRecord[];
}

export default function AdminTable({ confirmacoes }: AdminTableProps) {
  if (confirmacoes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
        Nenhuma confirmação recebida até o momento.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-stone-200 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50/70 text-stone-600 font-medium">
            <th className="py-3.5 px-4">Nome</th>
            <th className="py-3.5 px-4">Acompanhantes</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Convite</th>
            <th className="py-3.5 px-4 hidden md:table-cell">Data</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-stone-800">
          {confirmacoes.map((item, index) => {
            let dataFormatada = '—';
            if (item.created_at) {
              try {
                const date = new Date(item.created_at);
                if (!isNaN(date.getTime())) {
                  dataFormatada = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                } else {
                  dataFormatada = item.created_at;
                }
              } catch {
                dataFormatada = item.created_at;
              }
            }

            return (
              <tr key={item.id ?? index} className="hover:bg-stone-50/50 transition">
                <td className="py-3.5 px-4 font-medium text-stone-900">
                  {item.nome}
                </td>
                <td className="py-3.5 px-4 text-stone-600">
                  {item.acompanhantes || '—'}
                </td>
                <td className="py-3.5 px-4">
                  {item.presenca ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Confirmado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      Não irá
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-stone-500 text-xs hidden sm:table-cell">
                  <span className="bg-stone-100 px-2 py-0.5 rounded font-mono">
                    {item.convite}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-stone-400 text-xs hidden md:table-cell whitespace-nowrap">
                  {dataFormatada}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
