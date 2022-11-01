const send = require('bvd6w2tds');
const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
const url = require('url');

http.createServer((request, response) => {
  
    if (url.parse(request.url).pathname === '/' && request.method === 'GET') 
    {
        response.end(fs.readFileSync('./3.html'));
    }
    else if (url.parse(request.url).pathname === '/' && request.method === 'POST') 
    {
        let body = '';
        request.on('data', chunk => { body += chunk.toString(); });

        request.on('end', () => {
            let parm = parse(body);

            var message1 = "";

            message1 = parm.message;
            console.log(message1);
            send(message1);


            response.end(`<h2>You message: ${parm.message}</h2>`);
        })
    }
    else
    response.end('<html><body><h1>Error! Visit localhost:5000/</h1></body></html>');



}).listen(5000, () => console.log('Server running at localhost:5000/\n'));
