var express = require('express');
var router = express.Router();
var api = require('../api/api')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/course',function (req,res,next) {
  api.getCourse(function (courseList) {
    console.log("course:"+JSON.stringify(courseList))
    res.render('course',{courseList:courseList})
  })
})

module.exports = router;
