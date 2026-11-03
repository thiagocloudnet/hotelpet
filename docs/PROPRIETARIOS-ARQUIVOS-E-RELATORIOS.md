# Proprietários, arquivos e relatórios

## Regra do cadastro

O usuário na função Cliente representa o proprietário responsável. Um proprietário pode ter nenhum, um ou vários animais. O cadastro do animal exige um proprietário existente. A reserva exige um animal existente e recebe o proprietário desse animal: o nome digitado não substitui o vínculo por código. Funcionários e pessoas autorizadas para retirada não se tornam proprietários automaticamente.

Animais com o mesmo nome e raça continuam sendo registros diferentes. A central do proprietário reúne seus animais e reservas; o histórico do animal usa seu próprio código. A navegação orientada permite cadastrar proprietário, animal e depois concluir a reserva, sem criar registros fictícios quando não existem animais.

## Persistência sem banco de dados

O salvamento cotidiano usa localStorage, separado por origem e navegador. Em Configurações → Arquivos e relatórios, “Exportar cópia completa” baixa um JSON com cadastros, configurações, cuidados, operações e fechamentos. Guarde esse arquivo fora do navegador. A página não grava automaticamente sobre arquivos do computador nem sincroniza dispositivos.

Para transferir os dados, selecione a cópia no outro navegador, confira as quantidades e pressione “Restaurar arquivo selecionado”. A restauração substitui os quatro conjuntos locais. Exporte antes a versão atual. Arquivos incompatíveis, códigos duplicados, animais sem proprietário, reservas com proprietário diferente do animal e períodos inválidos são rejeitados antes da escrita.

O arquivo contém informações pessoais e de cuidados. Os relatórios CSV também contêm nomes e códigos: não fazem parte dos arquivos públicos da entrega. A cópia não implementa autenticação ou proteção contra alteração manual. Use o servidor local em vez de abrir diretamente por file://, cujo armazenamento varia entre navegadores.

## Relatórios disponíveis

- Proprietários: código, nome completo, e-mail e quantidade de animais, incluindo clientes sem animais.
- Animais: código, nome, espécie e raça separados, código e nome do proprietário.
- Reservas: códigos da reserva, animal e proprietário; nomes, entrada, saída, horário em 24 horas e situação.
- Painel existente: ocupação prevista, valores previstos, recebimentos informados e fechamento de caixa. Valor contratado não significa pagamento recebido.

Os três primeiros relatórios são exportados em CSV para planilha, com separador ponto e vírgula. A cópia completa é JSON; não confundir os dois formatos.

## Referências consultadas

- Modelo de proprietário com vários animais e agendamentos: https://support.gingrapp.com/hc/en-us/articles/29405008109197-Create-Appointments-for-Multiple-Pets-from-the-Same-Family-How-To
- Perfil e histórico individual do animal: https://support.gingrapp.com/hc/en-us/articles/29102947785741-Animal-Profile-Page-Overview-Reference
- Persistência por origem e limites de uso via file://: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

As referências orientam a organização; o projeto continua em HTML, CSS e JavaScript sem bibliotecas de execução ou backend.

## Verificação e limites

O teste `tests/verificar-arquivos-relatorios.cjs` executa 13 verificações em navegador isolado, sem alterar os dados da sessão do usuário. O resultado fica em `relatorios/verificacao-arquivos-relatorios.json`.

A responsabilidade jurídica por incidentes depende dos fatos e da guarda do animal; o cadastro identifica o proprietário e não atribui automaticamente toda responsabilidade por danos a ele. A ocupação do painel é uma previsão, e a validação de conflitos de capacidade por todo o período ainda requer evolução. Nenhuma publicação foi executada nesta revisão.
