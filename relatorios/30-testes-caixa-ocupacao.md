# Testes de caixa, valores e ocupação

03/11/2026 — 30 de 30 aprovados.

26 casos de lógica executados diretamente nas regras usadas pelo site e 4 casos de integração no navegador isolado. Os cadastros do navegador do usuário não foram alterados.

| Nº | Verificação | Resultado |
| --- | --- | --- |
| 1 | Conversão de reais para centavos | Aprovado |
| 2 | Arredondamento decimal sem diferença de ponto flutuante | Aprovado |
| 3 | Valores negativos são rejeitados | Aprovado |
| 4 | Valor ausente ou infinito é rejeitado | Aprovado |
| 5 | Data impossível não gera diárias | Aprovado |
| 6 | Ano bissexto aceita 29 de fevereiro | Aprovado |
| 7 | Período de dois dias gera duas diárias | Aprovado |
| 8 | Datas iguais não geram cobrança | Aprovado |
| 9 | Datas invertidas não geram valor negativo | Aprovado |
| 10 | Total respeita centavos e número de diárias | Aprovado |
| 11 | Diária gratuita é preservada | Aprovado |
| 12 | Tarifa contratada não muda com configuração | Aprovado |
| 13 | Reserva sem tarifa usa peso do animal | Aprovado |
| 14 | Ocupação inclui saída hoje antes de meio-dia | Aprovado |
| 15 | Ocupação libera vaga exatamente às 12:00 | Aprovado |
| 16 | Ocupação respeita horário contratado 13:30 | Aprovado |
| 17 | Reserva pendente não conta como hospedagem em andamento | Aprovado |
| 18 | Mesmo animal com reservas sobrepostas ocupa uma vaga | Aprovado |
| 19 | Entrada futura não ocupa vaga hoje | Aprovado |
| 20 | Reservas finalizadas e canceladas não ocupam vagas | Aprovado |
| 21 | Valor previsto não é confundido com recebimento | Aprovado |
| 22 | Recebimento parcial calcula saldo devedor | Aprovado |
| 23 | Recebimento de outra data não entra no caixa do dia | Aprovado |
| 24 | Excedente gera crédito sem saldo negativo | Aprovado |
| 25 | Fechamento registra diferença em centavos | Aprovado |
| 26 | Fechamento duplicado e data futura são bloqueados | Aprovado |
| 27 | Orçamento não sobrescreve recebimento salvo | Aprovado |
| 28 | Fechamento salva total e impede duplicação na interface | Aprovado |
| 29 | Recibo de caixa fechado não pode ter valor alterado | Aprovado |
| 30 | Falha ao salvar fechamento preserva histórico e funciona no celular | Aprovado |
