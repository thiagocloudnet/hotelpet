import os

ROOT = r"C:\Users\Thiago\Desktop\HotelPet"

print("Iniciando troca de fuso horário padrão para Bahia (America/Bahia)...")

# 1. fuso-horario.js
fuso_files = [
    os.path.join(ROOT, "js", "fuso-horario.js"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "js", "fuso-horario.js"),
    os.path.join(ROOT, ".dist-pages", "js", "fuso-horario.js"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "js", "fuso-horario.js")
]

for p in fuso_files:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            c = f.read()
        # Inverte a ordem das zonas do Brasil para Bahia ser a primeira
        if '["America/Sao_Paulo", "Brasília"],\n        ["America/Bahia", "Bahia"]' in c:
            c = c.replace(
                '["America/Sao_Paulo", "Brasília"],\n        ["America/Bahia", "Bahia"]',
                '["America/Bahia", "Bahia"],\n        ["America/Sao_Paulo", "Brasília"]'
            )
        # Substitui o fuso padrão
        c = c.replace(
            '{ country: "BR", timeZone: "America/Sao_Paulo" }',
            '{ country: "BR", timeZone: "America/Bahia" }'
        )
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Atualizado fuso-horario.js: {p}")

# 2. hotel-config.js
config_files = [
    os.path.join(ROOT, "js", "hotel-config.js"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "js", "hotel-config.js"),
    os.path.join(ROOT, ".dist-pages", "js", "hotel-config.js"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "js", "hotel-config.js")
]

for p in config_files:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            c = f.read()
        c = c.replace('timeZone: "America/Sao_Paulo"', 'timeZone: "America/Bahia"')
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Atualizado hotel-config.js: {p}")

# 3. analytics-eventos.js
analytics_files = [
    os.path.join(ROOT, "js", "analytics-eventos.js"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "js", "analytics-eventos.js"),
    os.path.join(ROOT, ".dist-pages", "js", "analytics-eventos.js"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "js", "analytics-eventos.js")
]

for p in analytics_files:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            c = f.read()
        c = c.replace("'America/Sao_Paulo'", "'America/Bahia'")
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Atualizado analytics-eventos.js: {p}")

# 4. fechamento-caixa.js
fechamento_files = [
    os.path.join(ROOT, "js", "fechamento-caixa.js"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "js", "fechamento-caixa.js"),
    os.path.join(ROOT, ".dist-pages", "js", "fechamento-caixa.js"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "js", "fechamento-caixa.js")
]

for p in fechamento_files:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            c = f.read()
        c = c.replace("Brasília", "Bahia")
        c = c.replace("America/Sao_Paulo", "America/Bahia")
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Atualizado fechamento-caixa.js: {p}")

# 5. index.html e configuracoes.html
html_files = [
    os.path.join(ROOT, "index.html"),
    os.path.join(ROOT, "configuracoes.html"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "index.html"),
    os.path.join(ROOT, "web-ii", "hotelpet-final", "configuracoes.html"),
    os.path.join(ROOT, ".dist-pages", "index.html"),
    os.path.join(ROOT, ".dist-pages", "configuracoes.html"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "index.html"),
    os.path.join(ROOT, ".dist-pages", "web-ii", "hotelpet-final", "configuracoes.html")
]

for p in html_files:
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            c = f.read()
        c = c.replace("Brasília", "Bahia")
        c = c.replace("Brasilia", "Bahia")
        c = c.replace("America/Sao_Paulo", "America/Bahia")
        with open(p, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Atualizado HTML: {p}")

# 6. scripts/injetar_seo_analytics.py
injetor = os.path.join(ROOT, "scripts", "injetar_seo_analytics.py")
if os.path.exists(injetor):
    with open(injetor, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("Brasília", "Bahia")
    c = c.replace("America/Sao_Paulo", "America/Bahia")
    with open(injetor, "w", encoding="utf-8") as f:
        f.write(c)
    print("Atualizado scripts/injetar_seo_analytics.py")

# 7. tests/verificar-fuso-configuravel.cjs
teste_fuso = os.path.join(ROOT, "tests", "verificar-fuso-configuravel.cjs")
if os.path.exists(teste_fuso):
    with open(teste_fuso, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace("'America/Sao_Paulo'", "'America/Bahia'")
    c = c.replace("/Brasília/", "/Bahia/")
    c = c.replace("Brasília", "Bahia")
    with open(teste_fuso, "w", encoding="utf-8") as f:
        f.write(c)
    print("Atualizado tests/verificar-fuso-configuravel.cjs")

print("Fuso horário alterado para Bahia com sucesso!")
