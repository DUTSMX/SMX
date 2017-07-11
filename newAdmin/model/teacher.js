/**
 * Created by asus on 2017/7/11.
 */
var Sequelize = require('sequelize');
var course=require('./course');
var user=require('./user');
var sequelize=new Sequelize(
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
            paranoid: true,
        }
    }
);
var teacher = sequelize.define('teacher', {
        teacherId:{ //自增长课程系列Id,主键,整形
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{
            type:Sequelize.INTEGER
        },
        teachClass:{//老师所教科目
            type:Sequelize.STRING(30)
        },
        college: { //老师所在大学
            type: Sequelize.STRING(30)
        },
        class: { //老师所在年级
            type: Sequelize.STRING(30)
        },
        province: { //老师所在省份
            type: Sequelize.STRING(30)
        },
        city: { //老师所在城市
            type: Sequelize.INTEGER
        },
        highSchool: { //老师毕业高中
            type: Sequelize.STRING(30)
        },
        collegeAttendingScore:{//高考分数
            type:Sequelize.STRING(60)
        },
    },
    {
        freezeTableName: true
    }
);
user.hasOne(teacher,{foreignKey:'userId',as:'Teacher'});
teacher.belongsTo(user,{foreignKey:'userId',as:'User'});
module.exports=teacher;