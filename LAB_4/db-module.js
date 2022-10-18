var http = require('http');
var url = require('url');
var util = require('util');
var ee = require('events');
console.log('imported db-module');



let db =
    [
        {
            id: 1,
            name: "Marilyn Manson",
            bday: "5-01-1969"
        },
        {
            id: 2,
            name: "Rob Zombie",
            bday: "12-01-1965"
        },
        {
            id: 3,
            name: "Ozzy Osbourne",
            bday: "3-12-1948"
        }
    ];





function DB() {
    this.select = () => {
        console.log("[SELECT]\n");
        return JSON.stringify(db, null, 2);
    }


    this.insert = (insertString) => {

        console.log("[INSERT]\n");
        var status;
        for (variable in db) {
            if (db[variable].id == JSON.parse(insertString).id) {
                status = false;
                break;
            }
            else {
                status = true;

            }
        }
        if (status == true) {
            db.push(JSON.parse(insertString));
        }
        else {
            console.log("Id занят!")
        }
        return JSON.stringify(db, null, 2);

    }


    this.update = (updateString) => {
        console.log("[UPDATE]");
        var jsonString = JSON.parse(updateString);
        console.log(jsonString);
        var id = jsonString.id;
        console.log("id to update: " + id + "\n");
        var index = db.findIndex(elem => elem.id === parseInt(id));
        db[index].name = jsonString.name;
        db[index].bday = jsonString.bday;
        return JSON.stringify(db[index], null, 2);
    }


    this.delete = (id) => {
        console.log("[DELETE]\n");
        
        var index = db.findIndex(elem => elem.id === parseInt(id));
  
        if(index == -1){
            return JSON.stringify(-1);
        }
        var deleted = db[index];
        db.splice(index, 1);
        return JSON.stringify(deleted, null, 2);
    }
}


util.inherits(DB, ee.EventEmitter);
exports.DB = DB;