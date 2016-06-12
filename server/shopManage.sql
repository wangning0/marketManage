/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50711
 Source Host           : localhost
 Source Database       : shopManage

 Target Server Type    : MySQL
 Target Server Version : 50711
 File Encoding         : utf-8

 Date: 06/12/2016 19:54:36 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedbackId` int(10) NOT NULL AUTO_INCREMENT,
  `feedback` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `messageId` int(10) NOT NULL,
  `message` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `shop-user`
-- ----------------------------
DROP TABLE IF EXISTS `shop-user`;
CREATE TABLE `shop-user` (
  `userId` int(10) NOT NULL,
  `shopId` int(10) NOT NULL,
  `id` int(1) NOT NULL,
  KEY `userId` (`userId`),
  KEY `shopId` (`shopId`),
  CONSTRAINT `sId` FOREIGN KEY (`shopId`) REFERENCES `shopMessage` (`shopId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `shopMessage`
-- ----------------------------
DROP TABLE IF EXISTS `shopMessage`;
CREATE TABLE `shopMessage` (
  `shopId` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(50) NOT NULL,
  `used` int(1) NOT NULL,
  `waterFee` int(10) NOT NULL,
  `eleFee` varchar(10) NOT NULL,
  `payWater` int(1) NOT NULL,
  `payEle` int(1) NOT NULL,
  PRIMARY KEY (`shopId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `userAuth` int(1) NOT NULL,
  `userPasswd` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'wangning', '0', '123'), ('2', 'lan', '1', '123'), ('3', 'wu', '1', '123'), ('4', 'wangning', '1', '123');
COMMIT;

-- ----------------------------
--  Table structure for `user-feedback`
-- ----------------------------
DROP TABLE IF EXISTS `user-feedback`;
CREATE TABLE `user-feedback` (
  `fId` int(10) NOT NULL,
  `uId` int(10) NOT NULL,
  KEY `fId` (`fId`),
  KEY `uId` (`uId`),
  CONSTRAINT `uffId` FOREIGN KEY (`fId`) REFERENCES `feedback` (`feedbackId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ufuId` FOREIGN KEY (`uId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `user-message`
-- ----------------------------
DROP TABLE IF EXISTS `user-message`;
CREATE TABLE `user-message` (
  `userId` int(10) NOT NULL,
  `messageId` int(10) NOT NULL,
  KEY `userId` (`userId`),
  KEY `messageId` (`messageId`),
  CONSTRAINT `messageId` FOREIGN KEY (`messageId`) REFERENCES `message` (`messageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
