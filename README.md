# Confirmação de Presença - Casamento (100% Gratuito)

Sistema elegante, simples e moderno para confirmação de presença (RSVP), desenvolvido com **Next.js**, **Tailwind CSS**, **Google Planilhas (Apps Script)** e **GitHub Pages**.

---

## 🎯 Vantagens Desta Solução
- **Custo Zero Vitalício**: Sem planos pagos, sem limites que forçam upgrade e sem necessidade de cartão de crédito.
- **Não Hiberna**: Ao contrário de serviços com servidores que desligam por inatividade, o Google Planilhas nunca expira.
- **Hospedagem Gratuita**: Publicado diretamente no **GitHub Pages** (site 100% estático).
- **Planilha Automática em Tempo Real**: Cada confirmação vai direto para o seu Google Sheets no Google Drive.
- **Exportação Excel**: Baixe o arquivo `.xlsx` pelo painel `/adm` ou direto do Google Drive.

---

## 📋 Passo a Passo para Configurar o Backend Gratuito (Google Sheets)

Leva menos de 2 minutos:

1. Acesse [Google Planilhas](https://sheets.new) e crie uma nova planilha (ex: `Confirmações Casamento`).
2. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
3. Apague o código padrão que aparece e cole todo o conteúdo do arquivo [`google-apps-script/Code.gs`](./google-apps-script/Code.gs).
4. Clique no ícone de disquete (**Salvar**).
5. Clique no botão azul superior: **Implantar** > **Nova implantação**.
6. No ícone de engrenagem à esquerda, selecione **App da Web** (Web App).
7. Preencha as configurações:
   - **Descrição**: `API Casamento`
   - **Executar como**: `Eu (seu email do Google)`
   - **Quem tem acesso**: `Qualquer pessoa` *(ESSENCIAL para que os convidados consigam registrar presença)*.
8. Clique em **Implantar** e autorize o acesso com sua conta Google.
9. Copie a **URL do App da Web** gerada (termina com `/exec`).
10. Cole a URL no seu arquivo `.env.local`:
    ```env
    NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
    NEXT_PUBLIC_ADMIN_PASSWORD=admin123
    ```

---

## 🚀 Como Testar Localmente

1. Instale as dependências:
   ```powershell
   npm install
   ```

2. Inicie o servidor:
   ```powershell
   npm run dev
   ```

3. Abra no navegador:
   - **Link do Convidado**: `http://localhost:3000/convite/familia-silva` (ou `http://localhost:3000/convite?id=familia-silva`)
   - **Painel do Organizador**: `http://localhost:3000/adm` (Senha padrão: `admin123`)

---

## 🌐 Como Hospedar no GitHub Pages

O projeto já está com o workflow de deploy automático configurado em [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

1. Crie um repositório no seu GitHub.
2. Se o repositório se chamar, por exemplo, `meu-casamento`, defina a variável no `.env.local` antes do build ou use as secrets do GitHub:
   - `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`: sua URL do Apps Script
   - `NEXT_PUBLIC_ADMIN_PASSWORD`: sua senha para o painel `/adm`
   - `NEXT_PUBLIC_BASE_PATH`: `/meu-casamento` (ou deixe vazio se usar domínio personalizado)
3. Suba o código para o GitHub:
   ```powershell
   git init
   git add .
   git commit -m "feat: site de confirmacao de presenca"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
4. No seu repositório no GitHub, vá em **Settings** > **Pages**:
   - Em **Build and deployment > Source**, selecione **GitHub Actions**.
5. O GitHub publicará seu site automaticamente e gerará o link oficial!
