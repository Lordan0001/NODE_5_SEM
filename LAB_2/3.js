var http  = require('http');
const route = '/api/name';
http.createServer(function(request,response){
  console.log(request.url);

  if(request.url == route){

    response.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
    response.end('Белицкий Владислав Дмитриевич');
  }
  else{
    response.end('<html><body><h1>Error<html></body></h1></html>');
  }


}).listen(5000, () =>console.log("server start at 5000"));