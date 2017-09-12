/**
 * Created by asus on 2017/7/12.
 */
var Sequelize = require('sequelize');
var course=require('./course');
var user=require('./user');
var db = require("./db");
var sequelize = db.sequelize;
var joinreceptionshop = sequelize.define('joinreceptionshop', {
        shopid:{ //自增长店铺Id,主键,整型
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        userId:{//用户ID
            type:Sequelize.INTEGER
        },
        shopname:{//店铺名字
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
user.belongsTo(joinreceptionshop,{foreignKey:'userId',as:'joinreceptionshop'});
joinreceptionshop.hasOne(user,{foreignKey:'userId',as:'User'});
module.exports=joinreceptionshop;