/*
Navicat MySQL Data Transfer

Source Server         : 本地连接
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : crm

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-05-18 22:50:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for crm_nav
-- ----------------------------
DROP TABLE IF EXISTS `crm_nav`;
CREATE TABLE `crm_nav` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  `text` char(10) NOT NULL COMMENT '导航名称',
  `url` char(20) NOT NULL COMMENT '链接地址',
  `iconCls` char(20) NOT NULL COMMENT '小图标',
  `nid` tinyint(3) unsigned NOT NULL COMMENT '关联ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_nav
-- ----------------------------
INSERT INTO `crm_nav` VALUES ('1', '办公管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('2', '客户管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('3', '仓库管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('4', '财务管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('5', '人事管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('6', '数据统计', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('7', '系统管理', '', 'icon-system', '0');
INSERT INTO `crm_nav` VALUES ('8', '工作计划', '', 'icon-book', '1');
INSERT INTO `crm_nav` VALUES ('9', '分配任务', '', 'icon-book', '1');
INSERT INTO `crm_nav` VALUES ('10', '通知管理', '', 'icon-book', '1');
INSERT INTO `crm_nav` VALUES ('11', '私信收发', '', 'icon-book', '1');
INSERT INTO `crm_nav` VALUES ('12', '客户信息', '', 'icon-book', '2');
INSERT INTO `crm_nav` VALUES ('13', '跟单记录', '', 'icon-book', '2');
INSERT INTO `crm_nav` VALUES ('14', '销售订单', '', 'icon-book', '2');
INSERT INTO `crm_nav` VALUES ('15', '产品信息', '', 'icon-book', '3');
INSERT INTO `crm_nav` VALUES ('16', '入库记录', '', 'icon-book', '3');
INSERT INTO `crm_nav` VALUES ('17', '出库记录', '', 'icon-book', '3');
INSERT INTO `crm_nav` VALUES ('18', '库存警报', '', 'icon-book', '3');
INSERT INTO `crm_nav` VALUES ('19', '采购记录', '', 'icon-book', '3');
INSERT INTO `crm_nav` VALUES ('20', '收款记录', '', 'icon-book', '4');
INSERT INTO `crm_nav` VALUES ('21', '支出记录', '', 'icon-book', '4');
INSERT INTO `crm_nav` VALUES ('22', '登录帐号', 'User/index', 'icon-book', '5');
INSERT INTO `crm_nav` VALUES ('23', '员工档案', 'Staff/index', 'icon-book', '5');
INSERT INTO `crm_nav` VALUES ('24', '职位部门', 'Post/index', 'icon-book', '5');
INSERT INTO `crm_nav` VALUES ('25', '产品销量', '', 'icon-book', '6');
INSERT INTO `crm_nav` VALUES ('26', '人员分布', '', 'icon-book', '6');
INSERT INTO `crm_nav` VALUES ('27', '客户分析', '', 'icon-book', '6');
INSERT INTO `crm_nav` VALUES ('28', '权限管理', '', 'icon-book', '7');
INSERT INTO `crm_nav` VALUES ('29', '操作日志', '', 'icon-book', '7');

-- ----------------------------
-- Table structure for crm_post
-- ----------------------------
DROP TABLE IF EXISTS `crm_post`;
CREATE TABLE `crm_post` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` char(10) NOT NULL COMMENT '职位部门名称',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_post
-- ----------------------------
INSERT INTO `crm_post` VALUES ('1', '总经理', '2017-03-06 13:15:18');
INSERT INTO `crm_post` VALUES ('2', '市场经理', '2017-03-06 11:49:16');
INSERT INTO `crm_post` VALUES ('3', '销售', '2017-03-06 10:16:13');
INSERT INTO `crm_post` VALUES ('4', '市场专员', '2017-03-06 22:26:33');
INSERT INTO `crm_post` VALUES ('5', '测试', '2017-03-06 22:28:20');
INSERT INTO `crm_post` VALUES ('6', '研发经理', '2017-03-06 22:28:45');
INSERT INTO `crm_post` VALUES ('7', '助理', '2017-03-06 22:32:58');
INSERT INTO `crm_post` VALUES ('8', '实施', '2017-03-11 21:11:14');

-- ----------------------------
-- Table structure for crm_staff
-- ----------------------------
DROP TABLE IF EXISTS `crm_staff`;
CREATE TABLE `crm_staff` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` char(20) NOT NULL COMMENT '员工真实姓名',
  `number` char(4) NOT NULL COMMENT '员工编号，从1001开始',
  `gender` char(1) DEFAULT NULL COMMENT '员工性别',
  `post` char(20) DEFAULT NULL COMMENT '职位名称',
  `type` char(4) DEFAULT NULL COMMENT '员工类型',
  `id_card` char(18) NOT NULL COMMENT '员工身份证',
  `tel` char(11) DEFAULT NULL COMMENT '员工手机号',
  `nation` char(5) DEFAULT NULL COMMENT '员工民族',
  `marital_status` char(2) DEFAULT NULL COMMENT '婚姻状况',
  `entry_status` char(2) DEFAULT NULL COMMENT '在职状况',
  `entry_date` date DEFAULT NULL COMMENT '入职时间',
  `dimission_date` date DEFAULT NULL COMMENT '离职时间',
  `politics_status` char(2) DEFAULT NULL COMMENT '政治面貌',
  `education` char(2) DEFAULT NULL COMMENT '学历',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_staff
-- ----------------------------
INSERT INTO `crm_staff` VALUES ('1', '曹操', '1001', '男', '总经理', '正式员工', '152728188412588365', '13524588878', '汉族', '已婚', '在职', '2017-05-10', null, '党员', '本科', '2017-05-10 21:32:48');
INSERT INTO `crm_staff` VALUES ('2', '曹正淳', '1002', '男', '销售', '合同工', '258469155223156984', '15248035962', '满族', '未婚', '试用', '2017-05-01', null, '群众', '大专', '2017-05-11 15:05:16');
INSERT INTO `crm_staff` VALUES ('3', '刘备', '1003', '男', '人事', '正式员工', '152489555123698888', '13584985523', '汉族', '离异', '在职', '2017-04-10', null, '党员', '博士', '2017-04-20 15:08:05');
INSERT INTO `crm_staff` VALUES ('12', '琼恩·你什么都不懂·雪诺', '1007', '男', '研发经理', '正式员工', '152489666584856932', '15248569324', '狼族', '未婚', '在职', '2017-05-01', '0000-00-00', '群众', '博士', '2017-05-18 16:29:14');
INSERT INTO `crm_staff` VALUES ('13', '克里斯·保罗', '1008', '男', '市场经理', '正式员工', '152486366956236852', '13586945328', '魅族', '已婚', '在职', '2017-05-01', '0000-00-00', '党员', '硕士', '2017-05-18 16:34:03');
INSERT INTO `crm_staff` VALUES ('16', '樱桃大丸子', '1009', '女', '销售', '正式员工', '152728199652365487', '13524685647', '人族', '未婚', '试用', '2017-05-16', '2017-05-16', '党员', '本科', '2017-05-18 22:20:35');

-- ----------------------------
-- Table structure for crm_staff_extend
-- ----------------------------
DROP TABLE IF EXISTS `crm_staff_extend`;
CREATE TABLE `crm_staff_extend` (
  `staff_id` mediumint(8) unsigned NOT NULL COMMENT '关联主表ID',
  `health` varchar(30) DEFAULT NULL COMMENT '健康状况',
  `specialty` varchar(20) DEFAULT NULL COMMENT '专业',
  `registered` varchar(10) DEFAULT NULL COMMENT '户口类型',
  `registered_address` varchar(50) DEFAULT NULL COMMENT '户口所在地',
  `graduate_date` date DEFAULT NULL COMMENT '毕业时间',
  `graduate_colleges` varchar(20) DEFAULT NULL COMMENT '毕业院校',
  `intro` varchar(255) DEFAULT NULL COMMENT '简介',
  `details` text COMMENT '备注详情'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_staff_extend
-- ----------------------------
INSERT INTO `crm_staff_extend` VALUES ('1', '良好', '政治家', '农村户口', '北京市昌平区', '2017-05-01', '北京大学', '姓曹，名操，字孟德', '说曹操，曹操就到');
INSERT INTO `crm_staff_extend` VALUES ('12', '良好', '剑术', '农村', '维斯特洛大陆临冬城', '2017-04-03', '君临大学', 'my name is john-you know nothing-snow.', '');
INSERT INTO `crm_staff_extend` VALUES ('13', '良好', '篮球', '城市', '美国洛杉矶', '2017-05-15', '维克森大学', 'my name is cris paul.', '');
INSERT INTO `crm_staff_extend` VALUES ('16', '良好', '厨师', '农村', '樱桃乡', '2017-05-17', '樱桃大学', 'my name is yingtao.', '&lt;img src=&quot;http://localhost/CRM/Public/kindeditor/plugins/emoticons/images/11.gif&quot; alt=&quot;&quot; border=&quot;0&quot; /&gt;&lt;img src=&quot;http://localhost/CRM/Public/kindeditor/plugins/emoticons/images/12.gif&quot; alt=&quot;&quot; border=&quot;0&quot; /&gt;');

-- ----------------------------
-- Table structure for crm_test
-- ----------------------------
DROP TABLE IF EXISTS `crm_test`;
CREATE TABLE `crm_test` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '自动编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_test
-- ----------------------------

-- ----------------------------
-- Table structure for crm_user
-- ----------------------------
DROP TABLE IF EXISTS `crm_user`;
CREATE TABLE `crm_user` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键，自动编号',
  `accounts` char(20) NOT NULL COMMENT '登录账号名',
  `password` char(40) NOT NULL COMMENT '账号密码',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` char(15) DEFAULT '' COMMENT '最后登录IP',
  `login_count` mediumint(8) unsigned DEFAULT '0' COMMENT '登录次数',
  `state` char(2) DEFAULT NULL COMMENT '账号状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_user
-- ----------------------------
INSERT INTO `crm_user` VALUES ('1', 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', '2017-05-18 13:58:07', '0.0.0.0', '28', '启用', '2017-03-24 10:52:14');
INSERT INTO `crm_user` VALUES ('2', '123', '3afd9146cb9c4b9bf106f59760c556ed5ffd7354', null, null, '0', '启用', '2017-03-29 22:05:52');
INSERT INTO `crm_user` VALUES ('3', '测试', '7c4a8d09ca3762af61e59520943dc26494f8941b', '2017-04-04 12:37:52', '0.0.0.0', '1', '启用', '2017-03-29 22:29:35');
INSERT INTO `crm_user` VALUES ('5', '阿郎啊', '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '0', '冻结', '2017-03-31 21:58:00');
INSERT INTO `crm_user` VALUES ('6', '正太', '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '0', '冻结', '2017-03-31 22:03:26');
INSERT INTO `crm_user` VALUES ('10', 'wangwu', '7c4a8d09ca3762af61e59520943dc26494f8941b', '2017-05-08 22:11:54', '0.0.0.0', '2', '启用', '2017-05-04 22:30:15');
