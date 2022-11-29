const WebSocket = require('ws');
const wss = new WebSocket.Server({port:5000, host:'localhost'});

wss.on('connection', (ws) => {
    console.log(wss.clients.size);

    setInterval(() => {
        console.log('server: ping');
        ws.ping('server: ping')//фреймы для проверки соеденения
    }, 5000);
});

wss.on('error', (e) => { console.log('error ', e) });