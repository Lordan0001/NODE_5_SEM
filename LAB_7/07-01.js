const http = require('http');
const url = require('url');
const fs = require('fs');
const mod = require('./m07-01')('./static');


let http_handler = (req, res) => {
    if (req.method === 'GET') {
        if      (mod.isStatic('html', req.url)) mod.sendFile(req, res, { 'Content-Type': 'text/html; charset=utf-8' });
        else if (mod.isStatic('json', req.url)) mod.sendFile(req, res, { 'Content-Type': 'application/json; charset=utf-8' });
        else if (mod.isStatic('docx', req.url)) mod.sendFile(req, res, { 'Content-Type': 'application/msword; charset=utf-8' });
        else if (mod.isStatic('mp4', req.url))  mod.sendFile(req, res, { 'Content-Type': 'video/mp4; charset=utf-8' });
        else if (mod.isStatic('png', req.url))  mod.sendFile(req, res, { 'Content-Type': 'image/png; charset=utf-8' });
        else if (mod.isStatic('xml', req.url))  mod.sendFile(req, res, { 'Content-Type': 'application/xml; charset=utf-8' });
        else if (mod.isStatic('css', req.url))  mod.sendFile(req, res, { 'Content-Type': 'text/css; charset=utf-8' });
        else if (mod.isStatic('js', req.url))   mod.sendFile(req, res, { 'Content-Type': 'text/javascript; charset=utf-8' });

        else if (req.url === '/')
            mod.writeHttp406(res);
        else
            mod.writeHttp404(res);
    }
    else
       mod.writeHttp405(res);
}


let server = http.createServer();

server.listen(5000, () => console.log('Server running at localhost:5000/\n'))
    .on('request', http_handler)
    .on('error', e => { console.log('[ERROR] ' + e.code) });