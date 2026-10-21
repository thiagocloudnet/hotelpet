# Conferência do Hotel Pet

Autoria: Thiago Ferreira Prates Neves. Professor: Lucas Santos de Oliveira.

Na raiz do repositório, execute:

```sh
node tests/auditar-fonte.cjs
```

O comando confere páginas HTML, recursos locais, IDs repetidos, idioma, viewport, scripts obrigatórios do cabeçalho, destinos do menu e sintaxe de JavaScript. Compara os componentes de menu e tema nas três etapas para identificar versões divergentes. O resultado fica em `relatorios/auditoria-fonte.json`. O processo retorna erro quando encontra uma falha.

Para testar os fluxos em navegador, use `node tests/verificar-web-ii.cjs` em um ambiente com Playwright instalado. `HOTELPET_CHROMIUM` permite indicar o executável do navegador. Essa ferramenta é exclusiva do desenvolvimento: as páginas acadêmicas continuam sem frameworks.

O teste funcional verifica formulários, persistência, responsáveis, reservas, exportação do recibo, temas e larguras de tela. O menu também é testado em 320, 480, 640, 760, 761, 900 e 1440 pixels, incluindo recolher no desktop, preservar a escolha entre páginas e abrir/navegar no celular.

O menu usa um único limite de 760 pixels para decidir seu comportamento. No desktop, recolhe para 72 pixels com ícones e títulos de apoio; no celular, abre sobre o conteúdo e fecha ao navegar, clicar fora ou pressionar Escape. Seu estado acessível é informado com `aria-expanded`, e o menu fechado não recebe foco no celular.

Essas verificações cobrem os casos descritos e não garantem ausência de todos os defeitos. Imagens, regras do trabalho e uso em aparelhos físicos ainda merecem conferência manual.
