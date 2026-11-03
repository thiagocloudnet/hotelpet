"""Integra o módulo de fuso às telas finais e preserva os componentes comuns."""
from pathlib import Path
root = Path(__file__).resolve().parents[1]
final = root / 'web-ii/hotelpet-final'
for path in final.glob('*.html'):
    text = path.read_text(encoding='utf-8-sig')
    if '<script ' in text and 'src="js/fuso-horario.js"' not in text:
        text = text.replace('<script ', '<script src="js/fuso-horario.js" defer></script>\n    <script ', 1)
    text = text.replace('no horário de Brasília', 'no fuso configurado do hotel')
    path.write_text(text, encoding='utf-8')
for path in (final/'js').glob('*.js'):
    if path.name == 'fuso-horario.js': continue
    text = path.read_text(encoding='utf-8-sig')
    text = text.replace('timeZone: "America/Sao_Paulo"', 'timeZone: (window.HotelPetFuso?.zone() || "America/Sao_Paulo")') if path.name != 'hotel-config.js' else text
    text = text.replace('"Data e hora de Brasília"', '"Data e hora de " + (window.HotelPetFuso?.label() || "Brasília")')
    text = text.replace('" · Brasília"', '" · " + (window.HotelPetFuso?.label() || "Brasília")')
    text = text.replace('" (Brasília)"', '" (" + (window.HotelPetFuso?.label() || "Brasília") + ")"')
    for movement in ['Entrada', 'Saída']:
        text = text.replace('"'+movement+' real (Brasília)"', '"'+movement+' real (" + window.HotelPetFuso.label() + ")"')
    text = text.replace('horário de Brasília', 'fuso configurado do hotel').replace(' · Brasília (24 horas)', ' · fuso configurado (24 horas)')
    if path.name == 'interface.js':
        text = text.replace('second: "2-digit",', 'second: "2-digit",\n      hourCycle: "h23",')
    path.write_text(text, encoding='utf-8')
for stage in ['hotelpet-01', 'hotelpet-02']:
    (root/'web-ii'/stage/'js/interface.js').write_text((final/'js/interface.js').read_text(encoding='utf-8'), encoding='utf-8')
