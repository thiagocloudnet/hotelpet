# Organização do repositório e entrega

Revisão de 03/11/2026. Repositório: thiagocloudnet/hotelpet.

## Estrutura

| Local | Responsabilidade |
| --- | --- |
| web-ii/hotelpet-final | Aplicação principal para a apresentação |
| web-ii/hotelpet-01 e hotelpet-02 | Entregas históricas: navegação e buscas |
| projeto | Continuidade histórica de Web I |
| docs | Explicações, roteiro e limites conhecidos |
| tests | Verificações de desenvolvimento, fora da aplicação publicada |
| scripts | Preparação do site, coleta de referências e empacotamento |
| relatorios | Evidências e resultados das conferências |
| .github/workflows/deploy.yml | Preparação e publicação do artefato estático no Pages |

O desenvolvimento de outros aplicativos e as habilidades locais de automação não fazem parte da revisão do Hotel Pet. A preparação do site copia somente os arquivos públicos, excluindo testes, documentos de trabalho, credenciais e fotos que não são referenciadas pelo catálogo atual.

## Imagens e marca

O catálogo contém 529 referências e 454 delas têm foto local com metadados de atribuição e licença. Há 75 pendentes: não existe cobertura integral e não se usam fotografias de outra espécie para preencher lacunas. O resultado detalhado fica em relatorios/atualizacao-racas.json. A marca do Hotel Pet aparece no canto da moldura, separada da foto. O inventário imagens/racas/creditos.json é gerado no pacote público. Autoria de terceiros não é atribuída ao hotel.

## Conferência desta rodada

Foram aprovadas 166 verificações funcionais: 50 de inclusões, 50 de vínculos e operações, 11 do fluxo orientado de reservas, 6 da marca nas imagens, 26 do catálogo, 12 de alimentação e 11 de país/fuso. A auditoria estática examinou 53 páginas e 36 scripts sem erros. O pacote preparado contém 94 páginas contando as versões históricas. Consulte os relatórios JSON para o alcance de cada teste; isso não certifica ausência de todos os defeitos possíveis.

Permanecem as limitações descritas no roteiro: autenticação apenas demonstrativa, persistência por navegador/origem, concorrência entre abas, validação incompleta de sobreposição/capacidade em todos os períodos e fotos por lançamento do diário. Não se declara um sistema de produção completo.

## Revisão e publicação

As mudanças são organizadas em uma branch de revisão. A versão principal e o site público não devem ser confundidos com a prévia local. O workflow de deploy precisa acompanhar os scripts de preparação para publicar .dist-pages em vez de enviar todo o repositório.

O e-mail de identificação dos commits foi configurado apenas neste repositório. Nenhuma senha ou token deve ser incluído no código, no ZIP ou nos documentos. O acesso demonstrativo da aplicação é público e não representa credencial da conta GitHub.

O arquivo relatorios/entrega-final.json identifica o ZIP atual, o tamanho e seu SHA-256. O pacote contém o site e o roteiro de apresentação; não contém os cadastros privados do localStorage. Para apresentar em outro endereço, exporte a cópia JSON em Configurações e restaure no destino.

## Ferramentas de desenvolvimento

A aplicação publicada exige apenas navegador. Node.js é usado nos testes e no preparo dos arquivos estáticos. A coleta opcional de fotos usa Python e BeautifulSoup; suas referências HTML/JSON e a base scripts/catalogo-racas-base.json são insumos de desenvolvimento. Esses programas não são backend e não são executados pelo visitante do site.
