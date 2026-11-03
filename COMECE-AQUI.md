# Hotel Pet — localização do trabalho

Repositório: https://github.com/thiagocloudnet/hotelpet

## Versão 2 — Programação Web II

Abra [web-ii/index.html](web-ii/index.html) para escolher uma entrega.

| Trabalho | Entrada | Conteúdo |
| --- | --- | --- |
| Etapa 1 | [Navegação](web-ii/hotelpet-01/index.html) | Navegação entre telas e módulos |
| Etapa 2 | [Buscas](web-ii/hotelpet-02/index.html) | Filtros nas listagens |
| Versão final | [Sistema completo](web-ii/hotelpet-final/index.html) | Cadastros, edição, reservas e configurações locais |

“Versão 2” corresponde ao conjunto em `web-ii/`. A entrega específica da etapa 2 fica em `web-ii/hotelpet-02/`.

As páginas podem ser abertas diretamente no navegador, sem instalar dependências.

## Organização

- `projeto/`: versão anterior, de Programação Web I.
- `web-ii/`: versão 2 e suas três entregas.
- `docs/`: documentação e revisões.
- `relatorios/`: relatórios do projeto.
- `tests/`: verificações existentes.
- `.github/workflows/`: automação de publicação.
- `README.md`: apresentação acadêmica e instruções completas.

## Servidor local opcional

Com Node.js instalado, execute na pasta principal:

```powershell
node servir-local.cjs
```

Acesse http://localhost:8080/ para abrir o painel da versão final. Encerre com Ctrl+C no terminal.

Os dados da versão final ficam no armazenamento local do navegador. As etapas anteriores usam dados demonstrativos.

## Revisão final e estudo do código

A versão ativa está em `web-ii/hotelpet-final/`. Leia [Mapa do código fonte](docs/MAPA-CODIGO-FONTE.md) e [Organização e pendências](docs/ORGANIZACAO-E-PENDENCIAS.md) antes de editar. A prévia usada nesta revisão está em http://127.0.0.1:8090/; a porta depende do comando usado ao iniciar o servidor.

## Apresentação de hoje

Leia [Roteiro: DOM, persistência e atendimento](docs/APRESENTACAO-DOM-PERSISTENCIA-E-ATENDIMENTO.md). O documento explica a árvore DOM, as operações de JavaScript, os vínculos e a persistência local. Em Configurações, exporte a cópia JSON antes de mudar de endereço ou navegador. A publicação usa o pacote estático preparado em .dist-pages; preparar esse pacote não executa o deploy.
