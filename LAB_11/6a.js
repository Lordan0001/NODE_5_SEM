const rpcWSC = WebSocket = require('rpc-websockets').Client;
let wsA = new rpcWSC('ws://localhost:4000');


wsA.on('open',()=>{
    wsA.subscribe('A');
    wsA.on('A',()=>
    {
        console.log('Event A');
    });
});

let wsB = new rpcWSC('ws://localhost:4000');
wsB.on('open',()=>{
    wsB.subscribe('B');
    wsB.on('B',()=>
    {
        console.log('Event B');
    });
});

let wsC = new rpcWSC('ws://localhost:4000');
wsC.on('open',()=>{
    wsC.subscribe('C');
    wsC.on('C',()=>
    {
        console.log('Event C');
    });
});