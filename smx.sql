/*
Navicat MySQL Data Transfer

Source Server         : smx
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : smx

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2016-11-19 21:40:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `userId` int(32) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int(4) NOT NULL DEFAULT '0' COMMENT '0:学生  1:申请中  2:老师',
  `userName` varchar(255) DEFAULT NULL,
  `userSchool` varchar(255) DEFAULT NULL,
  `userGrade` varchar(255) DEFAULT NULL,
  `userAge` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  `userHeadUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `name` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '18840824301', '123456', '2', '姚晗', '大黑山双语职业学校', '大一', '23', '大黑山村1幢101', 'http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png');
INSERT INTO `account` VALUES ('7', '1', '1', '1', '姚同学', '大连第二高中', '高二', '23', '大黑山村2幢202', 'http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png');
INSERT INTO `account` VALUES ('8', '2', '2', '0', '姓名2', '大连第三高中', '高三', '12', '大黑山村3幢303', 'http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png');
INSERT INTO `account` VALUES ('9', '18697023568', '201492170', '2', '於晖', '大黑山职业中专', '大二', '18', '大黑山村4幢404', 'http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png');

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `questionId` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `answerId` int(32) NOT NULL,
  `userId` int(32) NOT NULL,
  `answerContent` text CHARACTER SET utf8,
  `answerTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`answerId`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES ('1', '1', '1', 'qwdqw', '2016-10-28 17:23:00');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `courseId` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `courseTime` varchar(255) DEFAULT NULL,
  `objectOriented` varchar(255) DEFAULT NULL COMMENT '面向对象',
  `courseContent` text,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '1', '高三数学', '周六早上|9:00-12:00', '高三', '三角函数');
INSERT INTO `course` VALUES ('3', '1', '高三语文', '周六早上|9:00-12:00', '高三', '阅读理解');
INSERT INTO `course` VALUES ('6', '9', '高二数学', '周六早上|9:00-12:00', '高二', '圆锥曲线');

-- ----------------------------
-- Table structure for joincourse
-- ----------------------------
DROP TABLE IF EXISTS `joincourse`;
CREATE TABLE `joincourse` (
  `userId` int(32) NOT NULL,
  `courseId` int(32) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of joincourse
-- ----------------------------
INSERT INTO `joincourse` VALUES ('7', '3');
INSERT INTO `joincourse` VALUES ('8', '1');

-- ----------------------------
-- Table structure for onlineteacher
-- ----------------------------
DROP TABLE IF EXISTS `onlineteacher`;
CREATE TABLE `onlineteacher` (
  `userId` int(32) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onlineteacher
-- ----------------------------

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `questionId` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) NOT NULL,
  `questionTitle` varchar(255) DEFAULT NULL,
  `questionContent` text,
  `questionTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('1', '1', '等边三角怎么证', '等边三角形在什么条件下可以证明成立', '2016-11-19 16:44:37');
INSERT INTO `question` VALUES ('2', '1', '等腰三角形怎么证', '等腰三角形在什么条件下成立', '2016-11-16 16:45:35');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacherId` int(10) NOT NULL,
  `goodCourse` varchar(255) DEFAULT NULL,
  `selfIntroduction` text,
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '数学，英语', '个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介');
INSERT INTO `teacher` VALUES ('9', '物理，化学', '个人简介个人简介');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `videoId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `authorId` int(11) DEFAULT NULL,
  `videoCoverUrl` varchar(255) CHARACTER SET utf8 NOT NULL,
  `videoUrl` varchar(1000) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `videoName` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `videoTime` varchar(255) DEFAULT NULL,
  `videoWatchCount` int(30) NOT NULL DEFAULT '0',
  `videoAbstract` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `videoContent` text CHARACTER SET utf8,
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '1', 'http://smxbucket-10068625.cos.myqcloud.com/%E8%A7%86%E9%A2%91%E5%9B%BE%E7%89%87.png', 'http://smxbucket-10068625.cos.myqcloud.com/%E5%B0%8FCC%EF%BC%88%E3%80%8A%E5%B0%8F%E8%8B%B9%E6%9E%9C%E3%80%8BC%E8%AF%AD%E8%A8%80%E7%89%88-for%E5%A4%A7%E8%BF%9E%E7%90%86%E5%B7%A5%E5%A4%A7%E5%AD%A6%E8%BD%AF%E4%BB%B6%E5%AD%A6%E9%99%A2%EF%BC%89_%E9%AB%98%E6%B8%85.mp4', '开箱实拍', '00:15:15', '13', '高中数学', '三角函数和数列，统计概率，立体几何，圆锥曲线');

-- ----------------------------
-- Table structure for videotag
-- ----------------------------
DROP TABLE IF EXISTS `videotag`;
CREATE TABLE `videotag` (
  `videoId` int(32) NOT NULL,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of videotag
-- ----------------------------
