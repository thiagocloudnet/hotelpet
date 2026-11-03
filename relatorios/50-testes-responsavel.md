# 50 testes — responsável e vínculos dos animais

Data: 03/11/2026. Resultado: **50 de 50 aprovados**, sem erros de execução na página.

O responsável é o cadastro principal. Animais com o mesmo nome são permitidos; cada animal e cada reserva mantêm seus próprios códigos e o vínculo com o dono correto.

| Nº | Verificação | Resultado |
| --- | --- | --- |
| 1 | IDs únicos dos responsáveis | Aprovado |
| 2 | IDs únicos dos pets | Aprovado |
| 3 | IDs únicos das reservas | Aprovado |
| 4 | Todo pet possui responsável existente por código do responsável | Aprovado |
| 5 | Toda reserva aponta para pet existente por código do animal | Aprovado |
| 6 | Responsável da reserva coincide com o responsável do pet | Aprovado |
| 7 | ID do responsável visível nos detalhes | Aprovado |
| 8 | Central do responsável mostra somente seus pets | Aprovado |
| 9 | Central do responsável mostra somente suas reservas | Aprovado |
| 10 | Novo pet iniciado pelo responsável mantém o ID selecionado | Aprovado |
| 11 | Nova reserva iniciada pelo responsável lista apenas seus pets | Aprovado |
| 12 | Responsável inexistente não permite reservar pet de outro dono | Aprovado |
| 13 | Donos com nomes iguais permanecem separados por ID | Aprovado |
| 14 | Renomear responsável preserva o ID | Aprovado |
| 15 | Renomear responsável atualiza seus pets sem mudar código do responsável | Aprovado |
| 16 | Renomear responsável atualiza reservas sem atingir outro dono | Aprovado |
| 17 | Nome de exibição não altera o vínculo do dono | Aprovado |
| 18 | E-mail duplicado com diferenças de caixa é bloqueado | Aprovado |
| 19 | Trocar e-mail preserva ID e vínculos | Aprovado |
| 20 | Salvar edição não duplica responsável | Aprovado |
| 21 | Cadastros no mesmo milissegundo recebem IDs diferentes | Aprovado |
| 22 | Novo pet grava o responsável selecionado por ID | Aprovado |
| 23 | Pet sem responsável não é cadastrado | Aprovado |
| 24 | Responsável inativo não é oferecido para novo pet | Aprovado |
| 25 | Pet existente preserva vínculo com responsável inativo | Aprovado |
| 26 | Excluir dono com pet vinculado é bloqueado | Aprovado |
| 27 | Reserva histórica também impede excluir o dono | Aprovado |
| 28 | Excluir pet com reserva é bloqueado | Aprovado |
| 29 | Excluir responsável sem vínculos remove apenas o escolhido | Aprovado |
| 30 | Gerente principal não pode ser excluído | Aprovado |
| 31 | Função e status do gerente principal protegidos | Aprovado |
| 32 | Função dos demais usuários pode mudar para Gerente | Aprovado |
| 33 | Mudar situação altera somente o dono escolhido | Aprovado |
| 34 | Troca de responsável atualiza código do responsável do pet | Aprovado |
| 35 | Troca de responsável propaga às reservas do pet | Aprovado |
| 36 | Dois Totos de donos diferentes preservam seus pets e reservas | Aprovado |
| 37 | Novas reservas têm IDs distintos | Aprovado |
| 38 | Reserva deriva o dono do pet, ignorando texto adulterado | Aprovado |
| 39 | Datas invertidas não geram reserva | Aprovado |
| 40 | Gerente edita reserva finalizada mantendo ID | Aprovado |
| 41 | Diária zero é preservada no cadastro e no total | Aprovado |
| 42 | Alterar tarifas não reescreve diária já contratada | Aprovado |
| 43 | Reserva antiga consulta peso e porte do pet vinculado | Aprovado |
| 44 | Ficha de cuidados permanece no pet por ID | Aprovado |
| 45 | Diário pertence à reserva por ID | Aprovado |
| 46 | Recibo identifica o dono da reserva correta | Aprovado |
| 47 | Contrato exige condições antes de ser preparado | Aprovado |
| 48 | Falha de gravação não altera o dono nem perde o formulário | Aprovado |
| 49 | Busca por ID completo localiza o dono na lista e nas sugestões | Aprovado |
| 50 | Central do dono e ID longo cabem no celular | Aprovado |


O caso 36 usa dois cães chamados Toto, da mesma raça, com donos diferentes. Nenhum foi renomeado automaticamente.

Os testes foram executados em sessões isoladas. Os cadastros do navegador do aluno foram preservados. O resultado não certifica todos os navegadores ou todos os possíveis usos do sistema.
