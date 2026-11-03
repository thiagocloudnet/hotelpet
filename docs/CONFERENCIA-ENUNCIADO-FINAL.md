# Conferência do trabalho final — Hotel Pet

Base: enunciado da disciplina Programação Web II (2026.2), fornecido pelo aluno na conversa. Entrega: 04/11/2026 às 23h59.

Versão de entrega: `web-ii/hotelpet-final`.

| Exigência | Implementação |
| --- | --- |
| HTML, CSS e JavaScript sem bibliotecas ou frameworks | Páginas e scripts locais; Playwright é usado apenas nos testes de desenvolvimento. |
| Navegação | Menu, listagens, cadastro, edição e detalhes com identificação do registro na URL. |
| Buscas | Filtros das tabelas e busca global com sugestões. |
| Edição das tabelas | Formulários atualizam o mesmo ID e refletem alterações nas listagens. |
| Visão do gerente | Gerenciamento de usuários, pets, reservas e configurações. |
| Alterar função de usuário | Cliente, Funcionário e Gerente no formulário de edição. |
| Editar reservas finalizadas | Formulário permite editar reserva com status Finalizada. |
| Configurar diárias e vagas | Tela de configurações com validação e gravação local. |
| Sem backend | Dados de demonstração e persistência por localStorage do navegador. |

## Correções na revisão final

- O caminho da página de detalhes passa a mostrar o nome do registro aberto, eliminando o nome fixo Beatriz Oliveira.
- Ações de mudar status e remover passam a funcionar nos detalhes. Remoção exige confirmação e respeita vínculos entre responsável, pet e reserva.
- A edição mantém IDs, evita duplicação e atualiza os nomes vinculados.

## Verificação e limites

`tests/verificar-edicao.cjs` verifica edição, persistência após recarregar, vínculos, identificação inválida, caminho da página, status, remoção de registro de teste, mudança de função, reserva finalizada e configurações.

`tests/verificar-web-ii.cjs` verifica os fluxos e a apresentação em diferentes larguras. Os testes usam dados isolados, sem alterar os cadastros do navegador do aluno.

A correspondência visual integral com o Figma/PDF não foi certificada nesta revisão. A análise de requisitos usa o enunciado colado na conversa.

## Conferência externa antes da entrega

- Publicar a versão final no repositório público e conferir o link de acesso.
- Conferir nome e link na planilha da turma.
- Conferir no GitHub o histórico das entregas de navegação (21/10), buscas (28/10) e tabelas (04/11). O histórico e os prazos também fazem parte da avaliação.

Essas três verificações externas não foram confirmadas nesta revisão. Recibos, contratos e acompanhamento de saúde são complementos; o enunciado colado destaca navegação, buscas, edição e permissões do gerente.
