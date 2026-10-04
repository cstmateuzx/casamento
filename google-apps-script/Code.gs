/**
 * GOOGLE APPS SCRIPT: Backend gratuito para Confirmação de Presença
 * 
 * COMO USAR:
 * 1. Abra o Google Planilhas (https://sheets.new) e crie uma nova planilha (ex: "Confirmações Casamento").
 * 2. No menu superior da planilha, clique em: Extensões > Apps Script.
 * 3. Apague qualquer código existente no editor e cole todo este código abaixo.
 * 4. Clique no ícone de disquete (Salvar).
 * 5. Clique no botão azul no canto superior direito: "Implantar" > "Nova implantação".
 * 6. Na engrenagem de tipo, escolha "App da Web" (Web app).
 * 7. Configure:
 *    - Descrição: API Casamento
 *    - Executar como: "Eu" (sua conta Google)
 *    - Quem tem acesso: "Qualquer pessoa" (Anyone) -> ESSENCIAL para os convidados conseguirem enviar!
 * 8. Clique em "Implantar", autorize o acesso com sua conta Google.
 * 9. Copie a "URL do App da Web" gerada (termina com /exec) e cole no seu .env.local:
 *    NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
 */

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Se a planilha estiver vazia, inicializar cabeçalhos
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Convite", "Nome", "Acompanhantes", "Presença", "Data da confirmação"]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var data = [];
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var presencaValor = row[3];
    var isPresenca = (presencaValor === true || presencaValor === "Sim" || presencaValor === "true" || presencaValor === "SIM");
    
    data.push({
      id: i,
      convite: String(row[0] || ''),
      nome: String(row[1] || ''),
      acompanhantes: String(row[2] || 'Não possui'),
      presenca: isPresenca,
      created_at: String(row[4] || '')
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = {};
    if (e && e.postData && e.postData.contents) {
      contents = JSON.parse(e.postData.contents);
    }
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Se a planilha estiver vazia, cria os cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Convite", "Nome", "Acompanhantes", "Presença", "Data da confirmação"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }
    
    var presencaTexto = contents.presenca ? "Sim" : "Não";
    var agora = Utilities.formatDate(new Date(), "America/Sao_Paulo", "yyyy-MM-dd'T'HH:mm:ssXXX");
    
    sheet.appendRow([
      contents.convite || "",
      contents.nome || "",
      contents.acompanhantes || "Não possui",
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
