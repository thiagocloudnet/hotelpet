const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});
 const checks=[],errors=[];
 try{
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  const go=file=>page.goto('http://127.0.0.1:8090/'+file);
  await go('painel.html');
  const initial=await page.evaluate(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.records')));
  const today=await page.evaluate(()=>window.HotelPetDemo.today());
  const tomorrow=new Date(Date.parse(today+'T12:00:00Z')+86400000).toISOString().slice(0,10);
  const target={...initial.reservas[0],id:'teste-movimento',checkin:today,checkout:tomorrow,status:'Pendente',dailyRate:50};
  const seed=async (reservation=target)=>page.evaluate(({initial,reservation})=>{localStorage.setItem('hotelPetShop.final.records',JSON.stringify({...initial,reservas:[reservation]}));localStorage.removeItem('hotelPetShop.final.operations');},{initial,reservation});
  const details=()=>go('reserva_visualizar.html?id='+target.id);
  const read=()=>page.evaluate(()=>({records:JSON.parse(localStorage.getItem('hotelPetShop.final.records')),operations:JSON.parse(localStorage.getItem('hotelPetShop.final.operations'))}));
  await seed();await details();assert(await page.locator('#registrar-saida').isDisabled());checks.push('Saída indisponível antes da entrada');
  await page.locator('#registrar-entrada').click();assert.match(await page.locator('main').innerText(),/Confira os três itens/);assert.equal((await read()).records.reservas[0].status,'Pendente');checks.push('Entrada exige conferência dos cuidados');
  const entry=async()=>{for(const label of ['Entrada: informações de saúde conferidas','Entrada: alimentação e pertences recebidos','Entrada: instruções do responsável registradas'])await page.getByLabel(label,{exact:true}).check();};
  await entry();await Promise.all([page.waitForEvent('load'),page.locator('#registrar-entrada').click()]);
  let data=await read();assert.equal(data.records.reservas[0].status,'Em andamento');assert(data.operations.stays[target.id].arrival.at);assert.equal(data.records.reservas[0].dailyRate,50);assert.equal(data.records.reservas[0].checkout,tomorrow);checks.push('Entrada registra instante real e preserva datas e preço contratados');
  assert(await page.locator('#registrar-entrada').isDisabled());assert(await page.locator('#registrar-saida').isEnabled());checks.push('Entrada duplicada bloqueada e saída liberada');
  await page.locator('#registrar-saida').click();assert.match(await page.locator('main').innerText(),/Confira a devolução/);assert.equal((await read()).records.reservas[0].status,'Em andamento');checks.push('Saída exige conferência da entrega');
  for(const label of ['Saída: pertences devolvidos','Saída: pet entregue à pessoa autorizada'])await page.getByLabel(label,{exact:true}).check();
  await Promise.all([page.waitForEvent('load'),page.locator('#registrar-saida').click()]);data=await read();assert.equal(data.records.reservas[0].status,'Finalizada');assert(data.operations.stays[target.id].departure.at>=data.operations.stays[target.id].arrival.at);assert(await page.locator('#registrar-saida').isDisabled());checks.push('Saída finaliza reserva e mantém histórico de entrada');
  await seed({...target,checkin:tomorrow,checkout:new Date(Date.parse(tomorrow+'T12:00:00Z')+86400000).toISOString().slice(0,10)});await details();await entry();await page.locator('#registrar-entrada').click();assert.match(await page.locator('main').innerText(),/A entrada deve ocorrer no período/);checks.push('Entrada fora do período é bloqueada');
  await seed({...target,checkin:new Date(Date.parse(today+'T12:00:00Z')-86400000).toISOString().slice(0,10),checkout:today,checkoutTime:'00:00'});await details();await entry();await page.locator('#registrar-entrada').click();assert.match(await page.locator('main').innerText(),/A entrada deve ocorrer no período/);checks.push('Entrada após o horário de término da reserva é bloqueada');
  await seed({...target,status:'Cancelada'});await details();assert(await page.locator('#registrar-entrada').isDisabled());checks.push('Reserva cancelada não recebe animal');
  await seed();await details();await entry();await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='hotelPetShop.final.operations')throw new DOMException('Sem espaço','QuotaExceededError');return original.call(this,k,v);};});
  await page.locator('#registrar-entrada').click();data=await read();assert.equal(data.records.reservas[0].status,'Pendente');assert(!data.operations.stays[target.id].arrival);checks.push('Falha de armazenamento desfaz mudança da situação');
  await go('painel.html');assert.equal(await page.locator('.profile-chevron').count(),0);assert.match(await page.locator('.topbar__user').innerText(),/Thiago Prates/);checks.push('Setinha removida e nome do gerente preservado');
  assert.deepEqual(errors,[]);fs.writeFileSync('relatorios/verificacao-entrada-saida.json',JSON.stringify({aprovado:true,verificacoes:checks,erros:errors},null,2));console.log(JSON.stringify({aprovado:true,total:checks.length,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
