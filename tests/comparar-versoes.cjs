/* Compara as cópias locais preservadas; não modifica as versões antigas. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const repo=path.resolve(__dirname,'..');
const inventory=JSON.parse(fs.readFileSync(path.join(repo,'relatorios/fontes-comparacao.json'),'utf8').replace(/^\uFEFF/,''));
const roots=[...new Set(inventory.filter(f=>/\\painel\.html$/i.test(f.Origem)).map(f=>path.dirname(f.Copia)))];
roots.push(path.join(repo,'web-ii/hotelpet-final'));
function inspect(root){
 const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['.git','node_modules'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(/\.(html|js|css)$/i.test(p))files.push(p);}}walk(root);
 const texts=files.map(f=>({file:path.relative(root,f).replace(/\\/g,'/'),text:fs.readFileSync(f,'utf8')})).sort((a,b)=>a.file.localeCompare(b.file));
 const js=texts.filter(t=>t.file.endsWith('.js')).map(t=>t.text).join('\n');
 const html=texts.filter(t=>t.file.endsWith('.html')).map(t=>t.text).join('\n');
 return {pasta:root,atual:root===roots.at(-1),paginas:texts.filter(t=>t.file.endsWith('.html')).length,scripts:texts.filter(t=>t.file.endsWith('.js')).length,bytes:Buffer.byteLength(texts.map(t=>t.text).join('')),assinatura:crypto.createHash('sha256').update(texts.map(t=>t.file+'\0'+t.text).join('\0')).digest('hex'),indicios:{gravaLocal:/localStorage\.setItem/.test(js),edicao:/_editar/.test(html)&&/submit/.test(js),busca:/filter|pesquis/i.test(js),autocomplete:/combobox|autocomplete|similaridade/i.test(js),saude:/health|vacinas/i.test(js),documentos:/window\.print/.test(js),bibliotecasExternas:/(?:bootstrap|jquery|react|vue)(?:[.\/-]|\.min)/i.test(html)},arquivos:texts.map(t=>t.file)};
}
const versions=roots.map(inspect);
fs.writeFileSync(path.join(repo,'relatorios/comparacao-versoes.json'),JSON.stringify({data:new Date().toISOString(),limite:'Indícios de código não comprovam funcionamento; a versão selecionada exige testes no navegador.',versoes:versions},null,2));
for(const v of versions)console.log(JSON.stringify({...v,arquivos:undefined}));
