/* Inclusões reais pela interface, em navegador isolado. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});
 const checks=[],errors=[];
 try {
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  page.on('dialog',async d=>{throw Error('Alerta inesperado: '+d.message());});
  const go=file=>page.goto('http://127.0.0.1:8090/'+file);
  const read=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('hotelPetShop.final.records')));
  const save=async()=>{await Promise.all([page.waitForURL(/salvo=/),page.locator('button[type=submit]').first().click()]);return new URL(page.url()).searchParams.get('salvo');};
  await go('painel.html');
  const initial=await read();
  await page.evaluate(data=>{localStorage.clear();localStorage.setItem('hotelPetShop.final.records',JSON.stringify({users:data.users.filter(u=>u.id==='u1'),pets:[],reservas:[]}));},initial);
  const lastNames=['Almeida','Barbosa','Cardoso','Duarte','Esteves','Ferreira','Gomes','Henrique','Ibrahim','Junqueira'];
  const owners=[],pets=[],reservations=[];
  for(let i=0;i<10;i++){
   await go('usuario_cadastrar.html');await page.locator('#nome').fill('Ana Maria '+lastNames[i]);
   if(i%2) await page.locator('#email').fill('ana.'+lastNames[i].toLowerCase()+'@example.com');
   owners.push(await save());
   const user=(await read()).users.find(u=>u.id===owners[i]);
   assert.equal(user.name,'Ana Maria '+lastNames[i]);assert.equal(user.email,i%2?'ana.'+lastNames[i].toLowerCase()+'@example.com':'');
   checks.push('Inclusão de proprietário '+(i+1)+' com e-mail '+(i%2?'informado':'opcional'));
  }
  for(let i=0;i<10;i++){
   await go('pet_cadastrar.html?responsavel='+owners[i]);
   await page.locator('#nome').fill('Toto');await page.locator('#tipo').selectOption({label:'Coelho'});await page.locator('#raca').selectOption({label:'Angorá'});await page.locator('#peso').fill('2');
   pets.push(await save());const pet=(await read()).pets.find(p=>p.id===pets[i]);assert.equal(pet.ownerId,owners[i]);assert.equal(pet.name,'Toto');
   checks.push('Inclusão de animal homônimo '+(i+1)+' vinculado ao proprietário correto');
  }
  for(let i=0;i<10;i++){
   await go('reserva_cadastrar.html?responsavel='+owners[i]+'&animal='+pets[i]);
   assert.equal(await page.locator('#pet').inputValue(),pets[i]);
   await page.locator('#checkin').fill('2026-12-10');await page.locator('#checkout').fill('2026-12-12');
   reservations.push(await save());const r=(await read()).reservas.find(r=>r.id===reservations[i]);assert.equal(r.petId,pets[i]);assert.equal(r.ownerId,owners[i]);
   checks.push('Inclusão de reserva '+(i+1)+' sem cruzar animais de mesmo nome');
  }
  for(let i=0;i<10;i++){
   await go('usuario_editar.html?id='+owners[i]);await page.locator('#nome').fill('Ana Clara '+lastNames[i]);await save();
   const data=await read();assert.equal(data.users.filter(u=>u.id===owners[i]).length,1);assert.equal(data.pets.find(p=>p.id===pets[i]).owner,'Ana Clara '+lastNames[i]);assert.equal(data.reservas.find(r=>r.id===reservations[i]).ownerId,owners[i]);
   checks.push('Edição de proprietário '+(i+1)+' preserva inclusões e vínculos');
  }
  for(let i=0;i<10;i++){
   await go('usuario_visualizar.html?id='+owners[i]);await page.reload();
   const text=await page.locator('main').innerText();assert(!text.includes('ID do usuário'));assert(!text.includes(owners[i]));
   assert(text.includes(i%2?'ana.'+lastNames[i].toLowerCase()+'@example.com':'ana.'+lastNames[i].toLowerCase()));
   assert.equal(await page.locator('[data-owner-records="pet"] li[data-record-id]').count(),1);
   assert.equal(await page.locator('[data-owner-records="reserva"] li[data-record-id]').count(),1);
   checks.push('Reabertura '+(i+1)+' mantém identificação, oculta ID e mostra apenas seus vínculos');
  }
  assert.equal(checks.length,50);assert.deepEqual(errors,[]);
  await go('painel.html');assert.match(await page.locator('.topbar__user').innerText(),/Thiago Prates/);
  const data=await read();assert.equal(data.users.length,11);assert.equal(data.pets.length,10);assert.equal(data.reservas.length,10);
  fs.writeFileSync('relatorios/verificacao-50-inclusoes.json',JSON.stringify({aprovado:true,total:checks.length,verificacoes:checks,erros:errors,gerentePreservado:true},null,2));
  console.log(JSON.stringify({aprovado:true,total:checks.length,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
