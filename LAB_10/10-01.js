const http = require('http');
const url = require('url');
const WebSocket = require('ws');

http.createServer(function(request, response) {
    if(url.parse(request.url).pathname === '/start' && request.method === 'GET') {
        response.writeHead(200, {'Content-Type': 'text/html; charset = utf-8'});
        response.end(require('fs').readFileSync('./10-01.html'));
    }
    else{
        response.writeHead(400, {'Content-Type': 'text/html; charset = utf-8'});
        response.end('<h1>400<h1>');
    }
}).listen(5000);

let k = 0;

const wsserver = new WebSocket.Server({ port: 4000, host: 'localhost', path: '/wsserver'});
wsserver.on('connection', (ws) => {
    let lastMessage = ';';
    ws.on('message', message => {
        console.log(`${message}`);
        lastMessage = message.slice(-1);
    });
    setInterval(() => { ws.send(`10-01-server:${lastMessage}->${++k}`) }, 5000);
    setTimeout(() => { wsserver.close(console.log('wssocket close')); }, 25000);
});

wsserver.on('error', (err) => { console.log('wsserver error', err)} );
console.log(`wsserver: host:${wsserver.options.host}, 
    port:${wsserver.options.port}, 
    path:${wsserver.options.path}`
);