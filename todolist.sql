-- MySQL dump 10.13  Distrib 8.0.19, for osx10.15 (x86_64)
--
-- Host: localhost    Database: todolist
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `todolist`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `todolist` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `todolist`;

--
-- Table structure for table `activity_tb`
--

DROP TABLE IF EXISTS `activity_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `member_no` int NOT NULL,
  `action` varchar(255) NOT NULL,
  `card_no` int NOT NULL,
  `from_column_no` int DEFAULT NULL,
  `to_column_no` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `member_no` (`member_no`),
  KEY `card_no` (`card_no`),
  KEY `from_column_no` (`from_column_no`),
  KEY `to_column_no` (`to_column_no`),
  CONSTRAINT `activity_tb_ibfk_1` FOREIGN KEY (`member_no`) REFERENCES `member_tb` (`no`),
  CONSTRAINT `activity_tb_ibfk_2` FOREIGN KEY (`card_no`) REFERENCES `card_tb` (`no`),
  CONSTRAINT `activity_tb_ibfk_3` FOREIGN KEY (`from_column_no`) REFERENCES `column_tb` (`no`),
  CONSTRAINT `activity_tb_ibfk_4` FOREIGN KEY (`to_column_no`) REFERENCES `column_tb` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_tb`
--

LOCK TABLES `activity_tb` WRITE;
/*!40000 ALTER TABLE `activity_tb` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_tb`
--

DROP TABLE IF EXISTS `card_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `order_no` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `member_no` int NOT NULL,
  `column_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `member_no` (`member_no`),
  KEY `column_no` (`column_no`),
  CONSTRAINT `card_tb_ibfk_1` FOREIGN KEY (`member_no`) REFERENCES `member_tb` (`no`),
  CONSTRAINT `card_tb_ibfk_2` FOREIGN KEY (`column_no`) REFERENCES `column_tb` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_tb`
--

LOCK TABLES `card_tb` WRITE;
/*!40000 ALTER TABLE `card_tb` DISABLE KEYS */;
INSERT INTO `card_tb` VALUES (1,'ㅎㅇㅎd',2,'2020-07-20 19:46:35',0,78,17),(2,'안녕하세요',1,'2020-07-20 19:46:37',0,78,17),(3,'안녕하세요',3,'2020-07-20 19:46:38',0,78,16),(4,'안녕하세요',5,'2020-07-20 19:46:39',0,78,16),(5,'안녕하세요',4,'2020-07-20 19:46:40',0,78,18),(6,'안녕하세요',2,'2020-07-20 19:46:41',0,79,22),(7,'안녕하세요',1,'2020-07-20 19:46:42',0,79,24),(8,'안녕하세요',5,'2020-07-20 19:46:42',0,79,23),(9,'안녕하세요',4,'2020-07-20 19:46:43',0,79,22),(10,'안녕하세요',3,'2020-07-20 19:46:44',1,79,23),(11,'안녕하세요요요',3,'2020-07-21 23:34:04',0,78,17),(12,'ㅌㅔ스트입니다!',4,'2020-07-21 23:41:02',0,78,17),(13,'ㅌㅔ스트입니다!',5,'2020-07-21 23:43:06',0,78,17),(14,'수정했습니다.',6,'2020-07-21 23:43:15',0,78,17),(15,'asdfasdfasdf',6,'2020-07-22 22:35:25',0,78,16),(16,'하하하하하하하하하',7,'2020-07-22 22:36:36',0,78,16),(17,'하하123123하하123123',8,'2020-07-22 22:40:16',0,78,16);
/*!40000 ALTER TABLE `card_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `column_tb`
--

DROP TABLE IF EXISTS `column_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `column_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `order_no` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `group_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `group_no` (`group_no`),
  CONSTRAINT `column_tb_ibfk_1` FOREIGN KEY (`group_no`) REFERENCES `group_tb` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `column_tb`
--

LOCK TABLES `column_tb` WRITE;
/*!40000 ALTER TABLE `column_tb` DISABLE KEYS */;
INSERT INTO `column_tb` VALUES (16,1,'해야할 일','2020-07-20 16:05:02',0,9),(17,2,'하는 중','2020-07-20 16:05:02',0,9),(18,3,'다했어','2020-07-20 16:05:02',0,9),(22,1,'테스트11','2020-07-20 16:35:32',0,10),(23,2,'테스트12','2020-07-20 16:35:32',0,10),(24,3,'테스트13','2020-07-20 16:35:32',0,10),(25,1,'해야할 일','2020-07-21 01:03:57',0,16),(26,2,'하는 중','2020-07-21 01:03:57',0,16),(27,3,'다했어','2020-07-21 01:03:57',0,16);
/*!40000 ALTER TABLE `column_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_member_tb`
--

DROP TABLE IF EXISTS `group_member_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_member_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `group_no` int NOT NULL,
  `member_no` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`no`),
  KEY `group_no` (`group_no`),
  KEY `member_no` (`member_no`),
  CONSTRAINT `group_member_tb_ibfk_1` FOREIGN KEY (`group_no`) REFERENCES `group_tb` (`no`),
  CONSTRAINT `group_member_tb_ibfk_2` FOREIGN KEY (`member_no`) REFERENCES `member_tb` (`no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_member_tb`
--

LOCK TABLES `group_member_tb` WRITE;
/*!40000 ALTER TABLE `group_member_tb` DISABLE KEYS */;
INSERT INTO `group_member_tb` VALUES (10,9,78,'2020-07-20 16:53:52',0),(11,10,78,'2020-07-20 16:53:54',0),(12,16,85,'2020-07-21 01:03:57',0);
/*!40000 ALTER TABLE `group_member_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_tb`
--

DROP TABLE IF EXISTS `group_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_tb`
--

LOCK TABLES `group_tb` WRITE;
/*!40000 ALTER TABLE `group_tb` DISABLE KEYS */;
INSERT INTO `group_tb` VALUES (9,'기본 그룹','2020-07-20 16:05:02',0),(10,'test님의 todoList','2020-07-20 16:33:59',0),(11,'111111','2020-07-20 17:09:28',0),(12,'222222','2020-07-20 17:09:29',0),(13,'333333','2020-07-20 17:09:30',0),(14,'444444','2020-07-20 17:09:31',0),(15,'기본 그룹','2020-07-21 01:03:35',0),(16,'기본 그룹','2020-07-21 01:03:57',0);
/*!40000 ALTER TABLE `group_tb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_tb`
--

DROP TABLE IF EXISTS `member_tb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_tb` (
  `no` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_tb`
--

LOCK TABLES `member_tb` WRITE;
/*!40000 ALTER TABLE `member_tb` DISABLE KEYS */;
INSERT INTO `member_tb` VALUES (78,'abc@abc.com','gLg4sGFG+lFdzxfY+BuQndh8LU04tcLsVF09xGi3LlanRfl9n2a4qtlXXffr3MJG6YxbnvGpmCz8ZMVc10Daxw==','Q7fz3T/2FOsqYW7DdOXhdyuw41kd790R2cUDV1sCcRWLRpjOknju0QVISA9PLAQ6NSnj+s1+veesis4CLqaq5w==','2020-07-20 16:50:30',0),(79,'deleted@abc.com','Y/cNJ/ePsfSPkL5YJS+kN+L7RgU1jd9ewlK2Cs7UxjOyjyIjP91ZdIK3o2SHdJS3b4GC70OyteJTgUcHNkV5JA==','nh7J0pNCSF4QEhEtrd2TfHRSHFegz17P5qkO9weYenJ1F7TnMvy1/+ZPUkzQESrwxvRgmoyBAuhfxSGa6zMsqw==','2020-07-20 16:50:30',1),(85,'abc123@abc.com','JjwKlrz9pZyfRdeKaeiD7kkZN4E0SVnSxLUh8Jgq5RbUD7PA1yFZynZ4WhS3leMEBKxdb2roSyhBUF0UGGfYbQ==','GhDPZIA2QH15naCFbXU1mF38pL/Xk03knDnpATF1T5Dg5GYqxgUQQzK1MMlEfPiwh8NLk1MIpbcUkb74pImG7Q==','2020-07-21 01:03:57',0);
/*!40000 ALTER TABLE `member_tb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-23 10:33:36
