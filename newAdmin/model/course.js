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
exports.course=course;
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
},{
    freezeTableName: true
});
exports.joinCourse=joinCourse;