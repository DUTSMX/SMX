/**
 * Created by asus on 2017/7/13.
 */

var Sequelize = require("sequelize")
var db = require("./db")
var sequelize = db.sequelize;
var user=require('./user');
var student = sequelize.define('student', {
        studentId:{ //自增长学生编号Id,主键,整型
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{//用户ID
            type:Sequelize.INTEGER,
        },
        school:{//学生学校
            type:Sequelize.STRING(30),
        },
        grade:{//学生年级
            type:Sequelize.STRING(30),
        },
        learningstatus: { //学习状态
            type: Sequelize.STRING(30),
        },
        joinshop: { //所在门店
            type: Sequelize.STRING(30),
        }
    },
    {
        freezeTableName: true
    }
);
user.belongsTo(student,{foreignKey:'userId',as:'student'});
student.hasOne(user,{foreignKey:'userId',as:'User'});
module.exports=student;