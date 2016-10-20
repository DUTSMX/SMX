/*
Navicat MySQL Data Transfer

Source Server         : smx
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : smx

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2016-10-20 20:08:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `teacher` int(1) DEFAULT NULL COMMENT '0:不是老师，1：是老师',
  `gender` varchar(2) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '18840824301', '123456', '姚晗', '1', '男', '23');
INSERT INTO `account` VALUES ('7', '1', '1', '姚同学', '0', '男', '23');
INSERT INTO `account` VALUES ('8', '2', '2', '姓名2', '0', '女', '12');

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `qid` int(20) NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `picurl` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `voiceurl` varchar(255) CHARACTER SET utf8 DEFAULT '',
  PRIMARY KEY (`id`,`username`,`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES ('1', '姚晗', '2', '中午', 'Null', 'Null');
INSERT INTO `answer` VALUES ('2', '姚同学', '1', '早上小笼包和豆浆赛高', 'Null', 'Null');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `teacher` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '高三数学', '1', '周六早上8点', '三角函数');
INSERT INTO `course` VALUES ('3', '高三语文', '1', '周六早上9点', '阅读理解');
INSERT INTO `course` VALUES ('6', '高二数学', '7', '周日下午3点', '圆锥曲线');

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `picurl` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `voiceurl` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`,`username`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('1', '姚晗', '早上吃什么呀', 'Null', 'Null');
INSERT INTO `question` VALUES ('2', '姚同学', '中午吃什么呀', 'Null', 'Null');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `id` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `videoname` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `degree` int(30) NOT NULL,
  `picurl` varchar(255) CHARACTER SET utf8 NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '开箱实拍', '姚晗', '127.1.1.1', '1', 'Null', 'SonyZ5开箱视频');
