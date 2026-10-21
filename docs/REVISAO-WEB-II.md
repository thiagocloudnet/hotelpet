# Revisão das interações e da apresentação

Sou Thiago Ferreira Prates Neves, discente de ADS na UESB. Nesta revisão do Hotel Pet, mantive a visão do gerente solicitada pelo professor Lucas Santos de Oliveira e a implementação em HTML, CSS e JavaScript puro.

## Clientes, equipe e responsáveis

A tela de usuários permite consultar clientes separadamente da equipe. Gerentes e funcionários ficam em Equipe. O cliente é o responsável cadastrado pelo pet. O fluxo do gerente é cadastrar o responsável, selecionar seu cadastro ao registrar o animal e escolher o pet ao criar a reserva. O responsável da reserva é preenchido a partir desse vínculo.

O vínculo usa o identificador do cadastro, não apenas o nome. Alterar o nome do responsável mantém seus pets associados. O sistema impede excluir um responsável com pets vinculados e um pet que tenha reservas. O cadastro aberto a partir do formulário de pet retorna para esse formulário com o novo responsável selecionado. Não implementei um portal separado de autenticação para clientes: o trabalho continua na visão do gerente.

## Raças e porte

Consultei os diretórios oficiais da [FCI](https://www.fci.be/en/nomenclature/Default.aspx) e da [CFA](https://cfa.org/breeds/) em 21/10/2026. O catálogo local contém 344 raças caninas com reconhecimento definitivo na FCI e 45 raças felinas do diretório CFA. Os nomes oficiais são preservados como referência, com alguns nomes usuais em português para facilitar a pesquisa.

Esses números delimitam o catálogo consultado; não representam todas as classificações de todas as associações do mundo. Incluí “Sem raça definida” e “Outra raça”, com campo de texto, para permitir cadastrar animais que não estejam na lista. Cães aparecem por grupo FCI e gatos em seu catálogo de referência. A pesquisa considera também o nome oficial.

Para a hospedagem, uso três faixas operacionais pelo peso atual informado: pequeno até 10 kg; médio acima de 10 até 25 kg; grande acima de 25 kg. Essa regra determina a diária do hotel e não pretende classificar biologicamente raças nem substituir avaliação veterinária. A raça não determina automaticamente o peso do animal.

O catálogo acompanha o código como dados locais; os formulários não precisam consultar uma API para funcionar.

## Ocupação e exemplos

Em um navegador sem cadastros anteriores, a etapa final inicia com um cenário fictício de 27 vagas ocupadas em uma capacidade de 30: 90%, com 18 cães e 9 gatos de diferentes raças e seus responsáveis. A porcentagem é da capacidade total do hotel, não de cada raça. Os exemplos usam nomes fictícios e e-mails no domínio example.com.

Dados existentes no localStorage são preservados. O botão do painel adiciona exemplos até aproximadamente 90% da capacidade configurada, sem excluir cadastros nem reduzir a capacidade. Em capacidades que não permitem uma fração exata de 90%, a quantidade é arredondada para um número inteiro de pets. Se a ocupação já for igual ou superior à meta, nenhum exemplo é acrescentado.

A ocupação considera reservas em andamento cujo período inclui o dia atual em Brasília; reservas futuras e finalizadas não ocupam vagas hoje. O total de diárias e a capacidade possuem indicadores separados. A etapa 1 continua demonstrando navegação, e a etapa 2 acrescenta as buscas; o cadastro com persistência fica na etapa final.

## Apresentação e conferência

Mantive azul, bege e dourado da identidade existente. Corrigi contraste de ações, dimensão dos ícones e rolagem indevida em tela estreita. O painel ganhou ícones SVG próprios, destaque para a ocupação e data/hora de Brasília. O menu móvel abre por botão, informa seu estado para tecnologias assistivas e fecha com Escape.

O teste em `tests/verificar-web-ii.cjs` abre um navegador isolado e verifica cadastro de responsável, vínculo por ID, renomeação, raças, limites de peso, persistência, reservas, cálculo de diárias, separação de clientes/equipe e layout em 320, 375, 768 e 1440 pixels. Playwright é ferramenta de desenvolvimento e não é incluído nas páginas do trabalho. O teste requer Node.js e Playwright disponíveis no ambiente; `HOTELPET_CHROMIUM` permite indicar o executável do Chromium.

Testes em larguras simuladas não substituem uma conferência em aparelhos físicos. O armazenamento permanece local ao navegador, sem backend e sem autenticação real.

## Nome completo e nome de exibição

O cadastro guarda o nome completo e um nome de exibição independente, com até 40 caracteres. O nome curto aparece nas listas, nos seletores e na barra superior. Se não for preenchido, o sistema sugere o primeiro e o último nome; o gerente começa como Thiago Prates. Cadastros antigos recebem essa identificação sem perder o nome completo. A consulta detalhada preserva as duas informações e as buscas aceitam ambas. A edição do perfil também grava os dois nomes no navegador.

## Temas, perfil e acesso por rede local

O cabeçalho mostra o nome de exibição ao lado da função. O botão de perfil abre foto, identificação completa e atalhos para perfil, início e saída da demonstração. A saída apenas retorna ao formulário demonstrativo. Os ícones de ação sobre azul são brancos. O botão de tema alterna entre claro e escuro e guarda a escolha no navegador.

Para acessar por endereço HTTP, execute `node servir-local.cjs` na raiz do repositório. O servidor estático mostra o endereço localhost e os IPs das interfaces locais na porta 8080; a raiz abre o painel da etapa final. Não há backend de cadastro. Outros aparelhos precisam estar na mesma rede e ter acesso permitido pela configuração de rede do computador. Nenhuma regra de firewall é criada pelo script.

O localStorage é separado por origem: um endereço file://, localhost e um IP não compartilham automaticamente os cadastros. Os dados anteriores não são apagados ao mudar o endereço; permanecem na origem anterior.
