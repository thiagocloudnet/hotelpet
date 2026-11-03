# Revisão final do fluxo responsável, animal e reserva

03/11/2026. Aplicação local, sem banco de dados.

## Regra de vínculo

O cadastro principal é a pessoa responsável. Ela pode ser o tutor ou o cuidador que assume o contato pela hospedagem. Para esse vínculo, é cadastrada como Cliente no módulo de usuários. Não foi criada uma nova função de acesso chamada Cuidador; o funcionário que registra cuidados no diário continua sendo um papel diferente do responsável pelo animal.

Cada animal tem seu próprio código e o código de seu responsável. Cada reserva guarda o código do animal e deriva dele o código do responsável. Não é permitido salvar um animal sem responsável existente nem uma reserva sem animal vinculado a uma pessoa válida. Nomes podem se repetir, inclusive nome e raça juntos.

## Problemas encontrados e corrigidos

1. Sem animais, o formulário de reserva apresentava apenas uma seleção vazia. Agora mostra orientação e um link para cadastrar o responsável ou o animal, conforme a base existente.
2. O caminho iniciado na reserva não retornava automaticamente depois de cadastrar o responsável e o animal. Agora os endereços carregam o contexto e o sistema retorna à reserva com o novo animal e responsável selecionados.
3. Limpar a escolha do animal podia deixar o nome anterior do responsável no campo. Agora o campo é limpo junto.
4. Animais com código de responsável inexistente eram apresentados como opções, embora a gravação fosse bloqueada depois. Agora essas opções não são oferecidas.
5. Quando a reserva é iniciada por um responsável, o endereço não pode pré-selecionar um animal de outro responsável. A gravação também confere a correspondência.

## Fluxo resultante

Reserva sem animais → orientação → cadastro de responsável → cadastro do animal com responsável selecionado → retorno à reserva com animal selecionado → datas e valor → salvar → listagem.

Com responsável já cadastrado, o cadastro da pessoa é dispensado. Com animal já cadastrado, basta selecioná-lo. Um segundo animal com o mesmo nome continua independente se tiver outro código. Dados de saúde pertencem ao animal; diário e documentos pertencem à reserva.

As etapas de cadastro não preservam automaticamente datas e observações que tenham sido digitadas antes de sair do formulário da reserva. O caminho orientado deve ser usado para cadastrar o responsável e o animal antes de preencher o restante da reserva. Também não foi acrescentada nesta correção a validação completa de sobreposição de períodos e capacidade do hotel.

## Verificação

11 verificações de integração aprovadas em navegador isolado: base sem animais, cadastro e retorno, responsável previamente selecionado, cadastro de coelho vinculado a cuidador, nova reserva com três códigos corretos, ausência de duplicação, limpeza do responsável, nomes iguais de pessoas diferentes, vínculo inválido excluído da seleção, histórico por código e tela de 320 pixels sem erros de execução.

Script: tests/verificar-fluxo-reserva-final.cjs. Evidência: relatorios/verificacao-fluxo-reserva-final.json. Dados da sessão do usuário não foram alterados pelos testes. Os vínculos funcionam no armazenamento local; não representam sincronização com servidor.

Esclarecimento sobre danos: o vínculo no cadastro identifica o contato responsável pela hospedagem e não determina, por si só, responsabilidade civil. O art. 936 do Código Civil menciona dono ou detentor e prevê exceções. Não interpretar o funcionário que registra cuidados ou a pessoa autorizada à retirada como proprietário automaticamente. A responsabilidade em uma ocorrência depende dos fatos e da guarda do animal. Fonte oficial consultada em 03/11/2026: https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html. Nenhuma cláusula de transferência automática de responsabilidade foi acrescentada. O usuário determinou não publicar enquanto houver correções; nenhuma publicação foi realizada.



Atualização: o usuário Cliente representa o proprietário responsável, conforme definição do projeto. Consulte PROPRIETARIOS-ARQUIVOS-E-RELATORIOS.md para cópias em arquivo e relatórios.
