//Ex. 1 - prep stage
var mysql = require('mysql');
var table = require('cli-table');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});

connection.query("SHOW DATABASES", function(err, rows, fields) {
    if (err) {
        return err;
    }
    else {
        var db = JSON.parse(JSON.stringify(rows));
        var table1 = new Table();
        
        db.forEach(function(row){
           table1.push(row); 
        })
        

        console.log(table.toString());
    }
    connection.end();
});

//ex. 2