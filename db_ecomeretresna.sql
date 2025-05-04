/*
 Navicat Premium Data Transfer

 Source Server         : ProjectFi
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3306
 Source Schema         : db_ecomeretresna

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 04/05/2025 22:19:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'adminsatu', '$2b$10$o9mqpBW9IAg0VnHhLEyMkehouFFL7yVDzkm.FUxOYvOFrSMQjSPtK', '2025-04-24 13:36:01');

-- ----------------------------
-- Table structure for card_users
-- ----------------------------
DROP TABLE IF EXISTS `card_users`;
CREATE TABLE `card_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_users` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `card_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bank_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `expired_card` date NULL DEFAULT NULL,
  `users_id` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_id`(`users_id`) USING BTREE,
  CONSTRAINT `card_users_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of card_users
-- ----------------------------
INSERT INTO `card_users` VALUES (1, 'Refi Ahmad Fauzi', '86597552', 'BCA', '2025-05-31', 6, '2025-05-02 22:19:57');
INSERT INTO `card_users` VALUES (5, 'Kiki Heriawan', '2232129289', 'Mandiri', '2025-05-31', 6, '2025-05-04 09:16:21');
INSERT INTO `card_users` VALUES (6, 'Refi Ahmad Fauzi', '888398299', 'BRI', '2025-09-06', 6, '2025-05-04 09:23:36');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `product_size_id` int NULL DEFAULT NULL,
  `product_qty` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp,
  `status_cart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `users_id`(`users_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  INDEX `product_size_id`(`product_size_id`) USING BTREE,
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (1, 6, 5, 5, 3, '2025-05-01 13:57:44', 'checkout');
INSERT INTO `cart` VALUES (2, 6, 4, 18, 6, '2025-05-01 15:34:57', 'checkout');
INSERT INTO `cart` VALUES (3, 6, 4, 17, 1, '2025-05-01 15:35:37', 'checkout');
INSERT INTO `cart` VALUES (4, 6, 2, 9, 3, '2025-05-02 15:36:48', 'checkout');
INSERT INTO `cart` VALUES (5, 6, 5, 12, 2, '2025-05-04 06:50:05', 'checkout');
INSERT INTO `cart` VALUES (6, 6, 5, 7, 5, '2025-05-04 14:36:09', 'checkout');
INSERT INTO `cart` VALUES (7, 6, 5, 5, 1, '2025-05-04 14:39:11', 'checkout');

-- ----------------------------
-- Table structure for history_order
-- ----------------------------
DROP TABLE IF EXISTS `history_order`;
CREATE TABLE `history_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NULL DEFAULT NULL,
  `users_id` int NULL DEFAULT NULL,
  `product_id` int NULL DEFAULT NULL,
  `product_size_id` int NULL DEFAULT NULL,
  `product_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_qty` int NULL DEFAULT NULL,
  `product_price` decimal(10, 2) NULL DEFAULT NULL,
  `invoice_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cart_id`(`cart_id`) USING BTREE,
  INDEX `users_id`(`users_id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  INDEX `product_size_id`(`product_size_id`) USING BTREE,
  CONSTRAINT `history_order_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `history_order_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `history_order_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `history_order_ibfk_4` FOREIGN KEY (`product_size_id`) REFERENCES `product_size` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 62 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of history_order
-- ----------------------------
INSERT INTO `history_order` VALUES (50, 5, 6, 5, 12, 'Sepatu Adidas Response Super', '38', 1, 1099000.00, 10);
INSERT INTO `history_order` VALUES (51, 4, 6, 2, 9, 'Sepatu Nike Air Jordan', '38', 3, 1500000.00, 10);
INSERT INTO `history_order` VALUES (52, 3, 6, 4, 17, 'Sepatu Adidas Samba', '40', 1, 1100000.00, 10);
INSERT INTO `history_order` VALUES (53, 2, 6, 4, 18, 'Sepatu Adidas Samba', '42', 1, 1100000.00, 10);
INSERT INTO `history_order` VALUES (54, 1, 6, 5, 5, 'Sepatu Adidas Response Super', '41', 3, 1099000.00, 10);
INSERT INTO `history_order` VALUES (55, 7, 6, 5, 5, 'Sepatu Adidas Response Super', '41', 1, 1099000.00, 11);
INSERT INTO `history_order` VALUES (56, 6, 6, 5, 7, 'Sepatu Adidas Response Super', '39', 5, 1099000.00, 11);
INSERT INTO `history_order` VALUES (57, 5, 6, 5, 12, 'Sepatu Adidas Response Super', '38', 2, 1099000.00, 11);
INSERT INTO `history_order` VALUES (58, 4, 6, 2, 9, 'Sepatu Nike Air Jordan', '38', 3, 1500000.00, 11);
INSERT INTO `history_order` VALUES (59, 3, 6, 4, 17, 'Sepatu Adidas Samba', '40', 1, 1100000.00, 11);
INSERT INTO `history_order` VALUES (60, 2, 6, 4, 18, 'Sepatu Adidas Samba', '42', 6, 1100000.00, 11);
INSERT INTO `history_order` VALUES (61, 1, 6, 5, 5, 'Sepatu Adidas Response Super', '41', 3, 1099000.00, 11);

-- ----------------------------
-- Table structure for invoice
-- ----------------------------
DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status_shipping` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `shipping_price` int NULL DEFAULT NULL,
  `date_shipping` datetime NULL DEFAULT NULL,
  `date_order` datetime NULL DEFAULT NULL,
  `total_price` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `users_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of invoice
-- ----------------------------
INSERT INTO `invoice` VALUES (10, 'INV-1746316800000-5121', 'Selesai', 1109600, '2025-05-04 00:00:00', '2025-05-04 00:00:00', 11096000, '2025-05-04 07:42:14', 6);
INSERT INTO `invoice` VALUES (11, 'INV-1746316800000-551', 'masih digudang', 2428900, '2025-05-04 00:00:00', '2025-05-04 00:00:00', 24289000, '2025-05-04 14:48:56', 6);

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (2, 'Sepatu Nike Air Jordan', '[TOLONG DIBACA], \"2 pasang cuma 1 kg\", sepatu anak model air jordan umur 3 - 10 Tahun, ⚠️di desain khusus agar nyaman di kaki anak anak, untuk sekolah ...', '1746022024488.jpeg', 1500000, '2025-04-19 16:21:35');
INSERT INTO `product` VALUES (4, 'Sepatu Adidas Samba', 'Produk Details, 🎃 Brand : Adidas, 🎃 Model : Adidas Samba Og White Gum, 🎃 Warna : White, 🎃 Kualitas : Material Original / Perfeck Kick, 🎃 100% TRUSTED, ', '1746022153270.jpeg', 1100000, '2025-04-19 16:29:18');
INSERT INTO `product` VALUES (5, 'Sepatu Adidas Response Super', 'Beli SEPATU LARI ADIDAS Response Super White Harga Rp 1099000 Cicilan 0%✅ Gratis Ongkir✅ 100% ORIGINAL✅ Harga TERMURAH✅', '1746022705790.jpg', 1099000, '2025-04-30 08:30:10');

-- ----------------------------
-- Table structure for product_size
-- ----------------------------
DROP TABLE IF EXISTS `product_size`;
CREATE TABLE `product_size`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NULL DEFAULT NULL,
  `product_size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_qty` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `product_id`(`product_id`) USING BTREE,
  CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_size
-- ----------------------------
INSERT INTO `product_size` VALUES (3, 2, '40', 50, '2025-04-24 12:03:45');
INSERT INTO `product_size` VALUES (5, 5, '41', 93, '2025-04-30 12:06:45');
INSERT INTO `product_size` VALUES (6, 5, '40', 50, '2025-04-30 12:08:08');
INSERT INTO `product_size` VALUES (7, 5, '39', 45, '2025-04-30 12:08:25');
INSERT INTO `product_size` VALUES (8, 2, '39', 10, '2025-04-30 12:18:59');
INSERT INTO `product_size` VALUES (9, 2, '38', 14, '2025-04-30 12:19:15');
INSERT INTO `product_size` VALUES (12, 5, '38', 22, '2025-04-30 12:23:43');
INSERT INTO `product_size` VALUES (16, 4, '41', 10, '2025-04-30 12:39:16');
INSERT INTO `product_size` VALUES (17, 4, '40', 8, '2025-04-30 12:39:27');
INSERT INTO `product_size` VALUES (18, 4, '42', 8, '2025-04-30 14:07:52');
INSERT INTO `product_size` VALUES (19, 4, '43', 50, '2025-04-30 14:07:59');
INSERT INTO `product_size` VALUES (20, 2, '41', 100, '2025-04-30 14:09:48');
INSERT INTO `product_size` VALUES (21, 2, '42', 25, '2025-04-30 14:09:54');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_active` tinyint(1) NULL DEFAULT 1,
  `created_at` datetime NULL DEFAULT current_timestamp,
  `date_of_birth` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (5, 'Refi Ahmad', '0855555554', 'Jl. Mawar', 'Male', 'Refi@example.com', '$2b$10$OKUl29oNt/ZQMIshOZsfj.EFXP.D30ljUT212CU9dZ0dCe.HDc2V.', 1, '2025-04-24 11:50:36', '2000-01-01');
INSERT INTO `users` VALUES (6, 'Refi Ahmad Fauzi', '085907418585', 'Kos Aquatik,Grogol Petamburan, Jakarta Barat', 'Male', 'ahmadfauzi@gmail.com', '$2b$10$pixPddePtM.OdKBqYZ927OSuKO8bPVBEB1mRQyQai2AxmRxztxngu', 1, '2025-04-30 13:55:54', '1999-04-30');

SET FOREIGN_KEY_CHECKS = 1;
