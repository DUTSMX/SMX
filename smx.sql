-- MySQL dump 10.13  Distrib 5.5.28, for Win64 (x86)
--
-- Host: localhost    Database: smx
-- ------------------------------------------------------
-- Server version	5.5.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'18840824301','123456',2,'姚晗','大黑山双语职业学校','大一','23','大黑山村1幢101','http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png'),(7,'1','1',1,'姚同学','大连第二高中','高二','23','大黑山村2幢202','http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png'),(8,'2','2',0,'姓名2','大连第三高中','高三','12','大黑山村3幢303','http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png'),(9,'18697023568','201492170',2,'於晖','大黑山职业中专','大二','18','大黑山村4幢404','http://smxbucket-10068625.cos.myqcloud.com/%E7%83%AD%E9%97%A8%E8%AF%BE%E7%A8%8B%E5%A4%B4%E5%83%8F.png');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `questionId` int(32) unsigned NOT NULL AUTO_INCREMENT,
  `answerId` int(32) NOT NULL,
  `userId` int(32) NOT NULL,
  `answerContent` text CHARACTER SET utf8,
  `answerTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`answerId`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,1,'qwdqw','2016-10-28 17:23:00');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseId` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `courseTime` varchar(255) DEFAULT NULL,
  `objectOriented` varchar(255) DEFAULT NULL COMMENT '面向对象',
  `courseContent` text,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'高三数学','周六早上|9:00-12:00','高三','三角函数'),(3,1,'高三语文','周六早上|9:00-12:00','高三','阅读理解'),(6,9,'高二数学','周六早上|9:00-12:00','高二','圆锥曲线');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joincourse`
--

DROP TABLE IF EXISTS `joincourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joincourse` (
  `userId` int(32) NOT NULL,
  `courseId` int(32) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joincourse`
--

LOCK TABLES `joincourse` WRITE;
/*!40000 ALTER TABLE `joincourse` DISABLE KEYS */;
INSERT INTO `joincourse` VALUES (7,3),(8,1);
/*!40000 ALTER TABLE `joincourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `onlineteacher`
--

DROP TABLE IF EXISTS `onlineteacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `onlineteacher` (
  `userId` int(32) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `onlineteacher`
--

LOCK TABLES `onlineteacher` WRITE;
/*!40000 ALTER TABLE `onlineteacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `onlineteacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `questionId` int(32) NOT NULL,
  `userId` int(32) NOT NULL,
  `questionTitle` varchar(255) DEFAULT NULL,
  `questionContent` text,
  `questionTime` datetime DEFAULT NULL,
  PRIMARY KEY (`questionId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `teacherId` int(10) NOT NULL,
  `goodCourse` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`teacherId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `videoId` int(30) unsigned NOT NULL AUTO_INCREMENT,
  `videoCoverUrl` varchar(255) CHARACTER SET utf8 NOT NULL,
  `videoUrl` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `videoName` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `videoTime` datetime DEFAULT NULL,
  `videoWatchCount` int(30) NOT NULL DEFAULT '0',
  `videoAbstract` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `videoContent` text CHARACTER SET utf8,
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'\"http://pagead2.googlesyndication.com/pagead/js/r20161025/r20160727/show_ads_impl.js\"','0','开箱实拍',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videotag`
--

DROP TABLE IF EXISTS `videotag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videotag` (
  `videoId` int(32) NOT NULL,
  `tagName` varchar(255) NOT NULL,
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videotag`
--

LOCK TABLES `videotag` WRITE;
/*!40000 ALTER TABLE `videotag` DISABLE KEYS */;
/*!40000 ALTER TABLE `videotag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-19 10:37:45
