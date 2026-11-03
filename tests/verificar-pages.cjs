/* Verifica recursos e caminhos do pacote público em um filesystem sensível a maiúsculas. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../.dist-pages'),files=[];function walk(folder){for(const e of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,e.name);if(e.isDirectory())walk(file);else files.push(file);}}walk(root);
const known=new Set(files.map(f=>path.relative(root,f).replace(/\\/g,'/'))),errors=[];
for(const file of files.filter(f=>f.endsWith('.html'))){const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/\b(?:src|href)="([^"]+)"/g)){const value=m[1];if(/^(?:[a-z]+:|#|\/\/)/i.test(value))continue;const resource=decodeURIComponent(value.split(/[?#]/)[0]);if(!resource)continue;const target=path.relative(root,path.resolve(path.dirname(file),resource)).replace(/\\/g,'/');if(!known.has(target))errors.push(path.relative(root,file)+': '+value);}}
assert.deepEqual(errors,[]);
for(const file of known)assert(!/(?:^|\/)(?:tests|relatorios|\.git|\.env|node_modules|acessai-app)(?:\/|$)/.test(file),'Arquivo privado no pacote: '+file);
assert(fs.readFileSync(path.join(root,'index.html'),'utf8').includes('id="login-form"'));
assert(known.has('.nojekyll'));
console.log(JSON.stringify({passed:true,publicFiles:files.length,pages:files.filter(f=>f.endsWith('.html')).length,errors}));
