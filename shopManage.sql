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

 Date: 07/03/2016 12:57:59 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedbackId` int(10) NOT NULL AUTO_INCREMENT,
  `feedback` text CHARACTER SET utf8 NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `message`
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `messageId` int(10) NOT NULL AUTO_INCREMENT,
  `message` text CHARACTER SET utf8 NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `all` int(11) NOT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Table structure for `shop-user`
-- ----------------------------
DROP TABLE IF EXISTS `shop-user`;
CREATE TABLE `shop-user` (
  `userId` int(10) NOT NULL,
  `shopId` int(10) NOT NULL,
  `applying` int(1) NOT NULL,
  `applyReason` text CHARACTER SET utf8,
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
  `owner` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `used` int(1) NOT NULL,
  `waterFee` int(10) NOT NULL,
  `eleFee` varchar(10) CHARACTER SET utf8 NOT NULL,
  `payWater` int(1) NOT NULL DEFAULT '1',
  `payEle` int(1) NOT NULL DEFAULT '1',
  `location` varchar(10) CHARACTER SET utf8 NOT NULL,
  `name` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`shopId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `shopMessage`
-- ----------------------------
BEGIN;
INSERT INTO `shopMessage` VALUES ('1', '', '0', '0', '0', '1', '1', '1-1', ''), ('2', null, '0', '0', '0', '1', '1', '1-2', null), ('3', null, '0', '0', '0', '1', '1', '1-3', ''), ('4', '', '0', '0', '0', '0', '0', '1-4', ''), ('5', '', '0', '0', '0', '0', '0', '1-5', null), ('6', null, '0', '0', '0', '1', '1', '2-1', null), ('7', '', '0', '0', '0', '0', '0', '2-2', ''), ('8', null, '0', '0', '0', '1', '1', '2-3', null), ('9', null, '0', '0', '0', '1', '1', '2-4', null), ('10', '', '0', '0', '0', '0', '0', '2-5', null), ('11', null, '0', '0', '0', '1', '1', '3-1', null), ('12', null, '0', '0', '0', '1', '1', '3-2', null), ('13', null, '0', '0', '0', '1', '1', '3-3', null), ('14', '', '0', '0', '0', '1', '1', '3-4', null), ('15', null, '0', '0', '0', '1', '1', '3-5', null);
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `userAuth` int(1) NOT NULL,
  `userPasswd` varchar(100) CHARACTER SET utf8 NOT NULL,
  `money` int(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'admin', '0', 'admin', '0');
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
