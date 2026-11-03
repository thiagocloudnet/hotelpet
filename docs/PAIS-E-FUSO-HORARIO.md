# País e fuso horário do hotel

Em Configurações, país e fuso são salvos junto às diárias, capacidade e horário de saída na chave local hotelPetShop.final.settings. Instalações antigas assumem Brasil e Brasília; dados regionais inválidos também retornam a esse padrão.

O módulo js/fuso-horario.js centraliza a leitura, os rótulos em português e a validação dos pares país/fuso. Há opções cadastradas para Brasil, Portugal, Angola, Moçambique, Cabo Verde, Argentina, Uruguai, Estados Unidos e Japão. A lista é uma seleção de locais, não uma relação mundial completa. O país filtra os fusos disponíveis; não converte moeda, idioma nem preços. Os valores continuam em reais.

Relógio, dia operacional, ocupação, conferência de entrada, recibos, documentos e horários reais nos relatórios usam o fuso selecionado. Identificadores IANA são interpretados pela API nativa Intl.DateTimeFormat, sem biblioteca. Os registros de movimento continuam em ISO/UTC; a apresentação é convertida. Datas puras de reserva permanecem datas de calendário, sem conversão para outro dia. As diárias contratadas e datas existentes não são reescritas.

Alterar o fuso é mudar a configuração operacional do hotel: a interpretação do encerramento local e a apresentação de movimentos históricos passam a usar o novo fuso. O padrão continua 12:00, em formato de 24 horas. Não há ajuste automático de cobrança. A restauração JSON valida país e fuso quando presentes; cópias antigas sem esses campos são aceitas.

O anexo recebido em 03/11/2026 estava vazio (zero bytes); a revisão foi feita sobre o código local. Referência técnica: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat.

Testes: tests/verificar-fuso-configuravel.cjs verifica seleção, persistência, fuso diferente do computador, preservação dos registros, validação, meio-dia local e tela de 320 pixels. Regressões adicionais: entrada/saída, arquivos/relatórios e 30 testes de caixa.
