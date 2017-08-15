/**
 * Created by asus on 2017/7/15.
 */
var Sequelize = require('sequelize');
var course=require('./course');
var user=require('./user');
var db = require("./db")
var sequelize = db.sequelize;
var joinreceptionmanager = sequelize.define('joinreceptionmanager', {
        shopId:{ //自增长店铺Id,主键,整型
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{//店长ID
            type:Sequelize.INTEGER
        },
        shopmanager:{//店长职务
            type:Sequelize.STRING(30)
        },
        location: { //店铺位置
            type: Sequelize.STRING(30)
        },
    },
    {
        freezeTableName: true
    }
);
user.belongsTo(joinreceptionmanager,{foreignKey:'userId',as:'joinreceptionmanager'});
joinreceptionmanager.hasOne(user,{foreignKey:'userId',as:'User'});
module.exports=joinreceptionmanager;