var http  = require('http');
var fs = require('fs');
const route = '/png';
http.createServer(function(request,response){
  console.log(request.url);

  if(request.url == route){
    const namePic = './M.png';
    let png = fs.readFileSync(namePic);
    //response.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length'});
    response.end(png)

  }
  else{
    response.end('<html><body><h1>Error<html></body></h1></html>');
  }




}).listen(5000, () =>console.log("server start at 5000"));