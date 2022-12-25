const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db');
const { decode } = require('punycode');
let DB = new Db();
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_params = path.split('/');
    console.log(decodeURI(path));

    switch(true)
    {
        case path == '/': 
            res.end(fs.readFileSync('./resourse/views/index.html'));
            break;
        case path == '/api/faculties': 
        DB.getFaculties().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/pulpits':
        DB.getPulpits().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/subjects': 
        DB.getSubjects().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;
        case path == '/api/auditoriumtypes': 
        DB.getAuditoriumsTypes().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
        break;
        case path == '/api/auditoriums':
        DB.getAuditoriums().then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
        break;

        case '/api/auditoriums':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getFaculty(path_params[3]).
            then((res)=>{if(res.recordset.length < 0) throw 'No such auditorium'}).
            catch(error=>{write_error_400(res,error)});
            DB.deleteAuditoriums(path_params[3]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
            break;


//refactor  1
        //case path == '/api/faculty/xyz/pulpits': 
        case RegExp('^\/api\/faculty\/[a-zA-z0-9а-яА-Я]+\/pulpits$').test(decodeURI(path)):
       // /api/faculty/ИДиП/pulpits
    
      // case path == '/api/faculty/%D0%98%D0%94%D0%B8%D0%9F/pulpits':
        DB.facultyPulpitsJoin(path_params[3]).then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {write_error_400(res, error)});
            break;

//refactor  2
//case path == '/api/auditoriumtypes/%D0%9B%D0%9A/auditoriums': 
// /api/auditoriumtypes/ЛК/auditoriums
case RegExp('^\/api\/auditoriumtypes\/[a-zA-z0-9а-яА-Я]+\/auditoriums$').test(decodeURI(path)):
DB.auditoriumtypesAuditoriumsJoin().then(records => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(records.recordset))
}).catch(error => {write_error_400(res, error)});
    break;

    }
}