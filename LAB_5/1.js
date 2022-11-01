var http = require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');
var ee = require('events');
var db_module = require('./db-module');
var db = new db_module.DB();




db.on('GET', (req, res) => {
    if (startDate != null && (endDate == null || endDate > new Date())) {
        ++countOfRequests;
        
    }
    console.log('GET called');
    res.end(db.select());
});


db.on('POST', (req, res) => {
    if (startDate != null && (endDate == null || endDate > new Date())) {
        ++countOfRequests;
        
    }
    console.log('POST called');
    req.on('data', data => {
        if (new Date(JSON.parse(data).bday) > new Date()) {
            res.writeHead(400);
            res.end("Wrong date");
            return;
        }

        res.end(db.insert(data));
    })
});


db.on('PUT', (req, res) => {
    if (startDate != null && (endDate == null || endDate > new Date())) {
        ++countOfRequests;
        
    }
    console.log('PUT called');
    req.on('data', data => {
        if (new Date(JSON.parse(data).bday) > new Date()) {
            res.writeHead(400);
            res.end("Wrong date");
            return;
        }
        res.end(db.update(data));
    })
});


db.on('DELETE', (req, res) => {
 

    if (startDate != null && (endDate == null || endDate > new Date())) {
        ++countOfRequests;
        
    }


    console.log('DELETE called');
    if (typeof url.parse(req.url, true).query.id != "undefined") {
        console.log("id is not undefined");
        var id = parseInt(url.parse(req.url, true).query.id);
        console.log(`id = ${id}`);
        if (Number.isInteger(id))
            res.end(db.delete(id));
        else
            res.end("ERROR! Id parameter is NaN");
    }
    else res.end("ERROR! The Id parameter is missing");
});

db.on('COMMIT', () => {

    if (startDate != null && (endDate == null || endDate > new Date())) {
        ++countOfCommits;
        
    }
    
    db.commit();
});




http.createServer((request, response) => {
    switch (url.parse(request.url).pathname) {
        case '/api/db':
            db.emit(request.method, request, response);
            break;
        case '/':
            let html = fs.readFileSync('./2.html');
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(html);
            break;
        case '/api/ss':
            response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            response.end(getStatistics());
            break;
        default:
            response.end('<html><body><h1>Error! Visit localhost:5000/</h1></body></html>');
            break;
    }
}).listen(5000, () => console.log('Server running at localhost:5000/\n'));




let getStatistics = () => {
    return JSON.stringify({
        start: startDate,
        finish: endDate,
        requests: countOfRequests,
        commits: countOfCommits
        // requests: newCountOfRequests, 
        //  commits: newCountOfCommits 
    }, null, 2);
}

let sdTimeout = null;
let scInterval = null;
let ssTimeout = null;
let countOfRequests = 0;
let countOfCommits = 0;
let statistics = JSON.stringify({ start: 0, finish: 0, requests: 0, commits: 0 });
let startDate = null;
let endDate = null;

let stdin = process.openStdin();
stdin.addListener('data', (cmd) => {
    let arg = cmd.toString().trim();
    let command = arg.slice(0, 2);
    let number = parseInt(arg.slice(3, 10).trim());
    let millisecs = number * 1000;

    if (command === 'sd' && Number.isInteger(number)) {
        console.log('The server will die through ' + number + ' seconds.');
        //clearTimeout(sdTimeout);
        sdTimeout = setTimeout(() => {
            console.log('Server disconnected.');
            process.exit(0);
        }, millisecs);
    }
    else if (arg === 'sd') {
        console.log('Disconnection aborted.\n');
        clearTimeout(sdTimeout);
    }


    else if (command === 'sc' && Number.isInteger(number)) {
        scInterval = setInterval(() => {
            db.emit('COMMIT');
        }, millisecs);
        scInterval.unref();
    }
    else if (arg === 'sc') {
        console.log('Commiting stopped.\n');
        clearInterval(scInterval);

    }


    else if (command === 'ss' && Number.isInteger(number)) {
        countOfCommits = 0;
        countOfRequests = 0;
        let newCountOfCommits;
        let newCountOfRequests;
        startDate = new Date().toLocaleString();
        endDate = null;
        ssTimeout = setTimeout(() => {
            endDate = new Date().toLocaleString();
       

 
            statistics = getStatistics();
            console.log(JSON.parse(statistics, null, 2));
        }, millisecs);
        ssTimeout.unref();
    }
    else if (arg === 'ss') {
        console.log('Statistics collecting stopped.\n');
        clearTimeout(ssTimeout);
        endDate = new Date().toLocaleString();

    }

    else
        console.log('sd OR sc OR ss - only\n');
});