const fs = require('fs');
const url = require('url');

const errHandler = require('./errorHandler');
const readFile = require('./readFile');
const pathToFile = './file/StudentList.json';



module.exports = (request, response) => {
    let path = url.parse(request.url).pathname;
    if(path === '/') {
            let body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                let flag = true;
                let fileJSON = JSON.parse(readFile());
                fileJSON.forEach(item => {
                    if(item.id === JSON.parse(body).id) {
                        flag = false;
                    }
                });
                if(flag) {
                    fileJSON.push(JSON.parse(body));
                    fs.writeFile(pathToFile, JSON.stringify(fileJSON), (e) => {
                        if (e) {
                            console.log('Error');
                            errHandler(request, response, e.code, e.message);
                        }
                        else {
                            console.log('add student');
                            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                            response.end(JSON.stringify(JSON.parse(body)));
                        }
                    });
                }
                else {
                    errHandler(request, response, 2, `student with id ${JSON.parse(body).id} already exists`);
                }
            });
    }
    else if(path === '/backup') {
        setTimeout(CopyMyFile, 2000);
        response.end('backup created!');
    }
    else{
        response.writeHead(404, {'Content-Type': 'application/json; charset=utf-8'});
        response.end(`error 404`);
    }
};


function CopyMyFile(request,response){
    let date = new Date();
    let month = date.getMonth() + 1;
    if(Number(month) < 10)
    {
        month = '0' + month;
    }
     let day = date.getDate()
    if(Number(day) < 10)
    {
        day = '0' + day;
    }
    fs.copyFile(pathToFile, `./backup/${date.getFullYear()}${month}${day}${date.getHours()}${date.getMinutes()}_StudentList.json`, (err) => {
        if (err) {
            console.log('Error');
            errHandler(request, response, err.code, err.message);
        }
        else {
            console.log('backup created!');
          
        }
    });
}