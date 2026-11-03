"""Empacota a saída estática já conferida e o roteiro, sem publicar."""
import datetime, hashlib, json, zipfile
from pathlib import Path
from zoneinfo import ZoneInfo

root = Path(__file__).resolve().parents[1]
site = root / '.dist-pages'
if not (site / 'index.html').exists():
    raise SystemExit('Prepare e confira .dist-pages antes de empacotar.')
stamp = datetime.datetime.now(ZoneInfo('America/Sao_Paulo')).strftime('%Y%m%d-%H%M%S')
target = root / 'relatorios' / ('hotelpet-final-organizado-' + stamp + '.zip')
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
    for file in sorted(site.rglob('*')):
        if file.is_file() and file.name != '.hotelpet-build':
            archive.write(file, file.relative_to(site).as_posix())
    archive.write(root/'docs/APRESENTACAO-DOM-PERSISTENCIA-E-ATENDIMENTO.md', 'documentacao/APRESENTACAO-DOM-PERSISTENCIA-E-ATENDIMENTO.md')
    archive.writestr('LEIA-ME-APRESENTACAO.txt', 'Hotel Pet - Web II\nVersao final na raiz do pacote.\nAplicacao estatica em HTML, CSS e JavaScript, sem banco de dados.\nLeia documentacao/APRESENTACAO-DOM-PERSISTENCIA-E-ATENDIMENTO.md.\nExporte a copia JSON em Configuracoes antes de mudar de navegador ou endereco.\nO pacote nao inclui os cadastros locais do seu navegador.\nO login e demonstrativo e publico.\nCreditos das imagens acompanham o catalogo e imagens/racas/creditos.json.\nEste pacote foi preparado localmente; nao comprova deploy realizado.\n')
with zipfile.ZipFile(target) as archive:
    if archive.testzip(): raise SystemExit('Falha na verificacao do ZIP.')
    count = len(archive.namelist())
report = json.loads((root/'relatorios/entrega-final.json').read_text(encoding='utf-8-sig'))
catalog = json.loads((root/'relatorios/atualizacao-racas.json').read_text(encoding='utf-8'))
report.update(Pacote=target.name,Bytes=target.stat().st_size,SHA256=hashlib.sha256(target.read_bytes()).hexdigest(),ArquivosPacote=count,PaginasPacote=len(list(site.rglob('*.html'))),PaginasVersao=len(list((root/'web-ii/hotelpet-final').glob('*.html'))),ScriptsVersao=len(list((root/'web-ii/hotelpet-final/js').glob('*.js'))),ArquivosPreparadosAtuais=sum(p.is_file() for p in site.rglob('*')),PacoteZipRequerAtualizacao=False,Publicado=False,CatalogoAtual=f"{catalog['totalOpcoes']} referencias; {catalog['comImagem']} com foto; {len(catalog['pendentes'])} pendentes",Pendencia='Executar deploy e conferir endereco publico; cobertura fotografica do catalogo ainda depende das fontes.')
(root/'relatorios/entrega-final.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'pacote':str(target),'arquivos':count,'bytes':target.stat().st_size,'publicado':False},ensure_ascii=False))
