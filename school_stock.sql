-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2026 at 09:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `minQuantity` int(11) NOT NULL DEFAULT 5,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT 'indigo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `category`, `quantity`, `minQuantity`, `createdAt`, `updatedAt`, `userId`, `color`) VALUES
(1, 'gas 6kg', 'sp', 11, 5, '2026-02-05 11:57:36', '2026-04-11 07:24:34', 0, 'indigo'),
(2, 'gas 12kg', 'kg', 10, 5, '2026-04-11 07:22:51', '2026-04-11 07:22:51', 0, 'indigo'),
(3, 'gas 6kg', 'kg', 10, 5, '2026-04-11 07:29:30', '2026-04-11 07:29:30', 0, 'indigo'),
(4, 'gas', '12kg', 5, 5, '2026-04-27 10:19:47', '2026-04-27 10:20:10', 5, 'indigo'),
(5, 'gas 12kg', 'sp', 26, 5, '2026-04-28 13:25:27', '2026-04-28 13:31:59', 6, 'indigo'),
(6, 'car', 'supra(toyota)', 5, 1, '2026-04-28 13:37:30', '2026-04-28 13:38:59', 6, 'indigo'),
(7, 'rice ', 'umutazaniya', 6, 3, '2026-04-28 13:45:24', '2026-04-28 13:45:39', 7, 'indigo');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `type` enum('IN','OUT') NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `type`, `quantity`, `date`, `createdAt`, `updatedAt`, `itemId`, `userId`) VALUES
(1, 'IN', 2, '2026-02-05 11:58:35', '2026-02-05 11:58:35', '2026-02-05 11:58:35', 1, 0),
(2, 'OUT', 3, '2026-02-05 11:58:58', '2026-02-05 11:58:58', '2026-02-05 11:58:58', 1, 0),
(3, 'IN', 3, '2026-02-05 11:59:10', '2026-02-05 11:59:10', '2026-02-05 11:59:10', 1, 0),
(4, 'IN', 5, '2026-02-05 11:59:15', '2026-02-05 11:59:15', '2026-02-05 11:59:15', 1, 0),
(5, 'OUT', 8, '2026-02-05 11:59:36', '2026-02-05 11:59:36', '2026-02-05 11:59:36', 1, 0),
(6, 'IN', 10, '2026-02-05 12:00:13', '2026-02-05 12:00:13', '2026-02-05 12:00:13', 1, 0),
(7, 'OUT', 9, '2026-02-05 12:03:45', '2026-02-05 12:03:45', '2026-02-05 12:03:45', 1, 0),
(8, 'IN', 3, '2026-02-05 12:03:58', '2026-02-05 12:03:58', '2026-02-05 12:03:58', 1, 0),
(9, 'OUT', 2, '2026-02-05 12:04:10', '2026-02-05 12:04:10', '2026-02-05 12:04:10', 1, 0),
(10, 'OUT', 1, '2026-04-11 07:20:48', '2026-04-11 07:20:48', '2026-04-11 07:20:48', 1, 0),
(11, 'IN', 10, '2026-04-11 07:24:34', '2026-04-11 07:24:34', '2026-04-11 07:24:34', 1, 0),
(12, 'OUT', 5, '2026-04-27 10:20:11', '2026-04-27 10:20:11', '2026-04-27 10:20:11', 4, 5),
(13, 'OUT', 4, '2026-04-28 13:26:01', '2026-04-28 13:26:01', '2026-04-28 13:26:01', 5, 6),
(14, 'IN', 20, '2026-04-28 13:31:59', '2026-04-28 13:31:59', '2026-04-28 13:31:59', 5, 6),
(15, 'IN', 5, '2026-04-28 13:38:59', '2026-04-28 13:38:59', '2026-04-28 13:38:59', 6, 6),
(16, 'OUT', 2, '2026-04-28 13:45:39', '2026-04-28 13:45:39', '2026-04-28 13:45:39', 7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'moses', '$2b$10$UVPN.L6tGCj4vCTGWZOYWO2c7cnL38U6ibEHx.Y5BWMKzZ7OVxmZG', '2026-02-05 11:56:26', '2026-02-05 11:56:26'),
(2, 'hello', '$2b$10$G.MZKTE4fRV4AsNQqBAKh.CQBlAN4qUpfQTL79z0rStT2Ub5YR3yu', '2026-03-31 08:42:08', '2026-03-31 08:42:08'),
(3, 'moise', '$2b$10$wMNpX8Kqv.6.UhxOb/GnY.XGAV35DAUuEO.iEuqGR6heQdka/qWhS', '2026-04-11 07:19:56', '2026-04-11 07:19:56'),
(4, 'manzi', '$2b$10$HZVWReW0SwgRCoyrJAV8Xe9abX9kXfZf.BCbAh9Abwc7sayoNvQwK', '2026-04-27 06:30:46', '2026-04-27 06:30:46'),
(5, 'add', '$2b$10$sjUFPv8vbz0o4AR7FzxuSOsEpnK0M4OhQa3Nyqs/iLZ4g.bvlfdgG', '2026-04-27 10:00:38', '2026-04-27 10:00:38'),
(6, 'qwerty', '$2b$10$3Rm2avMH/98xX9n0058hTOUHVYVclMZqnw3b2YOwhs1BQ8QXWeKMG', '2026-04-27 10:20:42', '2026-04-27 10:20:42'),
(7, 'john', '$2b$10$dQGUGiQho6ZTEgHjRaygwO.2F1iltMVBdEDvcg1ZMgaVUT7YmQDBm', '2026-04-28 13:43:45', '2026-04-28 13:43:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `username_10` (`username`),
  ADD UNIQUE KEY `username_11` (`username`),
  ADD UNIQUE KEY `username_12` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_10` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_11` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_12` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_13` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_4` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_5` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_6` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_7` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_8` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_9` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
