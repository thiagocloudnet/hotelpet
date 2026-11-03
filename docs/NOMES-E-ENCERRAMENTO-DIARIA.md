# Nome dos usuários e encerramento da diária

Atualização local em 03/11/2026.

A tabela de usuários apresenta Nome (primeiro nome) e Último sobrenome em colunas separadas. O nome completo original continua no cadastro, na pesquisa e na identificação acessível das células. Cadastros com um só nome apresentam um traço na coluna de sobrenome. Não foram modificados os códigos dos usuários nem seus vínculos.

Configurações contém Encerramento da diária, com horário padrão 12:00, formato de 24 horas e referência ao horário de Brasília. Aceita 00:00 a 23:59. O horário é guardado em cada nova reserva e mostrado na listagem, no formulário, nos detalhes e nos documentos. Alterar a configuração vale para novas reservas; reservas existentes preservam o horário registrado. Reservas antigas sem horário explícito usam 12:00.

Exemplo: entrada em 10/11 e saída em 12/11 corresponde a duas diárias, encerradas às 12:00 do dia 12/11 na configuração padrão. A alteração não cria cobrança automática por atraso: o sistema atual registra datas e não registra o horário real da retirada. Uma cobrança adicional dependeria de regra específica e registro da saída real.

Verificação: 15 verificações específicas aprovadas em navegador isolado, incluindo formato inválido 24:00, gravação e recarga, configuração 13:30 aplicada a nova reserva, preservação do horário ao editar após mudar a configuração, compatibilidade das reservas antigas, nome completo preservado e apresentação em tela de 320 pixels. Auditoria estática passou sem erros ou avisos.

Testes: tests/verificar-horario-nomes.cjs. Resultado: relatorios/verificacao-horario-nomes.json. As configurações e cadastros do navegador do usuário não foram alterados pelos testes. Mudanças ainda não publicadas no GitHub.
