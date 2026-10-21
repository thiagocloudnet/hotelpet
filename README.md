<!--
Autor: Thiago Ferreira Prates Neves
Professor: Lucas Santos de Oliveira
Disciplina atual: Programação Web II (2026.2)
Curso: Análise e Desenvolvimento de Sistemas — UESB
-->

# Hotel Pet

**Projeto acadêmico de Programação Web I e II · Análise e Desenvolvimento de Sistemas · UESB**

Sou **Thiago Ferreira Prates Neves**, discente do curso de Análise e Desenvolvimento de Sistemas da Universidade Estadual do Sudoeste da Bahia. Desenvolvo este projeto como parte da minha formação em desenvolvimento web, sob orientação do professor **Lucas Santos de Oliveira**.

O Hotel Pet representa a rotina de um estabelecimento que hospeda animais: cadastro dos pets e de seus proprietários, organização das reservas, acompanhamento da estadia e configuração de diárias e vagas. Meu trabalho está concentrado na **visão do gerente**, conforme a proposta da disciplina.

Comecei pela estrutura das páginas e pela identidade visual em Programação Web I. Em **Programação Web II (2026.2)**, continuo essa base com JavaScript para trabalhar navegação, buscas e edição dos registros. Organizei o repositório para manter essa evolução visível e permitir a consulta de cada etapa.

## Identificação acadêmica

| Informação | Identificação |
| --- | --- |
| Discente e autor | Thiago Ferreira Prates Neves |
| Instituição | Universidade Estadual do Sudoeste da Bahia — UESB |
| Curso | Tecnologia em Análise e Desenvolvimento de Sistemas — EAD |
| Disciplina atual | Programação Web II (2026.2) · 4º semestre |
| Professor | Lucas Santos de Oliveira |
| Atividade | Trabalho Final — Hotel Pet |
| Repositório | [thiagocloudnet/hotelpet](https://github.com/thiagocloudnet/hotelpet) |

## Versão 1 — estrutura e apresentação

Na primeira versão, desenvolvida em **Programação Web I**, o foco foi construir a interface com HTML e CSS: formulários, tabelas, navegação entre documentos e organização dos recursos visuais.

Essa versão permanece na pasta [`projeto/`](projeto/) e pode ser consultada na [demonstração de Web I](https://hotelpet.shop/projeto/). A página da raiz do domínio é uma apresentação “Em breve”; por isso, o endereço do trabalho acadêmico inclui `/projeto/`.

Mantive uma cópia do README anterior em [`docs/README-WEB-I.md`](docs/README-WEB-I.md) para registrar o contexto dessa entrega.

## Versão 2 — Programação Web II (2026.2)

Nesta versão, o objetivo é dar comportamento às telas já construídas. Uso **HTML5, CSS3 e JavaScript puro**, sem bibliotecas ou frameworks nas etapas acadêmicas. Os dados são demonstrativos e não há backend.

A versão 2 está organizada na pasta [`web-ii/`](web-ii/). A [página inicial do pacote](web-ii/index.html) reúne os atalhos das três etapas. Cada etapa também tem seu próprio `index.html`, seus estilos, scripts e imagens, podendo ser aberta separadamente.

**Versão 2** é o nome desta continuidade do projeto. **Etapa 02** é especificamente a entrega de buscas dentro dela.

### Entregas previstas no enunciado

| Etapa | Data estimada | Conteúdo | Pasta |
| --- | --- | --- | --- |
| 1 | **21/10/2026** | Navegação entre telas e módulos | [`web-ii/hotelpet-01/`](web-ii/hotelpet-01/) |
| 2 | **28/10/2026** | Buscas nas listagens | [`web-ii/hotelpet-02/`](web-ii/hotelpet-02/) |
| 3 | **04/11/2026** | Edição das tabelas e revisão das interações | [`web-ii/hotelpet-final/`](web-ii/hotelpet-final/) |

O vencimento geral informado na atividade é **04/11/2026, às 23h59**. As entregas frequentes são avaliadas pelo GitHub. A tarefa do Moodle informa que não exige envio de arquivo pela própria atividade.

### O que apresento em cada etapa

Na **etapa 1**, o foco está no percurso do gerente: entrar na demonstração, acessar o painel e navegar por pets, usuários, reservas, perfil e configurações. Os formulários apresentam os campos e simulam o retorno às páginas; não gravam os cadastros. O arquivo `login.html` encaminha para a entrada principal em `index.html`.

Na **etapa 2**, a navegação é acompanhada de filtros sobre os registros de exemplo das tabelas. O JavaScript faz a pesquisa no próprio navegador, sem consultar servidor ou banco de dados.

Na **etapa final**, há código para cadastro, edição, consulta, remoção e configurações locais. A implementação utiliza `localStorage` para manter os dados no navegador. A presença desse código não significa que todos os fluxos estejam homologados; a revisão funcional faz parte da conclusão dessa etapa.

## Funcionalidades da visão do gerente

| Área | O que ela representa |
| --- | --- |
| Painel | Resumo do hotel e acesso aos módulos |
| Pets | Listagem, cadastro, edição e consulta de animais |
| Usuários | Clientes e equipe, com funções e status de cadastro |
| Reservas | Período da hospedagem, situação, informações do pet e acompanhamento da estadia |
| Perfil | Dados apresentados para o gerente |
| Configurações | Valores das diárias e quantidade de vagas |

O enunciado também prevê que o gerente possa editar reservas finalizadas e alterar a função de um usuário entre **cliente, funcionário e gerente**. Essas telas fazem parte do percurso do projeto, e sua dinâmica integra a revisão da etapa final.

## Como executar

Para baixar o repositório:

```bash
git clone https://github.com/thiagocloudnet/hotelpet.git
cd hotelpet
```

Depois, abra **`web-ii/index.html`** no navegador e escolha uma etapa. Para ir direto à entrega de navegação, abra **`web-ii/hotelpet-01/index.html`**.

Não é necessário instalar dependências. A demonstração usa arquivos locais. O e-mail de exemplo aparece no formulário de acesso; a senha é demonstrativa e não corresponde a uma autenticação real.

## Organização do repositório

```text
hotelpet/
├── projeto/                    Versão 1 — Programação Web I
├── web-ii/
│   ├── index.html              Apresentação das três etapas
│   ├── README.md
│   ├── hotelpet-01/            Navegação
│   ├── hotelpet-02/            Buscas
│   └── hotelpet-final/         Tabelas e operações locais
├── docs/
│   └── README-WEB-I.md         Documentação anterior preservada
├── .github/workflows/          Configuração de publicação existente
├── CNAME
├── index.html                  Apresentação da raiz do domínio
└── README.md
```

Nas pastas de cada etapa, `css/` reúne os estilos, `js/` reúne as interações e `imagens/` contém logomarca, ícones e foto do perfil. Os arquivos de código identificam o autor, a disciplina e o professor nos cabeçalhos.

## Limites da demonstração

O projeto é uma atividade de desenvolvimento de interface e interação no navegador. Não possui servidor, banco de dados remoto, autenticação segura, envio de e-mail ou sincronização entre computadores.

Nas etapas com armazenamento local, os registros pertencem ao navegador utilizado e podem ser perdidos ao limpar os dados do site. Os exemplos de clientes, pets, reservas, contatos e preços servem à apresentação. O recibo é demonstrativo, e os campos de foto não representam um serviço de upload em funcionamento.

## Acompanhamento do desenvolvimento

Uso os commits para registrar as entregas e as revisões do trabalho. As mensagens descrevem as alterações em português, de forma que seja possível acompanhar a passagem da estrutura estática para as interações em JavaScript.

A revisão de autoria abrangeu as três etapas, com meu nome e o nome do professor nos cabeçalhos. Os scripts passaram por verificação de sintaxe. Isso não substitui a conferência manual dos links, formulários, buscas e tabelas em desktop e celular antes de cada entrega.

## Referências da atividade

- [Hotel Pet — Web II no Moodle](https://moodle4.uesb.br/mod/assign/view.php?id=31323).
- [Disciplina Programação Web II (2026.2)](https://moodle4.uesb.br/course/view.php?id=1088).
- [Protótipo de referência no Figma](https://www.figma.com/design/N8XRn6aNIH9PyiGr7LUBYb/Lo-fi-Wireframe-Kit--Community-?node-id=2196-8620).
- [Planilha de acompanhamento da turma](https://docs.google.com/spreadsheets/d/1WFQeiMCOCwrhlX4q-kgbcO8NAaAAPmraXHXJnluOk7k/edit).

**Thiago Ferreira Prates Neves**
Discente de Análise e Desenvolvimento de Sistemas — UESB
[GitHub: thiagocloudnet](https://github.com/thiagocloudnet)
