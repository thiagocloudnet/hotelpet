"""Atualiza catálogo estático e obtém imagens com créditos; não integra a execução do site."""
import concurrent.futures, hashlib, json, os, re, threading, time, unicodedata, urllib.request, urllib.parse
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
FINAL = ROOT / 'web-ii/hotelpet-final'
HEADERS = {'User-Agent': 'HotelPetAcademic/1.0 (breed catalogue; educational static project)'}
request_lock = threading.Lock()
last_request = {}

def request(url, binary=False):
    if binary and 'wikimedia.org/' in url: url=url.split('?')[0]
    for attempt in range(1):
        try:
            host = urllib.parse.urlparse(url).netloc
            interval = 3 if host.endswith('wikipedia.org') or host.endswith('wikimedia.org') else 1.6
            with request_lock:
                time.sleep(max(0, interval - (time.monotonic() - last_request.get(host, 0))))
                last_request[host] = time.monotonic()
            with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=7) as response:
                value = response.read()
                return value if binary else json.loads(value)
        except Exception as error:
            if getattr(error,'code',None) in (403,404,429): raise
            if attempt == 0: raise
            time.sleep(1 + attempt)

def normalize(name):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower())

def cat_key(name):
    value=normalize(name)
    return {'mainecooncat':'mainecoon','norwegianforestcat':'norwegianforest','exotic':'exoticshorthair','sacredbirman':'birman','donsphynx':'donskoy'}.get(value,value)

def main():
    base = json.loads((ROOT / 'scripts/catalogo-racas-base.json').read_text(encoding='utf-8'))
    dogs = base['dogs']; cats = base['cats']
    fci = BeautifulSoup((ROOT / 'relatorios/referencia-fci.html').read_text(encoding='utf-8'), 'html.parser')
    pages = [(a.get_text(' ', strip=True), urllib.parse.urljoin('https://www.fci.be', a['href'])) for a in fci.select('a[href]') if re.fullmatch(r'Group \d+', a.get_text(strip=True))]
    def group_page(pair):
        title, url = pair
        saved_page=ROOT/('relatorios/referencia-fci-grupo-'+title.split()[-1]+'.html')
        if saved_page.exists(): html=saved_page.read_text(encoding='utf-8')
        else:
            html = request(url, True).decode('utf-8')
            saved_page.write_text(html,encoding='utf-8')
        result=[]
        for a in BeautifulSoup(html,'html.parser').select('a[href]'):
            match=re.search(r'/nomenclature/[^/]+-(\d+)\.html',a['href'],re.I)
            if match:
                label=re.sub(r'\s*\(\d+\)\s*',' ',a.get_text(' ',strip=True)).strip()
                if label: result.append({'name': label.title(), 'officialName':label, 'code':match[1], 'group':'Grupo FCI '+title.split()[-1], 'source':url})
        return result
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for entries in pool.map(group_page, pages):
            for entry in entries:
                if not any(str(item.get('code')) == entry['code'] for item in dogs): dogs.append(entry)
    for a in fci.select('a.nom[href]'):
        code=a.get('name')
        if code and not any(str(item.get('code'))==code for item in dogs):
            label=re.sub(r'\s*\('+re.escape(code)+r'\)\s*',' ',a.get_text(' ',strip=True)).strip()
            pdf=str(a.parent)
            group=re.search(r'\d+g(\d+)-en',pdf)
            dogs.append({'name':label.title(),'officialName':label.title(),'code':code,'group':'Grupo FCI '+str(int(group[1])) if group else 'Reconhecimento provisório FCI','source':urllib.parse.urljoin('https://www.fci.be',a['href'])})
    # Nomes e variedades presentes na lista pública da TICA consultada em 03/11/2026.
    tica = 'American Bobtail Shorthair|American Curl Longhair|Australian Mist|Bengal Longhair|British Longhair|Burmilla Longhair|Chausie|Cherubim|Cymric|Cymric Tailed|Donskoy|Highlander|Highlander Shorthair|Himalayan|Japanese Bobtail Longhair|Kurilian Bobtail|Kurilian Bobtail Longhair|LaPerm Shorthair|Maine Coon Polydactyl|Manx Tailed|Minuet|Minuet Longhair|Minuet Talls|Minuet Talls Longhair|Munchkin|Munchkin Longhair|Nebelung|Oriental Longhair|Oriental Shorthair|Peterbald|Pixiebob|Pixiebob Longhair|Savannah|Scottish Fold Longhair|Scottish Straight|Scottish Straight Longhair|Selkirk Rex Longhair|Snowshoe|Tennessee Rex|Thai|Toyger'.split('|')
    translations={'Longhair':'pelo longo','Shorthair':'pelo curto','Polydactyl':'polidáctilo','Tailed':'com cauda','Talls':'pernas longas','Himalayan':'Himalaio'}
    for name in tica:
        if not any(cat_key(item.get('officialName',item['name'])) == cat_key(name) for item in cats):
            display=name
            for word, translated in translations.items(): display=display.replace(word,translated)
            cats.append({'name':display,'officialName':name,'group':'Raças e variedades TICA','source':'https://tica.org/ticas-breeds/browse-all-breeds/'})
    aliases={'Sacred Birman':'Birman','Norwegian Forest Cat':'Norwegian Forest','Kurilean Bobtail Longhair':'Kurilian Bobtail Longhair','Kurilean Bobtail Shorthair':'Kurilian Bobtail','Don Sphynx':'Donskoy','Exotic':'Exotic Shorthair','European':'European Shorthair'}
    fife=BeautifulSoup((ROOT/'relatorios/referencia-fife.html').read_text(encoding='utf-8'),'html.parser')
    for h in fife.select('h3'):
        match=re.match(r'^([A-Z]{3})\s*[–-]\s*(.+)$',h.get_text(' ',strip=True))
        if not match or match[1] in ('HCL','HCS'): continue
        name=aliases.get(match[2],match[2])
        if not any(cat_key(item.get('officialName',item['name'])) == cat_key(name) for item in cats):
            display=name
            for word, translated in translations.items(): display=display.replace(word,translated)
            cats.append({'name':display,'officialName':name,'group':'Raças e variedades FIFe','source':'https://fifeweb.org/cats/breeds/'})
    # Complementos da API possuem referência identificada; não são apresentados como raças FCI.
    api=json.loads((ROOT/'relatorios/referencia-dogapi.json').read_text(encoding='utf-8'))['data']
    api_index={}
    for record in api:
        attributes=record['attributes']
        for name in [attributes['name']]+attributes.get('other_names',[]): api_index[normalize(name)]=attributes
    # Nomes oficiais prevalecem sobre apelidos ambíguos de outras raças.
    for record in api: api_index[normalize(record['attributes']['name'])]=record['attributes']
    matched=set()
    for item in dogs:
        names=[item['name'],item.get('officialName','')]
        names += [part for name in list(names) for part in re.split(r'[()]',name)]
        for name in names:
            if normalize(name) in api_index: matched.add(api_index[normalize(name)]['name'])
    for record in api:
        attributes=record['attributes']
        if attributes['name'] not in matched:
            dogs.append({'name':attributes['name'],'officialName':attributes['name'],'group':'Outras raças documentadas','source':'https://dogapi.dog/docs/api-v2'})
    for item in dogs:
        item.setdefault('source','https://www.fci.be/en/nomenclature/Default.aspx')
    for item in cats: item.setdefault('source','https://cfa.org/breeds/')
    base['consulted']='2026-11-03'
    base['sources']=['https://www.fci.be/en/nomenclature/Default.aspx','https://cfa.org/breeds/','https://tica.org/ticas-breeds/browse-all-breeds/','https://fifeweb.org/cats/breeds/','https://dogapi.dog/docs/api-v2']
    base['others']={
        'Roedor':[
            {'name':'Hamster Sírio','officialName':'Golden hamster','group':'Hamsters'},
            {'name':'Hamster Anão Russo','officialName':'Winter white dwarf hamster','group':'Hamsters'},
            {'name':'Hamster Campbell','officialName':"Campbell's dwarf hamster",'group':'Hamsters'},
            {'name':'Hamster Roborovski','officialName':'Roborovski hamster','group':'Hamsters'},
            {'name':'Hamster Chinês','officialName':'Chinese hamster','group':'Hamsters'},
            {'name':'Porquinho-da-Índia','officialName':'Guinea pig','group':'Porquinhos-da-índia'},
            {'name':'Chinchila','officialName':'Chinchilla','group':'Chinchilas'},
            {'name':'Gerbo Mongol','officialName':'Mongolian gerbil','group':'Gerbos'},
            {'name':'Rato Doméstico','officialName':'Fancy rat','group':'Ratos e camundongos'},
            {'name':'Camundongo Doméstico','officialName':'Fancy mouse','group':'Ratos e camundongos'},
            {'name':'Degu','officialName':'Common degu','group':'Degus'}],
        'Coelho':[{'name':name,'officialName':title,'group':'Coelhos (lagomorfos)'} for name,title in [('Angorá','Angora rabbit'),('Mini Lop','Mini Lop'),('Rex','Rex rabbit'),('Holandês','Dutch rabbit')]],
        'Ave':[{'name':name,'officialName':title,'group':'Aves'} for name,title in [('Calopsita','Cockatiel'),('Periquito','Budgerigar'),('Canário','Domestic canary'),('Papagaio','Parrot')]],
        'Réptil':[{'name':name,'officialName':title,'group':'Répteis'} for name,title in [('Jabuti','Red-footed tortoise'),('Iguana','Green iguana'),('Gecko Leopardo','Leopard gecko')]]}
    for name,title in [('Cabeça-de-leão','Lionhead rabbit'),('Anão Holandês','Netherland Dwarf rabbit'),('Gigante de Flandres','Flemish Giant rabbit'),('Mini Rex','Mini Rex'),('Holland Lop','Holland Lop'),('Nova Zelândia','New Zealand rabbit'),('Califórnia','Californian rabbit'),('Hotot Anão','Dwarf Hotot')]:
        base['others']['Coelho'].append({'name':name,'officialName':title,'group':'Coelhos (lagomorfos)','source':'https://arba.net/recognized-breeds/'})
    for kind,items in base['others'].items():
        for item in items:
            item['source']=item.get('source') or ('https://www.merckvetmanual.com/exotic-and-laboratory-animals/rodents/rodents' if kind=='Roedor' else 'https://www.si.edu/stories/five-rabbit-facts' if kind=='Coelho' else 'https://en.wikipedia.org/wiki/'+urllib.parse.quote(item['officialName'].replace(' ','_')))
    directory=FINAL/'imagens/racas';directory.mkdir(exist_ok=True)
    cache_path=ROOT/'relatorios/imagens-racas-coleta.json'
    cache=json.loads(cache_path.read_text(encoding='utf-8')) if cache_path.exists() else {}
    title_path=ROOT/'scripts/racas-titulos-referencia.json'
    reference_titles=json.loads(title_path.read_text(encoding='utf-8')) if title_path.exists() else {}
    def dog_key(name):
        value=normalize(name)
        if value.endswith('dog'): value=value[:-3]
        return {'japaneseakitainu':'akita','chinesesharpei':'sharpei','koreajindo':'jindo','centralasiashepherd':'centralasianshepherd','xoloitzcuintli':'xoloitzcuintle'}.get(value,value)
    registered={}
    for item in dogs:
        if item['group']=='Outras raças documentadas': continue
        names=[item['name'],item.get('officialName',''),reference_titles.get(item.get('officialName',''),'')]
        names += [part for name in list(names) for part in re.split(r'[()]',name)]
        for name in names:
            if name.strip(): registered[dog_key(name)]=item
    unique=[];seen=set()
    for item in dogs:
        key=dog_key(item.get('officialName',item['name']))
        if item['group']=='Outras raças documentadas' and key in registered:
            registered[key].setdefault('aliases',[]).append(item['name'])
            continue
        if key in seen: continue
        seen.add(key);unique.append(item)
    dogs[:]=unique
    def image_info(kind,item):
        key=kind+':'+item.get('officialName',item['name'])
        if key in cache and cache[key].get('image') and (FINAL/cache[key]['image']).exists(): return key,cache[key]
        slug=kind+'-'+normalize(item.get('officialName',item['name']))
        metadata={}
        candidates=[]
        if kind=='cao' and item.get('code')!='57':
            possible=[item.get('officialName',''),item['name']]
            possible += [part.strip() for name in list(possible) for part in re.split(r'[()]',name) if part.strip()]
            attributes=next((api_index[normalize(name)] for name in possible if normalize(name) in api_index),None)
            if attributes:
                for picture in attributes.get('images',[]):
                    credit=picture.get('attribution',{})
                    if credit.get('author') and credit.get('source_url') and (credit.get('license','').upper().startswith('CC') or credit.get('license')=='Public domain'):
                        candidates.append((picture.get('thumb') or picture['url'],{'author':credit.get('author','Autor indicado na fonte'),'license':credit['license'],'licenseUrl':credit.get('license_url',''),'sourceUrl':credit['source_url']}))
                        if 'commons.wikimedia.org/wiki/File:' in credit['source_url']:
                            filename=urllib.parse.unquote(credit['source_url'].split('File:',1)[1]).replace(' ','_')
                            digest=hashlib.md5(filename.encode()).hexdigest()
                            thumb=f'https://upload.wikimedia.org/wikipedia/commons/thumb/{digest[0]}/{digest[:2]}/{urllib.parse.quote(filename)}/330px-{urllib.parse.quote(filename)}'
                            candidates.append((thumb,candidates[-1][1]))
                        break
        if not candidates:
            title=item.get('officialName',item['name'])
            title_aliases={'Norwegian Forest':'Norwegian Forest cat','European':'European Shorthair','Exotic':'Exotic Shorthair','Siamese':'Siamese cat','Persian':'Persian cat','Bengal':'Bengal cat','Balinese':'Balinese cat','Burmese':'Burmese cat','Birman':'Birman','American Curl Longhair':'American Curl','Kurilian Bobtail Longhair':'Kurilian Bobtail','Kurilean Bobtail Longhair':'Kurilian Bobtail','Kurilean Bobtail Shorthair':'Kurilian Bobtail','Sacred Birman':'Birman','Donskoy':'Donskoy cat','Don Sphynx':'Donskoy cat','Australian Mist':'Australian Mist','Himalayan':'Himalayan cat','Thai':'Thai cat','Bombay':'Bombay cat','Russian Blue':'Russian Blue','Scottish Fold Longhair':'Scottish Fold','Scottish Straight':'Scottish Fold','Scottish Straight Longhair':'Scottish Fold','Minuet':'Minuet cat','Minuet Talls':'Minuet cat','Minuet Longhair':'Minuet cat','Minuet Talls Longhair':'Minuet cat','Manx Tailed':'Manx cat','Cymric Tailed':'Cymric cat','Cherubim':'Ragdoll','Maine Coon Polydactyl':'Maine Coon','SRD cão':'Mongrel','SRD gato':'Domestic short-haired cat'}
            for wrong in ['Cherubim','Scottish Straight','Scottish Straight Longhair']:
                title_aliases.pop(wrong,None)
            title_aliases.update({'Abyssinian':'Abyssinian cat','Oriental':'Oriental cat','Cherubim':'Cherubim cat','Cymric':'Cymric cat','Highlander':'Highlander cat','Minuet':'Minuet cat','Munchkin':'Munchkin cat','Savannah':'Savannah cat','Siberian':'Siberian cat','Balinese':'Balinese cat','Javanese':'Javanese cat','Khao Manee':'Khao Manee'})
            title=title_aliases.get(title,title)
            title=reference_titles.get(item.get('officialName',item['name']),title)
            if kind=='gato':
                for ending in [' Longhair',' Shorthair']:
                    if title.endswith(ending) and title not in ['British Shorthair','British Longhair','American Shorthair','Exotic Shorthair','Oriental Shorthair','Oriental Longhair','European Shorthair']:
                        title=title[:-len(ending)]
            try:
                possible=[title]
                if kind=='cao': possible += [part.strip() for part in re.split(r'[()]',title) if part.strip()]
                summary=None
                for possibility in dict.fromkeys(possible):
                    try:
                        candidate=request('https://en.wikipedia.org/api/rest_v1/page/summary/'+urllib.parse.quote(possibility.replace(' ','_'),safe=''))
                        if candidate.get('type')!='disambiguation' and candidate.get('originalimage'):
                            summary=candidate;break
                    except Exception: pass
                if not summary: raise ValueError('Página da raça sem imagem confirmada')
                original=summary.get('originalimage',{}).get('source','').split('?')[0]
                if '/commons/' in original:
                    filename=urllib.parse.unquote(original.split('/')[-2] if '/thumb/' in original else original.rsplit('/',1)[-1])
                    query={'action':'query','format':'json','prop':'imageinfo','iiprop':'extmetadata|url','iiurlwidth':400,'titles':'File:'+filename}
                    response=request('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(query))
                    page=next(iter(response['query']['pages'].values()))
                    info=page['imageinfo'][0];meta=info.get('extmetadata',{})
                    license_name=meta.get('LicenseShortName',{}).get('value','')
                    if license_name and ('CC' in license_name.upper() or 'PUBLIC DOMAIN' in license_name.upper()):
                        candidates.append((info.get('thumburl') or info['url'],{'author':BeautifulSoup(meta.get('Artist',{}).get('value','Autor indicado na fonte'),'html.parser').get_text(' ',strip=True),'license':license_name,'licenseUrl':meta.get('LicenseUrl',{}).get('value',''),'sourceUrl':info.get('descriptionurl',''),'referenceTitle':summary.get('title',title)}))
            except Exception as error: metadata['reason']=str(error)
        for url,credit in candidates:
            try:
                data=request(url,True)
                if len(data)<100 or data.lstrip().startswith(b'<'): raise ValueError('Resposta sem imagem')
                extension='.webp' if data[:4]==b'RIFF' and data[8:12]==b'WEBP' else '.png' if data[:8]==b'\x89PNG\r\n\x1a\n' else '.jpg' if data[:2]==b'\xff\xd8' else None
                if not extension: raise ValueError('Formato de imagem não confirmado')
                path=directory/(slug+extension);path.write_bytes(data)
                return key,{'image':path.relative_to(FINAL).as_posix(),**credit}
            except Exception as error: metadata['reason']=str(error)
        return key,{'missing':True,**metadata}
    jobs=[('cao',item) for item in dogs]+[('gato',item) for item in cats]+[(normalize(kind),item) for kind,items in base['others'].items() for item in items]+[('cao',{'name':'Sem raça definida','officialName':'SRD cão'}),('gato',{'name':'Sem raça definida','officialName':'SRD gato'})]
    jobs.sort(key=lambda pair: 0 if cache.get(pair[0]+':'+pair[1].get('officialName',pair[1]['name']),{}).get('image') else 1 if pair[1]['name']=='Sem raça definida' else 2 if pair[0] not in ('cao','gato') else 3 if pair[0]=='gato' else 4)
    def publish():
        for kind,items in [('cao',dogs),('gato',cats)]+[(normalize(kind),items) for kind,items in base['others'].items()]:
            for item in items:
                item.update(cache.get(kind+':'+item.get('officialName',item['name']),{'missing':True}))
                if item.get('image'):
                    item.pop('missing',None);item.pop('reason',None)
        for item in cats:
            if item['name']=='Maine Coon Cat':item['name']='Maine Coon'
        base['srd']={'Cachorro':cache.get('cao:SRD cão',{}),'Gato':cache.get('gato:SRD gato',{})}
        path=FINAL/'js/catalogo-racas.js'
        temporary=path.with_suffix('.tmp')
        temporary.write_text('/* Catálogo estático com créditos individuais das imagens. */\nwindow.HotelPetRacas = '+json.dumps(base,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
        temporary.replace(path)
        all_entries=[('Cachorro',item) for item in dogs]+[('Gato',item) for item in cats]+[(kind,item) for kind,items in base['others'].items() for item in items]+[(kind,{'name':'Sem raça definida',**item}) for kind,item in base['srd'].items()]
        report={'data':'2026-11-03','caes':len(dogs),'gatos':len(cats),'outros':{kind:len(items) for kind,items in base['others'].items()},'totalOpcoes':len(all_entries),'comImagem':sum(bool(item.get('image')) for kind,item in all_entries),'pendentes':[{'tipo':kind,'nome':item['name']} for kind,item in all_entries if not item.get('image')]}
        (ROOT/'relatorios/atualizacao-racas.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    publish()
    if os.environ.get('HOTELPET_PUBLISH_ONLY')=='1': return
    with concurrent.futures.ThreadPoolExecutor(max_workers=int(os.environ.get('HOTELPET_IMAGE_WORKERS','2'))) as pool:
        futures=[pool.submit(image_info,*job) for job in jobs]
        for number,future in enumerate(concurrent.futures.as_completed(futures),1):
            key,value=future.result();cache[key]=value
            if number%20==0:
                cache_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8');publish();print('Imagens verificadas:',number,'de',len(jobs),flush=True)
    cache_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8')
    for kind,items in [('cao',dogs),('gato',cats)]:
        for item in items: item.update(cache[kind+':'+item.get('officialName',item['name'])])
    for kind,items in base['others'].items():
        for item in items: item.update(cache[normalize(kind)+':'+item['officialName']])
    base['srd']={'Cachorro':cache['cao:SRD cão'],'Gato':cache['gato:SRD gato']}
    (FINAL/'js/catalogo-racas.js').write_text('/* Catálogo estático; referências e créditos de cada imagem acompanham os registros. */\nwindow.HotelPetRacas = '+json.dumps(base,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    publish()
    summary=json.loads((ROOT/'relatorios/atualizacao-racas.json').read_text(encoding='utf-8'))
    print(json.dumps({key:value for key,value in summary.items() if key!='pendentes'},ensure_ascii=False),flush=True)

if __name__=='__main__': main()

