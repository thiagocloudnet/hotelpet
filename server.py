import http.server
import socketserver
import os
import sys

# Força codificação UTF-8 no Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PORT = int(os.environ.get("PORT", 8090))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class HotelPetHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Desativa cache para desenvolvimento
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def do_GET(self):
        # Rota raiz serve index.html limpo
        if self.path == "/" or self.path == "":
            self.path = "/index.html"
        return super().do_GET()

    def guess_type(self, path):
        mime = super().guess_type(path)
        if path.endswith(".js"):
            return "text/javascript; charset=utf-8"
        if path.endswith(".css"):
            return "text/css; charset=utf-8"
        if path.endswith(".html"):
            return "text/html; charset=utf-8"
        if path.endswith(".json"):
            return "application/json; charset=utf-8"
        if path.endswith(".svg"):
            return "image/svg+xml"
        return mime

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == "__main__":
    try:
        with ReusableTCPServer(("0.0.0.0", PORT), HotelPetHandler) as httpd:
            print(f"Hotel Pet rodando em: http://127.0.0.1:{PORT}/")
            print(f"Diretório servido: {BASE_DIR}")
            sys.stdout.flush()
            httpd.serve_forever()
    except Exception as e:
        print(f"Erro ao iniciar servidor na porta {PORT}: {e}", file=sys.stderr)
        sys.exit(1)
