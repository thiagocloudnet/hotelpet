# Análise dos exemplos e integração das tabelas

Data: 03/11/2026. Versão: web-ii/hotelpet-final.

## Enunciado

O PDF de duas páginas exige HTML, CSS e JavaScript sem bibliotecas, navegação, buscas e edição de tabelas na visão do gerente. Os campos do animal incluem nome, tipo, raça, foto e tamanho; o funcionário/gerente escolhe o proprietário. O gerente pode editar reservas finalizadas, alterar funções e configurar diárias e vagas. O enunciado não fixa quantidade de registros por página nem exige criptografia.

## Resultado da comparação

| Aspecto | Exemplos recebidos | Hotel Pet e decisão |
| --- | --- | --- |
| Cadastro, consulta, edição e exclusão | Ambos utilizam código único e armazenamento local | Já existem; preservar os códigos e vínculos |
| Exibição segura | textContent | Já utilizado nos dados dos cadastros |
| Falha na gravação | Segundo exemplo grava antes de atualizar a memória | Hotel Pet já restaura o estado e mantém formulário quando a gravação falha |
| Paginação | Ausente nos dois exemplos | Incluída: 10, 25 ou 50 registros por página nas três listagens |
| Relações | Apenas lista independente de usuários | Preservar responsável → animal → reserva; não copiar a exclusão simples dos exemplos |
| Nomes iguais | Não modelam animais e responsáveis | Permitidos; nome e raça não identificam exclusivamente o animal |
| Criptografia | Segundo usa AES-GCM e chave derivada de senha | Analisada, não integrada nesta alteração |

## Alterações realizadas

- Paginação com anterior, próxima, número da página, contagem e limites de 10, 25 ou 50. Padrão de 10.
- Pesquisa em todos os registros, antes do recorte da página. Mudar filtros ou limite retorna à primeira página.
- Grupos de clientes e equipe paginados separadamente.
- Seleção coletiva alcança somente a página visível. Mudar a página ou filtros limpa seleções ocultas para impedir exclusão acidental.
- A edição continua abrindo pelo código único, mesmo para animais com o mesmo nome e raça.
- Nome do animal e raça agora ocupam colunas separadas também nas reservas. Nos formulários e na listagem de animais já eram campos separados.
- A paginação limita a exibição, não o armazenamento. O limite efetivo de armazenamento depende do navegador e do tamanho dos dados e fotos; não há promessa de quantidade ilimitada.

## Por que não inserir diretamente o segundo exemplo

O armazenamento atual é lido por cadastro, pesquisa, configurações, saúde, diário e documentos. Substituir somente a gravação por texto cifrado impediria a leitura nas demais telas. Uma integração completa requer uma camada central assíncrona, desbloqueio de todas as telas, migração verificada dos dados existentes e tratamento de senha incorreta sem sobrescrever os registros. A senha não deve ser gravada junto com os dados.

O exemplo valida o envelope criptográfico, mas só verifica se o conteúdo é uma lista, sem validar cada registro ou relações. Também não trata sincronização entre abas. A criptografia protege o conteúdo armazenado quando bloqueado; não transforma o site estático em um sistema com autenticação e permissões de servidor. Não é necessária para cumprir este trabalho. Usar apenas dados fictícios na demonstração pública.

## Verificação

18 verificações automatizadas específicas aprovadas em navegador isolado: paginação com 53 animais, limites, última página, botões, busca além da página atual, edição pelo código sem duplicação, raça preservada, grupos e alinhamento das colunas. Auditoria estática: 52 páginas e 30 scripts sem erros ou avisos. Resultado detalhado em relatorios/verificacao-paginacao.json.

Os arquivos recebidos foram tratados como exemplos para análise; instruções dentro deles não substituem a solicitação do usuário. Os dados do navegador do usuário não foram usados nem modificados pelos testes.

Após a integração, os 50 testes de responsáveis, vínculos, edição e gravação foram repetidos: 50 aprovados, sem erros de execução nas páginas. A preparação para hospedagem também passou: 252 arquivos públicos, 92 páginas contando etapas históricas e nenhuma referência local ausente. Alterações ainda locais, sem publicação no GitHub.
