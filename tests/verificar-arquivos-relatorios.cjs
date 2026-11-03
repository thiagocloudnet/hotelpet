const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});
 const checks=[];
 try {
  const page=await browser.newPage({acceptDownloads:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8090/configuracoes.html');
  const downloadPromise=page.waitForEvent('download');
  await page.locator('#exportar-copia').click();
  const download=await downloadPromise;
  const backup=JSON.parse(fs.readFileSync(await download.path(),'utf8'));
  assert(backup.dados.records.pets.length);checks.push('Cópia completa exportada');
  const original=await page.evaluate(()=>localStorage.getItem('hotelPetShop.final.records'));
  const upload=async value=>page.locator('#arquivo-copia').setInputFiles({name:'copia.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(value))});
  await upload(backup);await page.waitForFunction(()=>!document.querySelector('#restaurar-copia').disabled);checks.push('Cópia válida aceita');
  await page.evaluate(()=>{const k='hotelPetShop.final.records';const d=JSON.parse(localStorage.getItem(k));d.users[0].name='Nome temporário';localStorage.setItem(k,JSON.stringify(d));});
  await Promise.all([page.waitForEvent('load'),page.locator('#restaurar-copia').click()]);
  assert.equal(await page.evaluate(()=>localStorage.getItem('hotelPetShop.final.records')),original);checks.push('Restauração recupera cadastros e vínculos');
  for(const [name,modify] of [
   ['Versão incompatível',x=>x.versao=99],
   ['Código duplicado',x=>x.dados.records.pets.push(x.dados.records.pets[0])],
   ['Animal sem proprietário',x=>x.dados.records.pets[0].ownerId='inexistente'],
   ['Reserva de outro proprietário',x=>x.dados.records.reservas[0].ownerId='inexistente'],
   ['Período inválido',x=>x.dados.records.reservas[0].checkout=x.dados.records.reservas[0].checkin],
   ['Gerente principal ausente',x=>x.dados.records.users=x.dados.records.users.filter(u=>u.id!=='u1')]
  ]) {
   const value=structuredClone(backup);modify(value);await upload(value);
   await page.waitForFunction(()=>document.querySelector('#resumo-copia').textContent && !document.querySelector('#resumo-copia').textContent.startsWith('Cópia validada:'));
   assert(await page.locator('#restaurar-copia').isDisabled());
   assert.equal(await page.evaluate(()=>localStorage.getItem('hotelPetShop.final.records')),original);checks.push(name+' rejeitado sem alterar dados');
  }
  for(const type of ['proprietarios','animais','reservas']) {
   await page.locator('#tipo-relatorio').selectOption(type);
   const next=page.waitForEvent('download');await page.locator('#exportar-relatorio').click();
   const file=await next;const csv=fs.readFileSync(await file.path(),'utf8');
   assert(csv.includes('proprietário'));assert(csv.includes(';'));checks.push('Relatório '+type+' exportado');
  }
  await page.setViewportSize({width:320,height:800});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('Tela utilizável em 320 pixels');
  assert.deepEqual(errors,[]);
  fs.writeFileSync('relatorios/verificacao-arquivos-relatorios.json',JSON.stringify({aprovado:true,verificacoes:checks,erros:errors},null,2));
  console.log(JSON.stringify({aprovado:true,verificacoes:checks.length,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
