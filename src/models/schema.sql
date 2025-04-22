CREATE DATABASE IF NOT EXISTS petra_cipher_db;
USE petra_cipher_db;

CREATE TABLE IF NOT EXISTS `keys` (
  `id` VARCHAR(36) PRIMARY KEY,
  `material` TEXT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `description` TEXT,
  `status` ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  `version` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
