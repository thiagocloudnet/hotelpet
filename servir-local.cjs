/* Servidor estático de desenvolvimento — Thiago Ferreira Prates Neves.
   Professor Lucas Santos de Oliveira — o trabalho continua sem backend. */
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const root=fs.realpathSync(process.env.HOTELPET_ROOT||path.join(__dirname,'web-ii','hotelpet-final'));
const port=Number(process.env.PORT||8080);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.ico':'image/x-icon'};
const server=http.createServer((request,response)=>{
  if(!['GET','HEAD'].includes(request.method)){response.writeHead(405).end();return;}
  let pathname;try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400).end();return;}
  const requested=path.resolve(root,'.'+(pathname==='/'?'/painel.html':pathname));
  if(!requested.startsWith(root+path.sep)){response.writeHead(403).end();return;}
  fs.realpath(requested,(error,real)=>{
    if(error||!real.startsWith(root+path.sep)){response.writeHead(404).end('Página não encontrada');return;}
    fs.stat(real,(error,stat)=>{
      if(error||!stat.isFile()){response.writeHead(404).end();return;}
      response.writeHead(200,{'Content-Type':mime[path.extname(real)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      if(request.method==='HEAD')response.end();else fs.createReadStream(real).pipe(response);
    });
  });
});
server.listen(port,'0.0.0.0',()=>{
  console.log('Hotel Pet: http://localhost:'+port+'/');
  for(const interfaces of Object.values(os.networkInterfaces()))for(const net of interfaces||[])if(net.family==='IPv4'&&!net.internal&&!net.address.startsWith('169.254.'))console.log('Rede local: http://'+net.address+':'+port+'/');
});
server.on('error',error=>{console.error(error.message);process.exit(1);});
