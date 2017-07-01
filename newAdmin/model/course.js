/**
 * Created by zhangchong on 2017/6/27.
 */
var Sequelize = require('sequelize');
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
var courseSeries = sequelize.define('courseSeries', {
    courseSeriesId:{ //自增长课程系列Id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    courseSeriesName: { //课程系列名称
        type: Sequelize.STRING(30)
    },
    courseSeriesSubject:{//课程系列的科目
        type:Sequelize.STRING(30)
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
    courseSeriesCourseName:{//课程系列每节课课程名称
        type:Sequelize.STRING(30)
    },
    courseSeriesCourseContent:{//课程系列每节课内容
        type:Sequelize.TEXT
    }},
{
    freezeTableName: false
}
);
//courseSeries.sync();
module.exports=courseSeries;