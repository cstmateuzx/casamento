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
      // mode: 'no-cors' com Content-Type text/plain evita bloqueio de CORS nos redirecionamentos do Google
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(dados),
      });

      return { success: true };
    } catch (err) {
      console.error('Erro ao enviar confirmação para Google Sheets:', err);
      return { success: false, error: 'Não foi possível registrar sua resposta. Tente novamente.' };
    }
  }

  // Fallback caso ainda não configurado
  return { success: true };
}
