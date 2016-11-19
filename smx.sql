/*
Navicat MySQL Data Transfer

Source Server         : smx
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : smx

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2016-11-17 14:38:25
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
  `userHeadUrl` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userSchool` varchar(255) DEFAULT NULL,
  `userGrade` varchar(255) DEFAULT NULL,
  `userAge` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `name` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('1', '18840824301', '123456', '2', 'url1', '姚晗', '大黑山双语职业学校', '大一', '23', '大黑山村1幢101');
INSERT INTO `account` VALUES ('7', '18340805430', '123456', '1', 'url2', '刘宇', '大连第二高中', '高二', '23', '大黑山村2幢202');
INSERT INTO `account` VALUES ('8', '15504265887', '123456', '0', 'url3', '张宠', '大连第三高中', '高三', '12', '大黑山村3幢303');
INSERT INTO `account` VALUES ('9', '18697023568', '201492170', '2', 'url4', '於晖', '大黑山职业中专', '大二', '18', '大黑山村4幢404');

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `questionId` int(32) unsigned NOT NULL,
  `answerId` int(32) NOT NULL,
  `userId` int(10) NOT NULL,
  `answerContent` text CHARACTER SET utf8,
  `answerTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`answerId`,`userId`),
  KEY `auId` (`userId`),
  CONSTRAINT `aqId` FOREIGN KEY (`questionId`) REFERENCES `question` (`questionId`),
  CONSTRAINT `auId` FOREIGN KEY (`userId`) REFERENCES `account` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answer
-- ----------------------------
INSERT INTO `answer` VALUES ('1', '1', '1', '当a=b的时候，c会=d，所以等边', '2016-10-28 17:50:50');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `courseId` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `courseTime` datetime DEFAULT NULL,
  `objectOriented` varchar(255) DEFAULT NULL COMMENT '面向对象',
  `courseContent` text,
  PRIMARY KEY (`courseId`),
  KEY `courseId` (`courseId`,`courseName`),
  KEY `courseName` (`courseName`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '1', '高三数学', '2016-10-28 19:00:00', '高三', '三角函数');
INSERT INTO `course` VALUES ('3', '1', '高三语文', '2016-10-27 17:00:00', '高三', '阅读理解');
INSERT INTO `course` VALUES ('6', '9', '高二数学', '2016-11-11 13:00:00', '高二', '圆锥曲线');

-- ----------------------------
-- Table structure for joincourse
-- ----------------------------
DROP TABLE IF EXISTS `joincourse`;
CREATE TABLE `joincourse` (
  `userId` int(32) NOT NULL,
  `courseId` int(32) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `courseId` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `account` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of joincourse
-- ----------------------------
INSERT INTO `joincourse` VALUES ('8', '1');
INSERT INTO `joincourse` VALUES ('7', '3');

-- ----------------------------
-- Table structure for onlineteacher
-- ----------------------------
DROP TABLE IF EXISTS `onlineteacher`;
CREATE TABLE `onlineteacher` (
  `userId` int(10) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `teacherId` FOREIGN KEY (`userId`) REFERENCES `teacher` (`teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of onlineteacher
-- ----------------------------

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `questionId` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(32) NOT NULL,
  `questionTitle` varchar(255) DEFAULT NULL,
  `questionContent` text,
  `questionTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`userId`),
  KEY `quId` (`userId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `quId` FOREIGN KEY (`userId`) REFERENCES `account` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('1', '8', '等边三角怎么证', '如下图，当a边等于13时，当d边等于26时，怎么证', '2016-10-26 19:20:54');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `teacherId` int(10) NOT NULL,
  `goodCourse` varchar(255) NOT NULL,
  PRIMARY KEY (`teacherId`,`goodCourse`),
  KEY `goodCourse` (`goodCourse`),
  CONSTRAINT `goodCourse` FOREIGN KEY (`goodCourse`) REFERENCES `course` (`courseName`),
  CONSTRAINT `tId` FOREIGN KEY (`teacherId`) REFERENCES `account` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '高三数学');
INSERT INTO `teacher` VALUES ('9', '高二数学');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `videoId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `videoCoverUrl` varchar(255) NOT NULL,
  `videoUrl` varchar(255) NOT NULL DEFAULT '',
  `videoName` varchar(255) NOT NULL DEFAULT '',
  `videoTime` datetime DEFAULT NULL,
  `videoWatchCount` int(30) NOT NULL DEFAULT '0',
  `videoAbstract` varchar(255) DEFAULT NULL,
  `videoContent` text,
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('1', '', '', '高三数学第三章教学', '2016-12-11 09:00:01', '1', null, '高三数学第三章导数内容讲解和小习题');

-- ----------------------------
-- Table structure for videotag
-- ----------------------------
DROP TABLE IF EXISTS `videotag`;
CREATE TABLE `videotag` (
  `videoId` int(30) unsigned NOT NULL,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`videoId`),
  CONSTRAINT `videoId` FOREIGN KEY (`videoId`) REFERENCES `video` (`videoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of videotag
-- ----------------------------
INSERT INTO `videotag` VALUES ('1', '高三数学');
