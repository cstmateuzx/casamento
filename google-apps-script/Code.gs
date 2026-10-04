/**
 * GOOGLE APPS SCRIPT: Backend para Confirmação de Presença
 * 
 * INSTRUÇÕES:
 * 1. Cole este código no editor (Extensões > Apps Script) e salve.
 * 2. Clique em "Implantar" > "Gerenciar implantações" (ou Nova implantação).
 * 3. Configure:
 *    - Versão: Nova versão
 *    - Executar como: "Eu (seu email)"
 *    - Quem tem acesso: "Qualquer pessoa"
 * 4. Copie a URL do app da Web gerada (/exec) e cole no .env e .env.local:
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
 */

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss ? ss.getSheets()[0] : null;
}

function doGet(e) {
  var sheet = getSheet();
  if (sheet && sheet.getLastRow() === 0) {
    sheet.appendRow(["Convite", "Nome", "Acompanhantes", "Presença", "Data da confirmação"]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
  }
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = {};
    if (e && e.postData && e.postData.contents) {
      try {
        contents = JSON.parse(e.postData.contents);
      } catch (err) {
        contents = e.parameter || {};
      }
    } else if (e && e.parameter) {
      contents = e.parameter;
    }
    
    var sheet = getSheet();
    if (!sheet) {
      throw new Error("Planilha não encontrada.");
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Convite", "Nome", "Acompanhantes", "Presença", "Data da confirmação"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }
    
    var convite = contents.convite || (e && e.parameter && e.parameter.convite) || "geral";
    var nome = contents.nome || (e && e.parameter && e.parameter.nome) || "";
    var acompanhantes = contents.acompanhantes || (e && e.parameter && e.parameter.acompanhantes) || "Não possui";
    var presencaRaw = (contents.presenca !== undefined) ? contents.presenca : (e && e.parameter ? e.parameter.presenca : true);
    var isPresenca = (presencaRaw === true || presencaRaw === "true" || presencaRaw === "Sim" || presencaRaw === "SIM" || presencaRaw === 1);
    var presencaTexto = isPresenca ? "Sim" : "Não";
    var agora = Utilities.formatDate(new Date(), "America/Sao_Paulo", "yyyy-MM-dd'T'HH:mm:ssXXX");
    
    sheet.appendRow([
      convite,
      nome,
      acompanhantes,
      presencaTexto,
      agora
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Teste manual direto no editor do Google Apps Script
function testarSalvamentoManual() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        convite: "teste",
        nome: "Convidado de Teste",
        acompanhantes: "Maria Silva",
        presenca: true
      })
    }
  });
  Logger.log(res.getContent());
}
