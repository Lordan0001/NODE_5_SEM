const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_params = path.split('/');
    switch('/api/' + path_params[2])
    {
        case '/api/faculties':
            res.writeHead(200, {'Content-Type': 'application/json'});
            DB.getFaculty(path_params[3]).
                then((res)=>{if(res.recordset.length == 0) throw 'No such faculty'}).
                catch(error=>{write_error_400(res,error)});
            DB.deleteFaculties(path_params[3]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
        break;
        case '/api/pulpits':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getPulpit(path_params[3]).
            then((res)=>{if(res.recordset.length == 0) throw 'No such pulpit'}).
            catch(error=>{write_error_400(res,error)});
            DB.deletePulpits(path_params[3]).then(records => {
                res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
        break;
        case '/api/subjects':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.getSubject(decodeURI(path_params[3])).
            then((res)=>{if(res.recordset.length == 0) throw 'No such subject'}).
            catch(error=>{write_error_400(res,error)});
            DB.deleteSubjects(decodeURI(path_params[3])).then(records => {
            res.end('deleted')
            }).catch(error => {write_error_400(res, error)});
        break;
        case '/api/auditoriumtypes':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            DB.deleteAuditoriums_Types(path_params[3]).then(records => {
                res.end('deleted')
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
    }
}
function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end('<h1>error</h1></br>'+'<h3>'+error+'</h3>');
}