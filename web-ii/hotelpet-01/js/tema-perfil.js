/* Autor: Thiago Ferreira Prates Neves | Professor: Lucas Santos de Oliveira.
   Temas e menu de perfil feitos com APIs nativas do navegador. */
(() => {
  const root=document.documentElement, key='hotelPet.tema';
  let theme='claro';try{theme=localStorage.getItem(key)==='escuro'?'escuro':'claro';}catch{}
  root.dataset.theme=theme;
  const bar=document.querySelector('.topbar');if(!bar)return;
  const toggle=document.createElement('button');toggle.type='button';toggle.className='theme-toggle';
  const icon=document.createElement('img');icon.src='imagens/icones/tema.svg';icon.alt='';toggle.append(icon);
  const sync=()=>{toggle.setAttribute('aria-label',theme==='claro'?'Ativar tema escuro':'Ativar tema claro');toggle.setAttribute('aria-pressed',String(theme==='escuro'));toggle.title=theme==='claro'?'Tema claro · mudar para escuro':'Tema escuro · mudar para claro';};
  toggle.addEventListener('click',()=>{theme=theme==='claro'?'escuro':'claro';root.dataset.theme=theme;try{localStorage.setItem(key,theme);}catch{}sync();});sync();
  const profile=bar.querySelector('.topbar__user');if(!profile){bar.append(toggle);return;}
  bar.insertBefore(toggle,profile);
  const text=profile.querySelector('span'),role=text?.querySelector('small')?.textContent||'Gerente';
  const name=Array.from(text?.childNodes||[]).filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join('').trim()||'Thiago Prates';
  const fullName=text?.title||'Thiago Ferreira Prates Neves';
  const button=document.createElement('button');button.type='button';button.className='topbar__user profile-toggle';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','menu-perfil');button.setAttribute('aria-label','Abrir opções de '+name);button.title=fullName;
  const avatar=profile.querySelector('img');if(avatar)button.append(avatar);
  const identity=document.createElement('span');identity.className='profile-identity';const nameLabel=document.createElement('span');nameLabel.className='profile-name';nameLabel.textContent=name;const roleLabel=document.createElement('small');roleLabel.className='profile-role';roleLabel.textContent=role;identity.append(nameLabel,roleLabel);button.append(identity);profile.replaceWith(button);
  const arrow=document.createElement('span');arrow.className='profile-chevron';arrow.textContent='⌄';arrow.setAttribute('aria-hidden','true');button.append(arrow);
  const panel=document.createElement('section');panel.id='menu-perfil';panel.className='profile-menu';panel.hidden=true;panel.setAttribute('aria-label','Opções do perfil');
  const heading=document.createElement('div');heading.className='profile-menu__heading';
  const photo=button.querySelector('img')?.cloneNode();if(photo){photo.alt='Foto de '+name;heading.append(photo);}
  const title=document.createElement('strong');title.textContent=name;const subtitle=document.createElement('span');subtitle.textContent=role;heading.append(title,subtitle);
  const details=document.createElement('p');details.textContent=fullName;
  const actions=document.createElement('div');actions.className='profile-menu__actions';
  for(const [label,href] of [['Meu perfil','perfil.html'],['Início','painel.html'],['Sair da demonstração','index.html']]){const link=document.createElement('a');link.href=href;link.textContent=label;actions.append(link);}
  panel.append(heading,details,actions);bar.append(panel);
  if(window.ResizeObserver)new ResizeObserver(()=>root.style.setProperty('--topbar-height',bar.getBoundingClientRect().height+'px')).observe(bar);
  const close=()=>{panel.hidden=true;button.setAttribute('aria-expanded','false');};
  button.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;button.setAttribute('aria-expanded',String(open));});
  document.addEventListener('click',event=>{if(!panel.contains(event.target)&&!button.contains(event.target))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){close();button.focus();}});
})();
