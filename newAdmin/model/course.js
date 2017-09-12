/**
 * Created by zhangchong on 2017/6/27.
 */
var Sequelize = require("sequelize")
var db = require("./db")
var sequelize = db.sequelize;
var user=require('./user');
var courseSeries =require('./series').courseSeries;
var joinCourse=sequelize.define("joinCourse",{
        joinCourseId:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type:Sequelize.INTEGER
        },
        courseId:{
            type:Sequelize.INTEGER
        },
        courseSeriesId:{
            type: Sequelize.INTEGER
        },
        joinTime:{
            type:Sequelize.DATE
        },
        attend:{
            type:Sequelize.INTEGER
        },
        reason:{
            type:Sequelize.TEXT
        },
        cost:{
            type:Sequelize.INTEGER
        },
        studentEval:{
            type:Sequelize.STRING(30)
        },
        studentEvalDesc:{
            type:Sequelize.TEXT
        },
        teacherEval:{
            type:Sequelize.STRING(30)
        },
        teacherEvalDesc:{
            type:Sequelize.TEXT
        },
        courseSeriesCourseId:{
            type:Sequelize.INTEGER
            //primaryKey: true
        }
    },
    {
        freezeTableName: true
    }
);
//新加入内容2
user.belongsTo(joinCourse,{foreignKey:'userId',as:'joinCourse'});
joinCourse.hasMany(user,{foreignKey:'userId',as:'User'});
module.exports=joinCourse;
var course= sequelize.define('course', {
    courseId: { //自增长课程系列Id,主键,整形
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, courseSeriesId:{
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER
    },
    courseName: { //课程系列名称
        type: Sequelize.STRING(30)
    },
    courseDate: {
        type: Sequelize.DATEONLY
    },
    beginTime: {
        type: Sequelize.TIME
    },
    finishTime: {
        type: Sequelize.TIME
    },
    courseTime: {
        type: Sequelize.STRING(30)
    },
    objectOriented: {
        type: Sequelize.STRING(30)
    },
    courseContent: {
        type: Sequelize.TEXT
    },
    createDate: {
        type: Sequelize.DATE
    },
    courseRoom: {
        type: Sequelize.STRING(255),
    }
    },
    {
    freezeTableName: true
    }
);
//新加入内容1
course.hasOne(user,{foreignKey:'userId', as:'user'});
user.belongsTo(course,{foreignKey:'userId',as:'course'});
course.hasOne(courseSeries,{foreignKey:'courseSeriesId', as:'courseSeries'});
courseSeries.belongsTo(course,{foreignKey:'courseSeriousId',as:'course'});
course.hasOne(joinCourse,{foreignKey:'courseId', as:'joinCourse'});
joinCourse.belongsTo(course,{foreignKey:'courseId',as:'course'});
module.exports=course;
