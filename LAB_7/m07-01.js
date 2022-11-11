const fs = require('fs');


function StaticHandler(directory = './static') {
    this.staticDir = directory;

    this.pathStatic = fileName => `${this.staticDir}${fileName}`;


    // new RegExp(`^\/*[a-zA-Z0-9]*\/[a-zA-Z0-9]+\.${extension}$`).test(fileName);
    this.isStatic = (extension, fileName) => {
        let regex = new RegExp(`^\/.+\.${extension}$`);
        if (fileName != '/favicon.ico') {
            console.log('\n' + fileName);
            console.log(regex.test(fileName));
        }
        return regex.test(fileName);
    }


    this.pipeFile = (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(this.pathStatic(req.url)).pipe(res);
    }


    this.sendFile = (req, res, headers) => {
        fs.access(this.pathStatic(req.url), fs.constants.R_OK, err => {
            err ? this.writeHttp404(res) : this.pipeFile(req, res, headers);
        })
    }


    this.writeHttp404 = res => {
        res.writeHead(404, 'Resource not found', { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>[ERROR] 404: Resource not found.</h1>')
    }


    this.writeHttp405 = res => {
        res.writeHead(405, 'Incorrect method', { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>[ERROR] 405: Incorrect method (Use GET request method)</h1>');
    }


    this.writeHttp406 = res => {
        res.writeHead(406, 'Incorrect URI', { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>[INFO] Enter filename in URI to see the file!</h1>');
    }

}


module.exports = directory => new StaticHandler(directory);