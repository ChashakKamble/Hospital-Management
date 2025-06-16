-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: hospitalManagement
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_contact` varchar(30) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'8390177557',5);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `room_charge` decimal(9,2) NOT NULL,
  `treatement_charge` decimal(10,2) NOT NULL,
  `nurse_charge` decimal(10,2) NOT NULL,
  `medicine_charge` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `billing_date` date DEFAULT NULL,
  PRIMARY KEY (`bill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(40) NOT NULL,
  `doctor_email` varchar(30) NOT NULL,
  `doctor_contact` varchar(13) NOT NULL,
  `doctor_specialization` varchar(15) DEFAULT NULL,
  `doctor_experience` int DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `doctor_email` (`doctor_email`),
  UNIQUE KEY `doctor_contact` (`doctor_contact`),
  KEY `admin_id` (`admin_id`),
  KEY `doctors_ibfk_1` (`user_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (3,'ram','ram@gmail.com','012012','surgen',7,'Available ',NULL,NULL),(4,'sham','sham@gmail.com','12121222','ortho',2,'Available ',NULL,NULL),(6,'anil','anil@gmail.com','1232322','cardio',5,'Available ',NULL,NULL),(7,'sunil','sunil@gmail.com','1234512345','cardio',4,'available ',NULL,NULL),(8,'pandu','pandu@gmail.com','23434567','nuero',4,'available ',10,NULL),(10,'praju','praju','123342323','gyno',1,'available ',11,NULL),(11,'rajat','rajat@gmail.com','123322','cardio',3,'available',12,NULL),(14,'arjun reddy','arjunreddy@gmail.com','123123','Ortho',15,'Sergen',14,NULL),(16,'lata','lata@gmail.com','123442','kahipan',5,'allach',16,NULL),(17,'priya','priya@gmail.com','235356','cardio',2,'Available ',17,NULL),(18,'shiv','shiva@gmail.com','256467','cardio',4,'Available ',18,1),(19,'ravi shankar','ravi@gmail.com','1234455','cardio',5,'Available',22,1);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type` enum('tablet','syrup','injection','capsule') NOT NULL,
  `price` decimal(8,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `nurse_id` int NOT NULL AUTO_INCREMENT,
  `nurse_name` varchar(30) NOT NULL,
  `nurse_contact` varchar(30) NOT NULL,
  `nurse_shift` enum('Day','Night') NOT NULL,
  PRIMARY KEY (`nurse_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(40) NOT NULL,
  `patient_age` int NOT NULL,
  `patient_gender` enum('Male','Female','Other') NOT NULL,
  `patient_contact` varchar(30) NOT NULL,
  `patient_issue` varchar(255) NOT NULL,
  `admitted_date` date NOT NULL,
  `discharge_date` date NOT NULL,
  `room_no` int DEFAULT NULL,
  `nurse_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `status` enum('Stable','Critical','Recover','Unconsious') DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `nurse_id` (`nurse_id`),
  KEY `room_no` (`room_no`),
  KEY `patient_ibfk_3` (`doctor_id`),
  CONSTRAINT `patient_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `nurse` (`nurse_id`),
  CONSTRAINT `patient_ibfk_2` FOREIGN KEY (`room_no`) REFERENCES `rooms` (`room_no`),
  CONSTRAINT `patient_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reception`
--

DROP TABLE IF EXISTS `reception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reception` (
  `reception_id` int NOT NULL AUTO_INCREMENT,
  `reception_name` varchar(30) NOT NULL,
  `Reception_email` varchar(30) NOT NULL,
  `reception_contact` varchar(20) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  PRIMARY KEY (`reception_id`),
  UNIQUE KEY `Reception_email` (`Reception_email`),
  KEY `admin_id` (`admin_id`),
  KEY `reception_ibfk_1` (`user_id`),
  CONSTRAINT `reception_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reception_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reception`
--

LOCK TABLES `reception` WRITE;
/*!40000 ALTER TABLE `reception` DISABLE KEYS */;
INSERT INTO `reception` VALUES (7,'anjali','anjali@gmail.com','11223344','Available ',26,1),(8,'maya','maya@gmail.com','121212','Unavailable ',27,1);
/*!40000 ALTER TABLE `reception` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_no` int NOT NULL AUTO_INCREMENT,
  `room_type` enum('General Wards','ICU','Delux','Super Delux') DEFAULT NULL,
  `charge_per_day` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`room_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('Admin','Doctor','Reception') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'admin','$2b$10$ZDcHVdELFFZzWJ2Fc.JJher.u.2uQA.RXube3Z1hxlrqhvr.NUIVa','Admin'),(7,'sham@gmail.com','$2b$10$6v4EOel6fSLcxRtdvr4KCe4FUcMjxcUXggXxcGwrRA92lJoQGRTEe','Doctor'),(8,'anil@gmail.com','$2b$10$6qalf0yNS6gmkBVDqlnVVOLFzpUKBP.42t4C2Lu/PDUbHNfJre24e','Doctor'),(9,'sunil@gmail.com','$2b$10$b3pPE.IKBNo1RP8t/2iRoOS50fucju/6FVuuI5vkZrC0lZxrniJWq','Doctor'),(10,'pandu@gmail.com','$2b$10$ZRMWnczl2XoVKxEJ.96M2.YiPDDrIYAWQOnrYv2fz/7Nu.xB8nxtG','Doctor'),(11,'praju','$2b$10$la.fjkadqLbUHj8C1NsjiOWCUc/U62ndTxv3yWDUJJlFlfBetecdy','Doctor'),(12,'rajat@gmail.com','$2b$10$5OlP9xvO3qJK7LLjW5zIeeUDj8eFd/Zg71jhZHlgKV.1gFieWURlK','Doctor'),(14,'areddy@gmail.com','$2b$10$4j.NcXjdFEEAOFALnYupEu87TKkPSomKQ3P4LBPG3CKe0VqAVYl2a','Doctor'),(16,'lata@gmail.com','$2b$10$Qjrk6xCzEhCe1yInCQdpg.5lqMR/AELAv8RqQDS3u19RisA33kGJm','Doctor'),(17,'priya@gmail.com','$2b$10$KYe1kjqlEkdjWF55pQ32De0QHjIMfR8OhDLUq5yLaOgOaxlQcovm2','Doctor'),(18,'shiva@gmail.com','$2b$10$vGwPsSmudicT3kffVzcGMeu.N/vkC3hJ.WyuBmYLK16Mfd38I2js2','Doctor'),(22,'ravi@gmail.com','$2b$10$bLhg.AShJV1AY6Rl9ucbEeSzRAlfmu4k9EfvTmjSdgLcHSbARNfIy','Doctor'),(26,'anjali@gmail.com','$2b$10$BPse2xPUpJXuDXgpCcmrU.AGYSHQVu9Iflx0rAb7KkZVbFaYcQe.O','Reception'),(27,'maya@gmail.com','$2b$10$6WAfDzYLmcqlrk/c.OkxvOAqQCWXmGcKPHoCE4KlRQSH1ZRBpdUzO','Reception');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-14 17:51:27
