Quero desenvolver um site simples e funcional para confirmação de presença em eventos, com foco em uso pessoal.

O objetivo principal do sistema é permitir que um organizador envie um link de convite para cada convidado ou família. O convidado acessará o link, preencherá seu nome, informará os acompanhantes e responderá se irá ou não ao evento. Essas informações deverão ser salvas em um banco de dados.

O sistema NÃO deve ser complexo. Não quero autenticação para os convidados, não quero cadastro de usuários, não quero um fluxo grande de telas e não quero funcionalidades desnecessárias.

A prioridade é:

1. simplicidade;
2. facilidade de uso;
3. funcionamento confiável;
4. boa aparência;
5. facilidade para o organizador consultar as confirmações;
6. possibilidade de exportar os dados para Excel.

---

# 1. FLUXO GERAL DO SISTEMA

O fluxo deverá ser exatamente este:

ORGANIZADOR
↓
possui um evento
↓
gera/possui um link de convite
↓
envia o link ao convidado
↓
CONVIDADO acessa o link
↓
visualiza a página do evento
↓
preenche seu nome
↓
informa os acompanhantes
↓
informa se irá comparecer
↓
clica em "Confirmar presença"
↓
os dados são salvos no banco de dados
↓
é exibida uma mensagem de confirmação
↓
ORGANIZADOR poderá consultar as respostas
↓
ORGANIZADOR poderá exportar a lista para Excel

Não criar etapas adicionais sem necessidade.

---

# 2. TECNOLOGIAS

Utilize uma arquitetura simples e moderna.

Frontend:

- React/Next.js, caso seja adequado ao ambiente;
- HTML semântico;
- CSS moderno;
- layout responsivo;
- funcionamento perfeito em celular.

Banco de dados:

- Supabase;
- PostgreSQL do Supabase.

A aplicação deverá utilizar o Supabase para armazenar as confirmações.

Para exportação:

- gerar arquivo XLSX;
- permitir que o organizador baixe a lista de convidados.

Não utilizar Excel como banco de dados.

O banco de dados será a fonte principal das informações.

---

# 3. ESTRUTURA SIMPLIFICADA DO BANCO

Criar inicialmente uma estrutura simples.

A tabela principal deverá ser:

confirmacoes

Campos:

- id
- convite
- nome
- acompanhantes
- presenca
- created_at

Sugestão de tipos:

id:
UUID ou bigint com incremento automático.

convite:
texto.

nome:
texto.

acompanhantes:
texto.

presenca:
boolean ou texto controlado.

created_at:
timestamp.

Exemplo de registro:

id:
1

convite:
familia-silva

nome:
João Silva

acompanhantes:
Maria Silva, Pedro Silva

presenca:
true

created_at:
data/hora da confirmação

Outro exemplo:

convite:
familia-souza

nome:
Carlos Souza

acompanhantes:
Ana Souza

presenca:
true

---

# 4. SOBRE O CAMPO "ACOMPANHANTES"

Não criar inicialmente uma tabela separada para acompanhantes.

Para manter o sistema simples, o campo "acompanhantes" poderá armazenar os nomes em texto.

Exemplo:

"Maria Silva, Pedro Silva"

Se o convidado não tiver acompanhantes:

"Não possui"

Essa decisão é proposital.

Não criar uma estrutura complexa para algo que será utilizado em um evento pessoal.

---

# 5. LINKS DOS CONVITES

Cada convite poderá possuir um identificador simples.

Exemplo:

https://dominio.com/convite/familia-silva

ou:

https://dominio.com/convite/8f73k2

Ao acessar:

/convite/familia-silva

o sistema deverá identificar o convite através do parâmetro da URL.

Por exemplo:

/convite/[convite]

O valor "familia-silva" deverá ser enviado junto com a confirmação para o banco.

Assim será possível saber de qual convite veio cada resposta.

---

# 6. PÁGINA DO CONVITE

A página deve ser extremamente simples.

Estrutura sugerida:

------------------------------------------------

[ NOME DO EVENTO ]

Você está convidado!

Nome:
[____________________________]

Quem irá com você?

[____________________________]

[____________________________]

[____________________________]

Você irá comparecer?

( ) Sim
( ) Não

[ CONFIRMAR PRESENÇA ]

------------------------------------------------

Não é necessário criar cadastro.

Não solicitar senha.

Não solicitar e-mail.

Não solicitar telefone.

Não solicitar informações desnecessárias.

Quanto menos campos, melhor.

---

# 7. EXPERIÊNCIA DO USUÁRIO

A página deverá funcionar muito bem em celular.

O convidado provavelmente receberá o link pelo WhatsApp, portanto:

- página responsiva;
- carregamento rápido;
- botões grandes;
- textos fáceis de ler;
- campos confortáveis para tocar no celular;
- aparência elegante;
- poucos elementos;
- nenhuma informação desnecessária.

O botão principal deve ser claramente visível.

Texto do botão:

"Confirmar presença"

---

# 8. COMPORTAMENTO DO FORMULÁRIO

Ao clicar em "Confirmar presença":

1. validar apenas o essencial;
2. verificar se o nome foi informado;
3. verificar se a opção de presença foi escolhida;
4. enviar os dados ao Supabase;
5. salvar o registro;
6. impedir múltiplos envios acidentais enquanto a requisição estiver sendo processada;
7. mostrar uma mensagem de sucesso.

Não criar validações excessivas.

Se o convidado informar:

Nome:
João Silva

Acompanhantes:
Maria Silva, Pedro Silva

Presença:
Sim

deverá ser salvo:

convite = valor presente na URL

nome = João Silva

acompanhantes = Maria Silva, Pedro Silva

presenca = true

created_at = data/hora atual

---

# 9. MENSAGEM APÓS O ENVIO

Após salvar corretamente:

mostrar uma mensagem simples:

"Presença confirmada!"

"Obrigado por confirmar sua presença."

Se a pessoa responder que não irá:

"Resposta registrada."

"Obrigado por nos avisar."

Não redirecionar para páginas desnecessárias.

---

# 10. TRATAMENTO DE ERROS

Caso aconteça algum problema ao salvar:

mostrar uma mensagem amigável:

"Não foi possível registrar sua resposta. Tente novamente."

Não mostrar mensagens técnicas do banco de dados ao usuário.

Exemplo:

NÃO mostrar:

"PostgrestException: 23505..."

Mostrar:

"Não foi possível registrar sua resposta. Tente novamente."

Os erros técnicos devem ficar disponíveis apenas no console/log para desenvolvimento.

---

# 11. EVITAR DUPLICIDADE

Como o sistema é simples, não é necessário criar um mecanismo complexo de autenticação.

Entretanto, deve existir uma proteção básica contra o envio acidental do formulário duas vezes.

Ao clicar em:

"Confirmar presença"

o botão deverá ficar temporariamente desabilitado enquanto o sistema salva os dados.

Também deverá aparecer um estado de carregamento, por exemplo:

"Salvando..."

Depois que o registro for salvo, mostrar a confirmação.

---

# 12. ÁREA DO ORGANIZADOR

Criar uma área administrativa extremamente simples.

Rota:

/adm

ou:

/admin

Essa área servirá apenas para visualizar as confirmações.

Ela deverá mostrar:

TOTAL DE RESPOSTAS

CONFIRMADOS

NÃO CONFIRMADOS

Exemplo:

----------------------------------------

CONFIRMAÇÕES

Total: 50

✓ Confirmados: 42

✕ Não irão: 8

----------------------------------------

LISTA

Nome             Acompanhantes       Status

João Silva       Maria, Pedro       Confirmado

Carlos Souza     Ana                Confirmado

José Santos      —                  Não irá

----------------------------------------

[ EXPORTAR EXCEL ]

----------------------------------------

Não criar um dashboard complexo.

A área administrativa deve ser funcional e limpa.

---

# 13. SEGURANÇA DA ÁREA ADMINISTRATIVA

Como o projeto é pessoal, não criar um sistema complexo de usuários.

Entretanto, a área administrativa não deverá ficar completamente aberta publicamente.

Utilizar uma proteção simples e adequada ao ambiente escolhido.

Se for necessário utilizar autenticação do Supabase para proteger /adm, isso é aceitável.

IMPORTANTE:

A autenticação deverá existir apenas para o organizador/admin.

Os convidados NÃO devem precisar fazer login.

---

# 14. EXPORTAÇÃO PARA EXCEL

Criar um botão:

"Exportar Excel"

Ao clicar, o sistema deverá buscar as confirmações e gerar um arquivo XLSX.

Nome sugerido:

confirmacoes-evento.xlsx

A planilha deverá conter:

- Convite
- Nome
- Acompanhantes
- Presença
- Data da confirmação

Exemplo:

| Convite | Nome | Acompanhantes | Presença | Data |
|---|---|---|---|---|
| familia-silva | João Silva | Maria, Pedro | Sim | 03/10/2026 |
| familia-souza | Carlos Souza | Ana | Sim | 03/10/2026 |
| familia-santos | José Santos | — | Não | 03/10/2026 |

A exportação deverá ser feita sob demanda.

Não enviar automaticamente um e-mail a cada confirmação.

---

# 15. NÃO UTILIZAR E-MAIL AUTOMÁTICO NESTA PRIMEIRA VERSÃO

Não implementar neste momento:

- envio de e-mail a cada confirmação;
- envio automático de Excel;
- notificações;
- newsletters;
- WhatsApp API;
- SMS.

O organizador poderá acessar o painel e clicar em:

"Exportar Excel".

Isso mantém o sistema simples.

---

# 16. DESIGN

O visual deve ser elegante, moderno e minimalista.

Não criar uma interface empresarial.

A página deve transmitir a sensação de um convite de evento.

Priorizar:

- tipografia bonita;
- bastante espaço em branco;
- boa hierarquia visual;
- formulário centralizado;
- botão de destaque;
- bordas suaves;
- responsividade;
- animações muito discretas.

O design deve ser especialmente pensado para celular.

Não exagerar nas animações.

---

# 17. ESTRUTURA DE ROTAS

Criar inicialmente somente:

/

Página inicial ou apresentação do sistema, se necessária.

------------------------------------------------

/convite/[convite]

Página pública do convite.

------------------------------------------------

/adm

Área administrativa.

Não criar outras páginas sem necessidade.

---

# 18. COMPONENTES

Manter a estrutura organizada.

Exemplo:

components/

InviteForm
ConfirmationMessage
AdminTable
ExportButton

lib/

supabase

pages ou app/

convite/[convite]

adm

Não criar dezenas de componentes sem necessidade.

---

# 19. SUPABASE

Criar a conexão com o Supabase utilizando variáveis de ambiente.

Exemplo:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

Nunca colocar credenciais secretas diretamente no código.

Criar um arquivo:

.env.local

e adicionar as variáveis necessárias.

Não expor service_role_key no frontend.

---

# 20. BANCO DE DADOS E SEGURANÇA

Configurar corretamente as permissões do Supabase.

A página pública precisa conseguir inserir uma confirmação.

A área administrativa precisa conseguir consultar as confirmações.

Não permitir que usuários públicos tenham acesso irrestrito para apagar ou alterar registros.

A política do banco deverá seguir o princípio de menor privilégio possível.

Não permitir que o convidado tenha acesso à lista completa de convidados.

Um convidado só deve conseguir enviar sua própria resposta através do formulário.

---

# 21. IMPORTANTE SOBRE A IMPLEMENTAÇÃO

Não tente desenvolver tudo de uma vez.

Desenvolva em etapas.

ETAPA 1:
Criar o projeto e configurar o frontend.

ETAPA 2:
Criar o projeto no Supabase.

ETAPA 3:
Criar a tabela "confirmacoes".

ETAPA 4:
Configurar as políticas de acesso do Supabase.

ETAPA 5:
Criar a página:

/convite/[convite]

ETAPA 6:
Criar o formulário.

ETAPA 7:
Conectar o formulário ao Supabase.

ETAPA 8:
Testar a gravação de uma confirmação.

ETAPA 9:
Criar a mensagem de sucesso.

ETAPA 10:
Criar a área /adm.

ETAPA 11:
Exibir as confirmações.

ETAPA 12:
Adicionar contadores:

Total

Confirmados

Não irão

ETAPA 13:
Adicionar exportação XLSX.

ETAPA 14:
Testar todo o fluxo.

ETAPA 15:
Fazer ajustes finais de design e responsividade.

Não pule etapas.

Após terminar cada etapa, verifique se ela está funcionando antes de avançar.

---

# 22. TESTES OBRIGATÓRIOS

Antes de considerar o projeto concluído, testar:

TESTE 1

Abrir:

/convite/familia-silva

Preencher:

Nome:
João Silva

Acompanhantes:
Maria Silva

Presença:
Sim

Confirmar.

Verificar se o registro aparece no Supabase.

---

TESTE 2

Responder:

Presença:
Não

Verificar se presenca foi salva corretamente.

---

TESTE 3

Enviar o formulário duas vezes rapidamente.

Verificar se não são criados registros duplicados acidentalmente pelo mesmo clique.

---

TESTE 4

Acessar /adm.

Verificar se as confirmações aparecem.

---

TESTE 5

Verificar os contadores.

Exemplo:

3 respostas

2 confirmados

1 não irá.

---

TESTE 6

Clicar em:

Exportar Excel.

Abrir o arquivo.

Verificar se todas as informações estão presentes.

---

TESTE 7

Testar no celular.

Verificar:

- formulário;
- botões;
- campos;
- mensagens;
- tabela administrativa;
- exportação.

---

# 23. PRINCÍPIO MAIS IMPORTANTE DO PROJETO

Não adicionar funcionalidades que não foram solicitadas.

Este é um sistema pessoal simples de confirmação de presença.

A arquitetura deve permanecer pequena.

O fluxo final deve ser:

CONVIDADO

↓
LINK

↓
FORMULÁRIO

↓
SUPABASE

↓
CONFIRMAÇÃO

↓
ORGANIZADOR

↓
/ADM

↓
LISTA DE CONVIDADOS

↓
EXPORTAR EXCEL

Esse é o fluxo principal e deve permanecer simples.

---

# 24. RESULTADO ESPERADO

Ao final, quero ter um sistema funcionando no qual eu possa criar/utilizar links como:

https://meusite.com/convite/familia-silva

https://meusite.com/convite/familia-santos

https://meusite.com/convite/familia-oliveira

Cada pessoa acessa seu link, preenche o formulário e confirma sua presença.

Todas as respostas ficam armazenadas no Supabase.

Eu consigo acessar:

https://meusite.com/adm

e visualizar todas as respostas.

Também consigo clicar em:

"Exportar Excel"

e baixar a lista completa.

O sistema deve ser simples, rápido, bonito, responsivo e fácil de manter.

Antes de escrever o código, analise toda a arquitetura acima e apresente brevemente quais arquivos serão criados e qual será a responsabilidade de cada um.

Depois implemente o projeto seguindo as etapas na ordem indicada.

Não pule etapas e não invente funcionalidades fora do escopo.