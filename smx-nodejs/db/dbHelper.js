var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '5835638b397af.gz.cdb.myqcloud.com',
    user: 'root',
    // password: 'root',
    password:'smxsjk123456',
    database: 'smx',
    port: 12409
})
conn.connect();

exports.getConn = function(){
    return conn;
}
setInterval(function () {
    conn.query('SELECT 1');
}, 5000);
