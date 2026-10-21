/* Teste de navegador: Thiago Ferreira Prates Neves — Professor Lucas Santos de Oliveira.
   Playwright é somente ferramenta de teste, não faz parte da aplicação acadêmica. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..');
const output=path.resolve(root,'..','RelatoriosBusca');fs.mkdirSync(output,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpeg':'image/jpeg','.png':'image/png'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const launchOptions={headless:true};if(process.env.HOTELPET_CHROMIUM)launchOptions.executablePath=process.env.HOTELPET_CHROMIUM;
 const browser=await chromium.launch(launchOptions);
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const go=async(file,stage='hotelpet-final')=>page.goto(origin+'/web-ii/'+stage+'/'+file);
 const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.records')));
 const save=async()=>{await Promise.all([page.waitForURL(/(?:pets|usuarios|reservas)\.html|pet_cadastrar\.html\?responsavel=/),page.locator('button[type=submit]').click()]);};
 await go('painel.html');
 assert.equal(await page.locator('[data-metric=diarias]').innerText(),'121');
 assert.equal(await page.locator('[data-metric=vagas]').innerText(),'27 / 30');
 assert.match(await page.locator('[data-occupancy-summary]').innerText(),/90%.*18 cães.*9 gatos/);
 assert.match(await page.locator('.topbar-clock').innerText(),/Brasília/);
 assert.match(await page.locator('.topbar__user').innerText(),/Thiago Prates/);
 await page.screenshot({path:path.join(output,'painel-revisado-desktop.png'),fullPage:true});
 await go('usuario_cadastrar.html?retorno=pet');
 await page.locator('#nome').fill('Responsável de teste');await page.locator('#nome-exibicao').fill('Resp. teste');await page.locator('#email').fill('teste@example.com');await page.locator('#telefone').fill('77999990000');await save();
 const ownerId=new URL(page.url()).searchParams.get('responsavel');assert(ownerId);assert.equal(await page.locator('#proprietario').inputValue(),ownerId);
 await page.locator('#nome').fill('Pet de teste');await page.locator('#tipo').selectOption('Cachorro');
 assert((await page.locator('#raca option').count())>340);
 await page.locator('#buscar-raca').fill('pastor alem');assert.equal(await page.locator('#raca option').count(),4);
 await page.locator('#raca').selectOption('Pastor Alemão');
 for(const [weight,size] of [['10','Pequeno'],['10.1','Médio'],['25','Médio'],['25.1','Grande']]){await page.locator('#peso').fill(weight);assert.equal(await page.locator('#tamanho').inputValue(),size);}
 await page.locator('#peso').fill('26');await save();
 let data=await read();let pet=data.pets.find(pet=>pet.name==='Pet de teste');assert.equal(pet.ownerId,ownerId);assert.equal(pet.size,'Grande');
 await page.reload();assert((await read()).pets.some(item=>item.id===pet.id));
 await go('usuario_editar.html?id='+ownerId);assert.equal(await page.locator('#nome').inputValue(),'Responsável de teste');assert.equal(await page.locator('#nome-exibicao').inputValue(),'Resp. teste');await page.locator('#nome').fill('Responsável atualizado');await page.locator('#nome-exibicao').fill('Resp. atualizado');await save();
 await go('pets.html');data=await read();assert.equal(data.pets.find(item=>item.id===pet.id).owner,'Responsável atualizado');
 await go('reserva_cadastrar.html');await page.locator('#pet').selectOption(pet.id);assert.equal(await page.locator('#cliente').inputValue(),'Resp. atualizado');assert(await page.locator('#cliente').getAttribute('readonly')!==null);
 await page.locator('#checkin').fill('2026-10-25');await page.locator('#checkout').fill('2026-10-28');assert.match(await page.locator('.stay-total strong').innerText(),/240,00/);await save();
 data=await read();assert.equal(data.reservas.at(-1).ownerId,ownerId);
 await go('usuarios.html');await page.locator('input[data-row-select][value="'+ownerId+'"]').check();let alert='';page.once('dialog',async dialog=>{alert=dialog.message();await dialog.accept();});await page.locator('[data-delete-selected]').click();assert.match(alert,/vinculado/);assert((await read()).users.some(user=>user.id===ownerId));
 await go('pet_cadastrar.html');await page.locator('#tipo').selectOption('Gato');assert.equal(await page.locator('#raca option').count(),48);await page.locator('#raca').selectOption('Outra raça');assert(await page.locator('#outra-raca').isVisible());assert.equal(await page.locator('#outra-raca').getAttribute('required'),'');
 await go('pets.html');await page.locator('#f-nome').fill('Pet de teste');assert.equal(await page.locator('tbody tr:visible').count(),1);
 await page.locator('#f-nome').fill('');await page.locator('#f-raca').selectOption('Pastor Alemão');await page.locator('#f-tipo').selectOption('Gato');assert.equal(await page.locator('#f-raca').inputValue(),'');assert((await page.locator('tbody tr:visible').count())>=9);
 await go('painel.html');assert.equal(await page.locator('[data-metric=reservas]').innerText(),'32');assert.equal(await page.locator('[data-metric=diarias]').innerText(),'124');assert.equal(await page.locator('[data-metric=vagas]').innerText(),'27 / 30');
 await go('usuarios.html');assert.equal(await page.locator('tr[data-user-role=equipe]:visible').count(),0);await page.locator('[data-user-view=equipe]').click();assert.equal(await page.locator('tr[data-user-role=equipe]:visible').count(),2);assert.equal(await page.locator('tr[data-user-role=cliente]:visible').count(),0);
 await page.locator('[data-user-view=clientes]').click();await page.locator('#f-nome').fill('Responsável atualizado');assert.equal(await page.locator('tbody tr:visible').count(),1);assert.match(await page.locator('tbody tr:visible').innerText(),/Resp\. atualizado/);
 await go('perfil.html');await page.locator('#nome-exibicao').fill('Thiago P.');await Promise.all([page.waitForURL(/painel\.html/),page.locator('button[type=submit]').click()]);assert.match(await page.locator('.topbar__user').innerText(),/Thiago P\./);assert.equal((await read()).users.find(user=>user.id==='u1').name,'Thiago Ferreira Prates Neves');await go('perfil.html');await page.locator('#nome-exibicao').fill('Thiago Prates');await Promise.all([page.waitForURL(/painel\.html/),page.locator('button[type=submit]').click()]);
 await go('painel.html');await page.evaluate(()=>{const data=JSON.parse(localStorage.getItem('hotelPetShop.final.records'));for(const key of ['pets','users','reservas'])data[key]=data[key].filter(item=>!item.demo);localStorage.setItem('hotelPetShop.final.records',JSON.stringify(data));});await page.reload();await Promise.all([page.waitForEvent('load'),page.locator('#carregar-exemplo').click()]);assert((await read()).pets.some(item=>item.id===pet.id));assert.match(await page.locator('[data-occupancy-summary]').innerText(),/90%/);
 // Conferir páginas reais em celulares e tablet: tabelas podem rolar dentro de seu contêiner.
 let responsive=0;
 for(const width of [320,375,768,1440]){
  await page.setViewportSize({width,height:900});
  for(const stage of ['hotelpet-01','hotelpet-02','hotelpet-final']){
   for(const file of ['index.html','painel.html','pet_cadastrar.html','pets.html','usuario_cadastrar.html','reserva_cadastrar.html','configuracoes.html']){
    await go(file,stage);
    const dimensions=await page.evaluate(()=>({screen:innerWidth,content:document.documentElement.scrollWidth}));
    if(dimensions.content>dimensions.screen+1){console.log(await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(node=>node.getBoundingClientRect().right>innerWidth+1&&!node.closest('.table-scroll')).map(node=>({tag:node.tagName,class:node.className,right:node.getBoundingClientRect().right})).slice(0,15)));await page.screenshot({path:path.join(output,'falha-responsividade.png'),fullPage:true});}
    assert(dimensions.content<=dimensions.screen+1,JSON.stringify({width,stage,file,...dimensions}));responsive++;
   }
  }
 }
 await page.setViewportSize({width:375,height:812});await go('painel.html');await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
 await page.screenshot({path:path.join(output,'painel-revisado-celular.png'),fullPage:true});
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(output,'verificacao-web-ii.json'),JSON.stringify({passed:true,responsive,checks:['cadastro de responsável e retorno ao pet','raças por espécie e busca','limites de porte','vínculo estável por ID e renomeação','persistência após recarregar','reserva e cálculo de diária','proteção de responsável vinculado','raça personalizada','buscas','métricas','relógio e menu móvel'],errors},null,2));
 console.log(JSON.stringify({passed:true,responsive,errors}));await browser.close();server.close();
})().catch(error=>{console.error(error);server.close();process.exit(1);});
