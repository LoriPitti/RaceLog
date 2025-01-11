-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: racelog
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dry_record`
--

DROP TABLE IF EXISTS `dry_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dry_record` (
  `id` int NOT NULL,
  `car` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `track` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dry_record`
--

LOCK TABLES `dry_record` WRITE;
/*!40000 ALTER TABLE `dry_record` DISABLE KEYS */;
INSERT INTO `dry_record` VALUES (1,'Mustang','01.48.55','Monza','Pitti'),(2,'Mustang','01.49.02','Monza','Pitti'),(3,'488','01.50.00','Monza','Pitti'),(4,'Mustang','01.47.01','Monza','Pitti'),(5,'911 Gt3 992','02.21.11','Spa','Pitti'),(6,'911 Gt3 992','01.20.00','Spa','Pitti'),(52,'911 Gt3 992','01.48.55','Suzuka','Pitti'),(53,'296','01.50.00','Suzuka','Pitti'),(102,'911 Gt3 992','01.50.00','Barcellona','BianchiL'),(103,'911 Gt3 992','01.48.55','Barcellona','BianchiL'),(104,'911 Gt3 992','01.48.53','Barcellona','BianchiL'),(105,'911 Gt3 992','01.48.52','Barcellona','BianchiL'),(106,'911 Gt3 992','01.48.49','Barcellona','BianchiL'),(107,'296','01.48.55','Barcellona','BianchiL'),(108,'911 Gt3 992','01.48.37','Barcellona','BianchiL'),(109,'296','02.50.00','Suzuka','BianchiL'),(110,'Mustang','01.51.00','Monza','Pitti'),(111,'Mustang','01.50.00','Monza','Pitti'),(112,'296','01.49.00','Monza','Pitti'),(113,'296','01.48.35','Monza','Pitti'),(114,'911 Gt3 992','02.46.00','Nurburgring','Pitti');
/*!40000 ALTER TABLE `dry_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-11  0:46:33
