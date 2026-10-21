/* Thiago Ferreira Prates Neves — Professor Lucas Santos de Oliveira. */
(() => {
  const race=document.querySelector('#f-raca'),type=document.querySelector('#f-tipo'),catalog=window.HotelPetRacas;
  if(!race||!catalog)return;
  const original=Array.from(race.options).map(option=>option.value).filter(value=>value&&!['Todos','Todas'].includes(value));
  function render(){
    const current=race.value,kind=type?.value;
    const entries=kind==='Cachorro'?catalog.dogs:kind==='Gato'?catalog.cats:[...catalog.dogs,...catalog.cats];
    const extras=['Cachorro','Gato'].includes(kind)?[]:original;
    const names=[...new Set(['Sem raça definida',...entries.map(item=>item.name),...extras])].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    race.replaceChildren(new Option('Todas',''),...names.map(name=>new Option(name,name)));race.value=names.includes(current)?current:'';
  }
  type?.addEventListener('change',()=>{render();race.dispatchEvent(new Event('change',{bubbles:true}));});render();
})();
