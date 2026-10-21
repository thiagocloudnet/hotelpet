/* Auditoria local — Thiago Ferreira Prates Neves / Professor Lucas Santos de Oliveira.
   Execute: node tests/auditar-fonte.cjs. Não modifica os arquivos da aplicação. */
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),base=path.join(root,'web-ii');
const errors=[],warnings=[],files=[];
function walk(folder){for(const item of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,item.name);if(item.isDirectory())walk(file);else files.push(file);}}walk(base);
const html=files.filter(file=>file.endsWith('.html')),scripts=files.filter(file=>file.endsWith('.js'));
for(const file of html){
 const source=fs.readFileSync(file,'utf8'),relative=path.relative(root,file),ids=new Set();
 for(const match of source.matchAll(/\bid="([^"]+)"/g)){if(ids.has(match[1]))errors.push(relative+': ID repetido '+match[1]);ids.add(match[1]);}
 for(const match of source.matchAll(/\b(?:src|href)="([^"]+)"/g)){
  const value=match[1];if(/^(?:[a-z]+:|#|\/\/)/i.test(value))continue;
  const filePath=value.split(/[?#]/)[0];if(filePath&&!fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(filePath))))errors.push(relative+': recurso ausente '+value);
 }
 if(!/name="viewport"/.test(source))errors.push(relative+': viewport ausente');
 if(!/<html[^>]+lang="pt-BR"/.test(source))warnings.push(relative+': conferir idioma');
 if(source.includes('class="topbar"')){
  for(const script of ['js/interface.js','js/tema-perfil.js'])if(!source.includes('src="'+script+'"'))errors.push(relative+': falta padronização '+script);
  const nav=source.match(/<nav[^>]+sidebar__nav[\s\S]*?<\/nav>/)?.[0]||'';
  for(const href of ['painel.html','pets.html','usuarios.html','reservas.html','configuracoes.html'])if(!nav.includes('href="'+href+'"'))errors.push(relative+': menu sem '+href);
 }
 if(/(?:bootstrap|admin-lte|jquery)(?:\.min)?\.(?:js|css)/i.test(source))errors.push(relative+': biblioteca externa na etapa acadêmica');
}
for(const file of scripts){const result=cp.spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(result.status!==0)errors.push(path.relative(root,file)+': '+result.stderr);}
for(const name of ['interface.js','tema-perfil.js']){const copies=['hotelpet-01','hotelpet-02','hotelpet-final'].map(stage=>fs.readFileSync(path.join(base,stage,'js',name),'utf8'));if(!copies.every(copy=>copy===copies[0]))errors.push('Componente divergente entre etapas: '+name);}
const report={data:new Date().toISOString(),paginas:html.length,scripts:scripts.length,erros:errors,avisos:warnings,limite:'Auditoria estática e sintaxe; executar também verificar-web-ii.cjs para testar os fluxos no navegador.'};
const output=path.join(root,'relatorios');fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'auditoria-fonte.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));process.exitCode=errors.length?1:0;
