<div align="center">

# 🐾 Hotel Pet

**Sistema de Gerenciamento de Estadia para Pets**

[![Deploy no Pages](https://github.com/thiagoadsuesb/hotelpet/actions/workflows/deploy.yml/badge.svg)](https://github.com/thiagoadsuesb/hotelpet/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-hotelpet.shop-blue?logo=github)](https://hotelpet.shop)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

</div>

> **Aviso (out/2026):** A raiz de `hotelpet.shop` agora exibe a página **"Em breve"** (`index.html`).
> O trabalho academico da UESB foi preservado e continua publicado em **[hotelpet.shop/projeto/](https://hotelpet.shop/projeto/)** (pasta `projeto/`),
> e tambem na branch `uesb-trabalho-final`.

## 📚 Informacoes Academicas

| Campo | Detalhe |
|-------|---------|
| **Universidade** | Universidade Estadual do Sudoeste da Bahia — UESB |
| **Curso** | Analise e Desenvolvimento de Sistemas — EAD |
| **Disciplina** | Programacao Web I |
| **Professor** | Lucas Santos de Oliveira |
| **Aluno** | Thiago Ferreira Prates Neves |
| **Repositorio** | [github.com/thiagoadsuesb/hotelpet](https://github.com/thiagoadsuesb/hotelpet) |
| **Site publicado** | [hotelpet.shop](https://hotelpet.shop) |

## 🎯 Objetivo

Desenvolver a estrutura HTML5 e a estilizacao CSS3 de um sistema de gerenciamento de estadia para pets, representando a visao do gerente a partir de um prototipo no Figma.

Este projeto e o trabalho final da disciplina **Programacao Web I**, com foco exclusivo no front-end estatico.

## 🚀 Tecnologias

- **HTML5** — estrutura semantica e acessivel
- **CSS3** — estilizacao, layout responsivo e midia de impressao
- **Git** — versionamento e colaboracao
- **GitHub Pages** — publicacao estatica automatizada

## 📋 Escopo

- Interface estatica do sistema Hotel Pet
- Visao do gerente
- Navegacao entre telas por links HTML
- Simulacao de operacoes (login, cadastro, edicao, exclusao, recibo)
- Layout responsivo
- Recibo com CSS para impressao

## 🚫 Restricoes Academicas

Para manter o foco didatico da disciplina, este projeto **nao utiliza**:

- JavaScript
- Backend ou APIs
- Banco de dados
- Frameworks ou bibliotecas externas
- CDN
- Automacao por scripts Python no site publicado

## 📁 Estrutura do Projeto

```
Programacao-Web-I/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Publicacao automatica no GitHub Pages
├── css/
│   ├── estilo.css              # Folha de estilos principal
│   └── login.css               # Estilos especificos da tela de login
├── imagens/                    # Imagens, icones e favicon
├── index.html                  # Home do sistema
├── login.html                  # Tela de login
├── login_demo.html             # Simulacao de autenticacao
├── criar_conta.html            # Criacao de conta
├── perfil.html                 # Perfil do gerente
├── pets.html                   # Listagem de pets
├── pet_cadastrar.html          # Cadastro de pet
├── pet_editar.html             # Edicao de pet
├── pet_visualizar.html         # Visualizacao de pet
├── reservas.html               # Listagem de reservas
├── reserva_cadastrar.html      # Nova reserva
├── reserva_editar.html         # Edicao de reserva
├── reserva_editar_finalizada.html
├── reserva_visualizar.html     # Detalhes da reserva
├── reserva_recibo.html         # Recibo para impressao
├── usuarios.html               # Listagem de usuarios
├── usuario_cadastrar.html      # Cadastro de usuario
├── usuario_criado.html         # Confirmacao de cadastro
├── usuario_editar.html         # Edicao de usuario
├── usuario_excluir.html        # Confirmacao de exclusao
├── usuario_excluido.html       # Exclusao simulada
├── usuario_visualizar.html     # Visualizacao de usuario
├── configuracoes.html          # Configuracoes do hotel
├── CNAME                       # Dominio personalizado
├── README.md
├── .editorconfig
├── .gitattributes
└── .gitignore
```

## 🖥️ Telas

1. `login.html` — Entrada no sistema
2. `login_demo.html` — Simulacao de login bem-sucedido
3. `criar_conta.html` — Criacao de nova conta
4. `index.html` — Visao geral do hotel
5. `pets.html` — Lista de pets hospedados
6. `pet_cadastrar.html` — Cadastro de pet
7. `pet_editar.html` — Edicao de cadastro de pet
8. `pet_visualizar.html` — Visualizacao de pet
9. `reservas.html` — Lista de reservas
10. `reserva_cadastrar.html` — Nova reserva
11. `reserva_editar.html` — Edicao de reserva
12. `reserva_editar_finalizada.html` — Reserva finalizada
13. `reserva_visualizar.html` — Detalhes da reserva
14. `reserva_recibo.html` — Recibo para impressao
15. `usuarios.html` — Lista de usuarios
16. `usuario_cadastrar.html` — Cadastro de usuario
17. `usuario_criado.html` — Confirmacao de cadastro
18. `usuario_editar.html` — Edicao de usuario
19. `usuario_excluir.html` — Confirmacao de exclusao
20. `usuario_excluido.html` — Exclusao simulada
21. `usuario_visualizar.html` — Visualizacao de usuario
22. `perfil.html` — Perfil do gerente
23. `configuracoes.html` — Configuracoes do hotel

## 🔗 Como Visualizar

### Online

Acesse o site publicado em: **https://hotelpet.shop**

### Localmente

1. Clone o repositorio:
   ```bash
   git clone git@thiagoadsuesb.github.com:thiagoadsuesb/hotelpet.git
   ```
2. Abra o arquivo `login.html` no navegador.
3. Navegue pelas telas pelos links.

## 🧪 Simulacoes Estaticas

Como o projeto nao possui backend, as operacoes sao representadas por fluxos de navegacao entre paginas HTML, sem persistencia de dados. Por exemplo:

- Login → `login.html` → `login_demo.html`
- Cadastro de usuario → `usuario_cadastrar.html` → `usuario_criado.html`
- Exclusao de usuario → `usuario_visualizar.html` → `usuario_excluir.html` → `usuario_excluido.html`
- Recibo → `reserva_visualizar.html` → `reserva_recibo.html` (use **Ctrl + P** para imprimir)

## 📅 Etapas do Desenvolvimento

| Etapa | Data | Descricao |
|-------|------|-----------|
| Semana 1 | 14/08/2026 | Estrutura HTML das telas |
| Semana 2 | 21/08/2026 | Estilizacao CSS, organizacao, documentacao e publicacao |

## 🌱 Evolucao Comercial

A versao academica atual e estatica e tem como objetivo demonstrar dominio de HTML e CSS. A evolucao para uma versao comercial do `hotelpet.shop` preve:

- Backend com API REST
- Banco de dados relacional
- Sistema de autenticacao real
- Painel administrativo dinamico
- Reservas online para clientes
- Notificacoes por e-mail
- Relatorios e dashboards

## 📝 Licenca

Projeto academico desenvolvido para fins didaticos na UESB.

---

<div align="center">

**Desenvolvido por Thiago Ferreira Prates Neves**  
*Universidade Estadual do Sudoeste da Bahia — UESB*

</div>
