var db = require('../db/dBHelper')

exports.getCourse = function(callback){
    db.getCourse(function (rows) {
        callback(rows);
    })
}