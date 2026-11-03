import os
import shutil

ROOT = r"C:\Users\Thiago\Desktop\HotelPet"
FINAL = os.path.join(ROOT, "web-ii", "hotelpet-final")

print("Promovendo arquivos da versao final para a raiz do repositorio...")

# 1. Copia todos os HTMLs de hotelpet-final para a raiz
for item in os.listdir(FINAL):
    src = os.path.join(FINAL, item)
    dst = os.path.join(ROOT, item)
    
    if os.path.isfile(src) and item.endswith((".html", ".txt", ".xml")):
        shutil.copy2(src, dst)
        print(f"Copiado para a raiz: {item}")

# 2. Copia/Mescla pastas essenciais (css, js, imagens)
for folder in ["css", "js", "imagens"]:
    src_folder = os.path.join(FINAL, folder)
    dst_folder = os.path.join(ROOT, folder)
    
    if os.path.isdir(src_folder):
        if not os.path.exists(dst_folder):
            os.makedirs(dst_folder, exist_ok=True)
        for root_dir, dirs, files in os.walk(src_folder):
            rel_path = os.path.relpath(root_dir, src_folder)
            target_dir = os.path.join(dst_folder, rel_path)
            os.makedirs(target_dir, exist_ok=True)
            for file in files:
                shutil.copy2(os.path.join(root_dir, file), os.path.join(target_dir, file))
        print(f"Sincronizada pasta com a raiz: {folder}/")

print("Raiz do repositorio atualizada com sucesso para URLs limpas!")
