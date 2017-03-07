var db = require('../db/dBHelper')

exports.getCourse = function(callback){
    db.getCourse(function (rows) {
        callback(rows);
    })
};
exports.getQuestion=function (callback) {
  db.getQuestion(function (rows) {
      callback(rows);
  });
};
<<<<<<< HEAD
exports.getAnswer=function (callback) {
    db.getAnswer(function (rows) {
        callback(rows);
    })
}

=======
exports.getStudent=function (callback) {
    db.getStudent(function (rows) {
        callback(rows);
    })
};
exports.getTeacher=function (callback) {
    db.getTeacher(function (rows) {
        callback(rows);
    })
};
>>>>>>> afb41e8ac01cf983630e882e1519cba298f8b78f
