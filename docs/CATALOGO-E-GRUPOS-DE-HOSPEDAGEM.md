# Catálogo e grupos de hospedagem

## Alimentação e documentação ambiental — atualização de 03/11/2026

O catálogo passou a 529 referências, incluindo 12 opções de coelhos. As 403 fotos aprovadas permanecem; 126 referências ainda precisam de fotografia correspondente com autoria e licença verificadas. Não se declara cobertura fotográfica completa. As oito novas referências de coelhos foram conferidas na ARBA: https://arba.net/recognized-breeds/.

js/alimentacao-catalogo.js fornece textos educativos e fontes por espécie, com distinções para porquinho-da-índia, chinchila, degu, iguana-verde, gecko-leopardo e jabuti. Não define quantidade ou prescrição por raça: a dieta efetiva pertence à ficha do animal, considerando idade, saúde e orientação veterinária. As demais raças da mesma espécie compartilham a referência geral de alimentação. Aves e jabutis com identificação genérica precisam de confirmação da espécie.

A seção de documentação ambiental em racas.html distingue guarda de animal de estimação, criação/reprodução/comércio e regularidade do hotel. Nota fiscal, certificado de origem e identificação quando exigida devem corresponder ao animal e proprietário. Não há licença genérica válida para qualquer réptil. O enquadramento do hotel na Bahia deve ser confirmado com o Inema; a interface não emite nem valida autorizações. Consulta: https://www.gov.br/ibama/pt-br/servicos/sistemas/sisfauna e https://www.ba.gov.br/inema/atende/formularios/fauna.

Referências de alimentação: Manual Veterinário Merck (nutrição de pequenos animais, aves e répteis), UC Davis (pequenos mamíferos herbívoros) e VCA (alimentação de roedores). Cada cartão apresenta o link específico. Foram aprovadas 12 verificações adicionais em tests/verificar-alimentacao-catalogo.cjs, além da regressão do catálogo.

## Organização adotada

O catálogo consulta as raças de cães e gatos e identifica as espécies ou variedades dos demais animais. Os grupos disponíveis seguem os tipos já existentes no cadastro: Cachorro, Gato, Roedor, Coelho, Ave e Réptil. A inclusão de uma referência não substitui a avaliação das condições de hospedagem do animal, nem autoriza colocar espécies diferentes no mesmo recinto.

Para cães há os grupos FCI e um grupo separado de outras raças documentadas. Para gatos, o catálogo reúne referências CFA, TICA e FIFe, preservando diferenças entre raças e variedades. São opções de cadastro, não uma declaração de que todas as entidades reconhecem todas as opções da mesma forma.

Os roedores estão separados em hamsters, porquinhos-da-índia, chinchilas, gerbos, ratos e camundongos e degus. Hamsters incluem sírio, anão russo, Campbell, Roborovski e chinês. Nesses casos o campo identifica espécie ou variedade, não trata todos como raças caninas. Coelhos são lagomorfos e têm seu próprio grupo. Aves e répteis também permanecem separados.

## Porte e hospedagem

O peso informado determina a faixa já utilizada pelo hotel: pequeno até 10 kg; médio acima de 10 até 25 kg; grande acima de 25 kg. Isso é uma regra comercial do projeto. Não é um padrão veterinário universal nem determina sozinho o espaço de alojamento de cada espécie.

O catálogo permite calcular o porte pelo peso, sem atribuir um peso fictício à raça. O cadastro agora aceita precisão de gramas: 0,050 kg representa 50 g, corrigindo a limitação anterior que rejeitava animais abaixo de 100 g. Peso zero e negativo continuam inválidos.

## Fotos e imagem explicativa

As fotos de referência ficam em imagens/racas, com autor, licença e página de origem informados no catálogo. Não substituem a foto do animal cadastrado e não alteram a ficha do hóspede. SRD continua disponível para cães e gatos; não há aparência única que represente todos os animais SRD. Uma foto indisponível é identificada, sem impedir o cadastro.

O mapa ilustrado em imagens/catalogo-grupos-hospedagem.png foi gerado para explicar os seis grupos, o porte por peso e o fluxo proprietário → animal → reserva → entrada → cuidados → saída. Não é uma fotografia de raça ou do hóspede. A página racas.html possui pesquisa, filtro de grupos e 24 opções por página, além da prévia no formulário do animal.

## Entrada e saída efetivas

Dentro da reserva, “Registrar entrada” exige as três conferências de entrada e uma data no período reservado. Grava o instante real e muda a situação para Em andamento. “Registrar saída” exige entrada prévia, devolução dos pertences e entrega autorizada; grava o instante e muda para Finalizada. A saída real não modifica automaticamente as datas ou o valor contratado. Não calcula multa ou diária adicional automaticamente.

Os horários são exibidos em Brasília, no formato de 24 horas. A cópia completa em JSON inclui essas movimentações. O relatório CSV de reservas distingue datas previstas e momentos reais. O armazenamento continua local, sem banco de dados, sincronização ou autenticação individual.

## Referências

- FCI: https://www.fci.be/en/nomenclature/Default.aspx
- CFA: https://cfa.org/breeds/
- TICA: https://tica.org/ticas-breeds/browse-all-breeds/
- FIFe: https://fifeweb.org/cats/breeds/
- Imagens caninas e créditos por fotografia: https://dogapi.dog/docs/api-v2
- Identificação dos grupos de roedores: https://www.merckvetmanual.com/exotic-and-laboratory-animals/rodents/rodents
- Coelhos como lagomorfos: https://www.si.edu/stories/five-rabbit-facts

As consultas e a coleta são ferramentas de preparação. O site funciona com os arquivos estáticos locais, sem chamadas a APIs ao navegar pelo catálogo.

## Verificações

Os testes estão em tests/verificar-catalogo-hospedagem.cjs e tests/verificar-entrada-saida.cjs. Os relatórios em relatorios registram resultados e eventuais imagens ainda indisponíveis. Não houve publicação nesta revisão.
