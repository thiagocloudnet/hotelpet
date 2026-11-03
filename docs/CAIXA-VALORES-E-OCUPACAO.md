# Caixa, valores e ocupação — análise lógica

03/11/2026. Alterações locais na versão final.

## Melhorias aplicadas

- Regras financeiras centralizadas em financeiro-regras.js, sem bibliotecas. Os valores são calculados em centavos inteiros. Listagem, resumo, orçamento e documentos utilizam o total da mesma regra.
- Ocupação considera o horário de saída guardado na reserva, em Brasília, com padrão de 12:00. No dia da saída, antes desse horário, a vaga permanece ocupada no cálculo; a partir dele, é liberada. É uma ocupação calculada por período e situação, não uma leitura física da retirada do animal.
- Reservas pendentes, finalizadas, canceladas, futuras ou com datas inválidas não contam como estadias em andamento no momento consultado. Reservas sobrepostas do mesmo animal não duplicam sua vaga. Isso não substitui uma validação de disponibilidade para novas reservas.
- Configurações e painel usam a mesma regra de ocupação. Vagas disponíveis não ficam negativas na apresentação.
- Preparar orçamento, contrato ou ficha não sobrescreve mais o pagamento registrado no recibo. Falha de gravação restaura os dados anteriores do documento.
- Painel inclui Fechamento de caixa com data, recebido na data, totais por forma de pagamento, previsão global, saldo pendente, créditos e valor conferido em todos os meios. Previsão e saldo são do conjunto atual de reservas não canceladas, não o faturamento específico do dia.
- O fechamento guarda uma cópia dos recebimentos, seus códigos de reserva e responsável, o valor conferido e a diferença. Não permite duplicar a mesma data nem fechar data futura. Falha ao salvar não acrescenta fechamento ao histórico.
- Um recebimento que pertença a uma data fechada não pode ser alterado pelo formulário do recibo. A visualização com os mesmos dados continua permitida. O histórico de fechamento preserva a cópia dos valores.

## Limites do modelo atual

O cadastro de documentos mantém um único recebimento informado por reserva. Não há histórico de parcelas, despesas, retiradas, estornos ou saldo de abertura. O valor conferido representa a conferência de todos os meios de pagamento, não apenas dinheiro físico. Portanto, a diferença é valor conferido menos recebimentos informados; não é um cálculo contábil de saldo bancário ou gaveta física. Recibos já existentes com valor, data e forma válidos entram nesse resumo. Orçamentos antigos que tenham gravado esses mesmos campos não têm marca histórica que permita distingui-los automaticamente; revisar esses dados antes do primeiro fechamento.

Os dados permanecem neste navegador e não são compartilhados entre computadores. Não há conciliação bancária, controle de servidor nem impedimento de alteração manual do armazenamento. A ocupação segue o período reservado: retirar o animal depois do horário previsto exige registrar a alteração da reserva; cobrança automática por atraso não foi acrescentada. Para evolução futura: parcelas e estornos com histórico, despesas, abertura de caixa e validação de conflitos e capacidade ao reservar.

## Testes

30 de 30 aprovados: 26 casos de regras e 4 casos de integração com navegador isolado, incluindo armazenamento indisponível e tela de 320 pixels. Lista completa em relatorios/30-testes-caixa-ocupacao.md e resultado em relatorios/30-testes-caixa-ocupacao.json. Auditoria de 52 páginas e 32 scripts sem erros ou avisos. Pacote estático preparado com 256 arquivos públicos e 92 páginas contando as etapas históricas, sem referências locais ausentes. Ainda não publicado no GitHub.

Proteção adicional: reservas com recebimento informado não podem ser excluídas, individualmente nem por seleção coletiva, para preservar o vínculo do histórico financeiro. O último caso de integração também verificou esse bloqueio. A revisão ampla do navegador passou em 14 grupos e 96 telas antes dessa proteção adicional; os 30 casos foram repetidos após ela.

