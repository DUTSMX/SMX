/**
 * Created by y on 2017/7/28.
 */
var Sequelize = require("sequelize")
var db = require("./db")
var sequelize = db.sequelize;
var weChatNews = sequelize.define('weChatNews', {

        weChatNewsUrl: {//课程系列的科目
            type: Sequelize.STRING(255)
        }
    },
    {

        freezeTableName: true
    }
);

module.exports = weChatNews;