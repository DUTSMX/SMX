/**
 * Created by zhangchong on 2017/7/1.
 */
var Sequelize = require('sequelize');
var course=require('./course')
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
            paranoid: true
        }
    }
);
var user = sequelize.define('account', {
        userId:{ //自增长课程系列Id,主键,整型
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        phoneNumber: { //课程系列名称
            type: Sequelize.INTEGER
        },
        password:{//课程系列的科目
            type:Sequelize.STRING(30)
        },
        role:{
            type:Sequelize.INTEGER
        },
        userName: { //课程面向对象年级
            type: Sequelize.STRING(30)
        },
        userAge: { //课程系列课程数
            type: Sequelize.INTEGER
        },
        userAddress: { //课程系列简介
            type: Sequelize.STRING(30)
        },
        userHeadUrl:{//课程系列每节课课程名称
            type:Sequelize.STRING(30)
        },
        registerDate:{//课程系列每节课内容
            type:Sequelize.DATE
        },
        gender:{
            type:Sequelize.INTEGER
        },
        cardNumber:{
            type:Sequelize.STRING(30)
        }
},
    {
        freezeTableName: true
    }
);

module.exports=user;