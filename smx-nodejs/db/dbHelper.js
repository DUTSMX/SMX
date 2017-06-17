var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '59432c47c3382.bj.cdb.myqcloud.com',
    // host:'localhost',
    user: 'cdb_outerroot',
    // password: 'root',
    password:'smxsjk123456',
    database: 'smx',
    port: 4243
    // port:3306
})
conn.connect();

exports.getConn = function(){
    return conn;
}
setInterval(function () {
    conn.query('SELECT 1');
}, 5000);
