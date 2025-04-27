-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2025 at 07:51 PM
-- Server version: 8.0.40
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utsshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `main_category` varchar(100) NOT NULL,
  `sub_category` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `main_category`, `sub_category`, `image`, `description`) VALUES
(1, 'Mr Chen\'s Prawn Dumplings', 'Frozen', 'Dumplings', 'img/dumplings1.jpg', 'Premium prawn dumplings with a family recipe, ready in minutes.'),
(2, 'Golden Wok Szechuan Pork Dumplings', 'Frozen', 'Dumplings', 'img/dumplings2.jpg', 'Szechuan-style pork dumplings with spicy soy dipping sauce.'),
(3, 'KB\'s Pork Soup Dumplings', 'Frozen', 'Dumplings', 'img/dumplings3.jpg', 'Delicate dumplings filled with juicy pork and savory broth.'),
(4, 'Coles Chicken Tenders', 'Frozen', 'Snacks', 'img/snacks1.jpg', 'Buttermilk crispy chicken tenders with dipping sauce.'),
(5, 'McCain Beer Batter Fries', 'Frozen', 'Snacks', 'img/snacks2.jpg', 'Steak-cut fries coated with crispy beer batter.'),
(6, 'Steggles Chicken Fingers', 'Frozen', 'Snacks', 'img/snacks3.jpg', 'Crunchy chicken fingers ready in 15 minutes.'),
(7, 'Vine Tomatoes', 'Fresh', 'Vegetables', 'img/vegetables1.jpg', 'Firm and juicy tomatoes ideal for salads or cooking.'),
(8, 'Red Capsicum', 'Fresh', 'Vegetables', 'img/vegetables2.jpg', 'Crisp red bell peppers rich in vitamin C.'),
(9, 'Fresh Broccoli', 'Fresh', 'Vegetables', 'img/vegetables3.jpg', 'Tender green broccoli florets freshly harvested.'),
(10, 'Fresh Oranges', 'Fresh', 'Fruits', 'img/fruits1.jpg', 'Juicy sweet oranges perfect for snacks or juicing.'),
(11, 'Blueberries Tray', 'Fresh', 'Fruits', 'img/fruits2.jpg', 'Plump blueberries packed in recyclable container.'),
(12, 'Seedless Mandarins', 'Fresh', 'Fruits', 'img/fruits3.jpg', 'Easy-peel mandarins with rich citrus flavor.'),
(13, 'Impressed Orange Juice', 'Beverages', 'Juice', 'img/juice1.jpg', 'Cold-pressed 100% orange juice with no pulp.'),
(14, 'H2 Juice Lychee', 'Beverages', 'Juice', 'img/juice2.jpg', 'Refreshing lychee juice with no added sugar.'),
(15, 'Golden Circle Pash', 'Beverages', 'Juice', 'img/juice3.jpg', 'Fruit drink with pineapple, apple, and passionfruit.'),
(16, 'Schweppes Tonic Water', 'Beverages', 'Water', 'img/water1.jpg', 'Zero sugar tonic water with zesty flavor.'),
(17, 'Pureau Spring Water', 'Beverages', 'Water', 'img/water2.jpg', 'Pure spring water in a large 2L recyclable bottle.'),
(18, 'Coles Natural Spring Water', 'Beverages', 'Water', 'img/water3.jpg', 'Everyday spring water for hydration and freshness.'),
(19, 'Ultra Glass & Window Cleaner', 'Home', 'Cleaning', 'img/cleaning1.jpg', 'Streak-free window cleaner with refreshing scent.'),
(20, 'Stainless Steel Scourers', 'Home', 'Cleaning', 'img/cleaning2.jpg', 'Coles steel scourers, great for tough pan scrubbing.'),
(21, 'Bref Power Active Toilet Cleaner', 'Home', 'Cleaning', 'img/cleaning3.jpg', 'Ocean-scented toilet freshener with antibacterial power.'),
(22, 'Sistema Snack Box', 'Home', 'Kitchen', 'img/kitchen1.jpg', 'Leak-proof lunch/snack box with air-tight lid.'),
(23, 'Chux Superwipes', 'Home', 'Kitchen', 'img/kitchen2.jpg', 'Multipurpose super absorbent kitchen cloth roll.'),
(24, 'Multix Freezer Bags', 'Home', 'Kitchen', 'img/kitchen3.jpg', '80 medium-sized freezer bags, microwave safe.'),
(25, 'Supercoat Adult Chicken', 'Pet Food', 'Dog Food', 'img/dogfood1.jpg', '7kg chicken-flavored dry dog food for adult dogs.'),
(26, 'Love\'em Kangaroo Tendons', 'Pet Food', 'Dog Food', 'img/dogfood2.jpg', 'Australian-made kangaroo tendons for dog dental health.'),
(27, 'Applaws Taste Toppers', 'Pet Food', 'Dog Food', 'img/dogfood3.jpg', 'Gourmet toppers for dog meals with chicken and beef.'),
(28, 'Whiskas Chicken Mince', 'Pet Food', 'Cat Food', 'img/catfood1.jpg', 'Whiskas wet food with chicken, specially made for cats aged 1+.'),
(29, 'Felix Meat Menus in Jelly', 'Pet Food', 'Cat Food', 'img/catfood2.jpg', 'A 24-pack of jelly meat meals with chicken, beef, and lamb.'),
(30, 'Fussy Cat Grain Free', 'Pet Food', 'Cat Food', 'img/catfood3.jpg', 'Premium grain-free dry cat food with salmon and olive oil.');

-- --------------------------------------------------------

--
-- Table structure for table `product_units`
--

CREATE TABLE `product_units` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `unit_name` varchar(50) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_units`
--

INSERT INTO `product_units` (`id`, `product_id`, `unit_name`, `unit_price`, `stock`) VALUES
(1, 1, 'Small', 5.19, 0),
(2, 1, 'Medium', 6.49, 0),
(3, 1, 'Large', 7.79, 0),
(4, 2, '100g', 3.28, 16),
(5, 2, '200g', 4.10, 34),
(6, 3, '250g', 4.47, 0),
(7, 3, '500g', 5.59, 37),
(8, 4, 'Small', 3.38, 48),
(9, 4, 'Medium', 4.22, 41),
(10, 4, 'Large', 5.07, 43),
(11, 5, 'Single Pack', 6.07, 43),
(12, 5, 'Family Pack', 7.59, 16),
(13, 6, 'Single Pack', 7.12, 44),
(14, 6, 'Family Pack', 8.90, 10),
(15, 7, '250ml', 6.38, 0),
(16, 7, '500ml', 7.97, 39),
(17, 8, 'Small', 5.50, 11),
(18, 8, 'Medium', 6.88, 29),
(19, 8, 'Large', 8.25, 27),
(20, 9, '250ml', 3.11, 8),
(21, 9, '500ml', 3.89, 12),
(22, 10, '1pc', 8.84, 29),
(23, 10, '2pcs', 11.05, 9),
(24, 11, '100g', 3.81, 25),
(25, 11, '200g', 4.76, 27),
(26, 12, '100g', 5.99, 22),
(27, 12, '200g', 7.49, 38),
(28, 13, '1pc', 6.88, 38),
(29, 13, '2pcs', 8.60, 24),
(30, 14, 'Small', 3.22, 11),
(31, 14, 'Medium', 4.03, 6),
(32, 14, 'Large', 4.83, 49),
(33, 15, '1pc', 7.32, 39),
(34, 15, '2pcs', 9.15, 16),
(35, 16, '250ml', 9.33, 19),
(36, 16, '500ml', 11.66, 32),
(37, 17, '500g', 5.14, 22),
(38, 17, '1kg', 6.42, 30),
(39, 17, '2kg', 7.71, 50),
(40, 18, '250ml', 4.74, 16),
(41, 18, '500ml', 5.93, 9),
(42, 19, '500g', 8.45, 25),
(43, 19, '1kg', 10.56, 47),
(44, 19, '2kg', 12.67, 6),
(45, 20, '250ml', 5.17, 38),
(46, 20, '500ml', 6.46, 35),
(47, 21, '1pc', 7.16, 35),
(48, 21, '2pcs', 8.95, 14),
(49, 22, 'Single Pack', 5.90, 35),
(50, 22, 'Family Pack', 7.38, 47),
(51, 23, 'Single Pack', 9.33, 42),
(52, 23, 'Family Pack', 11.66, 18),
(53, 24, 'Small', 9.69, 36),
(54, 24, 'Medium', 12.11, 34),
(55, 24, 'Large', 14.54, 12),
(56, 25, '500g', 6.55, 9),
(57, 25, '1kg', 8.19, 7),
(58, 25, '2kg', 9.82, 44),
(59, 26, '100g', 6.31, 5),
(60, 26, '200g', 7.89, 21),
(61, 27, 'Small', 7.58, 21),
(62, 27, 'Medium', 9.47, 35),
(63, 27, 'Large', 11.37, 31),
(64, 28, '100g', 5.32, 25),
(65, 28, '200g', 6.65, 40),
(66, 29, 'Single Pack', 7.32, 41),
(67, 29, 'Family Pack', 9.15, 36),
(68, 30, '1pc', 5.97, 40),
(69, 30, '2pcs', 7.46, 49);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_units`
--
ALTER TABLE `product_units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product_units`
--
ALTER TABLE `product_units`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_units`
--
ALTER TABLE `product_units`
  ADD CONSTRAINT `product_units_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
