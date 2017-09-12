var Sequelize = require("sequelize")
var db = require("./db")
var sequelize = db.sequelize;
var courseSeries= sequelize.define('courseSeries', {
        courseSeriesId: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true}, //自增长课程系列Id,主键,整形
        courseSeriesName: {type: Sequelize.STRING(30)}, //课程系列名称
        courseSeriesSubject: {type: Sequelize.STRING(30)},//课程系列的科目
        courseSeriesGrade: {type: Sequelize.STRING(30)}, //课程面向对象年级
        courseSeriesNumber: {type: Sequelize.INTEGER}, //课程系列课程数
        courseSeriesIntro: {type: Sequelize.TEXT}, //课程系列简介
        courseSeriesTeacher:{type:Sequelize.STRING(255)},
        courseIds:{type:Sequelize.STRING(255)},
        courseSeriesLevel:{type:Sequelize.STRING(255)},
        courseSeriesClassType:{type:Sequelize.STRING(255)},
        shopId:{type:Sequelize.INTEGER},
        startDate:{type:Sequelize.DATEONLY},
        endDate:{type:Sequelize.DATEONLY},
        time:{type:Sequelize.STRING(255)},
        room:{type:Sequelize.STRING(255)},
        students:{type:Sequelize.STRING(255)},
        courseSeriesCourseName: {type: Sequelize.STRING(255)}//课程系列每节课课程名称
    },
    {
        freezeTableName: true
    });

exports.courseSeries=courseSeries;

var seriesTemplate = sequelize.define("seriesTemplate",{
    templateId:{type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    seriesName:{type:Sequelize.STRING(255)},
    seriesIntro:{type:Sequelize.STRING(255)},
    subject:{type:Sequelize.STRING(255)},
    grade:{type:Sequelize.STRING(255)},
    level:{type:Sequelize.STRING(255)},
    number:{type:Sequelize.INTEGER},
    courseName:{type:Sequelize.STRING(255)}
},{
    freezeTableName: true
})
exports.seriesTemplate=seriesTemplate;

var joinSeries = sequelize.define("joinSeries",{
    joinSeriesId:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    templateId:{type:Sequelize.INTEGER},
    courseSeriesId:{type:Sequelize.INTEGER},
    studentId:{type:Sequelize.INTEGER},
    hopeTeacher:{type:Sequelize.STRING(255)},
    hopeClassType:{type:Sequelize.STRING(255)},
    hopeTime:{type:Sequelize.STRING(255)},
    other:{type:Sequelize.STRING(255)},
    process:{type:Sequelize.INTEGER}
},{
    freezeTableName: true
})
exports.joinSeries=joinSeries;