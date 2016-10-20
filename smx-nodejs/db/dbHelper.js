var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'root',
    password:'5580031',
    database: 'smx',
    port: 3306
})
conn.connect();

exports.getConn = function(){
    return conn;
}
