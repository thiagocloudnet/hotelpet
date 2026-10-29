/* Autor: Thiago Ferreira Prates Neves | Professor: Lucas Santos de Oliveira.
   Programação Web II — autocomplete local com distância de Levenshtein. */
(() => {
  const bar = document.querySelector('.topbar');
  if (!bar) return;
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  function distance(a, b) {
    let previous = Array.from({length: b.length + 1}, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const current = [i];
      for (let j = 1; j <= b.length; j++) current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] !== b[j - 1]));
      previous = current;
    }
    return previous[b.length];
  }
  function score(query, value) {
    const text = normalize(value);
    if (text === query) return 100;
    if (text.startsWith(query)) return 95;
    if (text.includes(query)) return 85;
    if (query.length < 3) return 0;
    return Math.max(0, ...text.split(/\s+/).map(word => {
      const edits = distance(query, word);
      return edits <= (query.length > 5 ? 2 : 1) ? 70 - edits * 10 : 0;
    }));
  }
  const container = document.createElement('div');
  container.className = 'global-search';
  const input = document.createElement('input');
  input.type = 'search'; input.placeholder = 'Pesquisar…'; input.maxLength = 80;
  input.setAttribute('aria-label', 'Pesquisar páginas, pets, usuários e reservas');
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-controls', 'pesquisa-sugestoes');
  input.autocomplete = 'off';
  const list = document.createElement('ul');
  list.id = 'pesquisa-sugestoes'; list.className = 'global-search__results'; list.setAttribute('role', 'listbox'); list.setAttribute('aria-label', 'Sugestões de pesquisa'); list.hidden = true;
  const status = document.createElement('span'); status.className = 'global-search__status'; status.setAttribute('role', 'status');
  container.append(input, list, status);
  bar.insertBefore(container, bar.querySelector('.theme-toggle'));
  let matches = [], active = -1;
  const pages = [
    ['Painel', 'Início ocupação resumo', 'painel.html'], ['Pets', 'Animais hospedagem', 'pets.html'],
    ['Usuários', 'Clientes responsáveis equipe funcionários', 'usuarios.html'], ['Reservas', 'Estadias hospedagens', 'reservas.html'],
    ['Configurações', 'Tarifas diárias vagas preços', 'configuracoes.html'], ['Perfil', 'Gerente meus dados', 'perfil.html'],
    ['Cadastrar pet', 'Novo animal', 'pet_cadastrar.html'], ['Cadastrar usuário', 'Novo cliente responsável', 'usuario_cadastrar.html'],
    ['Cadastrar reserva', 'Nova hospedagem', 'reserva_cadastrar.html']
  ].map(([label, keywords, url]) => ({label, detail: 'Página', keywords, url}));
  function entries() {
    const data = window.HotelPetSearchRecords?.() || {};
    return [...pages,
      ...(data.pets || []).map(p => ({label: p.name, detail: 'Pet · ' + p.owner, keywords: [p.name, p.race, p.owner].join(' '), url: 'pet_visualizar.html?id=' + encodeURIComponent(p.id)})),
      ...(data.users || []).map(u => ({label: u.name, detail: 'Usuário · ' + u.role, keywords: [u.name, u.email].join(' '), url: 'usuario_visualizar.html?id=' + encodeURIComponent(u.id)})),
      ...(data.reservas || []).map(r => ({label: window.HotelPetDemo.reservationCode(r.number), detail: 'Reserva · ' + r.pet, keywords: [r.pet, r.owner, r.status].join(' '), url: 'reserva_visualizar.html?id=' + encodeURIComponent(r.id)}))];
  }
  function close() { list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); active = -1; }
  function select(index) {
    active = index;
    [...list.children].forEach((node, i) => node.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', list.children[active].id);
    list.children[active].scrollIntoView({block: 'nearest'});
  }
  function render() {
    const query = normalize(input.value).slice(0, 80);
    list.replaceChildren(); active = -1; input.removeAttribute('aria-activedescendant');
    if (!query) { matches = []; status.textContent = ''; close(); return; }
    matches = entries().map(item => ({...item, score: Math.max(score(query, item.label), score(query, item.keywords))})).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, 'pt-BR')).slice(0, 8);
    for (const [index, item] of matches.entries()) {
      const option = document.createElement('li'); option.id = 'pesquisa-opcao-' + index; option.setAttribute('role', 'option'); option.setAttribute('aria-selected', 'false');
      const title = document.createElement('strong'), description = document.createElement('small');
      title.textContent = item.label; description.textContent = item.detail; option.append(title, description);
      option.addEventListener('click', () => location.assign(item.url)); list.append(option);
    }
    status.textContent = matches.length ? matches.length + ' sugestões disponíveis.' : 'Nenhum resultado encontrado.';
    if (!matches.length) { const empty = document.createElement('li'); empty.textContent = 'Nenhum resultado encontrado.'; empty.setAttribute('role', 'presentation'); list.append(empty); }
    list.hidden = false; input.setAttribute('aria-expanded', 'true');
  }
  input.addEventListener('input', render);
  input.addEventListener('focus', render);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(); return; }
    if (event.key === 'Tab') { close(); return; }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); if (list.hidden) render(); if (!matches.length) return;
      select((active + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length);
    }
    if (event.key === 'Enter' && !list.hidden && matches.length) { event.preventDefault(); location.assign(matches[active < 0 ? 0 : active].url); }
  });
  document.addEventListener('click', event => { if (!container.contains(event.target)) close(); });
})();
