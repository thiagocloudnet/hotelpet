/* Autor: Thiago Ferreira Prates Neves | Professor: Lucas Santos de Oliveira
   Programação Web II — espécies, nomenclaturas e faixas de hospedagem. */
(() => {
  const type=document.querySelector('#tipo'),race=document.querySelector('#raca');
  if(!type||!race)return;
  const search=document.querySelector('#buscar-raca'),weight=document.querySelector('#peso'),size=document.querySelector('#tamanho');
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const catalog=window.HotelPetRacas;
  if(!catalog)return;
  const others={Coelho:['Angorá','Mini Lop','Rex','Holandês'],Ave:['Calopsita','Periquito','Canário','Papagaio'],Roedor:['Hamster Sírio','Porquinho-da-Índia','Chinchila'],'Réptil':['Jabuti','Iguana','Gecko Leopardo']};
  const custom=document.createElement('input');custom.name='outra-raca';custom.id='outra-raca';custom.maxLength=100;custom.placeholder='Nome da raça ou variedade';custom.hidden=true;
  const label=document.createElement('label');label.htmlFor=custom.id;label.textContent='Informe a raça';label.hidden=true;race.after(label,custom);
  const description=document.createElement('small');description.textContent='Cães: grupos FCI. Gatos: catálogo CFA. O porte da hospedagem depende do peso atual, não da raça.';custom.after(description);
  let selected=race.value;
  const customVisibility=()=>{const show=race.value==='Outra raça';custom.hidden=!show;label.hidden=!show;custom.required=show;};
  function render(){
    const entries=type.value==='Cachorro'?catalog.dogs:type.value==='Gato'?catalog.cats:(others[type.value]||[]).map(name=>({name,group:type.value}));
    const query=normalize(search?.value||'');
    const existing=selected;
    race.replaceChildren(new Option(type.value?'Selecione a raça':'Selecione o tipo primeiro',''));
    if(type.value){
      race.add(new Option('Sem raça definida','Sem raça definida'));
      const groups=new Map();
      const matches=entries.filter(entry=>normalize(entry.name+' '+(entry.officialName||'')).includes(query)||entry.name===existing);
      matches.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).forEach(entry=>{if(!groups.has(entry.group)){const group=document.createElement('optgroup');group.label=entry.group;groups.set(entry.group,group);race.append(group);}groups.get(entry.group).append(new Option(entry.name,entry.name));});
      if(existing&&!entries.some(entry=>entry.name===existing)&&!['Sem raça definida','Outra raça'].includes(existing))race.add(new Option(existing,existing));
      race.add(new Option('Outra raça','Outra raça'));
    }
    race.value=existing;customVisibility();
  }
  type.addEventListener('change',()=>{selected='';if(search)search.value='';custom.value='';render();});
  race.addEventListener('change',()=>{selected=race.value;customVisibility();});
  search?.addEventListener('input',render);
  const classify=()=>{if(size&&weight){const n=Number(weight.value);size.value=n>0?(n<=10?'Pequeno':n<=25?'Médio':'Grande'):'';}};
  weight?.addEventListener('input',classify);render();classify();
})();
