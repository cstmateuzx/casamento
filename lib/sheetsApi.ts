export interface ConfirmacaoRecord {
  id?: number;
  convite: string;
  nome: string;
  acompanhantes: string;
  presenca: boolean;
  created_at?: string;
}

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export const isGoogleSheetsConfigured = Boolean(
  GOOGLE_SCRIPT_URL &&
  GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/macros/s/') &&
  !GOOGLE_SCRIPT_URL.includes('SEU_ID')
);

export async function salvarConfirmacao(dados: {
  convite: string;
  nome: string;
  acompanhantes: string;
  presenca: boolean;
}): Promise<{ success: boolean; error?: string }> {
  if (isGoogleSheetsConfigured) {
    try {
      // text/plain evita bloqueio de CORS (OPTIONS preflight) no Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(dados),
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor Google');
      }

      return { success: true };
    } catch (err) {
      console.error('Erro ao enviar para Google Sheets:', err);
      return { success: false, error: 'Não foi possível registrar sua resposta. Tente novamente.' };
    }
  }

  // Modo local de teste / demonstração quando a URL do Google ainda não foi inserida
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('local_confirmacoes') || '[]';
      const lista: ConfirmacaoRecord[] = JSON.parse(raw);
      lista.push({
        id: Date.now(),
        ...dados,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('local_confirmacoes', JSON.stringify(lista));
    }
    return { success: true };
  } catch (err) {
    console.error('Erro ao salvar localmente:', err);
    return { success: false, error: 'Não foi possível registrar sua resposta. Tente novamente.' };
  }
}

export async function obterConfirmacoes(): Promise<ConfirmacaoRecord[]> {
  if (isGoogleSheetsConfigured) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Falha ao consultar Google Sheets');
      }

      const data = await response.json();
      return Array.isArray(data) ? data.reverse() : [];
    } catch (err) {
      console.error('Erro ao buscar do Google Sheets:', err);
    }
  }

  // Retorna dados do armazenamento local em caso de ambiente sem URL configurada
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('local_confirmacoes');
    if (raw) {
      try {
        const localList = JSON.parse(raw);
        return Array.isArray(localList) ? localList.reverse() : [];
      } catch {
        // ignorar
      }
    }
  }

  return [];
}
