const net = require('net');

let HOST = '127.0.0.1';
let PORT = 4000;

let parm = process.argv[2];
let message = typeof parm == 'undefined' ? 'Message for Server' : parm;

let client = new net.Socket();
client.connect(PORT, HOST, () => {
    console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);
});

client.write(message);

client.on('data', data => {
    console.log(`Client data: ${data.toString()}`);
    client.destroy();
});

client.on('close', () => {
    console.log('Client closed');
});

client.on('error', (e) => {
    console.log('Client error: ', e);
});
//ServerT