const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.HOTELPET_CHROMIUM});const checks=[],errors=[];
 try {
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
  const go=file=>page.goto('http://127.0.0.1:8090/'+file);
  await go('racas.html');const catalog=await page.evaluate(()=>window.HotelPetRacas);
  assert(catalog.dogs.length>=344);assert(catalog.cats.length>=45);assert.equal(catalog.others.Roedor.length,11);checks.push('Catálogo ampliado de cães, gatos e onze opções de roedores');
  const all=[...catalog.dogs,...catalog.cats,...Object.values(catalog.others).flat(),...Object.values(catalog.srd)];
  let photos=0;
  for(const entry of all)if(entry.image){const filename=path.resolve('web-ii/hotelpet-final',entry.image);assert(fs.existsSync(filename));assert(fs.statSync(filename).size>100);assert(entry.author);assert(entry.license);assert(/^https?:/.test(entry.sourceUrl));photos++;}
  assert(photos>250);checks.push('Arquivos das fotos existem e possuem autoria, licença e fonte');
  assert.equal(await page.locator('.breed-reference').count(),24);checks.push('Catálogo limita a apresentação a 24 registros por página');
  await page.getByRole('button',{name:'Próxima página',exact:true}).click();assert.match(await page.locator('#resumo-catalogo').innerText(),/página 2/);checks.push('Paginação avança sem perder filtros');
  await page.locator('#grupo-catalogo').selectOption('Grupo FCI 3');assert((await page.locator('.breed-reference').count())>0);assert((await page.locator('.breed-reference figcaption').allInnerTexts()).every(t=>t.includes('Grupo FCI 3')));checks.push('Grupo canino filtra apenas seus registros');
  for(const species of ['Gato','Roedor','Coelho','Ave','Réptil']){await page.locator('#especie-catalogo').selectOption(species);assert(await page.locator('.breed-reference').count());checks.push('Grupo '+species+' disponível no catálogo');}
  await page.locator('#especie-catalogo').selectOption('Roedor');await page.locator('#grupo-catalogo').selectOption('Hamsters');assert.equal(await page.locator('.breed-reference').count(),5);checks.push('Roedores separados por grupos, com cinco espécies de hamster');
  for(const [weight,size] of [['0.050','Pequeno'],['10','Pequeno'],['10.001','Médio'],['25','Médio'],['25.001','Grande']]){await page.locator('#peso-catalogo').fill(weight);assert.match(await page.locator('#porte-catalogo').innerText(),new RegExp(size));checks.push('Porte correto para '+weight+' kg');}
  await page.locator('#peso-catalogo').fill('0');assert.match(await page.locator('#porte-catalogo').innerText(),/Informe o peso/);checks.push('Peso zero não recebe porte');
  await page.locator('#especie-catalogo').selectOption('Gato');await page.locator('#pesquisa-catalogo').fill('SRD');assert.equal(await page.locator('.breed-reference').count(),1);assert.match(await page.locator('.breed-reference').innerText(),/não tem aparência única/);checks.push('SRD destacado sem apresentar padrão visual único');
  await page.locator('#pesquisa-catalogo').fill('siames');assert(await page.locator('.breed-reference').count());checks.push('Busca ignora acentos');
  await page.getByText('Ver mapa dos grupos e do fluxo de hospedagem', {exact:true}).click();await page.waitForFunction(()=>document.querySelector('.catalog-map img').complete&&document.querySelector('.catalog-map img').naturalWidth>0);assert(await page.locator('.catalog-map img').evaluate(i=>i.naturalWidth>0));checks.push('Mapa explicativo gerado está disponível localmente');
  await page.setViewportSize({width:320,height:850});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('Catálogo e créditos cabem em tela de 320 pixels');
  await page.screenshot({path:'relatorios/catalogo-hospedagem-celular.png',fullPage:true});
  await page.setViewportSize({width:1440,height:1000});await go('pet_cadastrar.html');await page.locator('#tipo').selectOption('Roedor');await page.locator('#raca').selectOption({label:'Hamster Sírio'});await page.locator('#peso').fill('0.050');assert(await page.locator('#peso').evaluate(i=>i.checkValidity()));assert.equal(await page.locator('#tamanho').inputValue(),'Pequeno');assert.match(await page.locator('label[for=raca]').innerText(),/Espécie/);checks.push('Cadastro aceita pequeno roedor com 50 gramas e classifica corretamente');
  assert.equal(await page.locator('#raca option[value="Sem raça definida"]').count(),0);checks.push('SRD não substitui a identificação da espécie de um roedor');
  for(const species of ['Cachorro','Gato']){await page.locator('#tipo').selectOption(species);await page.locator('#raca').selectOption('Sem raça definida');assert(await page.locator('#referencia-raca').isVisible());checks.push('Cadastro de '+species+' mantém opção SRD e referência separada');}
  await go('pet_cadastrar.html?especie=Roedor&raca=Hamster%20S%C3%ADrio');assert.equal(await page.locator('#tipo').inputValue(),'Roedor');assert.equal(await page.locator('#raca').inputValue(),'Hamster Sírio');checks.push('Referência do catálogo preenche espécie e identificação sem criar animal automaticamente');
  await go('racas.html');await page.screenshot({path:'relatorios/catalogo-hospedagem-computador.png',fullPage:true});
  assert.deepEqual(errors,[]);fs.writeFileSync('relatorios/verificacao-catalogo-hospedagem.json',JSON.stringify({aprovado:true,total:checks.length,fotosLocais:photos,verificacoes:checks,erros:errors},null,2));console.log(JSON.stringify({aprovado:true,total:checks.length,fotosLocais:photos,erros:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

