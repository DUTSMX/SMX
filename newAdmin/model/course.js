/**
 * Created by zhangchong on 2017/6/27.
 */
var Sequelize = require('sequelize');
var user=require('./user');
var sequelize = new Sequelize(
    'smx',
    'cdb_outerroot',
    'smxsjk123456',
    {
        host: '59432c47c3382.bj.cdb.myqcloud.com',
        port: 4243,
        dialect: 'mysql',
        define: {
            underscored: false,
            timestamps: false,
            paranoid: true
        }
    }
);
exports.sequelize=sequelize;
 var courseSeries= sequelize.define('courseSeries', {
        courseSeriesId: { //自增长课程系列Id,主键,整形
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        courseSeriesName: { //课程系列名称
            type: Sequelize.STRING(30)
        },
        courseSeriesSubject: {//课程系列的科目
            type: Sequelize.STRING(30)
        },
        courseSeriesGrade: { //课程面向对象年级
            type: Sequelize.STRING(30)
        },
        courseSeriesNumber: { //课程系列课程数
            type: Sequelize.INTEGER
        },
        courseSeriesIntro: { //课程系列简介
            type: Sequelize.TEXT
        },
        courseSeriesCourseName: {//课程系列每节课课程名称
            type: Sequelize.STRING(30)
        },
        courseSeriesCourseContent: {//课程系列每节课内容
            type: Sequelize.TEXT
        }
    },
    {
        freezeTableName: true
    }
);
exports.courseSeries=courseSeries;
 var course= sequelize.define('course', {
        courseId: { //自增长课程系列Id,主键,整形
            type: Sequelize.INTEGER,
            autoIncrement: true
            //primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        courseName: { //课程系列名称
            type: Sequelize.STRING(30)
        },
        courseDate: {
            type: Sequelize.DATE
        },
        beginTime: {
            type: Sequelize.DATE
        },
        finishTime: {
            type: Sequelize.DATE
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
        courseSeriesId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    courseSeriesCourseId:{
            type:Sequelize.INTEGER,
            primaryKey: true
    }
    },
    {
        freezeTableName: true
    }
);
exports.course=course;
var joinCourse=sequelize.define("joinCourse",{
    joinCourseId:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    userId:{
        type:Sequelize.INTEGER
    },
    courseId:{
        type:Sequelize.INTEGER
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
    courseSeriesId: {
        type: Sequelize.INTEGER
        //primaryKey: true
    },
    courseSeriesCourseId:{
        type:Sequelize.INTEGER
        //primaryKey: true
    }
},{
    freezeTableName: true
});
exports.joinCourse=joinCourse;
courseSeries.hasMany(course,{foreignKey:'courseSeriesId',as:'Course'});
course.hasMany(joinCourse,{foreignKey:'courseSeriesId',as:'JoinCourse'});
courseSeries.hasMany(joinCourse,{foreignKey:'courseSeriesId',as:'JoinCourse'});
//joinCourse.belongsTo(courseSeries,{foreignKey:'courseSeriesId',as:'CourseSeries'});
//courseSeries.sync();
//module.exports=courseSeries;