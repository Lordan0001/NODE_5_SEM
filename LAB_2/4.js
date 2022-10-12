var http  = require('http');
var fs = require('fs');
const route = '/xmlhttprequest';
const api = '/api/name';


http.createServer(function(request,response){
  console.log(request.url);

  const fileName = './xmlhttprequest.html';

switch(request.url){
    case api:    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end("Белицкий Владислав Дмитриевич"); break;
    
    case route: fs.readFile(fileName,(rerror,data) =>{
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(data);
     
    }); break;

    default: response.end('<html><body><h1>Error<html></body></h1></html>'); break;
}




}).listen(5000, () =>console.log("server start at 5000"));