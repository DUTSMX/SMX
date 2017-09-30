/**
 * Created by asus on 2017/7/11.
 */

var Sequelize = require("sequelize")
var db = require("./db")
var sequelize = db.sequelize;
var course=require('./course');
var user=require('./user');
var teacher = sequelize.define('teacher', {
        teacherId:{ //自增长课程系列Id,主键,整型
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{//用户ID
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
        province: {//老师所在省份
            type: Sequelize.STRING(30)
        },
        city: { //老师所在城市
            type: Sequelize.INTEGER
        },
        highSchool: { //老师毕业高中
            type: Sequelize.STRING(30)
        },
        SciOrLiber:{//文还是理
            type: Sequelize.INTEGER
        },
        SumScore:{//高考总分
            type: Sequelize.INTEGER
        },
        Chinese:{//语文
            type: Sequelize.INTEGER
        },
        Math:{//数学
            type: Sequelize.INTEGER
        },
        English:{//英语
            type: Sequelize.INTEGER
        },
        Physics:{//物理
            type: Sequelize.INTEGER
        },
        Chemistry:{//化学
            type: Sequelize.INTEGER
        },
        Biology:{//生物
            type: Sequelize.INTEGER
        },
        Politics:{//政治
            type: Sequelize.INTEGER
        },
        History:{//历史
            type: Sequelize.INTEGER
        },
        Geography:{//地理
            type: Sequelize.INTEGER
        },
    
        studentCard:{
            type: Sequelize.STRING(60)
        },

        teacherCard:{
            type: Sequelize.STRING(60)
        }
    },
    {
        freezeTableName: true
    }
);
user.belongsTo(teacher,{foreignKey:'userId',as:'Teacher'});
teacher.hasOne(user,{foreignKey:'userId',as:'User'});
module.exports=teacher;