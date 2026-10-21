/* Autor: Thiago Ferreira Prates Neves | Professor: Lucas Santos de Oliveira
   Programação Web II (2026.2) — HTML, CSS e JavaScript puro. */
(() => {
  const bar = document.querySelector('.topbar');
  if (bar) {
    const time = document.createElement('time');
    time.className = 'topbar-clock';
    time.setAttribute('aria-label', 'Data e hora de Brasília');
    const dateFormat = new Intl.DateTimeFormat('pt-BR', {timeZone:'America/Sao_Paulo',day:'2-digit',month:'short',year:'numeric'});
    const hourFormat = new Intl.DateTimeFormat('pt-BR', {timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const date = document.createElement('span'), hour = document.createElement('strong');
    time.append(date, hour); bar.prepend(time);
    const tick=()=>{const now=new Date();time.dateTime=now.toISOString();date.textContent=dateFormat.format(now);hour.textContent=hourFormat.format(now)+' · Brasília';};
    tick(); setInterval(tick, 1000);
  }
  const side=document.querySelector('.sidebar');
  if(side && bar){
    side.id='menu-principal';
    const button=document.createElement('button');button.type='button';button.className='menu-toggle';
    button.textContent='☰';button.setAttribute('aria-label','Abrir menu');button.setAttribute('aria-controls',side.id);button.setAttribute('aria-expanded','false');
    const close=()=>{document.body.classList.remove('menu-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menu');};
    button.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
    document.addEventListener('click',event=>{if(!side.contains(event.target)&&!button.contains(event.target))close();});
    bar.prepend(button);
  }
})();

// A separação visual também funciona nas etapas de navegação e buscas.
(() => {
  const buttons=document.querySelectorAll('[data-user-view]');
  const table=document.querySelector('.data-table');if(!buttons.length||!table)return;
  table.querySelectorAll('tbody tr').forEach(row=>{row.dataset.userRole=Array.from(row.cells).some(cell=>cell.textContent.trim()==='Cliente')?'cliente':'equipe';});
  const count=group=>table.querySelectorAll('tbody tr[data-user-role="'+(group==='clientes'?'cliente':'equipe')+'"]').length;
  document.querySelectorAll('[data-user-count]').forEach(node=>node.textContent='('+count(node.dataset.userCount)+')');
  const apply=view=>{table.dataset.userView=view;buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.userView===view)));table.querySelectorAll('[data-row-select],[data-all]').forEach(box=>box.checked=false);};
  buttons.forEach(button=>button.addEventListener('click',()=>apply(button.dataset.userView)));apply('clientes');
})();

(() => {
  const table=document.querySelector('.data-table[data-user-view]');if(!table)return;
  const update=()=>{const counter=document.querySelector('#result-count,[data-search-results]');if(counter){const count=Array.from(table.tBodies[0].rows).filter(row=>row.getClientRects().length>0).length;counter.textContent=count+(count===1?' pessoa encontrada':' pessoas encontradas');}};
  document.querySelectorAll('[data-user-view],.filter-grid input,.filter-grid select,.filter-actions button').forEach(node=>{node.addEventListener('click',update);node.addEventListener('input',update);node.addEventListener('change',update);});update();
})();

(() => {
  const role=document.querySelector('#funcao'),requested=new URLSearchParams(location.search).get('funcao');
  if(role&&!role.disabled&&['Cliente','Funcionário','Gerente'].includes(requested))role.value=requested;
  document.querySelectorAll('[data-user-view]').forEach(button=>button.addEventListener('click',()=>{const link=document.querySelector('.page-actions a[href^="usuario_cadastrar"]');if(link)link.href=button.dataset.userView==='equipe'?'usuario_cadastrar.html?funcao=Funcionário':'usuario_cadastrar.html';}));
})();

// O nome completo permanece no cadastro e na identificação acessível.
(() => {
  const short=name=>{const words=String(name).trim().split(/\s+/);return words.length>1?words[0]+' '+words.at(-1):words[0];};
  if(document.body.dataset.stage==='3')return;
  const span=document.querySelector('.topbar__user span');if(span){span.title='Thiago Ferreira Prates Neves';span.firstChild.textContent='Thiago Prates';}
  const file=location.pathname.split('/').pop();const column=file==='usuarios.html'?2:file==='pets.html'?6:file==='reservas.html'?2:null;
  if(column!==null)document.querySelectorAll('.data-table tbody tr').forEach(row=>{const cell=row.cells[column];if(!cell)return;const full=cell.textContent.trim();cell.dataset.fullName=full;cell.title=full;cell.textContent=full==='Thiago Ferreira Prates Neves'?'Thiago Prates':short(full);});
})();
