const GOOGLE_SCRIPT_URL = (process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '').trim();

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
  if (!isGoogleSheetsConfigured) {
    console.error(
      'Google Apps Script URL não configurada ou inválida. URL recebida:',
      GOOGLE_SCRIPT_URL
    );
    return {
      success: false,
      error: 'A planilha ainda não foi conectada corretamente. Verifique se o link configurado é o do Google Apps Script (iniciado com https://script.google.com/macros/s/ e terminado em /exec).',
    };
  }

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

