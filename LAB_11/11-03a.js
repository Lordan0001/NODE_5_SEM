const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000');

ws.on('pong', (data)=>{
    console.log('on pong: ', data.toString());
});

setInterval(() => {
    console.log('server: ping');
    ws.ping('client ping')
}, 5000);