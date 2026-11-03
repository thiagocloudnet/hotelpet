/* Edição e persistência local — Hotel Pet / Thiago Ferreira Prates Neves. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'../web-ii/hotelpet-final');
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.readFile(file,(error,body)=>{if(error){res.writeHead(404).end();return;}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8');res.end(body);});
});
(async()=>{
  let browser;
  try{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    browser=await chromium.launch({headless:true,...(process.env.HOTELPET_CHROMIUM?{executablePath:process.env.HOTELPET_CHROMIUM}:{})});
    const page=await browser.newPage();
    const go=file=>page.goto('http://127.0.0.1:'+server.address().port+'/'+file);
    const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.records')));
    const save=async()=>{await page.locator('button[type="submit"]').click();await page.waitForURL(/\?salvo=/);};
    await go('painel.html');
    const original=await read();
    await go('usuario_editar.html?id=u3');await page.locator('#nome').fill('Responsável editado');await save();await page.reload();
    let data=await read();assert.equal(data.users.find(u=>u.id==='u3').name,'Responsável editado');assert.equal(data.users.length,original.users.length);
    assert(data.pets.filter(p=>p.ownerId==='u3').every(p=>p.owner==='Responsável editado'));
    await go('pet_editar.html?id=p1');await page.locator('#nome').fill('Toto editado');await save();await page.reload();
    data=await read();assert.equal(data.pets.find(p=>p.id==='p1').name,'Toto editado');assert.equal(data.pets.length,original.pets.length);
    assert(data.reservas.filter(r=>r.petId==='p1').every(r=>r.pet==='Toto editado'));
    await go('reserva_editar.html?id=r1');assert.equal(await page.locator('#pet').inputValue(),'p1');
    await page.locator('#obs').fill('Observação editada e persistida');await save();await page.reload();
    data=await read();assert.equal(data.reservas.find(r=>r.id==='r1').note,'Observação editada e persistida');assert.equal(data.reservas.length,original.reservas.length);
    assert.match(await page.locator('.form-feedback').innerText(),/salvo com sucesso/);
    await go('usuario_visualizar.html?id=demo-cliente-5');
    const name=await page.locator('h1').innerText();assert((await page.locator('.breadcrumb').innerText()).includes(name));
    page.on('dialog',dialog=>dialog.accept());
    const userId='demo-cliente-5';const previousStatus=(await read()).users.find(u=>u.id===userId).status;
    await page.locator('.page-actions .button--success').click();await page.waitForLoadState('load');await page.reload();
    assert.notEqual((await read()).users.find(u=>u.id===userId).status,previousStatus);
    await go('usuario_editar.html?id=u2');await page.locator('#funcao').selectOption({label:'Gerente'});await save();
    assert.equal((await read()).users.find(u=>u.id==='u2').role,'Gerente');
    await go('reserva_editar.html?id=r3');await page.locator('#obs').fill('Gerente editou reserva finalizada');await save();
    assert.equal((await read()).reservas.find(r=>r.id==='r3').note,'Gerente editou reserva finalizada');
    await page.evaluate(()=>{const key='hotelPetShop.final.records';const data=JSON.parse(localStorage.getItem(key));data.users.push({id:'teste-remover',name:'Teste',role:'Cliente',status:'Ativo'});localStorage.setItem(key,JSON.stringify(data));});
    await go('usuario_visualizar.html?id=teste-remover');await page.locator('.page-actions .button--danger').click();await page.waitForURL(/usuarios.html/);
    assert(!(await read()).users.some(u=>u.id==='teste-remover'));
    await go('configuracoes.html');await page.locator('#diaria-pequeno').fill('55');await page.locator('#vagas').fill('40');
    await page.locator('#hotel-settings-form button[type="submit"]').click();
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.settings'))?.capacity===40);
    await page.reload();assert.equal(await page.locator('#diaria-pequeno').inputValue(),'55');assert.equal(await page.locator('#vagas').inputValue(),'40');
    await go('pet_editar.html?id=inexistente');assert.equal(await page.locator('button[type="submit"]').count(),0);
    console.log('OK: edição, persistência, vínculos, IDs, breadcrumb, status, remoção, funções, reserva finalizada e configurações.');
  }finally{if(browser)await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

