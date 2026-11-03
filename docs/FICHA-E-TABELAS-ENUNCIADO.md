# Apresentação da ficha e conferência das tabelas

03/11/2026 — versão final local.

## Leitura das informações

A ficha de cuidados da reserva apresenta oito pares de rótulo e valor em uma lista descritiva HTML. Os rótulos aparecem em negrito, com separadores discretos; os valores permanecem em peso normal. Campos vazios mostram Não informado em tom secundário. São duas colunas no computador e uma no celular. Textos longos e quebras de linha são preservados sem interpretar o conteúdo como HTML.

Documentos preparados apresentam rótulos em negrito e separadores nos títulos de condições e cuidados. O mesmo desenho de conteúdo é usado na prévia e na impressão. A aparência final da impressão depende das opções da impressora/navegador; não foi emitido um documento fiscal.

## Tabelas e requisitos do enunciado

O PDF solicita navegação, buscas e edição das tabelas em JavaScript puro, na visão do gerente. Não exige colocar a ficha de cuidados em uma tabela: rótulo e descrição são mais adequados para essas informações extensas.

| Tela | Dados e operações disponíveis | Conferência |
| --- | --- | --- |
| Usuários | Nome, último sobrenome, e-mail, função, situação, cadastro; filtros, edição por código e mudança de função | Colunas e paginação conferidas nesta revisão; edição e vínculos cobertos pelas verificações anteriores |
| Animais | Nome, tipo, raça, peso, porte e responsável; filtros, cadastro, edição e detalhes | Nome e raça separados; códigos e responsável distinguem nomes iguais |
| Reservas | Número, nome do animal, raça, cliente, entrada, saída e horário, diárias, situação e total; filtros, edição e detalhes | Colunas alinhadas, paginação e valores preservados; edição de finalizadas já testada |
| Histórico do animal | Reserva, entrada, saída, situação, total previsto e link para detalhes | Acrescentado nesta revisão; busca exclusivamente pelo código do animal |
| Configurações | Preços, capacidade e horário de saída | Faz parte da visão do gerente; não precisa ser uma tabela |

As três listagens principais possuem opções de 10, 25 e 50 registros por página. O histórico do animal apresenta todas as suas reservas ordenadas da entrada mais recente para a mais antiga, com rolagem horizontal em telas estreitas. Não confundir esse histórico com a paginação das listagens principais.

## Limites da conferência

A correspondência visual integral com o protótipo Figma não foi certificada. A avaliação também considera histórico e prazos das entregas no GitHub e o link na planilha da turma; esta alteração local não confirma esses requisitos externos. Nenhuma publicação foi feita nesta revisão.

Testes desta alteração em tests/verificar-ficha-tabelas.cjs; resultado em relatorios/verificacao-ficha-tabelas.json. Testes executados em navegador isolado, sem alterar dados da sessão do usuário.
