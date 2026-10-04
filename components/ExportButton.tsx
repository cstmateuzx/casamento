'use client';

import * as XLSX from 'xlsx';
import { ConfirmacaoRecord } from '@/lib/sheetsApi';

interface ExportButtonProps {
  confirmacoes: ConfirmacaoRecord[];
}

export default function ExportButton({ confirmacoes }: ExportButtonProps) {
  const handleExport = () => {
    if (!confirmacoes || confirmacoes.length === 0) {
      alert('Nenhuma confirmação encontrada para exportar.');
      return;
    }

    // Formatar linhas para a planilha conforme Seção 14
    const rows = confirmacoes.map((item) => {
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

      return {
        'Convite': item.convite || '',
        'Nome': item.nome || '',
        'Acompanhantes': item.acompanhantes || '—',
        'Presença': item.presenca ? 'Sim' : 'Não',
        'Data da confirmação': dataFormatada,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Ajustar largura das colunas
    worksheet['!cols'] = [
      { wch: 20 }, // Convite
      { wch: 30 }, // Nome
      { wch: 35 }, // Acompanhantes
      { wch: 12 }, // Presença
      { wch: 22 }, // Data
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Confirmações');

    // Baixar arquivo com o nome sugerido: confirmacoes-evento.xlsx
    XLSX.writeFile(workbook, 'confirmacoes-evento.xlsx');
  };

  return (
    <button
      onClick={handleExport}
      disabled={confirmacoes.length === 0}
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Exportar Excel
    </button>
  );
}
