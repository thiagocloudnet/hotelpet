const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});
 const checks=[],errors=[];
 try {
  const context=await browser.newContext({timezoneId:'Pacific/Honolulu'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8090/configuracoes.html');
  assert.equal(await page.locator('#pais-hotel').inputValue(),'BR');assert.equal(await page.locator('#fuso-hotel').inputValue(),'America/Bahia');checks.push('Configuração antiga sem país/fuso assume Brasil e Bahia');
  assert.match(await page.locator('.topbar-clock').innerText(),/Bahia/);checks.push('Relógio ignora o fuso do computador quando hotel usa Bahia');
  await page.locator('#pais-hotel').selectOption('PT');assert.equal(await page.locator('#fuso-hotel').inputValue(),'Europe/Lisbon');checks.push('Mudar país substitui fusos disponíveis por opções compatíveis');
  await page.locator('#fuso-hotel').selectOption('Atlantic/Azores');
  const before=await page.evaluate(()=>localStorage.getItem('hotelPetShop.final.records'));
  await page.locator('#hotel-settings-form button[type=submit]').click();
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.settings')).timeZone==='Atlantic/Azores');await page.waitForTimeout(1100);
  assert.equal(await page.locator('#pais-hotel').inputValue(),'PT');assert.equal(await page.locator('#fuso-hotel').inputValue(),'Atlantic/Azores');checks.push('País e fuso persistem após salvar e recarregar');
  assert.match(await page.locator('.topbar-clock').innerText(),/Açores/);checks.push('Relógio identifica o fuso escolhido');
  assert.equal(await page.evaluate(()=>localStorage.getItem('hotelPetShop.final.records')),before);checks.push('Alterar fuso não reescreve cadastros ou reservas');
  await page.evaluate(()=>localStorage.setItem('hotelPetShop.final.settings',JSON.stringify({country:'JP',timeZone:'Asia/Tokyo',smallRate:50,mediumRate:65,largeRate:80,capacity:30,checkoutTime:'12:00'})));
  await page.reload();
  const test=await page.evaluate(()=>{
   const now=new Date('2026-11-03T02:30:00Z');
   const record={pets:[{id:'pet'}],reservas:[{id:'r',petId:'pet',status:'Em andamento',checkin:'2026-11-03',checkout:'2026-11-04',checkoutTime:'12:00'}]};
   const ending={reservas:[{...record.reservas[0],checkin:'2026-11-02',checkout:'2026-11-03'}]};
   return {occupied:HotelPetFinance.occupied(record,now).length,beforeNoon:HotelPetFinance.occupied(ending,new Date('2026-11-03T02:59:00Z')).length,atNoon:HotelPetFinance.occupied(ending,new Date('2026-11-03T03:00:00Z')).length,zone:HotelPetFuso.zone(),valid:HotelPetFuso.valid('BR','Asia/Tokyo')};
  });
  assert.equal(test.occupied,1);assert.equal(test.zone,'Asia/Tokyo');assert.equal(test.valid,false);checks.push('Ocupação usa data e hora locais do hotel na virada do dia');checks.push('País e fuso incompatíveis são rejeitados');
  assert.equal(test.beforeNoon,1);assert.equal(test.atNoon,0);checks.push('Vaga é liberada exatamente ao meio-dia no fuso escolhido');
  await page.evaluate(()=>localStorage.setItem('hotelPetShop.final.settings',JSON.stringify({country:'XX',timeZone:'Invalid/Zone'})));await page.reload();assert.equal(await page.locator('#pais-hotel').inputValue(),'BR');checks.push('Configuração corrompida retorna ao padrão válido');
  await page.setViewportSize({width:320,height:850});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('Configurações cabem em tela de 320 pixels');
  await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'relatorios/configuracao-pais-fuso.png',fullPage:true});assert.deepEqual(errors,[]);
  fs.writeFileSync('relatorios/verificacao-fuso-configuravel.json',JSON.stringify({aprovado:true,total:checks.length,verificacoes:checks,erros:errors},null,2));console.log(JSON.stringify({aprovado:true,total:checks.length,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
