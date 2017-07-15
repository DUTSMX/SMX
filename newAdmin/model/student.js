/**
 * Created by asus on 2017/7/13.
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