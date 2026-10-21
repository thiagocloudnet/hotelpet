<!--
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina: Programação Web II (2026.2)
Projeto: Hotel Pet — UESB
-->
# Hotel Pet — entrega final

Protótipo da visão do gerente para Programação Web II (2026.2), UESB. Autoria acadêmica indicada: Thiago Ferreira Prates Neves. Gerente demonstrativo: Thiago Ferreira Prates Neves.

## Módulos

- **Painel:** indicadores de reservas, hóspedes, clientes e vagas, com atalhos para os módulos.
- **Pets:** cadastro, filtro, edição, detalhes e remoção. O combobox de raça acompanha a espécie; o peso determina o porte.
- **Usuários:** cadastro, filtro, edição, detalhes, status e remoção em lote. O perfil do gerente usa foto local e permanece protegido contra remoção em lote.
- **Reservas:** cadastro, busca, edição e detalhes; a lista calcula noites e total, e o formulário atualiza a tarifa conforme o peso do pet.
- **Configurações:** capacidade e tarifas separadas para pequeno (até 10 kg), médio (10,1–25 kg) e grande (acima de 25 kg). Valores iniciais: R$ 50, R$ 65 e R$ 80.
- **Perfil:** acesso pela foto/nome do gerente no cabeçalho e pela linha correspondente na lista de usuários.

## Como abrir

Abra `index.html` nesta pasta. A navegação usa páginas HTML locais. Não é necessário instalar pacote, iniciar servidor ou conectar à internet.

## Interações e armazenamento

A busca filtra em memória os registros carregados no navegador. Criar, editar, remover e atualizar status modifica `localStorage`, com chaves exclusivas da versão final. Ao limpar os dados locais do navegador, voltam os registros iniciais de demonstração. Os preços também ficam no armazenamento local.

A tarifa da reserva usa o peso salvo no cadastro do pet: pequeno até 10 kg, médio de 10,1 a 25 kg e grande acima de 25 kg. A quantidade de diárias é calculada pela diferença entre check-in e check-out; o check-out precisa ser posterior ao check-in. O total exibido resulta de noites multiplicadas pela tarifa da faixa.

## Segurança e limites

Não existe servidor, banco remoto, autenticação segura, sessão ou recuperação de senha. A entrada é apenas demonstrativa; senhas não são gravadas ou enviadas. Não use informações pessoais reais nos cadastros. Fotos selecionadas para pets não são persistidas. Os contatos apresentados são fictícios.

## Implementação

HTML5 semântico, CSS escrito para o projeto e JavaScript puro (DOM, eventos, arrays, objetos e `localStorage`). Não há bibliotecas ou frameworks. O AdminLTE não foi incluído porque a tarefa acadêmica proíbe frameworks. Todos os ícones, imagens e logomarca usados são locais.
