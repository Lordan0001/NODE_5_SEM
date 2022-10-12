var http  = require('http');
var fs = require('fs');
const route = 'html';
http.createServer(function(request,response){
  console.log(request.url);

  if(request.url == '/'+route){
    let html = fs.readFileSync('./index.html');
    response.writeHead(200,{'Content-Type':'text/html; charse=utf-8'});
    response.end(html);
  }
  else{
    response.end('<html><body><h1>Error<html></body></h1></html>');
  }




}).listen(5000, () =>console.log("server start at 5000"));