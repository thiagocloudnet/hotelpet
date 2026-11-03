/* Regressões de navegação e consistência dos detalhes, com três sessões independentes. */
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../web-ii/hotelpet-final'),out=path.resolve(__dirname,'../relatorios');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpeg':'image/jpeg'};
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(e,b)=>{if(e){res.writeHead(404).end();return;}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(b);});});
(async()=>{let browser;const errors=[];try{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));browser=await chromium.launch({headless:true,...(process.env.HOTELPET_CHROMIUM?{executablePath:process.env.HOTELPET_CHROMIUM}:{})});
 for(let round=1;round<=3;round++){
  const context=await browser.newContext({viewport:{width:375,height:900}}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));const go=f=>page.goto('http://127.0.0.1:'+server.address().port+'/'+f);
  const row=label=>page.locator('.detail-summary__row').filter({has:page.locator('dt',{hasText:new RegExp('^'+label+'$')})}).locator('dd');
  await go('reserva_visualizar.html?id=r1');assert.equal(await row('Peso').innerText(),'6,5 kg');assert.equal(await row('Porte').innerText(),'Pequeno');assert.match(await row('Total previsto').innerText(),/150,00/);
  assert.equal(await page.getByRole('navigation',{name:'Seções da estadia'}).locator('a').count(),5);
  await page.getByRole('navigation',{name:'Seções da estadia'}).getByRole('link',{name:'Documentos',exact:true}).click();assert.equal(new URL(page.url()).hash,'#stay-documents');
  assert((await page.locator('#doc-type').boundingBox()).height>=40);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  const check=page.getByLabel('Entrada: informações de saúde conferidas',{exact:true});
  await page.evaluate(()=>{window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Quota','QuotaExceededError');};});await check.click();assert.equal(await check.isChecked(),false);
  await page.evaluate(()=>{Storage.prototype.setItem=window.originalSetItem;});await check.check();await page.reload();assert(await check.isChecked());
  await page.evaluate(()=>{const key='hotelPetShop.final.records',data=JSON.parse(localStorage.getItem(key)),reservation=data.reservas.find(r=>r.id==='r1');reservation.petId='p5';delete reservation.weight;delete reservation.size;delete reservation.dailyRate;localStorage.setItem(key,JSON.stringify(data));});
  await page.reload();assert.equal(await row('Peso').innerText(),'30,5 kg');assert.equal(await row('Porte').innerText(),'Grande');assert.match(await row('Total previsto').innerText(),/240,00/);
  await page.getByRole('button',{name:'Salvar e visualizar documento'}).click();assert.match(await page.locator('.stay-document').innerText(),/Total previsto: R\$\s*240,00/);
  await go('reservas.html');assert.match(await page.locator('tr[data-id=r1]').innerText(),/240,00/);
  await page.evaluate(()=>{const key='hotelPetShop.final.records',data=JSON.parse(localStorage.getItem(key));data.reservas.find(r=>r.id==='r1').weight=8;data.users.find(u=>u.id==='u2').role='Gerente';localStorage.setItem(key,JSON.stringify(data));});
  await page.reload();assert.match(await page.locator('tr[data-id=r1]').innerText(),/150,00/);
  await go('reserva_visualizar.html?id=r1');assert.equal(await row('Peso').innerText(),'8,0 kg');assert.match(await row('Total previsto').innerText(),/150,00/);
  await go('usuarios.html');await page.locator('[data-user-view=equipe]').click();assert.equal(await page.locator('tr[data-id=u2] a[href="perfil.html"]').count(),0);assert.equal(await page.locator('tr[data-id=u1] a[href="perfil.html"]').count(),1);
  if(round===3){await go('reserva_visualizar.html?id=r1');await page.screenshot({path:path.join(out,'final-reserva-celular.png'),fullPage:true});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(out,'final-reserva-desktop.png'),fullPage:true});}
  await context.close();console.log('Rodada de usabilidade '+round+': OK');
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'verificacao-usabilidade.json'),JSON.stringify({passed:true,rounds:3,checks:['peso e porte vinculados','total e diária consistentes','atalhos por seção','seletor acessível e adaptado ao celular','checklist com persistência e recuperação de falha','avatar de outro gerente não abre perfil principal'],errors},null,2));
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
