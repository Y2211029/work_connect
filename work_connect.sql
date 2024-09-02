-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-07-17 17:32:33
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `work_connect`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_05_01_031231_create_w_users_table', 1),
(5, '2024_05_29_063741_create_w_chats_table', 1),
(6, '2024_05_29_064202_create_w_companies_table', 1),
(7, '2024_05_29_064710_create_w_items_table', 1),
(8, '2024_05_29_065857_create_w_kinds_table', 1),
(9, '2024_05_29_070204_create_w_movies_table', 1),
(10, '2024_05_29_070532_create_w_notices_table', 1),
(11, '2024_05_29_071019_create_w_pre_companies_table', 1),
(12, '2024_05_29_071245_create_w_pre_users_table', 1),
(13, '2024_05_29_071527_create_w_tags_table', 1),
(14, '2024_05_29_071750_create_w_works_table', 1),
(15, '2024_06_05_055425_remove_password_from_w_pre_users_table', 1),
(16, '2024_06_17_044127_remove_passwordand_from_w_companies_table', 1),
(17, '2024_06_19_071348_create_w_news_table', 1),
(18, '2024_06_26_012805_add_type_to_w_companies', 1),
(19, '2024_06_27_054748_add_type_to_w_companies', 1),
(20, '2024_07_06_133938_w_bookmark', 1),
(21, '2024_07_08_024536_create_w_images_table', 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1Z7BQfwiDedYJyWKd6W2mLz2qV0ffvxbcxcNlnM0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1g5ZHFTV241bTJ2Yjd1M3B4QW5lVUtycVlxMm80Tmlyb2RvbTViZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224606),
('1ZwDv8fZFFz4qOv5MV1wIuBtNpfaGSbGmAl08vbW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWp0VTZWU3FCWUw2TW11ZklQQ0xIRkZnbWd0dHN4RmM1VGxvbUxUbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219750),
('2BSEWKHZt89GCz68oGoThZHVqJzmthGRwhV3i9t9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2FnRXplUlVZdWRkWlBwSEROeGxNamc2cnI1V3Z1dGJwSWIzZW5URiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219630),
('2Kj1tyr0wgfbFmwaJeaKkHkObY4prmqhxoSg5dn2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGhKbUFKOFkzYzBIdmZpbXhKWDZWbVNXU2RkRGFLTFd2UXBickxsOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219748),
('2M7XoR5Wj7hB0uSY1xdPohjfIzvVF7B6M6jy2wGf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYXZhUVJjSEdoRGEybFJoUjVKb1V3WVpNWXlHMWdtbDhJMDVEcGdMUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721230229),
('2tYGztHZXW1P4rRykpkpYfp2oG08ZHU1ujWmVbXv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFJiZDNqNzJJd2lqc2tKeGlnS1BkZXMxd2N2bjFURzY4d1ZOU2poMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc19sb2dpbj9fPTE3MjEyMjQ2MDM0MTAma2luZD1jJnBhc3N3b3JkPU5paSU0MDIwMjMmdXNlcl9uYW1lPTIyMTAwMTYlNDBpLXNlaWZ1LmpwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224614),
('2zj4W5INk5OwWEBFe9wKyVAjZF6DcBAk2OJ99FJS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1lNdkVUTmc3Q1Rlc3FuM2oyb21SdVdDWlFSMUpaclZYMUdScjVNZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc19sb2dpbj9fPTE3MjEyMTk2MTk5NDUma2luZD1jJnBhc3N3b3JkPU5paSU0MDIwMjMmdXNlcl9uYW1lPTIyMTAwMTYlNDBpLXNlaWZ1LmpwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219679),
('2Zy7k2UuQyJi7JSFTzD4mbS6vzWyTMNCyA53sPH8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUDlOQjNUTWRRYUlYcGJaNVQxa2JjdjJ1VTZKMlExeVlkakpzdlllayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219972),
('4emIlBkGbg0hOjIoZqlHKEkdOKZj1pPts40f6BWC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYk5xRE1xak94WVJGc1NkWGdtaWlSTGhLekVBN3hwdmFTWnZlMEhtdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfc3R1ZGVudF9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219716),
('4ut9A4WTCUxEVLTBCUf5EbAd0p2A4DFxHc6jhMEj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ1lRSjA3bGpab2g4dlBJSDhQMTVtT3lVWk4zUzY5VzlDak9adk1LaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219550),
('5kWFUmpRgHzEUAHryDeKJMUF6tx5mov8rT77r2IZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFkxcjExSWJGY2k0RW9NRlhlQmpuekNSdHhSNWdDdHlRYnptZTJ6SSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218058),
('64PjQa0tExCrjjoYEk7wgi2gJ03cr8wII8TdtrK6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiclBBWDlyclF6NG43dTFuVVA3cklaZ3kwYlhtQ205WHNURDJNbkpaQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219706),
('7Z8go30tIfzL2YdKO4RkuRlBLijYdhfV6sVN1moi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaHdXazlkb1F1em1sUERLR1Q1elVkRUppZ1JTQVo3Vzl4Uk1COXFFTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224608),
('8UYanAAmQ14PcrvU3XIrIuC7IXA9eS2psUa4ksUP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZUVETVZrdWdXSnpwR1JwQnk2QmIzdVdWTmFqREt6NVh5OWdSaVVTNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfbW92aWVfbGlzdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721219968),
('9mRHrAvyFmx2AkHXcZNQTkmyGTe1IXeilnNVJqQu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnA3RWxUcmYyaGxaQmlydDdCZEtwUmwzQjNuTkw5WUlnb0JWdWFsUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219533),
('a1uvZR8x0hNMhyLlowWu8CvPwpVOxV7Bhsv9kssi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibEZ1OUhwMGFsVXNNeTdZVnFrWmZXSHR4QkpIVXF3dUtkREZrTE5DWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218735),
('AnK6PirfafuYlwt6S1zINeRH8UTfgHxpHQSynZhy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibjU0TEhxY2NiSEdaRm9KWHd0RnRqQlB1Qk9zaGp1ZHduNVV3cVZ2MyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218836),
('Au1gneV3Ur9HhdeP4sFjPmVSMyLNHqYw3gysJbvp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRkZaYjM3VVhEUFpQSkQxOGU0cGxKczhVaW5NUURCcU83dEdqWkhLTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218762),
('AVQJGjL7FQzyJ1k7OWTNFf8t1IBIEczTb6N6QFSz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEdhbGdFc1ZPUmRVSGxyWFJXS1dXOHhwaEhwRWhsZFdFSXExZzkzcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220142),
('b2zPKkIEyskFbcBT8xGTlFg9LVCJNwjgotcvyxp8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRjg5VnF1eWc0SWd0dEVkRFJiTkdWYzB2R3hXN045NDJ3d0NyR2h2VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jX215cGFnZS9DXzAwMDAwMDAwMDAwMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721230262),
('B5dmrHmKxCSd3ld02wP3Z318rxjv4hvkOPAfymYI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY3kzTUdMVEVCSWZucE5ERXJ6Ykl5Wk9Hdnh1dUdWWHpQdzQ2MFE3OCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218048),
('BGNFpQffsyRJBFhH50hQdGN5toSLBOlA81x7ATIh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0dwR1JxUkg3aTV3RURIMnJjV1c5MENQWnpkaW54c2cxTE1PWkhIUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219718),
('BKY9N6DCKpf8mICURcAFqHi0rhUM7iCjnIhxgho1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYjR5VUw4a3JtZkZTYVB2azJpS1hOTDNpVExVck54QlB6Tkpzelp1bSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219630),
('c7BggtEk85hDLBgn3spjQ8PnUS5l3omIg6hfaJzx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN3Vwcml5TDJET04yV1JBeGRsZ0VteGdCOHp4NmFsMXFmZWJucDlnQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219674),
('DCkHtlcxBkukxuBMBdeQyL8LNceenSfbnPjgE0sF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVlQczBnYWJmQVZ4aVZyWGI2WlNmcTg5WnVuNjhYdUM1cjh3UEN4VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218736),
('dH2otmOlV9wZnEwHSeJWXrAWElHsiMzYp82hAJsc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMnFrMXRvcUQ5bUNpeHJVVUJlWnd3cmJKc1M1RFVNWEhManAxYU9OQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218752),
('Dhv9EwExurCtl7dqgWA31KLqninMEB7xAmfrlROJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2lTbVByengxWUpVaGd0VTdGRVhKN0cxdjU4QWtjTzlRVjVnZHEwMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219618),
('dWWQXFVRZyF9DUc2tmSugFXI0GFduC6ExKEvGA2k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2Y2allrclJWempaNW1hWUVybm80OUpsbGhtcnp3cVJCZ0NlRGFhaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224268),
('DYdI65bBI8QR0YVj2ELGeTbWQ0OlRNMXCRV1HbYe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFlLanMwQXU2R0VzR0pRaE45OTdXV0JQdWgwOUpMdjlKQUpjR2YzaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219693),
('e6fPdEESRW62FX4TSSREG9N24J5nQP84HeqMr1fw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSzUwc2VqdGFaVE91Q0lodzlvdDBVbXAzdnZNVlVENEVZMzNDSXVHSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220138),
('EcaFLjuWnXRxYCFqWN2vWvrk94MP6p4K7ASQO3Hv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN3N5YzBvTzY0M2NRVk1jdXFuUTF3Uk9meTdYa3lrSGVoV0g2djA4RiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc19sb2dpbj9fPTE3MjEyMTk2MTk5NDQma2luZD1zJnBhc3N3b3JkPU5paSU0MDIwMjMmdXNlcl9uYW1lPTIyMTAwMTYlNDBpLXNlaWZ1LmpwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219671),
('eR2Xt3DBmnNHPr8bgr4HrWL1uj57oGmJa2SIr51k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYzI1RzJielhpZE5HMm54TkhXeVhEQ2Rvajhlb2E5bnZETmNuQW5mZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfbW92aWVfbGlzdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721220141),
('EUBYI5Dm17pHRC0jlVBWB9YbgwrFn7QAcVPtmKjQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWEhPMUx3SktNQVNxWkVSQ3BheHAwOE1ydDR3eW9kY0xTdnoxN05mNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219693),
('eybY5MBamvDWyBR3N8AV7hlPVkN9JfPzzKPTP3cv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3lwQmE5N3kxc3oxbjF6YkUxTnlSRXo5UG5tVmlWVHQzOU1KbWVVRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219696),
('fcL2ScXVBcr8LkVMSCFhmhsFyyl2jHtC3UjnXYNB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibGxFbWdKdlNGMkZhTEZPY1AyVnVXMmVVSmFHZEliQm91N2Nsc2FuTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfc3R1ZGVudF9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219736),
('fipg5tcWCpRtX5cQSVy1N7pXsw1DuFt5obGP6Za0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2ZkdUo5Z1dIaEFpd2VGdnhzQ2YxdU5uS1JqN0Q0bkloZVFlWTdRTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219729),
('FknFOnqN6VQtsOXamPNWAavKvdL1oJhH5nDeZHW0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaFVpc1d2ckRvRzQ5aE03RXd1bkozUTVrNzVwaUY3TFI3dzNWbnFUcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721230221),
('gH9yGcF4ccwwALYXOylVpvjvgNfCfz5kyZuk0XGk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRVdlWDM1bDdpWDloV0FvdHJSQUVqMnFqelV5Tkx0ZjdRRExNNGlFSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224284),
('GtaUPHeFGyWIGPUccS28gpi9EUOgNShUVDUvQjSY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0F1c2pTV2VJWUNRWHNaajlvSFhhbWNlQ0djV3NtdlRWSWRtdUhRSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219681),
('h6G6OLXkYciTBsSNLUgxYt2j0siscO5pyLn2H25W', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ00wTnRnZENIMFFVa1RRY04wdVNORlF1VG9CajhaN2VTaWpUNms5WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218826),
('h9kCPpjspn4trSIhk40oZv00Qc6uZQXVwwXZY9pD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblZCRXFHeHhvTjB6YWE1cFBpWHZnZmM5VVo1aWV2WTRNZlQxM2FUTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218734),
('J3TsUd18OJ3DjgEKrtmH1hykf8GPAoP3yo5MkEYp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzBFSzZOU0dIdk1IM3VLanJlaFBMSEdPOE5uU3dwclZ0MEk3Z0tUSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721230238),
('j75VcyUoXKMfbHuV3UgYyzhINp1QPKaKeaUBM1vD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaDVrQ2QzSE13TUc5WlFkQmpueWZWdEEzc0d5cnBrb04zQ0FjNFdBRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219532),
('JHVhv5ARf9XH6AQjZ08YYA33NzNSuPUuKpULGEno', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibVJlb2d6dExqUzNqS25FQXlyWXltSW10QTk5bE5VNkd6cmJiVENpdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219534),
('JK9UnzcN9szA2PtHpmcUUyLuhRev8N09g8EOCQAG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2dDcWFETjRwekx2RTFkVVdGZlFkQzNPRllzVkt3YW55a0xrd2QwaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jX215cGFnZS9DXzAwMDAwMDAwMDAwMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721219682),
('KCz5XdvcjOMsw1EpyfSSZUucoJ1sKxYD77nqm0oR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSTVCc2lDemZCRXVPRUtscmdIQThYTEM0TnhiOXZMOU1QS1liN3NUTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219736),
('KmgL5ULMgVqCNViqn5ZYsxGIBMfJ0McHPZ1oVsFg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibDZMcmw2Nm5FUjZrUDU0ZU1ndkQ5MTJkMlE4RHMzbjBrbDhqS251byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218248),
('lFM7VA8HPLAV2dXMS54JgVxHo6y4sD6UPMUSYTAZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOWtXVUVlbDhhOXVLclhEYktsNWZEbGFwUkhIcGt3MnFzY0pCZDJ1NCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220143),
('Lu0hLIT5Gxthqs3hwOtwLM2uO3Mitu8N024j2TXd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU0RNTUNGVDdHT2IxSnJVZzNpcm1xMDRWd21Rb1FPOExQQ01RbTRENSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224267),
('m2rIIK1t1p9cNgdSNxanCLOyALQ9PXcraSmv9hsz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0NnRnhtdnRlTlVpdUZFbDNUTmpxVVNOVENjVW5rVXNJSUpIaWY1cCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218734),
('MAy8hozeRuQ3xB1guWaU4y5JfFtcFoYM0SbFbF0v', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibnVaRWhhdWU1M2ZZZlNYVFJWWHlZNUNEYzlZeUZMaWpjc3NlQXlBZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219641),
('Mb8hZaVKANlHh5gnGyjyEPDi5a5YT70OSkY0mWaD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUThPbXhKMlVVUWROMFFCZlR4MTEyS051QzNSc2h6RVVyRThzRldxRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218826),
('mEnqrJ7cZr9m5V2ccAUed3IC1P3SSKpyV6I5Kndq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiblJYNGRPdW1OMXFzaW1uQkRSSFkwOWlaWnZ6RTdZTnRLajliM0xyZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfc3R1ZGVudF9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220141),
('mGHqOmtyu7U3ymJpu7xhZM0hHFbqtELulzFdhPH2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic09hSFN2NXd0a0M1VjlPS3hnbkZGdVVkS2hJYkRZVTBUSHllZ2VCWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218828),
('MJBvd8yWlKuQa0HE50GciNwVjSPXdCZ79OZoGpT4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibmJvQTRaUmZLSG1FbjZCNDlBWlhIQlNmSjlGbkJWQVJ1TGZuYnhZbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219618),
('mLzZH8eposnxKe5IB23Jb0hkrWnJ8urm3251YPuv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic0pqQzJqVFBkV2I1d09PN1RDZzlQZGNZOVNGempzMVFLMERJTVU3ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218836),
('n6EhdZ7Q5TdLUU2BAgIgqezrLosXAUTkUe4bnItw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUDhCa1FiUmZTdzBkV0NubmVDSGMxSVhnT3MzU200aFdhUGFaWU1YNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfbW92aWVfbGlzdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721219750),
('NdgGRiGCUYm51VSAklYU0ZiuTcDqf4CCor9hec7k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRE1IejBISEtaNVZJZkVONFU3TTVqa3Iwd016blFPNzJEVE5KQlpmQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219567),
('NFqnk4vQOzxNncUC0HUVgRT4YYtUv7OJ2hXQdHnI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFZFYmZKMHBLNUdIdTZuclpOdVBKakpLYk5MQlhHTDNmVFhCTlhQNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219566),
('npWIbrSD13ayl5FBZetSILwiQJ3oitLr6NKyjYd9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZkxMWFJSNHZBUk51RWN6Z29GdXN1elJnMFN4d1Vta2lKTmlUNHI1ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224616),
('nr6Ua5so3u1lW1M2yPTeijngxLgHEO5TrSPt3Snm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlFkQ0dCNlgwczdZU3NhekNpdElOT1EzVFAxaHhzamoyTDF3Q2lxSSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721230238),
('o22PFsL4cEryTxuK34i1qgFpzjh0f1yYzmgcDBzr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkhmb3hHWVdmY0k0dnJkRFRWaG5QTDZKcjZnVTVza1JPa2k0U25nMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219550),
('Pd3s7O16YrzGoAWBcNJ1mDMAFqfmDLWbbR0si0Ud', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY1ppU2NGbnROYnprMDhLR0JPNzdLeE94ZW9Cdml3STJtQTNsbEl5NyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219730),
('pfv971LflaVXfdmm7VpA2Q10CVZZe9tSxDciVDx4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGxkOVdNM1IxQWozdzY1dzNoS1VoUE5XWlJSN0ZCRkd4NHR2Y2tHVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219702),
('QviHk6yNV9mda3r8CpLpwfHjCRh5cJsvJ0nLVDOM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZk5BWFNqWVl4YlY1SU9CRmNzWHdrZDlITGVOMnpnVDQ3OXRmY2tBbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfY29tcGFueV9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219715),
('qXZXq6U1XlGP2ah6TrSAQMAlFAATYnqHTDgygKI3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkxabHZaSkZLZThtU1NTVnRhUlROekdzRFBKcGx6dkN0Mng1ZE4yUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218058),
('R0eZSdVtvHyB5vcVT21uek95DuetqnlWrMjfcjPu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY0lIcjNoRjFoZU9kVGtoVUFMUlVGSU5XUUp6QmdWZ3hrcXFNOHRmNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224940),
('RFQ0p887vnamj0L5d27pQx9jLqHCmvAGTYPMV3pp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUF5Nzhxc2NLMkFGNHZiazZlQjh4NldiOFV3MTc5Z04zYUVWeXlCUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220133),
('ruM8zi9P2rcnGTdnIL98ua3BRNaWLht8Q4lWeHFS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVkduUWJzTURqY0Q2Y0h4NnpNdExkY0NCUW5vRHA1b3dTSnRkQU1MUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfc3R1ZGVudF9saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219749),
('ScXermHwEvSMyPhKmcD4XBP2nf8dhYGxT1qcA2Wi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidTl4OWd6VHJDVXdLcXMzeFpPR2hNQ1NyQ3pCNjcwOG5CaXUzRzFBYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218828),
('SLe9xqRKpYDj096LWGiGQwPXebSRReTcyj1qnK64', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSjJJcW9ZM3dMZXNzWEFKaFp5UmphZjZxcjc5TWRvSk9iTklOTjBubyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219976),
('SX6poFeF4WSAJaTl3oQ8rFBmMU3g5bqXqHouEdnb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiREl6aHpvRnpiVEdiTnpiSjlKZVQxS1JBejJMMEQ1R2I5cGFiVVBXeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219532),
('tpqYkLPptIt6hHDw313Qs5v04PwMlqvqYK45KB8j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT0k5UGRhNWFCN25WZW42Q2NKb0VOUkJSd21nbEViVGJDTDFKeDRyTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218248),
('U3Afql6k56KZUc2ffZC2kl0TWC8RA61lUJVWGJfL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYTBjb3drT3M2eHZLYmc2blpKdGRWYm1Dck5yUk9vYnpRVlZSQUhjWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219968),
('UItNe0HkV0UevmseITQQCIzpEbsLJZfTr8hTi4aL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZTJ1ajJUSlN5eE11OTlJYWg5ZUU1RnVmZVJEMUxtTFlsYW1PdmJlUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219620),
('VgkB2DrVlZ0V79QcgQ6ik4w9RLaji19HvQ5tLw49', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzVxbXNHSGxaYzVxMnJ6YkZEV1RWOUIwMVlSNXQ2VXdHa2sweEpoZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224279),
('w3gzQ2zAjYmmxo3bXsL3Ts4ozdtLfoxt6QorRJwm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTG9sRFVtaUtwM0NMdG1RTU56d2dDTGZFSE1pRHMzdUs4NlRHZVVYbyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfbW92aWVfbGlzdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721219716);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('wbEilzvv5NkXZ3f5c56QbylB3wmA0D9yPY0Hpfjx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidXhiWjlwUllsWnZxcmJzbVhxNHdYMzZJQTdiRUY3Z3V2TjFPUHlncSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzIyMjg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9uZXdzX3NhdmU/Y29tcGFueV9pZD1DXzAwMDAwMDAwMDAwMSZuZXdzX2lkPTAmdGl0bGU9JnZhbHVlJTVCdGltZSU1RD0xNzIxMjIwMDIwODMzJnZhbHVlJTVCYmxvY2tzJTVEJTVCMCU1RCU1QmlkJTVEPUhVSlhUU1plTVMmdmFsdWUlNUJibG9ja3MlNUQlNUIwJTVEJTVCdHlwZSU1RD1jYXJvdXNlbCZ2YWx1ZSU1QmJsb2NrcyU1RCU1QjAlNUQlNUJkYXRhJTVEJTVCMCU1RCU1QnRodW1ibmFpbHMlNUQ9dW5kZWZpbmVkJnZhbHVlJTVCYmxvY2tzJTVEJTVCMCU1RCU1QmRhdGElNUQlNUIwJTVEJTVCdXJsJTVEPWRhdGElM0FpbWFnZSUyRmpwZWclM0JiYXNlNjQlMkMlMkY5aiUyRjRBQVFTa1pKUmdBQkFRQUFBUUFCQUFEJTJGNGdIWVNVTkRYMUJTVDBaSlRFVUFBUUVBQUFISUFBQUFBQVF3QUFCdGJuUnlVa2RDSUZoWldpQUg0QUFCQUFFQUFBQUFBQUJoWTNOd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFRQUE5dFlBQVFBQUFBRFRMUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBbGtaWE5qQUFBQThBQUFBQ1J5V0ZsYUFBQUJGQUFBQUJSbldGbGFBQUFCS0FBQUFCUmlXRmxhQUFBQlBBQUFBQlIzZEhCMEFBQUJVQUFBQUJSeVZGSkRBQUFCWkFBQUFDaG5WRkpEQUFBQlpBQUFBQ2hpVkZKREFBQUJaQUFBQUNoamNISjBBQUFCakFBQUFEeHRiSFZqQUFBQUFBQUFBQUVBQUFBTVpXNVZVd0FBQUFnQUFBQWNBSE1BVWdCSEFFSllXVm9nQUFBQUFBQUFiNklBQURqMUFBQURrRmhaV2lBQUFBQUFBQUJpbVFBQXQ0VUFBQmphV0ZsYUlBQUFBQUFBQUNTZ0FBQVBoQUFBdHM5WVdWb2dBQUFBQUFBQTl0WUFBUUFBQUFEVExYQmhjbUVBQUFBQUFBUUFBQUFDWm1ZQUFQS25BQUFOV1FBQUU5QUFBQXBiQUFBQUFBQUFBQUJ0YkhWakFBQUFBQUFBQUFFQUFBQU1aVzVWVXdBQUFDQUFBQUFjQUVjQWJ3QnZBR2NBYkFCbEFDQUFTUUJ1QUdNQUxnQWdBRElBTUFBeEFEYiUyRjJ3QkRBQW9IQndnSEJnb0lDQWdMQ2dvTERoZ1FEZzBORGgwVkZoRVlJeDhsSkNJZklpRW1LemN2SmlrMEtTRWlNRUV4TkRrN1BqNCUyQkpTNUVTVU04U0RjOVBqdiUyRjJ3QkRBUW9MQ3c0TkRod1FFQnc3S0NJb096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenYlMkZ3QUFSQ0FFT0FRNERBU0lBQWhFQkF4RUIlMkY4UUFIQUFBQVFVQkFRRUFBQUFBQUFBQUFBQUFCQUlEQlFZSEFRQUklMkY4UUFUeEFBQWdFQ0JBSUdCUVFQQndRQkJBTUFBUUlEQkJFQUJSSWhCakVUUVZGaGNZRVVJcEdoc1Fjak1rSVZNelExVW1KeWM0S1NvckxCMGZBa1ExTjBrN1BoRmlWVVk4SVhSR1NEUmRMeSUyRjhRQUdnRUFBZ01CQVFBQUFBQUFBQUFBQUFBQUFnTUJCQVVBQnYlMkZFQUN3UkFBSUNBZ0VFQWdFREJBTUJBQUFBQUFBQkFoRURJVEVFRWtGUkUyRWlCWEdSRkJVak1rSlNnYUglMkYyZ0FNQXdFQUFoRURFUUElMkZBTlF6ajdnWCUyRk0wJTJGJTJCOG1GVGZmaWwlMkZNVGZHUEhNNCUyQjRGJTJGek5QJTJGdkpqczMzNHBUJTJGQU9pYjR4NG9yZ1lnWmZ2Ym12NXlmOTNIcVpxazBzUHpPWSUyRmExNU5FT3J4eDRmZTNOdnprNSUyRlp3SFRDbE5MRGRjbyUyQjFyOUtmZmw0WVlpU1J0VSUyRjRXWmZydyUyRnp4NyUyQjAlMkY0T1pmclElMkZ6d0RhaiUyRkF5YiUyRlYlMkY0d3ExSCUyQkJrJTJGJTJCdCUyRnhqcVJBWmFwJTJGdzh5JTJGWGglMkZuajFxbiUyRkR6TDllSCUyQmVBclVYJTJCSGxIJTJCdCUyRnhoUUZGJTJCRGxIJTJCciUyRkFNWTZrZFFaJTJGYVA4TE1mMTR2NTRVQlAlMkJCWCUyQmJSZnp3R0JSJTJGZzVWNVMlMkY4QUdGRDBQYjFjczhwZiUyQk1RNkpvTkRURCUyQjVyRDR0SCUyRlBEb2QlMkJ1R2Z6SyUyRndBOEJKNk4xQ2c4cE1QcDBYVUtieWElMkJBYVJGQkFrYmI1bHg0MiUyRm5oUUpQMVNNTnAzQ1B5T0hSJTJGVnNDeUdkOHNCeWZka3YlMkJXJTJGaWNGNEVrJTJCN0pmOHQlMkZFNG1QSng1UHZiUyUyRiUyRkFLZml1RlZkVFMwVHBQVjFNTk5GWXJxbGtDQWsyN2V2WTRTbjN1cFIlMkJaJTJCSXhTcXFxU3JyS3F1WUxKTkxQSkhGSXd2ME1LTVVWVXY5RU1WTGtpMTlRdnNBTUhDTjIyRWsyNlJlYVhNYUd2MWVoMWxQVTZmcGRES3IyOGJZZnhpJTJCWTEwbEJPMllVemRIVTBwNldPUmRtc3U3QW5yQkFJSU94QnhkNlRqU3ZmTWFJVmVUdlRVTmZLSW9KSDJaaWVSNTdqY2MxRndiZ20yNXl3dXJSemcwNkxqajJQWTlpc0FkOHNjeDdIc2NTZXdIWCUyRmJxWDh0JTJGOXRzR1lEekQ3WlRmbFA4QTdiWU9QS09YSVBHUCUyQnlnJTJGJTJGaVJEM2Y4QU9DcUQ3WlYlMkY1bHZndUdVWCUyRnNLZDlOSDhCaDZpJTJCblYlMkY1bHZnTUUlMkJDUnFHS3AzWk9oME1kUVp3U1FlWExEa2xONmhhcXFaSFFjMVVhUWZJYm5xd3ZTa0tnTk93MDcyQiUyRmdNSU5QQlVyZFptWjFJWU5xdnBJM0czODhEWklMbXNrVW1RVkhRaXlyWlNwRnJIVU5qMzRFekw3ZG5uNUVGJTJGWWNGNXRBdFBrZFNOUllzUXpNZXNsbHdKbVElMkJleno4aUQ5MDRZdURrRjVwOXJiYm1pRDlvNDVGdm43YmYlMkZBR3clMkJJd3JOZnRaJTJGSlQ0NFFMeFptMDVCdDBRVWJIZiUyQnJlOFlnTkswRlp2OXdyJTJGbWFmOEEzVXdxYjc4VXY1aWI0eDRUbSUyRjNBbiUyQlpnJTJGd0I1TUttJTJCJTJGRkwlMkJZbSUyQk1lQlhBdEF3JTJCOXVhJTJGbkolMkZoaHVsa3FoU3dqcGF3QVJyWUNtVHN3NnYzdXpQODVOOE1LcHFVZWlRJTJCbzUlMkJiWGYwdVFkV0R0SkVuQkpWZjQxWjUweVlkVTFKJTJGdnFvZU1DWTZLVmZ3SDg2cHpoVDlCU1JHV2VSWVVYbThrNXNCNG5FWDZJYlFOWDE4T1UwRDF1WTVwNkpUeCUyRlNrbFJSdjFBYmJrOWd1VGlQcHVLYUtvcHpVeVZ0UlMwZ05oVTFOT3NjWjh6eXYzMnhtbkdmeWdybVhFVlBQbFNMSlQ1ZXJyVHZPbXBUS2Y3MElkaVFCWmRWN1h2YSUyQjJLdE5tJTJCYTUxbU1UeXkxRmJYTTJtTjNjdTR2MUlQb3FQQUMyTHNPbGJTY3RDUGxWMGpkWWVMdUhwNU9qajR0b1MlMkZVREpHdCUyRmJpYWlEelJySkZXOUpHd3VIUlVJUG1NZlBrdEtwY3cxOWJVMTg2ajE2YW5sTHFuNWNoMkhsYkNvJTJGVGNqVDB5Z29wYU5BTjVLZW9tUWtmbEJ0Sjk0N3NSTHBrJTJCR010cFcwZlFvamwlMkY4aGolMkJnTWQ2T1QlMkZIUDZveGxYRDN5cDFhb2k1aHByb2VSTHNrVTZlZXlQNTZEM25GMWklMkJVRGhoNDcxR1pyUlNBWE1WWWpRdVBKaHY0cmNkJTJCSzA4T1NMcWpsSlBhTEJvayUyRnhqJTJCcU1MczNXMSUyRkxFSFFjWjhONW5VclRVV2MwczBybXlvSHNXUFVCZm1UMlluTUpsR1M1VkUzWjdBc24zZEolMkZsdjRuQldHQ0wxemRoaEElMkZhT0lYSkl6UFBGUlpMNlZPd1dLbWhFcmttd0FWYiUyRnd4bCUyQlc1alRETGFaYnp5c0lsMXZIVFNNcGExenZwMzN2eXhMWnJtcDRtcVJwSkdUMDdXcDR6eXFtSDk2dzYxQkhxcjNhanZZQWVwbDZPSWs4N2RlTGNZOXFwOGpzY1d0bFd6dVpKSUtwRlk2M2pZQkdVcXh2c05qNDQwYXBrWGlIam1pbzZmMTZYSkx5MUVnNWRMeVZmRUZSN0g3TVUlMkZwS1d0VnFhcmlFa2JpeFU3RWRoQjZpT2R4aVI0WjRnZmhtbyUyQngwOHZTeFBJU1ZLalhJTEZ1a0JBM0pWVGUlMkZXaEd3MDJPVnVPdVVkSk43UnFPUFlSQlVRMU1LVDA4cXlSdUxxNk5jRVlYaWcxUWc5ajJQWTlpRGoyQks3N1pUZmxQOEE3YllMd0pXJTJGYktmOHAlMkY4QWJiQng1UkkyUHZESCUyRmwwJTJCQXg2UFZvcWdyRlMxWHB1TyUyRlRqbyUyQjhNZiUyQlhUNERISSUyRm8xUCUyQmRIeFhCTGFKUnhZb3pTOUpPekRwUFYyWUtFdjFqdjY3N25zeDJTR25rZ2VXT3hhTUU3RyUyQiUyRndEVyUyQjFzTjBrSW5RdkpkeEY2cXFEYTNiNW0lMkJFMVFTS2VVUnF3Q3cyYXpjdkh0NnUlMkYybkhCUG1yQjZxU1Y4Z3Ixa2RuNktZb0dZM05neSUyRjg0VG1IMjdQZnlJZmdjZHFSJTJGMlROQiUyRiUyQlMzN3k0NW1QMjdPJTJGeUlQM1RnJTJGQnlDczJQekolMkZKVDQ0ZFpDJTJGMWlMZGh0Z2ZOdzVqSVcyNnhnYmIlMkZTd1d3SU8lMkJGdmdMJTJGaWoyYyUyRmNDJTJGd0NaZyUyRjNrd3FYNzcwdjVpYjR4NFRtJTJGM0F2JTJCWWclMkYzVXd1WDc3MHY1aWI0eDQ1Y0Nsd0RMOTdzeiUyRk9UZkRCMU1CNkpEeSUyQjFyMWQyQVYlMkI5MlpqdGViNFlQcHZ1U0g4MnZ3eDB1Q1dSZkUlMkJmUjhPWk05WjBUVkZSSTZ3MHRPb0phYVp0bFVBYyUyQnMlMkJBN2NZZnhUbjFibWp0RlZpSnBTeEVrek1KSkhzVHNDUFZSQTF3RlRZa1hKWSUyQnNiMzhwJTJCWVN4WjVTeEJpcVUyWHlUQXExbUd1VkkzSTclMkJqMUMlMkZWY25HU3h2QUdKbGdaN242QWZRQjdPenl4cDlMaVhhcFZzclpaZUxHMUYyQUxLdmVlUXhLVXp5UjB6dzVlR2lXUVduckg5VWxldFIlMkJDdmNOejFtMjJPUTFlVHB1JTJCVnpCdTBWR29lOFlNam1qcjBhV0dNMDFOQ2JQVlZEYWxqN2xVZlNZJTJGZ2clMkJOaGkxT1Q5QTQ0cjJkcHExOHVoQzVjaVJoQnFGVE1vWnZ5a1ElMkJxbzZ0VFhKNmllV0F6bmViMU5RWGlyOHdtbFklMkZUYW9aaWZMbGJ1d1BYMXkxSHpGTXJSMHFHNDFtOGtyZmh1ZXNuczVBYkR0d3JMYWVTcWxNZE5LeVNrWDBqY253WDYzZ0xudTY4Y29wSzJqcFQ3bjJwaEhvZWFUUHFiSkpSSWVja01KaURlTnZVOXd3VFRUMW1VWDZTdldCRHpvbEMxQWZ4UnJvUFpqaG9EMGV1cnJJakdEYjVtbUg3VE1BcUh4dWU3RDFLMlQwakFLOGNraFBxdzA0NmQyOFRiVGYyZ2RtQWNyMXlOakR5OUJrRWRSbmNXbWJLc3NvbGRickpEVEZKU3ZVMWd3VlFlMDglMkJvSEZyaDR0emlrZ1JKYzRqZElGV01zMFFabkklMkZDYlNScU8zMGl1b2tXSXZmRllocjVLNHpMNiUyQlc1YlRldlgxWWJYTnZ5UldPM1NOeUE1am5zQmlIekxpQnMxYUttcHFaYUdralI0bzZlRWxna2JYQiUyRkxZZ2dsanV6QyUyRmdyc2MzVFdrRktVWUtsdG0lMkY1SG1SemJLb3FwbFZaQ1NraW9icUdCdGNYNmpzUmZleEdJRDVRYzJqbzh2aHk0MUhRdG1aTVVqZ0VzSVYzazAyM0phNFRiOElucXg3NU5mU200ZW1xS2dXU29xbWtpQU53RjBxTEE5WUJGcmptUVRpY3pUS2FUTkpvak9KSXA2VlM5UFV3U0dPV0luWnJNT29nQzROd2VzSEdkU2prJTJCa0V0bEJpcVVNWTZDZ3pKb3dMRG84c25LZ2RWdlU1WWo4eWtxSFVsYUxNVlh0Ykw1MXQlMkJ4alJ4U2NRVXlBMCUyQmRVOVVqV3N0ZFNYYjlhTXFQMmNMRlZ4TEd0bnkzTEp6Ym1sZElsJTJGSXhINDRZcHBPMXNhOGpaaXhyNDQ1dExUS2ozJTJCaSUyRnFIMk52aVhobGhxbnBEVVZVdExFeiUyQmkxRXNTaG02S1RsekIyRGhlcmtXeHBzODJkMVVSaXFPRzZHWkRzVWxyd3luMnhZcmxYd0JMbVZYRTBkQmwlMkJSeGRLcnptaXFKSkdrVUclMkJrTHBSRk53UFdGeU1NJTJCU0w1MFFwVXRucWlITmNnaGp6TEw2cEt5amtIemxSU0FBQTlySVNWSUkydURzZXdjcG5LdU1xV3JHaXV0QTZuU3pnRUtEMk1EdWg3anQzNEFxdUhNOXllVjZqS2FwcTZOdnBJU3NjNThiJTJCcEwlMkJrQWUlMkZFS3RWUlZOYjZOWDBVc1pVYVNJVmFLcW94JTJCS2gzYVA4WDFnUHEzRmxDNmpKQmFhMmFjanBJZ2RHREt3dUdCdUNQNVk3aWdVNjV6azBacThycWhtV1hrN3lVcTZpTzNwSWUzdEtXYnRBeFBaUnhoUTE4WTlJWllHTzJzTnFpSiUyRkslMkJxZTVyZUp3bVdOcmEyQTR2bEZod0pYJTJGQUd5bjhYJTJGY2JCZDcySU94NVc2OEMxdjJ5SHhmOXc0Q1AlMkJ3SzVHeDk0b3glMkY2RSUyQkF4Nk1lcFU5Z3E5UjdyYWNLJTJGd0Q0VkIlMkY2ViUyQkF3NVNEMXFudm5iNERFcDZKR0lyQ0VkRTltWlFIVXhzd1BmdHlOc0lhTkJDNWVPUjNDbXhFV2tEd3Y4Y09PVE1oWm5LQzVIcWtqNGIlMkIlMkZEY2ROVEs0Y0FPd1lXMUF0N3lUaUxDJTJCd1dvRGZZT3ZZcXdFazVkYml4SUxMaEdaZmJjNyUyRkFDSWYzVGlSenY3MDFBN2wlMkZlR0FNd0h6MmM5NlFqM0hCcDJpQW5OUHRkJTJCd1JrJTJGcllmUmk5em9ZQyUyQndPeHd4bVgwQjRSMiUyRld3JTJGS1NObHVXdnVBYld3TEQ4STltJTJGd0J4TCUyRm1JUDkxTUxsJTJCJTJCdE4lMkJZbCUyQktZVG0lMkYzQXY4QW1JUDkxTU95SVRtTUQ5U3hTQSUyQlpUJTJCV09YQXRjQWclMkI0TXolMkZMbSUyQkdEcWY3bWglMkZJWDRZRUF0UTVqM3ZLZmRndUlIMFNNQTJQUmdBbnFOc2MlMkJEbVpCOHJrc2I1OEZwJTJGV2tTa1dLb1klMkZVMU9DcWc5cEF1UjJIdnhtMk5CNCUyQmlNbFRVMWJrckthNk9lUkR1eUFvRUlZZGltTVdQSWc5NmswQnJhemJZWDVkbU52cDFXTkpGSE10MktpQkRBOUNKQjJFRWozWWRxcXFxcUdRVkRIVEdMUnhoUXFvT3ZTbzJHR2tFUXNYWmolMkJLb3RmelAlMkZPSERVU3V3U0JBZ1loUWthMlp2UG1TY09mSUNlcXNhS2pXUUNMRTdFN1h4eVNONHJhMVplc1hGcjR0TWZEZFBUWlhOVVZFY0Vpd3FUTFVUVE9tdGhzVmlDN0FBN0JtQjFOMVd4QnklMkJsWlRXVFV3cTVZQkdlbzZTUVJjRXJmbllqQVJ5S1ZwREpZWEdtJTJGSVJTNW5tNVpXRW5TV0ZnODI1QSUyRkslMkJsYnV2NVlMTlRVMUtFMWRkSEJUWDB1WVZKMW44RmUwbnpQY0J2aGltb3E3TWFwYWFtZEtpWmsxdTB5a0NOZTAzNnlUeXRpMDVad2wwYmlXdm05TGxVZFMlMkJxQjJBZFE3aGElMkZYZmxoTTV4anpWbG5IamslMkZiRmNIY095OFUxOVAwOU1hYklxSnRjZE5mN1lUdHFidEpHMSUyQnk5dTBweWJnaWpwSTZiTmN4akVsSFBVdkNzNHN5MGppUm8xNldOZ1ZkQ1FCcTJ0ZmNXM3hyT1JVcVVtVDBxUm9FMW9IYmExeWR6aUg0ZXA0YTM1UGhEVWZhcW1HY3lFOWp1NVB4dmlsODh0JTJCRmRFeVNicjBUT1RWTDFXVlF5U1JKREl0NDNTTVdRTWpGVHA3QmRUWWRsc0ZXVXprZldNZHZLJTJCQWVHOVI0WXlzdU5MdFJ4TTR0OVlvQ2ZPNUp3WVB1OCUyRm1SJTJCOGNWSmNzbEhaZlZqUURxZEI3eGpwUDlwUWRxTWZlTWVxQmRGJTJGT0tmZmpoJTJCN0klMkZ6YiUyRkZjQ2lVTzQ0N3JHTHV5cU8wbTJJbml1WjRlRzZ3UnNWa25DMDZNRFlneU1Jd1IzalZmeXhRRiUyQndLZ2Y4QVlvaXpEVUNZSUxFSGtSZU1tM2oyWXQ5UDBrczZiWGdyWiUyQnB4NEs3JTJGQUNhVkxtJTJCVnczRTJaVWFmbDFDRCUyQk9Jbk5zeTRMeldFUTVsbSUyQlVTYU4wWnEyTlhqUGFyQnJxZThFWXBRekxLWTlvOGtwNzhocDZFZkNMRHMyZVVsRTVpOUhwb25YbW9razIlMkZWUVl1UiUyRlRaTG15cCUyRmNzZiUyRkFCVFlxcXE4dHllcU5UayUyRkZ0QldBQyUyQmxxdFZxQU96V3Qxa0g0cmp6SndrOFE4UDV4YW9yWGtncTIyOU1vcWFRU0g4NUhwS3VQYWV3RG5nViUyQkxnQVFyUjIlMkZMcUNQM2hnZVRpMWlmb1FteHZ2QTclMkZ2U1ljdWg5c2wlMkZxVDhSSk9oNHBueWVvNkdtbm5xcWJtSGlvSiUyQmlQY1VLM1E5ZnFrang1WXNnNDV5Mm9qUm1vc3pEcmYxVW9KV3VTTGJFZ2JiOWRzWjJPSVpFZnBCS1dhMWhycFltdHVUOWElMkZhZCUyQmZJY3JZNjNGZFNRUmZZaXh0VFFMOEV4ejZHTjJSJTJGY1c5OXV6UWh4eFJyU2lFWlJuRGhVQ2tpbFZlWDVURHN3MlBsQXBvUzVHU1ppTmJsJTJGbkpLZFBqTDNZekdvemIwbUl4ekxPOGJHNVV5cUFlemt2VlllekFuUzBuVlJuemwlMkZ3Q01kJTJGUVkxNUklMkZyNVB3YWglMkY5U0lZZ1F1VEd4TiUyRm5Nd3BsUHVjNEZxUGxPWmdOR1ZVaTZUY2E4elUlMkZ1cWNaejAxS09WRWg4WlhPT2VrUWYlMkJCRDV1JTJGJTJGQVBiRXJvc1hsTW4lMkJ1bSUyQkVpJTJCMWZ5bVZWVkE4TFVlV0lyYyUyRjdaSzF0NzlVWGRnV1g1UWN4bmVxZU9teXAzbWoxdW9lZmtnN1NvN2JlZUtlaGhtbzZtVDBXS014aEFySXprM0xkNVBVRGgzSjRoSk5LVDlZeFElMkZyU2FqJTJCekdjUlBwc1VJdHBETUhVWk1tUlJmQnJHVTUlMkY4QTlRNWZQTzFFYVdhbW5XQ1JPazFxV0dsdlZickZtSE1EZkUxVUQlMkIxeWkzWjhNUUhBbEUwbkNOUFVhZHE2V1NxWTZyRTZwU1IlMkJ5Qml4MUZQSzA3T2dCRFc2OFkwNlVta2FsclFyTiUyRnVKZjh4QiUyRnVwZ3l3MVg2d0xZRHpiZWlYJTJGTVFmN3FZTk9BOEMlMkZBRkltaWhyZnhqSTN1d1RCOXpSZmtENFlSVWolMkJ4emdmV2piNFlYRUxRb094UVBkam03UjNLTXklMkJXS0pYU2taQzNTZEdTNUEyQ2hyQzU3RDBoSFpjQWRlTWt4OUJjZlpRbVpjTzFUQmdzcXdPb0JIMndmVDAlMkJJS0Fqd0k2OGZQblB6MnhzZEhLOGRlaW5uVk5NVmdtZ3REbXRHVzJBbFEzUFZjaTNzdURocFklMkZxc2JNemFRRDFkcDhzRlEwYjVrOVFZbFluVHJSUUxrZ2RnNnlGQlBsaXpKcmdESEYzYUxubWN0V2xIUjAlMkJXVHlRTVpJNFlpamFWJTJCMTZydDFtOWlBTnJFSHJ4V0t4S3VUT0N0V3pWTmNwVldja0VKMlhidEczS3g3eGkwY1BWc3RWVHdRMU9VekdaRzFHcnN2UkhZaldHdjhBU055TEFjeVR0dmhkUFMwOVpuRTA2cU5DdnExRDZ4JTJGbGlncGRqZWpUY08lMkJuWkk1VmxOTmxOT1k0YnM3RzhzckQxblA4QU96cTd6YzRNemJKS3A2T05teXRhNk9abENBc0N2cmJBbnNHNHgzRng0YmxNdVRSZzg0MlpQSUc0OXh4VmxOcDl6Mk1sJTJCSzB0R1Q1RG1lZmNQNXFaOG1vNURSQ3FFRTJYR2N5eHpOcjBub2lkZ2JnaTRKNVhPMjJOVnliS0pJZUYxeTJ0VlVhVHBETEhFMXdpdTdOb0RkWUFiVGZydGZiRVRtbVdHbXJhNzBDTUxPa1FycWRGSDBwRWNQYjlJZ2p3WTR0VkxVeFZsSkRWVTdhb3A0MWtqYnRVaTQ5eHgyYkozSk5LaXMxc2NBQ0tBQUFBTEFBV3RobTlxOWoxQ0VmdkhEJTJCQjNCOUxjJTJGJTJCaTN2T0t5SlElMkJiT0IyWEJ3MmZ1NlA4MCUyRnhYQzQlMkZ0YWZrakNEOTJSOTBiZkZjY2NpdGNkMU9pbG9xZGI2ekxKT1FPc1J4dGI5dDQ4VlNNcFNMVW9hcyUyQm8yZ2FKTnlBTERZTU5odmljNHVuRTNFa1VCQ3lMQkJHcFFtMXk3bDJHM0xhRlBiaURTYVpjdkpqTFJoa0xnSTBnQXViN2ZPVyUyRlo4cjQ5RjBFZTNEZnRubiUyRjFLWGRrUzlJaTZkRExYd3hiV1p3ZHV3YiUyRkFNTU16T2s5ZlBNQ3JGcWl4UmdodW92YmRsTnVvWE8zY2NGNWZJejFzbFRJV1l4Uk01WW0lMkZoejg4UlZJYlBKS1ZWaXE3Qm1VQzU4U096cXhvemRzcGRMcWFwV09TSW9VaDRBU2dVRW95Mk45ajlGT3c5dTFqMTRZbW8xcDNMVlJqdnB1c1FMb1NPUzgwSEt4UFZmRGlWTktrWURla3M2NlNXRVZyOVo1dDEzUHNHQmF1V0taZ3lkS1pDTHVYVzIlMkY5VzNQc0dGdFBqd2FHVjJyNWY3RGdqb1VhN21OMUFBMGlWeGY5bnJ3TkpEQ1hPbW9pVlJ5JTJCa2IlMkI3RFdodWVrMjVYSXdrakVPeFhmRmFjRGpBRGt3YSUyRloxWWJ3c2pDV3h3dmxpY2NPTzQ5Z1NVR3JHeVpHMHUxbnFRcDc3SWJmRTRkbzVEUzVWTlVBZXNwbW1HMSUyRm9SaEYlMkZha09QVm9FV1Q1ZEJ5TGg1bThDYkQzQTROeXlrRlV1WFVCSDNVOUxDMSUyQlo2U1V5dCUyQndCaXIxTHFDTkxvRmMzTDBqV01vZ3pMTE1rb012U21hMUxUUnhib2w3cW9IJTJCSjNZZmVmT2c0RWRJQ3R0eXdVRyUyRjY1d1NaREpJNGdvNDMwTVF4ZHd1JTJGc1BaaEJhYnBSRjlqWVN6S1clMkIyamtOdndlJTJGR0E5dXpXVCUyQmtPNW5iMFZRU0FlbmhPNXQlMkZlcmdycEUlMkZEWDI0QnA2U0NvOUpNMENNZlNXTjJVRW14QkhsdGdyMEtrJTJGOFdEJTJGQUV4Z1drdEFhRmw0eXBHcGJFVyUyQmxqd2ROSUdwZHR2cFliOUNwUDhBeG9mOU5jZDlEcGYlMkZBQm9mOU1ZalIyaUk0c2hxcXJJSmtvWm9WbFVoajBwT2dxT2R5T1E2NzcydGpBemxHYmpUVUdsWWlkQklER1JzRHVMMjVYRmo0WTJuaUxNNmFyNmJLYUpJekNwNk91bFFXQjdZRkk1azhuUDFWSkhOaGF2aW1CSmR5TlRHNXNMWXY0Y2p4UnF1VHZoV1RiZWpQS2JoZXZuWUtVWldiWUFxUmJzdmYlMkJ2TGZGd3k3aHlPaGxqQVpoMEZnanFiYXh6SGVDQ1Q1RzNLNE0wQUJ5QUhoaFdPbm5sSWJERENIQkQ1MVh5VTd2U29UZDBWbWElMkI0QnY4QUcyQk1wbUVUamZ1T0VjY3A2Qm1sSFZIN1ZVUUJIMjVFWEtuM2tZajZLcVJ5Q3AyNTl1Q1VMZ243Q1UxZGVTNklRVkJISTR0JTJGQ3d0bE56eWFaajhCaWowVXdraEc0MnhhOHY4QXNtY2hoR1g5REdHZHRVa3N1allubURwYnc1ZFhQRldhdlJPVGdoWmM4emZMYyUyRldTdHkyZVNxTE9CSENPa0FpMVdCQVhmU1JZMzdiamM3WXMlMkZES1NVJTJCU3JIUEExSWdsbE5QQktScmpoTGtvckRleENrQzNVTEE3NEY0V2dlcWtxYzRlVU90UVBSN2RNWmhJWXBIR3ZXUUJZM0lBVUFXMzNKMm5uaXAlMkZySkY1cU1ST1NYNDBJYlRGOUxIJTJCR3Y2d3h6WEdmcnFTUmJaaGhrakx4ejlGSGpweDFEUWFocGFtdmZheFclMkJGVVJRUUNBT1k5dUdpUWFwYkVINXM4ajNqQ2lZd055b0hmYkRUMU5OQWRiUEdxSWpPekFqWURjJTJGd0FjUkZXNk9SbTJmVlhUNTFtYzZtd2FvZFFTZVdnSkVQMmtrUG5nS3BxVmVtS3dNcFVEU3hKUzUlMkZqNWpEc0NTVDA4VHlXZWFka1o0d3JsN2tHWmlDb05ocWtzYkFueXcxbWhTSnhBRWtCQXV3YWFSdkRabFVnJTJCM25qMXZUcExIR05lRHluV055eXlrdUxvR2hJaXlxdW02MkFqSDllZUFhUUY0WGlpc0pKV0NoaElWWk93Z2FnRGJmWTl2Wmc2cFglMkZzMVBDZzlhb21KQUF1ZHY2R0c2ZDJqb28wWVNVJTJGUnlFbDVMNld2c2JEUXd1UVFONzc5Und5VGZnanBuMnRTZDZIQ2pveWxwWENNZFIlMkIyRUVCYjh6THZ2WWJXTzklMkJXMkdwS21saGNyVVNIVXhCS09KbTBqbGE0bDNCM1BYdVNOaGpzMGtlbDJNOEFZeGxUckszTiUyQmZPRGxzQmJieHdOVVRVd1F3VXFRRnliR1NUb3l0Z0xiSFFDQ2ZqYzJ3bEtYazFYMURsU1RBNUs5ekZMR3c2UVNmWGQzSlclMkZVTjdXRzQzdWNEaXBSTDNwb1cyQTNCMnQ1OHpoMldObkVhJTJGMmRkTmtCUmxGJTJCODl2amhBbzVwQVNuUm5jajdZb1B2T0dGVmZLNTJsYkVtcWolMkY4QUVnOWpmenczNlFsbEJwb2pwdHY2MXo0NzllRnlVVlNnSk1lM2NRZmhoQm9xa01SNlBKY0M1c3Q4UU0lMkZ6WHVQJTJGQU1QUFV4bllVa0slMkJCYiUyQkp3NUhWMHlScXB5MkIyVVdMRjN1M3Z0aGswbFNQJTJGdDVmTkRoZERUUExtRlBDeW16ekJUY2QlMkIlMkZ3UHN3SUUzTiUyRjdLaCUyRlBiclZpblFid3dKR29IYmIlMkJiV3hhdUZLVVM4YlVFYWdGSUphaWJ3V0tKWUY5NXZpcmlSYXppVlpHSTZOcXZwRyUyRkpVNno1V1RGMiUyQlRLSHBjN3FxbHo4NVQ1ZENwQiUyRkNtZHBHJTJGZFhHZDFrcVZmUnA5REdzYmZ0bWcwSDIlMkJxJTJGT24lMkJPSEQ5OUklMkZ6RCUyRnZMaHVpJTJCMzFmNXolMkJlSFI5OUklMkZ3QXczN3k0eHZKZFlQVTBOUEhHR2hwMFJ6TEdTeXJZbjExdjdSZkJvUlUlMkJpb0hnTUtJQnRmdHZqTmZsTTQlMkJmTE5lUTVSS1ZyV1glMkIwMUNIZUZUOVZmeHlONyUyRlZCMjNOd1dQRzhzdTFBeW5TdGhQRyUyRndBcDFQa1VrbVdaT0k2ck1FT21TUTd4d0hzMiUyQmt3N09RNnpmYkdlVGNlOFZWOVUwejVyVlI2azZQUlRNSWxBdHpBdGElMkZYZm4yRWJZcTJDcUklMkZQRWRvdU1iT1BwOGNJMVZ2N0tmeU9UNW90dVc4U1poSERIQWFTSm9vbENJZ2lLYVI0b1dIYWJsZHlTVHZ2aWZwYzRwYW94b3dlbWxrTm8xbHNWa1BZcmoxV1BkczNkaXZaSTVGVEhhJTJCNUF4S3pJc3VlVnRITkw4M0xUd3VrYnJxaWI2WUlaZVc1QU45bTZ3UWNMbmhoSzZWRnFPYVVkUGFKdkhMa0tUMkMlMkJBYWFTV2lRTE96dlRobGoxdTJwNmR6OUZYYjZ5TnlSOXQlMkZWYXhBSm1NdnBqVjVoVHdXMlp3VzdnTno3aGlqT0xnNkxzWnFVYlJGJTJGS05rOGs5QkRDcVhraHB4SXRoMWdtJTJGdXZqTmFLbnpXSHBacWVqcUpZNFZEekZJbVlJcHZZdGJrRFk3OTJQb0RpR1NrcCUyQmdxSmFlU3JxWlc2Q2xwSXpZenVidGE1MkFBQkpZN0JRVGozREhEcVpCU1RNNVJxeXJrRXRRMFlzZ05yS2lYMzBxTmhmYzdrN25ETWZVZG1PbXJLazBwU1VrNlpqZVVaOUhMNnV1eHR1Q2VmODhhUG1tYjVUbVB5ZjFzUWYxYWFCV2VGaDlNb3lrTDNoalpmTTRsYzg0QTRiejV6TlUwQ3cxTEc1cUtZOUZJVDNrYkUlMkJJT0FjbyUyQlRQTE1zckk2aWF2cnE5WVhEeHdUc3ZSNmdicVdDajFpRFk3N1hGN1lDV1RGS21yVDlCZHphcGx3aWpTS0pZbzBXTkVBVlZVV0NnY2dMZFhWaGRyOVY4Y3hFMXVaUlZGTFhVMExza3NickF4SXNScUlYVXZocUk4UmlwVGt6a3JGMG1ZbXN6Tm8wUlJUbUV2RWJieVdiU1c4RHRidEclMkZXTVNkaDJEMllnYVRTbWNVcFZRb0t6UUJSMUJkRzNnQ3B4TVJWVU02U1NSdUNpTVZMWDIyNSUyQlElMkZoaVd2UVVsVDBQWWhlTEhhUGgydVZmcFZFWXBWUFlaV0VZOW11JTJGbGlRcDh5cGFxWVIwOGhrSlVzR0NuU1FEWTJQSTdrY3I0cjNIbFVJcU9pZ0I5WnBubkk3UkhHMXYyMmp3ZUdMbGtTOXNWT1hiRnQlMkJDdGRBc2s4VFNKRVJMRzB5THBqYzJkdlYyTHJ1QU8lMkIxOEE1bEZHbElLZ3AwYnlmUlVRYVZzT3c2enZhMjF1dnp3OGtMUmlYUzVTT01LcmFJMllHeWpjMjJ2Y25uaU9lT09TcFVLNGN1NEI5VzE4ZXNoRiUyQjlJOGhPZHQydVR1YlNOVGlpaFVLV2podVF5aGh2NCUyQkdCNW8wWmdxeW0lMkJ4WW95ZVZyRWIzSHdPQ2E0ZWs1blVXaGFiUUZVQUM0SGI5WWN0JTJCViUyQldBVFJhcFdIU0ZBb09zbUpySWV3MnYzbnl4TiUyRnlXc2R4aHZoJTJCQjBVdFJPcUZxdXBlWmJNRkNGd3UlMkZhRzZ0dXJEVW9lU0lWRDVucVlmUjZTSjl5RGUxN1dKdUFjQzFNQWdBS3pSeTNKMlM5eDQzR0doVXp4NmRFOGk2RHFXemthVDNkaHdEczd1aTNwVWd5UDBpVFRONmZRTzdLQVZsSzdiM3NicmE0UDlXd05VMUx4OUpUUERSTVNMYTRvMU51OE11T1NaalZ5WEVrN1BxQUIxJTJCc1RiZnJ3TTBydkhvT20xeTF3b3VUNDRGV1RZJTJGd0NtVXVrNnN0Z0xINndkeGIzMnYzJTJGSENJcGFCSWdKS2FjeUFic2slMkJtJTJGN1BoN01DbkhNU0VwTmJDUk1obUFhb3FsaUxHOW11UXZWMTduQiUyQlhMU0pXJTJCa3dWTThwcDRYa3ROR0Z0WmU0bnJQTHh4RFlrS0VkSGxlWVQ5WlZJZ2ZGcm4zREFrdVRseXhuTG95MDB4NjFwM1VIOFp5c1klMkZmT0xYdzFYeVpSbk0yWWFHV0NwbWNSc292MHNVZG9uSGlyS0d0M2p0eFhzbnRHcnp0YlNKMEpKNVdqUjVXOTVYRnV5JTJGSmFyJTJGcHJMc3NrWlRVelFMbUZCSXcwZ1NzTlR4RTloMWxmTlR6eGxkVTdrMCUyRjJOJTJGcEk5dUpYNTJYNk9HdEk2YWxxSW1XWDF0WFU5OXdlWGYxWVZxclVxWXVrNkpaZWpjYWdDd0l1dlZ0Ym1PM0ZmNFB6NTVLSmFKWURJWXdXalZtS3NxMzNXMXVhazI4TERxeFlETkpVVG96d21FSWpDN1hONzZlN3V4bU5VOWxocHA3UUh4bnhJbkMzRHMlMkJZZXFhaHZtNlpUeWFROHZJQUVudUdQblNhYVdwbmtubmthU1dWeTd1NXVYWTdrbnZKM3hkJTJGbFp6MDVweFQ5alkydlQ1YXVpd043eU51eDh0bDhqaWk0MXVreGRrTGZMTTdOTzNSN0I5QlRlc0hPNU93R0FvME1rcXFPYkd3eFlhT21NajZFRndvM051WDllV0xVblNCeHh0MlNlVVhTWkNMV0J0ZmxpU3JJWGw0blRaUmVqQkExYmtDUnQlMkZIZmxnZW1pcDZkMlF6eXRPdGl5eHN2emQlMkJXc2thVko2aGNrOWh3WjBZckpqT0ozbllRbUVBcUVCQllOOUxUekJVYjZjSVhJOWxob2FGc3hwWnFZUnBKTXFNSTFrMldaRDlPRiUyQjVoWTl4Rnh5eDNoN01hWEprclpLazFFN1Fvb3BGWmZucDBaJTJCakNFZjRxeTJpYTl0d0NiQnNSdVQ1aldaZFdSaW5ER29Pd3BaMkFOUUIxUnVQVmNnYjZUb2JhNEI1WWtzeldtckVnNGx5dFVlTHB4TzZPTEdHcVFXczklMkZvaHdBalg1T0kydHNjVmMwYmYwTmcybG9zZVY1WFdOWHRuT2N1alZ6S1k0S2VKcnhVY1JOeWlrJTJGU1kyQlo5cjJBQUFGc1RXR012ckljeXk2bXI2ZlYwTlRDazBlb1dPbGhjWEhiWTRmeG5UYnNOSHNOVlUwRUZPejFMaEl0Z3hOJTJCczJITHh0aDNDSjRZNm1CNEpGMUk2bFdIYVA1NEJja2xheXF2cUlKRm9wYWxwSTVieExLWDE2SDVBaHVzSFlXM3NiY3IyQU1FNk0wZFJVM1F6dk9zJTJCbGJrZldCSGVDRTI3c1BUUTFWSFhTcEVvcTVvZ0RJSTJHcVpCWWpXaDNMQVdJWmIyTzNJMkFNdFI2Ym9hakFaNURyUzYyQjA3bmJ0MGkxdTNGbExkajFGUGFKQlpKd2tzdFVwV0ttU1JHMG14a1ptdWJIcTFXRmlOd3UlMkZOaFp1R09zcXFoNklqMGczQmFFblRDcEhhQjlRRVcwN2s2VkhhY01QVXZIUlVLQW1XTllvcG5BWUFPNXVXdWVWcjJYZmxZNDdUeVR5VU1zb25MUkFrTzBUR09KcER0Y242VWdGNzIyV3c2JTJCdUtvS3RXV09HV2d5bTRtcXVscVpkT3R3dXBtdnNvQ3I5RmQ3QWN0JTJCczNPS3p4blVyTG44VUxqWEhUd0lwQU81MXVYWVg2dlZoWGZ2eEk1T3ZUVnNQUVUycUNGcnBjbTROckdTUTh0Wkd5cnVRRHZicXJlZDFSbXp6TXFoSkdqSm1rUUVkWVVKRGIycEo3Y1d1aXg5MlpmUm1kZkxzd3ZlM29Da3FvMmlacElHa2tjbCUyRlhOd1NUZm1QSEFtV3AwbVpJU05JVU14SFVQNnZnbW9lSVVwdEdwYlRaVG9ZSDI2bUh3d0pRa3hRMWxRZHRNUkFQZWY2R1BSTFNkSGxLJTJGSVlKRmM1T3JVelQzQ05JQU43blpTUnQxY3g0OHNlZW5XSkhVeE5BekJRQjY0RyUyRks1VXVEZSUyRkxzSGJ0aG1oZm8wbW1NUmNLbGpjc0FQSFNmQTlZd1JUeHBVNkVUb3k2RUIzSWpHdnMwZzZUN3o3Y0MlMkJQbzFjS2oycnY1ZkFIVlNWVVV6a3ptU3cwYWkycTQ3Tnh5djRiZzRZV3VrQ0JIamdkVkdrQm9sN0xjeHZ0ZyUyQnBwbWxETTZ5TXdHemt2c0xHMSUyRnBBWDUyQkhJakFZcEl0TWhsbks2UUNERUZrQjdiN2dqY2pxUFBBOHJZdWVCeGY0N1gwTXBVMHdSVmxvVWNxTEZ4SXlzZkhxOTJHUWFmb1NHV1VTN2xXREFxZkVXOSUyRnV3JTJCYUlQTklpVk1QcUFHOGphTDl1eDZ3ZHJZYkZCV09tdEtXWmt1UVdWQ1J0ejVkbUJZdEpucEk2VG9pMGRSSnJDZzZIaXNDZkVIbDQyeDRVVWJoU3RmUzNhMTFZc3VuYnJ1dHR1WFhnZVNONDJzNnNwN0dXMkc4U1NndUxMNmllTjNpRWJLaElJNlZRZHU0bmNlR0g2aEdwY2lqZ1lhWkphcDJaVDFhQnAlMkJKT0l3N1hQWmlRelp2UjQ2T0QlMkZBcGd4SFlUZGolMkZEQXNKV0xpaVo4bU1NVmc4NlNCYjlzMHFRciUyQnlqSEcwNXRrejFlVkxUVTJoWmFVQnFackVhV1VXQThDTnZPJTJCTXJ5aWpNbWNaVFEydnBxS2NONFF4ZEszbHJJeHFtOGNRZGJxJTJCdFFDRGUxeWwlMkYzaU1ZUFVOdVNvOU5HUGJGSmVFVXFvbmtvOHlwczhwWSUyQmk5SmxJbGpJc0lxa1gxS2V3T3Q3JTJGakJ1czQwR2pyMXJhU0twaFgxSlZEQzk5dTBlSU54NVlwJTJGRnl4VWRiTFJzdlNKbTBZRHJIWkRGTUw5SEtMbnRRazJ2YlR5M09FOEY4U1J3MGJ4Vmo5R2hONyUyRkFJRCUyRkFGaDRIWSUyQiUyRnJ3bWNlNkthR1ZhdEdMVk5UTFdWVTFWT3hhV2VScEhZOWJFM1B2T0dzZXg3RzZ0SXhtNzJGNWJFMHRYY0MlMkJoUzIlMkZJZFg4Y1RxVENuUXBHNnBwRjNrUFYybnl4SFpacHBxSjZscldKTGVPblllOG5EZEEwdGRYb2hZNkZQU1BZMkolMkZvMlBsaGJWdHYwUGcwa2w3TERBQ1VqUkZaVlUzQ3ZzMXp6TGQ1NW0lMkI1NiUyQjNGaW82YjBlSUZpVEl3dXhQViUyRnhpSnkybkVsUXFnQUtwdWJEJTJCZk05NTlnRzJKJTJGQ2hqZmdibGlqcUlqSE1nZEc1cmV4OGlPUkhNRWJnN2pCRkRXZWg1aEkxWTNUUlQ5RlQ1bUhGbHE0SnZVaHFiZFRnJTJGTnZibnVkckREV0JPSUFVNGZTc1htaTFHWHkyRzVTVkM4WkolMkZGbFJUNTRDYXM2TG92SEJaa2h5TnNxbVptbHlpZDZKbUlzU3FHOFo4NDJRNHNHS3B3MVhDcHoyV292NnVjWlhTNWdCMWF3REclMkZ1NlBGcnhsWlZVbjlqMXdjYSUyQms2Ylh0dGNYeEJWbVMxWkxUJTJGQUdRYW90NnpDb2JSWWRkbVhaUVB5ZlBFeFZWTUZIQTAxVEtrVWE4MmMydCUyRnoxVzY4VnlxekZhNnBYcHhydWJ4VXFyMHpJUHczUmIlMkJzZnhyQVhBQXZjNEdDZkl5TjhvR3FmblVEUFVvYWlFJTJGTnNhcFpBVjZsMXJad1Fia01SMWtFMk9JJTJCV3A5RnJUTklwU1daR0VpbjFXRWpJUUpMY3R3YkVyc1NGT3h2ZXhIS2F5c1hwWkVqVWxyckhNemVxTzBoQ0xrOHJYc0FMY3ljVmJOSTFGVkxBa1FLd3NZbkFYU3V4Nmh2WVhKUFByNmpmRGs3SFJwdWhWVElraVU5RnBWSVlXV0pqMUZibGp0M0FrZWVDYWVya25pRkhCRDBxcE9KSEJYVUNRaXFCekFQSW14TyUyQjNQRVVYcUhrQk1aYmN0cUxEYzZTQjhjRzVjSGVxZ3BKbGxSWjVSR05CQlZpUVQ2NDVrYkU3RWQ5JTJCV0pmQXlrbHNtQm5sWFRJNVNvRGltVnBIZ0VTc1ZWUmV4MGdLZ3NPWmJ5UExGUFJHa1NuTXpzS3B5SGNDSU90eXZTTno1blhJUmEzWGZ1eGZNJTJCamVpNFJxNlhSVHhpb0MweXJCSG9XMGpDTTdkUnN4UGxpbVIxTU1sUUhFZ1Z0THV5dFpiRjI1QTlZQ2dZMGYwNWJjanolMkY2ck5PS2l2ZGdXWkdQU3F1a0lZRW5WRkFJeWZ5ckFZR2M5RmtEbnJubUE4aCUyRiUyRkFKdzltOVFnbElSbTVYUHJYQnd4bW9hT2dvcVlXQjZNeU1DYmIlMkYxZkd6NFNSZ1J0dXdhbkt4d0FBeDlMSSUyRnFhMkNnZnJkWGVHRyUyQkNac3RXVFM4aXVPbGV3bGVPVlFkcjZpM3JyWVd0dHZ5NnNJcDZoSUZwNW9KbWpDcFoyWkdYdiUyQmtMZ2pWdllxZVFQZGg2SUxJclMwOFVFaktQVmFuMGhtTmdkJTJCaktONTZUWWs4OEtrNUxqU05yREtNY2RTcCUyRnVScHA2dWx2UFN5SFFOUHJ3enF4RiUyQjNTZHY4QWtZWU5YT3RrZlN3WGJUSWdhMXR1dnN4TVZCZ3BvMmxtMFZEcUFpaVJ0ZGhjN2FYUlhHOTl3VHRZY2hpR2Q2ZHBROGlDekFrcEV4R2drN2MlMkJ3ZjFmRUp0N1pYYjdaZmc2c1Frc091ODhCWkRlNFI5SjM5dkxDaWFYV0RCTFBBYjdFJTJCdFlXMzNIZmhpWFJxJTJCYUxXdnlZY3NONDZoZDA5N0g2cDNrNTFmcEFVQ3hKSVB2N1A0NEdQampwdDI0VDVZNDV0TjJsUXFLTXl5cEVPYnNGSG50ZzdOWXhXNTY5TXZLU2RLY1c3TGhmNTQ1a2tZa3phQW42S0V5SHVDaSUyRndERERkREslMkZ3QmtoVkhjeEpMVUh4Q0czN1REQVpIVVclMkZvYmdqM1pFdnN1UEJzYTFmRkxWVnZVaXBacWk5dVhTekJWJTJGWVE0MGVwaGpRUkxHU1ZhUlRjdGY2eWZ5R0tYOG5OSDBUNXRQcG1JamFDalZvemEzUnhBbmElMkZhNTdjV3JNcXYwQ2prbmpEdklWS3Awa1drOUlTQXZWdnZ2MThzZWV5dTVVajBlMjlGTzRtcVBTZUtGbkp1c1psWmJiMlNPSnZpeHY1NGxNajRKMUlXelRUMFRxcktzY203TllibllXc05oekp1U1R5eFg2dUxWbjlYQmU2MDFJWUFlZTd5cEY3d2hQbmpTRXpPUGNGQ0FPVm1IOGJZaWJhU1NHTnRLb256RmoyT0RIY2J4aUVsVVAwZVVReGptNEYlMkZMYyUyQjg0TzRmaUMwa3N4OVhXMTJjN0JVWHI5cFBiM0RxTU5VeUZ5aVgyUVdHSnVuQVNoZ2hNYXRIY0tzYmZSbWxITyUyRjRpWHUzSzVJWHRzcVdrT2p0JTJGc1dUSVpGbDFPZzB4c2dLQTh5TzAlMkJOankyN3oxVE9JZkpXQVp3V0xGdldacjd1ZndqM20xdTRDd0FBMDRtUmIlMkJoZkNrTWZJTFhHU09tTThQMDRqcXQyaiUyQlg4TjhKeldhT3A0SHpabFBxTkhGSXQ5aURkcmVZSUF3eFRWd05jOFRXTWNyRzE5d0QlMkZJaiUyQkIlMkJ0WVIlMkJaRTVkd3huMlhNU0ZJZ2xwamY2VWJTN2p5SVlZbHJYJTJGQUtSd1dmaEt0YUhMT0Q2d283TDZQVVVENkYxRTNRU0xzUHpSR0wwTXlsZjZHVjF6ZDVWRiUyRmVZWXpmSkRMUyUyRkozbGRYRUFaS0N2cHBWQkpBOWY1czh0N1drT0pwdUlNNVBJVUtIdE1idWZlMk0lMkZORDhtVzhTY2xhTFZMVjFraWxQc1NOSjVpZW9RRDNhc2RpJTJCeUVVV21DZ29LZGVkbG1ZajJCQmlyVXZFT1l4T1BTdE15MzV3S2taOWhVMzlveFBVbWY1YlVXRXRiTkE1MjB6MlQzamIzNHJOTmNJWTR0ZUF5JTJCWjljMUt2Y3RPNyUyRjhBeUdLZG1NYng1M1hwSXdaeklya2hkTjdvdlZ2YmtjWHlPU01xQ2pGbFlYREM1Qjg4VSUyRmlTTUp4RklSJTJGZVUwVGV3dVA0REU0M2JaMk4lMkZrQkYlMkZWVWQxc081WENLbmlLZ2pPclNwbGxPbGl2SmJjeDN2Z1hFanc5TEREbnp6enlJaXhVaEFMRzI3T1A0UjROOE1kTGgwRWNiUkNueTJrS1J6ZEdLblhOTUZrbUVZRWI2UzJuVXdHb3J1QWJXeFQ0NldLcVI1OHNyUkxHQUNRbzZkQmJ0YVAxaCUyQmtneG8wbkVOQ3BJRlhDdmVWZHZnTVJOZGwlMkZDMmVUZExWdlJpb3ZjVk1NVFFUQSUyRm5BYjRmMCUyRlV5d3FrdEdkbjZTT2VuSk8wVUdiTDYlMkJkdFNRcE5HRFpucFhFZ1h4MDNLJTJGcFd4NnV6R2xscm5RaVFkRDgyc2xQSUNDQjJxZWU5JTJCc1l1TTNCMDhsbnlyaUNLdTBDNng1a2dtWWZrekpwZGZmaUt6SExzM3BnZnN0a2MwNkRicG9sRmRINDNHbWRSNW5HakRyNHk1Um15JTJGVHBSZHdaWENVbGpLd1YwR3BoWWlTTXdQN1Y5VTltNTY4ZHFJNTVKSTNxcWQyZzE2aTl1bTJIVnFVZzJQTG1EMzRJVEw4b3pKaUtLb0lrQjNTbmxFcFh4aWswT1BhMkdIeVN2cHByVWRURzhwNUlraGhsUDZENlNmSyUyQkxVYzBKY1BaWHlRenF1JTJCMmtOeHZCck0wVTkyaEY0clMzdDZ2TFJJTzIlMkZJbm1iRGxnT2VRcXFKTkJFZFFENmdtbGoyaTQ3ZlB5NVlmcXFxdnBuNkRNcVVGJTJCZW1xZzBzZlBZNFk2VExaUjY4RTlPM2JFd2RmWTIlMkZ2d1gySmNyJTJCaEZzdmxrTiUyQm1wbFBLd0Vsdmh0endnMHlHWkVncVkzMUM1WnZVQzl4dmgzMEdPWDdtcm9KUHhYUFJONzl2Zmhpb29xdW1GNXFlUlY1aHROeDdSdGdpRW1JYW1tR3M5RXhXTWdPd0Z3TDh0eDI0SHc2a3NrZHpHN0xjV09sclh3JTJGSG1VeXdwRXlReW9nc29raVVsZWRySG5ZWHZidEdJQ0hjclBSVSUyQllWSDRGTVVIaTV0JTJGUEhzb2lFa2sxeDlNd3dlVFBxYjltTTRVR0VmRDAwZ1VMNlRWaFFvNUJWRiUyRmNUajFLNXBjcGtxUmJVUFNKaGNYQjBSaU5mMm5PSzNVU3FEJTJCeTkwTWJ5MzZMTndmblV1UzNxcFE4Y05lelZFeUZMZ283RXh5amNiQWVxZCUyQlFOJTJGb2pGMWVyT2Q1MVJ3ajdubyUyRjdUTWRCUWxoOUVFSHNOdTBjOTlzTVYlMkZDdlNjSzVkQlR4M3JzdHBVampITHBRRkFhTSUyRmxXdnZ5WUE4cjRqZUg4Nnk2bjRhcmFWNUlLZXA2RmhDekFJMDRJSVVkUkxLU1Z0ejJIWGZHTEtwWEpMWnVLbXRja1hrZjhBYWM2a25ZRnVscmFkV3NMMzBneUgzazQwZzFXWE14MXlRQnVzU2dLZmZqUHVFb1dtcVVkRjFpYXNxcGd0cjNWYlJqbjRuRnoxUEVvSHJwM0ZpQjc5dllCZ012Sk0xWjgyZG1QWThNZXh2R0tQMDhQcE5TcUY5Q25kM0l2b1ViayUyQlFCODdERXhRU0N0cXBLalFVaVZCREJIYSUyQmlNZFhuZTVPOXlUc1NkSmdnNUNrRDZ3c2UlMkYlMkJyREVybGtxaW1FYTJadFJabDVBZFExRWRYZHpQSyUyRlVSa3REWVBkRnF5bHdLbExNTkxBa0c5OWR0aVIzQzF0dHRyWE50S3pwRjFJdVJjV3VCZTJLdmwwcFNicGl4c0NDN25hJTJGVVBBRFlBZFEyRmo2bUxTRGNBOW92aEhBNSUyQnl0VktTVTlTJTJCdTZsU2JnRzlpTno3TDNIYUdCNjhlNDBScW5neWd6TlNBVXFwS2VRRHIxS0hBOEF5RSUyQmVKbk1xTmFtSlpCWU1wVlhKNnVwVzhBU1VQNHJnJTJGVnhFWm5HWk9ES3ZMNUFVYURNNllsRzZpd1pmZ0FQTHMzeDEzJTJGSnpwb3NxMHpRZkpmbXNZRzlOSEM0JTJGd0QxNkclMkYlMkJPRW12eTh1UWxmRkliN0NGV2tQN0l4SXduMG41TnM4WWYzOU82anYxUmkzeEdMTmtuUzFtU1pmVmF5QlBTeFNFQTI1b0QxQWR1S09aN2Jmc3M0WmRxb3A4YXRLTHgwV1pTRG5xV2paUjdYc01lTWNpR3hwTGJjcHEyQ1A0RW5Fcm5lUVpxbGJMWFVyQ3VqYVRwQkMxaEpFZnhOWHFzUHhUYnMzNVlqNCUyQklzeGh0Rkd2UXVOaUVvWERYN3dJOWpoUzJyUlpVbSUyQkJVRXRYUmFUVDFsSlFCellFVkVzaTM4TkdnbnV3JTJGd0FUVlFseldLb1NtcXRBZ0tNM1FuYjFyalkyTnJFNzRIa3FzJTJCckFicG1jaU1EcVZxYm8wSTY3NnlvdDQ0VGtXWlM1ZlBJOFhTVDBzY2JoNElwNDJoUnJqVGQ3OUhIYjFyMmElMkI0Mkp4MWVTSFMyd1QweVA4R2J3NklqQjJUU1VEMVZRMWRUenNzZ1JZeXQ5Z0wzdUZOJTJCYmQlMkZMRTFWNTk5ajlENWhsRlBGMGd1amVseGFXOEdmU1BmaEM4VlY3cVRUY09sMHQ2cFd2aGJWNUlUaUtiV2tjNTJ0SUVxNldnaXolMkJrcDFwdFZKVlFnS1hMZlRKYmU1Tng5RUMxdnJkUnhKakthU052Vm82WkQybXhPSW5OTTBqenZKcVhPS0pKSTVZSm5obGhsV3p3eXJaZ2pEcVBTUm9QQmdjV3IwbWlhRkpqTkVzY2loMUx5QmRpTGpBejdra0IzT2tJcFFsT0FvQ2dmaXFRTUZDUWxiZ0UlMkJBd0pIbU9XbVFSeDF0TDBoNUtzaWtuQmU0NTM4emJDWGZrRjg3STNOY2t5ck9oYk1zcXBxb2dXRHlJQ3klMkJERGNlUkdLJTJGV2NEcEdoWExzNXFxV1BxcHF3aXFndDRTZXNCNE5pNUhVVnRaZlBmQ0NsZ2ZYQyUyQkFBd2Nja2x3d2FNN255amlPZ2hNWnkxSzJtNiUyRnNYTUhUemdtR255VyUyQklTWk1tcUtuMGFxcFVvNm8lMkYzVHE5QktmQlhESXg4QU1hMFkwazV1Nzl4WmolMkZ4Z2F0eXVucllEQlYwYVZFTGMwbGpWbDk0eGFoMWM0aXA5UGpueWpKNm5oaEJjd1ZyUWc4bHJZdEslMkZ3Q29tcFBiYkFSeTNPOHRCa2lXVG94OWVta0VpbjlYbU1MNDNMOEs4V3RTNUl6VUVIUVJ2ME1iRXBxSU45anR2M1lCbyUyQk5xaUkzcTZPR1JyYnl3c1laUGF2UEdyanpUbEZOcTB6T3lkTEJOcUxwJTJGWW81a1pDUlYwZFBNM1dTbWglMkZhdUVrWlpOeU5SU3NlMjBxajRINDRzSDJheSUyQnNweEpYUU1rVjlPcXZwQ1ZHMTlwVTJ2WWpuYzQ5OWdzbnJvaEpUOVBFcEcwbEk0cVVQYjZwOWIyRERGbXh2elFpWFRaWSUyQkxYMFFWZlVSQ2dvNlNPV09SSVE3TTBZSUJ1M1hmcnNQaGdtQ01MUzBjRFJQS0dGTEdZMEZ5JTJCdVF6T1AxYkRDTXo0YmVtbzVwcWJNcVNxUmJJVkJLU2dzUW85UnQlMkJiREV4bFdWeVozeE5EUlUxVTlMYVNvbldXTWJvc1FFS2RuTyUyRmFNViUyQnBrcVZNdmRCQ3U1eUxYJTJGMW5udGZLMFdYNVRFclgyNldaRUklMkZXYmZ5R0lHdm9LMmt6YU9YTzZlQWVtemlVd1FTbTZrbmU3Q3dYV1FRTEg2UXYyNGtZc2p6MnJTVTVYeFMyWVJ4Tm9kV21kQ0RhNDJmV053UWI3QWc3WUVxZUU4OHJaSGp6R1NlSXpEUWFsNDBJaVVEJTJGd0JiYWJBZ0c1QUlJSnhuS2s5TkkxRTBub2x1Q0thT1dwakN4TkhIRFJhMVVFcVU2V1ZtQThRQUI1WXVubzBxJTJGUXE1UU94OUxXOW92aWdRWjUlMkYwJTJGa0dZNXE4aVIxZFV3cG9ValV1WXhGRjlNcTJtOTdsd0RhNFpPM0YlMkZvNUdtb1lKcFJaM2lWbUE2aVJmQ01xZDJ4YzN2UjgwWnhRJTJGWTNOYWlsRjlDdmRDZXRUdVBjUmdMRjA0NHkwbUNuekpWOVpEME1tMXRqdXA5dHg1akZMeHQ0cDk4VXlobWgyVGFYQjdFcmxyJTJGQURJQU5pQ1Rzb09rZHZaZnF1YjlRNWJORkM1SUE1bllBZGVDNG82dUVBOUFWRjdqcHZWSDdYOGI0T1hBRUx1eXkwcHQwYkRheEhSaSUyQnExOWdlOWp5NnllUUJGMEZycHRYUWdUS3lNTnJFWFllUFllN2ZHZTAyYjFWSyUyQnJwcVFkMnR6ejU3cDZ4SjdiNzlkOFNNZkdVOEtCVmp5OEtQcXBES0wlMkIxc0o3V09iWEJvTkxsOHRXNEZNOEVyRVdNVHZwTEE4eFk4d1JjYlh4VmZsQVNiSTZXV2lkU0pKZWowTVRjeVJxUzBiZDdJZGFIdUtubGJBRVhIN3hHNzVaUjFBSDFUMGklMkZ3RHkyT0h1S09MTXY0eXlXZ3BmUTVxVE1LYXJWRVY1VEtyUnZzMW1PJTJGTUxzZTdjNER0bXBLMW81TlUxZXklMkZVOFMwdkNJb3Z3Nm9SRWRvVlFENzF4SDhKWk1sWHdybGxRbjJPaGMwNFZtdXlQZGZWTnl0dDlzU0daU3JIQlRSaiUyRkdubVBmZVVnZTVjVU9qeiUyQmh5cUdTaHFLcFk1SUtpWlNtaG1hM1NNUnlIWWNJbkZ5ZzY1c2ZoYXZiclJvb3lqbzk2amlTU0pSOVdHdGwlMkZpJTJCQ0thbW81cHVocGVKc3pEJTJGZ21jTmZ3THFmZGpOWk9Oc3ZqNWRPNTdvZEk5NXc1VGNaNWRVM0dwb0dISlpoWUh3STI5dHNKJTJCSElsZXg5d2JxOW1udHczbGkya3JJYW5NM1hjZWx5dE9CNEtmVkhrTVFtZThXVXRDbWdta3BrcCUyRm9obHU2SHFzcEd4OEI1NHJzZkZNZWdmOXhRSU9YOXBBQTklMkJFVmZFWEQyWnFxNXRQbDljVUdsVFV4bDJVZGdjRFVCM0E0Q09PVjNLMkZTVzdUQWYlMkZBS21ucHBWVVZqeGs3RXlBNngxM1UlMkJlMiUyQk8wJTJGRjJRVnM2UlBRSkRKS2JHUVFyQVIyZXVsdHozM0hjZVdFR24lMkJUJTJCWnlxMGxNckZTd01kZktpN2NoNngySnhWJTJCSk10b2N2cUlUbDllbFRGTWx5aXRyNkk4Z3VvYzc5blBiRnVNTWN2RFRFU25PS3ZUTCUyQnolMkJqMVFNNUxtcXNnbUJDZWthZDF1M0pKMUFGbSUyQmk0Rmp0dXN2bCUyQlg1UG05b010emhST2cwdFRWQ2Faa0kySUs4N2p1dVBMRUJ3bHdWbkV1U1BKbjlSTFNaYktVWmFJblRLMWpjRm01eDcyc0ZHbzh0dXV4VDhFNVJVU1BKUUxBSkg5ZDBybGxxWkNSMWxYbEF2YTMwaGNZclM3TGFzY3B0cE5hRVQ4TXpKVWlrRmRRUE8yNndtYlM1JTJGUkl3JTJGQlE4VVpTQUlSSkpHdjkySkE2JTJCd240V3dDJTJCWFZNRk8xTSUyQlZaalVSc2JsRWhvcVpDZkwxaDQ2cjklMkJBS2l2NGxvc3hwNk9reTZ0aXBwWTNrRkcxY0hhUmw1NkhEc1NRcHVVMUM5aVIxNEZSYjBtZ25PVmJwbGhtNGlybzF0VVVLeE9PZXNNdnVKd0dlSUtoejgyMU9yRTdXczUlMkZqaUdoNGdvNnFxTU0wQ1UxV3BzWTVZZm5SJTJCdmR2WmNkJTJCSkJLaDVFdWs3TWg2MGJiM1lGd3JsQnJ0YTBnaDh6emFVYjFOWHA1ZW9oUWUlMkIyQldrcTRuTThkWlZ3U1h1V1NwRno0cmNnJTJCWU9QSGMzTzU3VGp4M1hFTFFWSXo3aml1bnIlMkJKR2xxSmhOSXNFYUZ4SG9Kc09zRGElMkIlMkZWYndHSzZmb253eG8lMkJiWkpsJTJCWXVYcVlTSmJXRWlOcGJ1OGJkOThWZXQ0U3FZN21rblNkTGJLJTJGcXNQNEgzWTFNT2FIYWs5R2JsNmVmYzJsYU5JNEhpYWJKWkJBekdSWmJ1c1V0bUE2TkxYQTZqM2c0ZnJPR2NzcUpETEpRUWlhMjhzRjZXVWs5ZXFPd0o4Vk9LWlJ3U1U4dlRUUkJHQkJSdzJsa3NpcWJPTEVmUnZzY1dDbTRxcTZleSUyRlpLR3RRZjNWVkgweDhuVDFoJTJCbHF4UmxHWGMzRmx0UWRjRHRSa1ZSQUF5Wm03UlJsU3NXYlU0a1M0TiUyRlZtaTVFYmMxSnhLY0NjTTEyVjFzbVkxdFJSVGFhUVU4UW81bWt2ZDlia2tnV0pOdHU3QXNmRkgyUVNRMGxBdExMRXdXUjVKRElBU0xqU0JwSkZpUHBFZUI1NFVzaWFqVlRaNktXVkJxdFQ1ZjBUSHVIUFVUeXNTZWVCdVhETzdkRUJ3UG5xVSUyRkZrMVRHUFI2WE02aGk4RjdpUFc5d0Qya004ZGp0czdpd3RqU09MS3BhVGhpdmtOdlhpNkxmcTElMkJxZllDVDVZeGJwWW9zNnJWU1Fzb3FIZllxV0FOeTE5T3dJUjVEWWNqRU83RW5XOGFacnhJajVUbUtxa01KdlVzTEM5dG01QVdHbldldmtQSERaWVhLU2toTGFXZ09ocURVWmJTd1ZJZG81NUhubFJUdVZkZ1N2aXlrRDlEc0dOUTRKNGh6SGlDQ3Vscm9vQkRETUVpa2pXd0xFWFpPZGlGdUFHSE1IZmNIR1V4VkVrZVVpc3FGVkt1dlMxTEJheFNJbHZuQ08xMlpnbyUyRkIxSGtSamJPSEtPaW91SGFDRExtWTB2UXE2UDlGbjFlc1dQZVNTVDNuQTlSU1cwU3VEUHFpbmp6S2dxS0tYbE1oVW44RTlSOGpZNzJPM0xHVnl4U1F5UERJcFdSR0tzcDZpTnNhbFRWRWNzRWN5TnFqWUJsc0FBTGk0JTJGRlVuc0YyeFRlTktEMGJOVnJGRm82eGRSMnRaeHMzdDJQbWNQNmFkU2NYNU82dkhjVkplQ3ZMSklsOURzcE8xd2JIRTdOa01FdE5RVlZQcTZPcXAxYyUyQnRjbVFHempmdjZ1OFlnY2FCd09Jc3g0Wm1oa0pNbVcxVjFYcUVVcTM5N3FjV2N6Y0k5eUt2VHBTbDJzamN2NE1pcWZXcUdrU01IZXpXSnhNcHdia1NEZWtkdTlwbkolMkJPSnV3Q2dBV0E2aGp1TTU1NXZ5YVN4UVhoRUtlRDhpZmIwRWp2RXpqJTJCT0l5cTRQaXkzaUhJMnBKM2FLcW1TUjQ1TnpIcG1WUnYxZ2k1MzVXTzV4YllaVVBUU2xWRlBUTHFxS2lWaUVRZGlxdnJTTjFhVnNMbTE3N1lEcmZzJTJGbkdjMEZYbG5DODBOTlFxeW9rOVNxdExzMmxpTEhUcExrMnVkemE5eHNlTEpLOXZYMkl6UWpXbHNPcXBqTTZHOXdzWVVmRSUyQjhuRkNyNldOcyUyQnpTQ2VGWkl6UDBnQk9ralVBYnFlWUo3ZHdlVmp5eGRZOHA0dTZORiUyRjZlaDFLb0JMWmdvdiUyQnpobVhnemlHdXJqVlZXUjVlRzlINkpXR1lzcm9kVncycFU3Q1JZZ2dnNzRjOGtFcVRRbUVXbW0wVXlQS0tmY05MTExDTGtzaWhwRTdkU0Q2UUg0UzN0MWdZa0llQVVyNEZxS09hU29oZmRaSUVMS2ZNZGZkaXd3ZkoxeFdkSFMxR1R3bFNDR1JwV08zTGtCeTdpTGRWaHRpYnl2Z1BQS0NvOUxpNGxpcFp5YnltbG90cHZ5d3o2V1BmcHYzNFU4OWNTTERVSDRLR2ZreHpBJTJGUU05JTJCeHFkajhNQzFmeWM1NVNRdE1WUlkxNXRNM1JMN1d0alpEdzlOSnBPWThSWnBQMnFrcVV5biUyRkFFMVUlMkI4NFZUOFA4T1Uwd21Xa3BKSmdiaVdkdW1rSDZUa25BTHFwcnpmOEE0TGVQRyUyRkJobVNjSjhRWnZPWWFYTFE4QU5ubnFmVnAxNzlmWCUyQmpjNDFEaHJnakp1RTFXdXFXRlhYS1N5ek9oMHhIJTJGMUllVnVXcHQ5dWRqYkY1YVNFcnZKSFlmakRiRlh6ak02ZjBneDBpcklWTzhqZXNvUGNPUlBlYjkzYmhjJTJCb3laTmNJbkhpU2REMVZtVmJYcDh4cG9xWGwwOHI2UzNnZVolMkZSOXVJVFJsRVV4aiUyRkFMYlVQYjdZRG9RZDZyWSUyRnRZYmxsZVZ6Sks3TzU1czdYeEM1MXhMU1pRQ20wMVNSNnNJUHN2MkQlMkJyWUdHTnQwa1dkUVZ0MGlVbW9wNUhKZ3pwWVZQSlpjc0RrZVlrJTJGaGlQYzFtVXElMkZwOVY2YlJOSUg5TnA0eWpVN1gyWW9mb0ZUdUdGeHZZMkJzYUJVNXJtZVkxTDFUVk14ZGp1a1VoR2dkeWpxQXdaayUyQmQ1eFJ1ODhHcXVwRzJtU2Nsa3NkaUdQMWJqYTNZZlBGMzRKSmJhSzZ6eGIwbVg5JTJCSmFITkpGeVhpJTJGSm9xMnBVTWVucDQ5QlZRZHBQV0lGbUZtdWpIbmEyRXhjS1Ixc1pyT0MlMkJKSXEyTk9kTlVTYWl2ZHElMkJrUEJyREdlVkVxSXFwVXhRUnRleW1vRFNzcW5jSXFzV0FVYmdNdTU2OThTdE5SNW5HM3BpeVBRTEJCb3A2ak5aU05OajZ2UTNDc2xoYzlZeHp4VXJUSVVuZWllcXMyekxKSkJEbnVVejB4NUNRRFVqZURLUDRlZUdwT0s0ajl5MGJTN2JFc1RmOEFWVSUyRkhEdEw4cVUxRlRQRG1uUTVsQXFnZEFRWlhidEpsMHF2ZmJTYjlveGU2dmduTDZnR1dpTFVqdDZ3VWpXbnN2Y2VSSGhoRTZoWGN1UmtjaWVyTTBuemJNNm0yaW1XTyUyRk8wWUh2Wmo4QmhrMCUyQlpTTjZ6M1VuY2RLMWg1TGJGOWw0Y05LRDZYVFRCUWZ0MU9RNmVmSmwlMkZWUGpoY09SME5URnFwNVhtQk50Y0FNeTM4UXFpNDhjQ3NzVndoMzQlMkJXVUFaUEtXSmFXMTklMkZWUmZpYm5CVVdTSTV0TVpaaDJQSXpEMmNzWFQ3QVU1dUlwWDFqbWpFTmI5Rk5SSG5nU2JMcEtZa1BDUU9xJTJCMSUyRkk3JTJCN0VmSzM1Q1NpJTJCQ0d5eWlqcHFpc2hSREVGTVZ0QTAlMkZVSDliNEl6T056bEZXcGsxSzBkaUdWZHhjZG1GUnlSUVpsVm83cEdYRVpRTWRPcXlXMnZ6SUl3dk0wUDJJcWp2Ym83M0hMbU1kYmNrMmRMaGxHcXBxaVNzbU1zeGY1MWhlWlZkcmFpQUNXSFp0dGJzMnh5bWhrbW1aVldsdnlQOW1qdTNqNnZmanRickZYS1VBWm1tWlVYOEppeEFIbnY1WHdTWXVpcHhUS1ZMdWJTSG5jSFkzOFJjZFcxOXgxYURhVG96MXNITWtrcm9UT3hSeXNhNkFFQlMya2JxQWJFY2h5MDJIZGpVc2o0eWhwOG1vWUtpZ21BU2xpQ3ZDeUVOWlFPVEZiZVYlMkZIR1Z0SVpLNkFXdDg4dGpmYyUyQnNQNiUyRm80dVdXUlNuSzZRZ0tMMDhkanBGejZveFZ6cE5LeCUyQkpLVGFZSmxFeXlDUlZYU3ElMkZQUnJxc0VSeVRwdjFCWkE2MlVYTmhqdkV0QWElMkZJWmxDanBZUG5vd0JibDlJZWEzOWd4QjhOMXpkSFN5bG1MSzNRT1FCZXo3RHd0SWczMyUyQjJZdHNKT3pFQzNlZGolMkZPJTJGbiUyRkRBeVRoSyUyRlExVk9GZUdaTDFZcyUyRnllMXZvJTJGRVRVWkpFZVlVN3cyNmk0OWRQZWhIbmlHenVnJTJCeG1iMU5JUG9JMTBKNjFPNDl4dDVZRnBLcVNncklLeUg3WlRTcktuZVZOeDhMWTBYVTRQN1JreHZIayUyRlptdjhBZmpqM0syOXVGeVBFN2ROQ2J4T0E4Wkc5MVlYWDNFWWFqZld4UFVEWVl4emFUc1dnQzZTdXhVZ3JiYTF1V0pPSFA4eGhBVVNvd0FzTlVZT0l6SHNRMG55UTBueVRIJTJGVk9ZZmd3ZjZaJTJGbmhKNG16SThqQ3ZoSGlKeDdZZjg0anRYb2pzWG9rbXolMkZOSkJZMVpBJTJGRlJSJTJGREFzbGZXU1g2U3NtWWRoa05zUjFSV3JIY0tMbkVkTFZWRWpXVyUyQjVzTGJFNE5SQ1VWNFJNUExIelpnZThtJTJCQnBLJTJCSU5wUWEySnNGVVhKeEZQYU9kS2FacFpLcVFlclIwNm1XZHYwUnlIZTFoaXRadHhKWGRQSlJRUVBsWVE2SkZZRVQ5NFklMkZWdjJBRHhPR1k4WGM2UUU4c1lMWmFNeTRsbzhxTnFsdzB3NVU4RzdEOG84bDhPZmRnSCUyRnJzT3Q0OG1uTFd1THpDeCUyRlp4RDVWbDFDWWtualpUS0JkaFVmUWZ2SkgwRDFhdldUdkJ4ZGNpeXVpek9mMFFTUTB0WW91YVdvdXJrZHEyMmNkNms0WktPT0MyckFUbkxkMGluMTNFUEVOYXBFRksxTEcydzZKU3pmckglMkJGc1FEVWxXQ1hraGtMRTNKTzV4dTBQQ1ZQRnpxQ3hITllZdVdIWnNpeXlJRDBrS3ZXR25rVmZjYmZBNDZQVlJocElWa3hLZk1tekNZNjRGbEZYRVhaU0NreUhUS25uOVlkelg4UmglMkJxelpxbWJwcDZtcHFaYmFTUXF3WEhmcHVUN3NhZG0lMkZDMlExa2NubzlONlc1T3kwNnNXJTJGUllBQWUzMjRyMVA4bXRkTzVNT1NWQVVuWTF0YUZBOGtVSDlyRGwxR043YW9XOE0wcVQwVXlHdHFxYTcwYXBSN1dNa1MyZjhBWFByZThZWTZPcHJwaXlpYXJsWTdzZ2FWajdMNDFXaSUyQlN5dTJNbFJsMUhiJTJGQUFLVVNPUDBwTlJ4T1ElMkZKbFFGUU13elN2ckIxcVppaSUyRnFqYkVQcXNhZWdmaFRYNU14WVpSVUxjVmNLVTZuWSUyQmtWQ1JlNCUyQnQ3ampWTWwlMkJVS3RSRmpxYVdUTUVBc0RTd09UJTJGcVBvVSUyQk8lMkJMVFE4QzhPWmR2QmxrWWI4STglMkZkZ3ZNa3BNbXlXc3JxZWlnTDBzRHlLcFVDNUF1QVQyWHhWeWRRc3JTYXNkR01JcWtRVlh4THhMSTBVVU9WVTJXeXppOGNjMGhxcWhsUDFoRWxsVWZqTTRVZFp3SERsZVpSenlWV2I1bmx4bW1ZTklLcDlUR3dzQVVqS3FMRHFCUGVUZ092ekdYTDFsaWpxR0xTblZWMVpPbHFoeHpaajFJTndGRmdvMnRpaVp0eGZPem1ISzJNTVkyTlFWOWQlMkZ5YiUyRlJIdjhPV0NoamM5UlNRVHJHcmt6UzBxS3loaVJPbXBzeWdSQXBWV2tEQzNXcU45THcxRTlnUExCeVZrVWRPczZGb29KRkRMSUdXS0p3ZVdreEtTUjRzRDRZd2o3TDE0bTZYN0kxSFNBMzFkTTElMkZqalR2azQ0czZPbHJCbmRWcFNSd1k0MXA1SFozJTJCdTlsVWdCcmp4SUpzRGNtY3ZUOWl2a0NHWlNkSk1tTXlsb0tsQU5VRHRjbHZVTyUyRmlXWWtueHRpQ3pHaW9VeXlwYU9PRU1FMklVRHJHTHRGbG5EWEVLdk5senhDUWJ2Nk8ybGxQNDhaNUg4b0E0aU00NFR6R0xMNnBhS0tHclpveUVDS3FOZm1MZzg5d09UZVdFUmF0WG9zZDZjV2pPNmVLOWZWVmpBYUlwWGpqdnRkaVRxUGtMRGZ0YnN1RzNtUjJrSUk5VSUyQnNTTDI3UGdSYm5zYmI3SDJiMUV0UGZMMW9hdWtZRWdMVUpwa1clMkZkMWs4Nzk1UFBuRzFGUktVS0pUVEJDMXdvaFlXMnNQY0xlJTJGbnVOTmIyVXVCOFJuMGlubGJabW1YMVFiM3UxcmJmSHRIWVJpODVWQjB1VlVyUk9KRjZCQVNqQmdEcEhaeVBkaWpReXpTRkFhWjJaU0NOZ0xrZDNieThEM1l2TkxRVXNsSEJyZ1hwVmpWSGVOaWpFZ1czSzduenhYenRVa1dzQ2F0bEF5SXNacWlqVWxXbFd5ZG9ZMjAlMkJ4eEdmTEYlMkJvNVJWVTBOY3gwcE9pdXU1NnhldzZ5Unk4dXZHZHhGcWJONGloSUxFb0NkdHp5OTVVNHUyVXlySlR5QmZvSkt3UURjNkh0SW84TE9CYlliY2ppZW9WMCUyRllQVHVrNCUyQmlJNDdwQVJTVjZEdGdrN3V0ZjRqeXhUOGFUeERDdFZrRllteEtKMHFXM3NWTiUyRmhjYmJZemJEJTJCbWxjS2ZncWRYQ3AzN05CNFZ6UDB6aDZPQXRlV2pQUkVkWlRtaDhMRWo5SEUxQ1R0M2NoOGY0ZVBQdXhsJTJCVlp0TGxOY0tpQXExeHBrakpzSFhzOGV1JTJGVjdzWHFMaTNLREVDcVZyU2tid3JURXNQUGxpdm14Tk50Y010NE1pY0VtNmFKJTJGSENRTnlRUEhFRWM2emlzTnN1NGVxU3BHejFEaFBjUDU0UUtIaTZwWWxwTXJvUjFsMkRFZTIlMkJFZkclMkZMU0hmSXZUWlBkTW5JRW53R0dxbXBqaFF0VVNwQWczMVRPRUh2eEZqaGJPcWhQN1p4YVVUckZQQyUyQiUyRnNBR0dQJTJCaE9IMGN0V1o1V3pOMW5RaTMlMkZXYkVxRUwyJTJGNFJEeVM4UiUyRmtSVmNUNU5DJTJCaU9WcXlSallpUDFJJTJGTjI1RHdCdyUyRlRaeGtUbSUyQmFjVHBSeDlkTmxGUEtYSTZyenN0JTJCNzFRUEhIaHcxd0ZEOXVyS3R5T2Q2dUpmJTJGbGhhNU44bkM4JTJCbGI4ck1FJTJGbmh2JTJCUDB4TXBaWHEwaWF5ejVRdUFlSHFjdzVWUjFNYXR1elIwM3JTSHRabU9wajNrbkVYeFJ4bndIeFZUNkszTE0wV29VZk4xVVVNYXlKMmI2OXglMkJLYmp3T09wbFB5Yk9MQ25hOXRpTXdCSSUyRmJ3M0x3aHdSV3d1bEhXMXRMTXc5UnhLa3FyNHJja2p3c2UlMkZIUldKTzZhZnNVNFpHdkRLMWs5YlJtWDBWSm1KQklpYVJkRFAzN0hacmJiRyUyRmV3MnhOdkN3akNhUk5HcDFDTTdhQ09aVXJ1aEg0U2ZwSU9lS1RtdVdUNVRtRWxCVWxHZVBjTWphbGRUdUdIY1JZNzJQVVFEaVF5emlPYWwwd1ZvYW9ndVBXTzdMYmwlMkJWYnZzUjFFWWZQRGE3b3V3c1hVSmZqTkdnNVR4WFYwOW9xNDFHYlVnVzVYcExWRWE5dGxPbVpmeGx1ZTdGNnllVElzeHBoVjVVdExJaDVza1lES2V3OVlQampLNGpUWmpBSjZlVlpBelgxcWQ5WFZma2RYZjZyOTdjc0tocUtxanJGcW9acHFlckpzS21EZG43blhZU2dkbGc0N0R6eFFuajhjTXN1TnEwellwSTMxWGpjcjNkV0Z4NjlQcmdBOTNYaW41THglMkZFd2lpendSMDVrT21PdGlPcW5sUGo5UTl6V3hiQ0pKVkR4VHJvTzRJR29IJTJGakZad2xIa1MwMXBqR1k1dlE1VTBTVlVqaVNiVjBVY2NMeXZKcEZ6WlZCSnNDTUIlMkZaJTJCcm1GNlBoN01wZ2VUeTlGQ3AlMkZYYlY3c1o5eFpsR1owR2VwV1oyMDFibFNyTHByR0xPc2JPd1lhbEJQUjZiVzFLQU5odmZCZVc4Ulp2azZMTFRUcm10RTI0U1dUMTdmaXk4bSUyRlN1ZnhoaXdzVWFUV3lWRzFhTHVaJTJCSnB3dWlqeXlqQjVtV29lWWp5VlZIN1dFUzVSbk5janhWdWZCSXBVS3ZIU1VTSUNEc1JlVFdkOEp5WGpIS2M3dkhET1lLcEJlU21tWFJJbmtlWTd4Y2QlMkJKWTFhRHJ2NFlTNU9MNG9qZm9xRTN5VjVITEFJbXFzeGwwaXdFOVc3cWZMYjNZSEh5WTBOTjl6MGRCSU9veUtTZjJyNHVmcHk5UXg3MDBkMiUyQkMlMkJYSjdPWDdGVXAlMkJEYW1KZ0lxZWloSGF0aGIyREUxUThNMDhKRDFjaHFXRzRTMWtIbDElMkJmc3djYTN2R0VtdlBiZ0hPVDVEY3BOVWhWZmttWFpreVBWVXFHV1BhT2RDVWxqJTJGSmRiTXZrY0FtaHoyZyUyQjRjd1RNSVIlMkZjWmg2cmp3bFFmdktUMzRMOU9PJTJGclk0YTQ5dU9UYVZlQWUxa0htT1kwMHNZcCUyQklxRjZGSE5yMVVTeVFud21BWlIlMkJscHhGVm5CR1MxY1FxYUdtaFJYQUt0RW9LRWR6RGEzZ2NXMTh4UUFoMlVBaXhCNUhGZXFLVEtZcEhueTZTWExLaHR5OUMlMkJnTiUyQlVuMEQ1anp3eU1xNDBHayUyRlJXSnVGWmFOeVFoV01IWmdicjNjdHZmaHluRlRUS1YxaGw2dExXOTIzeE9KNTg4cktJZjhBY0thbnJvQnpuakt3U0R4VnpwUGt3OE1lamZKOHlVVDA5UUlRd3ZwTE5HZjFUOFJ0ZzNLWGtkR1Zhb3lMTWtaWm96R3JHVXNyUnFvSkxjJTJCWFdiRlJ2N2Q4WFhKY3B6MW81SHA4bG1XSjFTMHRXd2dRYVN3QjMzSTBsZW9jdlBCTSUyQmFaUndSQ0RFZlNjeW5GNUtuUURMTDFlcmZhTkJ5SGhzTVZYTWVQTTZybkpSa2dCNU1mbkglMkZXYiUyQkFHTGo3OGlTaXRlMlUzS09OdHQ3Zmd1MyUyRlQ4OHNMcm1PZjAxUEc2a09sQlQ5SWJIWWpXMXdOdXZiRVlhRDVPY210MHFtc2RPWXFLblVUJTJCaWwlMkY0WW93R2I1M0tOVWxSVmFqc1pHWmxQaCUyRnhpUHNWMkl0Z280SHc1ZndMeVolMkJIMiUyRnRacEQ4ZjhNNWNwWExNanB4YmtVcGh0NXVmNFlqNSUyRmxHcnF0ejZGbEs2ajVrMzI1SW81bmJ5eFZLS3FwNHRwNFZOaFlNRkJKOGU3dzM4dGpMSm1GRXlXV2RWRjdiM0h4SFlPd2dDMnhOa0RQZ2l2c0ZacE5lRVB5Y1I4VVZWOUNRd0M5Z1JFcEo3TGFyM3YzZGhQTGZEWlBFZFNDWnM2ZEJlM3FPUUNlejFiZTczOHNKRmZTZldxSXdOcmdIa0QxRG52MmszdDFrbmw3N01VcnNCMDdJbHZYa1ZMc2klMkZnb0Q5WTlwMkhNa25iRXFLWENSRG0lMkZiRWpJS21zbEt2WDFGUTRGeUFOUkhqYzJGOSUyQlo3JTJCVzVKbDRSb2FDblJxeVNlb3JKenBwcU9GZ0dsYnhJJTJCaU9aYllBRHQyeHlwNDJxSFVVdVRVS1V5blpHYjEzOGh5Qjd6Znh3M0ZJY2s2VE1zNHFEVlpsVXBhT21MYW1DbnJkdXBUdDZvNWpibGZCcXhia21EWnBrdEZsUG9xRm1tY0tlbElhd21rUEpVN0ZCNXQyZCUyQjJPNUh3eTJiekdvbGN3NWVoSUVsN0dXM01qc0d4T3J5SGFPWlpsMCUyRkVkYyUyQlk1bTdHbVZyUGIxZWxQJTJCR3ZZQjFrY2gzNG5NNnp5UExvQkNxSVdLMmpwd0xKWWJDNCUyRkFGdVhYYTNLJTJCRlRtNzdZOGpzZU5WM3o0UkQ1NWxHVDVaUmgwYWYwaWM2cWVKbkJJaiUyRkRmYllIY2diY3gzNHJ1M1lNUFZOUlBWMUwxTlRJMDBzcmFuZGpjazRhdHRmcXclMkJFV28wM2JLMlNTazlhUjduMjQ5aHdSTWJYMnVOVyUyRloyJTJCQjklMkJHemJWdGc3Rk5QeVAwZGJVVU0zVFUwaFJyV0l0Y01Pd2pySGppM1paeERTWm44eFVxc0V6alNVWWdwSjRFJTJGdXR5NmlNVXJITnV2Q3NtS00xdmtmaXp5eCUyRmFORmtoZU41R2lPN2VyS3JEVUg3bURiTjROWnV4enl3WGslMkJlNWhrYmhjdmRSRVgwbWluY21GajFoR084YmZpTmJ1dU44VXZLJTJCSnFtaDB3MUlhb2dYWUclMkZ6aUR1SjVqOFUzR0xSRk5TWmxUZE5UeXE2Rk5MY2hwSDRMQThoJTJCSzEwN0N1S004YmpwclJwUXlReUxYOEdsWlB4Vmx1ZTNwU0dwS3dENXlqcUJwY2VIVXc3eGlBenZnTTA4ajF2RDh3b0pXT3A0Tk9xbmxQZW4xVDNyYnd4VVo0eUFFcUY2U09NZ3FXWW84WDVMazNqUGN4S25xYnF4Wk1rNHpyOHVVd1YzU1pwUng3TyUyQmpUVlU0N0hUNjQ3eHo2cmpDTzF4ZHhaemhYQlZhJTJGUUpscDg2cEd5MnFVM2psRFdSajJ4eWprZTQyOGNTVkh4Um5PU01JOHdWc3lwQnlsQ2dUSU8lMkZxWWQlMkJ4N3ppJTJGbUhKJTJCS2N0TXRNOEZkVFNDeEZyMjhSMUgySEZKelBnak1NcDFQa3M0YUVibWlxU1NnJTJGSWJtdnVIamdsT012eGtxSWJzc1dWWiUyRlE1eEIwMUhVTElGTm1VR3pJZXdnN2clMkJPRG5xQUZ1VHQyODdZeWVRSUs4V1dmS2MwVTJDbjFTJTJGY0clMkJpNFBZYmVHSlljUzU5MEhSVkJwOVNpeGxlSWdudDY3ZkhFUEIlMkZ3QldjbVgxOHhoVCUyQjlCUFlMbkRENXNFVXRvYlNOOVJiU0I3Y1p2VThRU0JyVkdja1hOdEVBc2ZkZ1lTeTE3Z1E1YldWYkVrQjZoOUs3ZFZ6MTkzUEVycDNWc0x1WENMN1U4VzBjTjlWZEF0dXBXMW4zWWpKdU1GayUyQjB3MWRRRHlPbFlsUHRQOE1WeE1xejV5T2pwcU9pQjJGbDFFWUpqNFRyNmh4NlZta3JLZWF4RFNmNiUyRnEzWGcxaXhybG5YSjhJS3F1SmEwTGZvNk9rSFVacGpJJTJGc0ZzUlUlMkZFc2tqRlh6ZW9kdVpTa2hDZkRmMzRrdjhBcHZJTXM5YXNtUU56JTJCZWx1VCUyQmoxMzdOeDNZTnBwcUtJQk10eXg1QURjTm9FU0R0JTJCbHZid0dKVHhyaFdUVTN5eXVReDFWYVMxTGswa3hZRzB0WEpmdTV0MTR0Mld4NWdhWlk2MkNBQkZDcVkySk8yMjk5dllUamhXdmt0cnFJS1FmZ3dwcmI5WnY1WVV1VjBzM3JUdk5VdCUyQkZOSVc5MXdCNURBem1tZzR4cDNaVDh5b1c0aDRxekdjekxUUUs2cjBta3NxazJWVkFIbWJEa0FUdGlReWpoNmlocjZsSGlFcTB3VURXdDlURm5CdjJpeWcyMlVYM0JPQ3N0ekdyeVRJRFhSOUU3VmN0MVIxMUJDQXhMRHZPanJ2MWRXMkpIS0VKanFKcFdMeVNWREFzZXZRQkhmeDlRbnp3M0prZmJTNEsyTENrJTJCNlcyUFRTR2xvS21kUUJvaGRoJTJCcWJlJTJCM1lPN0dWMVFBcXBWWGtybFJicnR0JTJGREdsOFMxSG91U1NFQyUyQnR3Q081YnVmYm90akxybnIzUFdlM0RPbFdteFhXUGhIc2V4N0hyMnhkTTg4QVNRQmNrN0FEY25CaVVHaXpWMHkwcWM5QjNrUDZQViUyQmxid09CaFV5eGdxa2pJRHowYlg4eGh2RU93bG9sUHNwRlNJVXkyQVJrODVYOVpqMyUyQlBqc09vQTc0VGxtWHk1dlhmT3M1UXRlV1M5MmElMkZVTCUyRldQYWVRM09JNEFraFJhNTJHTkJvY3ZpNGR5d2xpWkpVVW1WMUhZcFloUWVvQmV2bWJYMjJ3bkxQc2pybGxqQkQ1SmI0UWpNcTZueU9nUkZSQTZqUkRDcHNxVzZ1M2E5eWVlJTJGYVJhbFMxQW5tZWFaalVUT2Jra2FWSGwyRGxiWUMyTzE5Zk5tTlUxUkxZWEhxSURjSXQ5Z1BpVDFrazRGNVk3SGpwVyUyQlNNJTJCYnVkTGhEcVJ2S3dBM0pQc3c5cmpSenBWVzZNYVZMQzZqdEo3VGZxdzI4aGglMkJidWRXbTV0c0J0ZmIlMkJmd3d5V0xXR3dVY2xIVmh0Tml0UiUyRmNYSktYWTdzZFJ1V0p1VDQ0UmptUFlKYUFiYjJkeDdITWV4SkFyRGxMVjFGRlVDZW1tYU9SZnJLYlglMkY0dzFqbUlhVDB5WXR4ZG91ZVU4VFUxV3l3MVlXbm01QmdkS0h0c2ZxMzdOMVBXRGlVa3BnbG5oTEkwWXVoVTZUR092U1JmU1BEVkdlc0RHY1lsc3I0a3FzdFZVbEpucGxOd3BQckllMVQxSEZQTGdyOG9taGg2bSUyRnhrVyUyQkdvbG9xeHF1R2FTaHExR3BxcW5VRFdPcnBZeHN5JTJGanJkZThjc1hETGVPWUc2T2w0aWhTbGVUYUtzaU9xbm04JTJGcWs5aDhzVlNOVXFSRVU5VXV3NlA2dG1JdmZiNkolMkZHVzNlRGdaQ1lHUklTTkZWTzBCamRRWTVKT3NPbkt4JTJGRFd4N1ZPS2JpcGFaY2NVOW1qWjF3emwlMkJiMGhFOEVkVEd3dUdHJTJGc09LVFUlMkZKeFJ4a3NzdFJNbzJDU3pNYmRubDdmRERlVTUzVzVQU3kxR1R0cGdoazB6WmZVTVdpdmNBNkc1cjdMZHd4TFZXWThTNWducjE5TGwwWiUyQnJRdzNmJTJGQUZIdjdnTURIdmp3OUN1M2V5Tmk0ZWd5b0Z4REhCR1JZdElRQVIlMkJVZW9kaHY0amxqaHp2TFlpVlNvTlc0MkswcUdYM2piMms0ViUyRjA5UlNTZE5XR2F0bDU5SlV5R1ElMkIlMkZiQm9vS1pGQUVLMjZoMllseWo1YkhKZUVSYjV4WFMzRk5sOGRPdlU5VkpxUDZxJTJGeE9HaUttbyUyQjdNeXFIVW5lT25Yb2xQcyUyRm1jVFhvbFB6RUtpM1lMWTU2SEFUY3FiZGdPSTcwdUVGUzhrUlQwOUpUZmMxQkdqam04amFtUHMlMkZtY0dpU1IxTjVyTDFoQnB3VTFIQnNiTUFPb0hDMHBvVjVSZzk3YiUyRkhFT1ZrNlhBelQ5RDlVYXoxbm5ncjNZR3FLNktsa1dKa2RtSjJBc0IlMkZYbGdhcXpSNmNoWFZVdjFLcGIzM0h3eEcyY2YlMkZaJnZhbHVlJTVCYmxvY2tzJTVEJTVCMCU1RCU1QmRhdGElNUQlNUIwJTVEJTVCY2FwdGlvbiU1RD0mdmFsdWUlNUJibG9ja3MlNUQlNUIwJTVEJTVCdHVuZXMlNUQlNUJpbmRlbnRUdW5lJTVEJTVCaW5kZW50TGV2ZWwlNUQ9MCZ2YWx1ZSU1QnZlcnNpb24lNUQ9Mi4yOS4xIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721220021),
('wFhMeFzPiKAabd2qzioKtMvVIoTDG9ojxmGwU3KQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzJORVZqdlRuY3JYblRsWkdTY09lZjhDNUZtTkdETWxLblNCSHplVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jX215cGFnZS9DXzAwMDAwMDAwMDAwMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721219690),
('wiXxdw4oBVqJru4JnNnFBww2t9pRJARlRbdbB4N5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWZGSnBaaWVGSmJMeHYyOHpOOWI1Q2NLZWNibzJPYWlKM1UzYlRUUCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218752),
('wKKyTgA3WmZHUJm1mU9vXJDrSVYVoFRHYu6yzhWB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWkw3MENLQjR1NU80UnZYM1p4VkhmRUZTV1d2Q3FYYXd2ZkI3d0VVSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTAzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc19sb2dpbj9fPTE3MjEyMjQyNjExNTYma2luZD1jJnBhc3N3b3JkPU5paSU0MDIwMjMmdXNlcl9uYW1lPTIyMTAwMTYlNDBpLXNlaWZ1LmpwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224277),
('Wz7RoLzB6kZFENPan76RclDmPX9pqfhyIfUHrkyL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN25QNlRIWllDNnY1UjlqZEdTaEZBemlWZ3A4U29SRTdqQjlQTVFVciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721218761),
('xjzQLOw98ku89qxr6CBvC5pakrpR1v4Kd03bfZf5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVR6Y05vN0pJUlZBZ29ja2VHbVVXRFRtYUVreDlHZVdISDZ3OVl2UiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721224283),
('Xm2hAzxGsNYqCyh8EC1uKbKiI7Lg7iWpOR3DLlqf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRGxKV0Z3SzQ2NldZb2h1Y0VIY1Q2TmExa0h5RWpRbXRvUlNFOGdvdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jc3JmLXRva2VuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219620),
('yfifRNZ71auUC4rwSBRngbMTBeHIlnzu4nZm9K5f', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidDEyNWR4R0t2ckFxeXp1ek1yU2ZEY3dmeXFhTWk2VFZKTzI0Tms5YiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXRfd29ya19saXN0Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219717),
('ymsPboeI1HQ7lkfbrPp1sQvWyMxKiczTizYGsHmm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXZaaFZrWkhYVnlEcm5YdjY1Y1RxWFpKTEtjU3VKRGI4SFVRbUxZeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyL25ld3NfZGV0YWlsLzIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219696),
('zLex8gPOaeNkl94C9iiJ0aJZg94Bm7M0Kn19Swkx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSW5KM3BndjNBRTVFNFg3NzAyaXgzcmV6b3RSNHVmUGNYSkZGWXByUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9JbnRlcm5zaGlwX0pvYk9mZmVyIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1721219703);

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_bookmark`
--

CREATE TABLE `w_bookmark` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `position_id` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `bookmark_id` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_chats`
--

CREATE TABLE `w_chats` (
  `chat_id` varchar(16) NOT NULL,
  `message` text NOT NULL,
  `send_user_id` varchar(16) NOT NULL,
  `get_user_id` varchar(16) NOT NULL,
  `send_datetime` datetime NOT NULL,
  `check_read` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_companies`
--

CREATE TABLE `w_companies` (
  `id` varchar(16) NOT NULL,
  `company_name` text DEFAULT NULL,
  `company_namecana` text DEFAULT NULL,
  `selected_occupation` text DEFAULT NULL,
  `prefecture` text DEFAULT NULL,
  `mail` text DEFAULT NULL,
  `user_name` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `thumbnail_id` text DEFAULT NULL,
  `icon_id` text DEFAULT NULL,
  `intro` text DEFAULT NULL,
  `office` text DEFAULT NULL,
  `industry` text DEFAULT NULL,
  `others` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `map_url` text DEFAULT NULL,
  `hp_url` text DEFAULT NULL,
  `video_url` text DEFAULT NULL,
  `background_color` text DEFAULT NULL,
  `registered_datetime` datetime DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `w_companies`
--

INSERT INTO `w_companies` (`id`, `company_name`, `company_namecana`, `selected_occupation`, `prefecture`, `mail`, `user_name`, `password`, `thumbnail_id`, `icon_id`, `intro`, `office`, `industry`, `others`, `address`, `map_url`, `hp_url`, `video_url`, `background_color`, `registered_datetime`, `created_at`, `updated_at`) VALUES
('C_000000000001', '日本情報産業株式会社', 'ニホンサンギョウカブシキガイシャ', 'IT', NULL, '2210016@i-seifu.jp', '日本情報産業株式会社', 'Nii@2023', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUoiBXEyeblLOzB1P569MbOxn64mZZInNVw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUoiBXEyeblLOzB1P569MbOxn64mZZInNVw&s', NULL, NULL, NULL, NULL, NULL, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.774611145553!2d139.70518107623047!3d35.6579243312532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5c1eb5e359%3A0x8acbb27579f65f9c!2z5pel5pys5oOF5aCx55Sj5qWt44ixKE5JSSk!5e0!3m2!1sja!2sjp!4v1721182755137!5m2!1sja!2sjp', 'https://www.nii.co.jp/', 'https://www.youtube.com/embed/B4HiIJhoofU?si=P8YsGmpPCVLXKoSC ', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `w_images`
--

CREATE TABLE `w_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` text DEFAULT NULL,
  `annotation` text DEFAULT NULL,
  `work_id` text DEFAULT NULL,
  `thumbnail_judgement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_items`
--

CREATE TABLE `w_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_name` text DEFAULT NULL,
  `kind_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_kinds`
--

CREATE TABLE `w_kinds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kind_name` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_movies`
--

CREATE TABLE `w_movies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `movie_id` varchar(255) NOT NULL,
  `kind_id` varchar(255) NOT NULL,
  `creator_id` varchar(255) NOT NULL,
  `work_id` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `youtube_url` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  `intro` text DEFAULT NULL,
  `reaction` text DEFAULT NULL,
  `comment_id` text DEFAULT NULL,
  `post_datetime` datetime DEFAULT NULL,
  `sort_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_news`
--

CREATE TABLE `w_news` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` varchar(16) DEFAULT NULL,
  `article_title` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `header_img` longtext DEFAULT NULL,
  `summary` longtext DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `public_status` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `w_news`
--

INSERT INTO `w_news` (`id`, `company_id`, `article_title`, `genre`, `header_img`, `summary`, `message`, `public_status`, `created_at`, `updated_at`) VALUES
(20, 'C_000000000001', '2024年06月18日　群馬県前橋市に新社屋「NIIテックラボ」を設立', 'ブログ', 'Group 1342_2024-07-17_16-26-33.png', '{\"time\":\"1721201274837\",\"blocks\":[{\"id\":\"ob0cE876Vo\",\"type\":\"paragraph\",\"data\":{\"text\":\"NII \\u65e5\\u672c\\u60c5\\u5831\\u7523\\u696d\\u682a\\u5f0f\\u4f1a\\u793e\\uff08\\u672c\\u793e\\uff1a\\u6771\\u4eac\\u90fd\\u6e0b\\u8c37\\u533a\\u3000\\u4ee3\\u8868\\u53d6\\u7de0\\u5f79\\u793e\\u9577\\uff1a\\u7530\\u5cf6\\u3000\\u6d69\\uff09\\u306f\\u30012025\\u5e741\\u6708\\u3000\\u7fa4\\u99ac\\u770c\\u524d\\u6a4b\\u5e02\\u306b\\u3001\\u82e5\\u624bIT\\u6280\\u8853\\u8005\\u304c\\u3088\\u308a\\u6210\\u9577\\u3067\\u304d\\u308b\\u74b0\\u5883\\u3092\\u5275\\u308b\\u305f\\u3081\\u65b0\\u793e\\u5c4b\\u300cNII\\u30c6\\u30c3\\u30af\\u30e9\\u30dc\\u300d\\u3092\\u958b\\u8a2d\\u3044\\u305f\\u3057\\u307e\\u3059\\u3002\",\"alignment\":\"left\"},\"tunes\":{\"textVariant\":null,\"indentTune\":{\"indentLevel\":\"0\"}}},{\"id\":\"Oxi_LYQoCI\",\"type\":\"paragraph\",\"data\":{\"text\":\"\\u5efa\\u7bc9\\u30b3\\u30f3\\u30bb\\u30d7\\u30c8NII\\u306f\\u3001\\u30b3\\u30f3\\u30d4\\u30e5\\u30fc\\u30bf\\u306b\\u306a\\u3058\\u307f\\u306e\\u306a\\u30441969\\u5e74\\u306b\\u5275\\u696d\\u4ee5\\u6765\\u3001\\u79fb\\u308d\\u3046\\u6642\\u4ee3\\u306e\\u5c11\\u3057\\u5148\\u3092\\u898b\\u901a\\u3057\\u3066\\u3001\\u66ae\\u3089\\u3057\\u306e\\u8c4a\\u304b\\u3055\\u3092\\u6280\\u8853\\u3067\\u7d21\\u304e\\u7d9a\\u3051\\u3066\\u304d\\u307e\\u3057\\u305f\\u3002\\u54c1\\u8cea\\u306b\\u3053\\u3060\\u308f\\u308b\\u8077\\u4eba\\u6c17\\u8cea\\u306e\\u4e00\\u9762\\u3068\\u540c\\u6642\\u306b\\u3001\\u767a\\u60f3\\u3092\\u611b\\u3059\\u308b\\u30af\\u30ea\\u30a8\\u30a4\\u30c6\\u30a3\\u30d6\\u306a\\u4e00\\u9762\\u3002\\u3053\\u306e\\u4e8c\\u3064\\u306e\\u30de\\u30a4\\u30f3\\u30c9\\u3092\\u639b\\u3051\\u5408\\u308f\\u305b\\u3001\\u6311\\u6226\\u3092\\u7e70\\u308a\\u5e83\\u3052\\u3066\\u304d\\u307e\\u3057\\u305f\\u3002\\u53d6\\u5f15\\u5148\\u4f01\\u696d\\u306e\\u55b6\\u307f\\u306b\\u305d\\u3063\\u3068\\u50cd\\u304d\\u304b\\u3051\\u3001\\u305d\\u306e\\u6d3b\\u52d5\\u3092\\u901a\\u3058\\u3066\\u3001\\u8ab0\\u304b\\u306e\\u4fbf\\u5229\\u3092\\u3082\\u3063\\u3068\\u4fbf\\u5229\\u306b\\u3002\\u8ab0\\u304b\\u306e\\u5b89\\u5fc3\\u3092\\u3082\\u3063\\u3068\\u5b89\\u5fc3\\u306b\\u3002\\u305d\\u3093\\u306a\\u65e5\\u5e38\\u3092\\u60f3\\u3044\\u306a\\u304c\\u3089\\u3001\\u4eca\\u65e5\\u307e\\u3067\\u9032\\u5316\\u3057\\u3066\\u304d\\u307e\\u3057\\u305f\\u3002\\u305d\\u3057\\u3066\\u3053\\u308c\\u304b\\u3089\\u3082\\u4e16\\u306e\\u4e2d\\u306e\\u69d8\\u3005\\u306a\\u4ed5\\u7d44\\u307f\\u304c\\u4eba\\u306b\\u512a\\u3057\\u304f\\u306a\\u308b\\u3088\\u3046IT\\u306e\\u53ef\\u80fd\\u6027\\u3092\\u8ffd\\u6c42\\u3057\\u3066\\u3044\\u304d\\u307e\\u3059\\u3002\\u5efa\\u7269\\u306f\\u3001\\u3053\\u306e\\u3088\\u3046\\u306aNII\\u306e\\u601d\\u60f3\\u3092\\u30ab\\u30bf\\u30c1\\u306b\\u3059\\u308b\\u3053\\u3068\\u3001\\u305d\\u3057\\u3066\\u30c7\\u30fc\\u30bf\\u7ba1\\u7406\\u3092\\u3059\\u308b\\u30b5\\u30fc\\u30d0\\u30fc\\u3068\\u30af\\u30e9\\u30a6\\u30c9\\u30b5\\u30fc\\u30d3\\u30b9\\u3092\\u63d0\\u4f9b\\u3059\\u308b\\u30c7\\u30fc\\u30bf\\u30bb\\u30f3\\u30bf\\u30fc\\u6a5f\\u80fd\\u306e\\u4e8c\\u3064\\u3092\\u201c\\u30b3\\u30a2\\u201d\\u306b\\u3001\\u3053\\u306e\\u6838\\u5fc3\\u3092\\u5927\\u5207\\u306b\\u3059\\u308b\\u610f\\u5473\\u3067\\u3001\\u5927\\u304d\\u306a\\u30ac\\u30e9\\u30b9\\u30b9\\u30af\\u30ea\\u30fc\\u30f3\\u3067\\u5305\\u307f\\u3053\\u3080\\u30c7\\u30b6\\u30a4\\u30f3\\u30b3\\u30f3\\u30bb\\u30d7\\u30c8\\u3067\\u8a2d\\u8a08\\u3057\\u307e\\u3057\\u305f\\u3002\\u7a7a\\u9593\\u30b3\\u30f3\\u30bb\\u30d7\\u30c81\\u968e\\u30e9\\u30dc\\u306f\\u3001\\u5e38\\u306b\\u9032\\u5316\\u3092\\u6b62\\u3081\\u306a\\u3044IT\\u30c6\\u30af\\u30ce\\u30ed\\u30b8\\u30fc\\u767a\\u4fe1\\u306e\\u5834\\u3068\\u3057\\u3066\\u3001\\u30af\\u30ea\\u30a8\\u30a4\\u30c6\\u30a3\\u30d6\\u306a\\u7a7a\\u9593\\u3092\\u6f14\\u51fa\\u3057\\u307e\\u3059\\u3002\\u5177\\u4f53\\u7684\\u306b\\u306f\\u3001\\u77f3\\u306e\\u7d20\\u6750\\u611f\\u3084\\u7dd1\\u306e\\u8272\\u5f69\\u3067\\u69cb\\u6210\\u3055\\u308c\\u305f\\u30d5\\u30ea\\u30fc\\u30b9\\u30da\\u30fc\\u30b9\\u306f\\u3001\\u3054\\u6765\\u5834\\u306e\\u65b9\\u3005\\u304c\\u76ee\\u3092\\u7559\\u3081\\u3001\\u975e\\u65e5\\u5e38\\u306a\\u7570\\u7a7a\\u9593\\u3092\\u611f\\u3058\\u3066\\u3044\\u305f\\u3060\\u3051\\u308b\\u3088\\u3046\\u306b\\u4f01\\u753b\\u3057\\u307e\\u3057\\u305f\\u3002\\u3072\\u3068\\u969b\\u76ee\\u3092\\u5f15\\u304f\\u30b9\\u30c6\\u30c3\\u30d7\\u30a8\\u30ea\\u30a2\\u306f\\u30a2\\u30a4\\u30c7\\u30a2\\u3092\\u751f\\u307f\\u51fa\\u3059\\u81ea\\u7531\\u306a\\u7a7a\\u9593\\u3068\\u3001\\u5e8a\\u304b\\u3089\\u5929\\u4e95\\u3001\\u5bb6\\u5177\\u307e\\u3067\\u3082\\u512a\\u3057\\u3044\\u7dd1\\u3067\\u5f69\\u3089\\u308c\\u305f\\u81ea\\u7136\\u3092\\u611f\\u3058\\u3089\\u308c\\u308b\\u7a7a\\u9593\\u3067\\u69cb\\u6210\\u3055\\u308c\\u3066\\u304a\\u308a\\u3001\\u305d\\u306e\\u65e5\\u306e\\u6c17\\u5206\\u3084\\u30c6\\u30fc\\u30de\\u3067\\u3001\\u30df\\u30fc\\u30c6\\u30a3\\u30f3\\u30b0\\u3084\\u30ef\\u30fc\\u30af\\u30b7\\u30e7\\u30c3\\u30d7\\u3001\\u3082\\u3061\\u308d\\u3093\\u304a\\u4e00\\u4eba\\u3067\\u3082\\u767a\\u60f3\\u3092\\u9ad8\\u3081\\u3089\\u308c\\u308b\\u74b0\\u5883\\u3092\\u6f14\\u51fa\\u3057\\u3066\\u3044\\u307e\\u3059\\u3002NII\\u306f\\u3001\\u524d\\u6a4b\\u306e\\u30c6\\u30c3\\u30af\\u30e9\\u30dc\\u3092\\u62e0\\u70b9\\u306b\\u4eba\\u306b\\u512a\\u3057\\u304f\\u6696\\u304b\\u3044IT\\u30c6\\u30af\\u30ce\\u30ed\\u30b8\\u30fc\\u306e\\u66f4\\u306a\\u308b\\u767a\\u5c55\\u3068\\u5730\\u57df\\u793e\\u4f1a\\u306b\\u8ca2\\u732e\\u3057\\u3066\\u3044\\u304d\\u307e\\u3059\\u30022\\u5c64\\u306e\\u8272\\u5f69\\u3067\\u69cb\\u6210\\u3055\\u308c\\u305f\\u30af\\u30ea\\u30a8\\u30a4\\u30c6\\u30a3\\u30d6\\u7a7a\\u9593\",\"alignment\":\"left\"},\"tunes\":{\"textVariant\":null,\"indentTune\":{\"indentLevel\":\"0\"}}},{\"id\":\"sZGqPZX-MX\",\"type\":\"paragraph\",\"data\":{\"text\":\"NII\\u30c6\\u30c3\\u30af\\u30e9\\u30dc \\u6982\\u8981\\u3010\\u540d\\u79f0\\u3011\\u3000\\u65e5\\u672c\\u60c5\\u5831\\u7523\\u696d\\u30c6\\u30c3\\u30af\\u30e9\\u30dc\\u3000\\uff08\\u901a\\u79f0\\uff1aNII\\u30c6\\u30c3\\u30af\\u30e9\\u30dc\\uff09\\u3010\\u6240\\u5728\\u3011\\u3000\\u7fa4\\u99ac\\u770c\\u524d\\u6a4b\\u5e02\\u5357\\u753a\\u4e00\\u4e01\\u76ee\\u3010\\u69cb\\u9020\\u3011\\u3000\\u9244\\u7b4b\\u30b3\\u30f3\\u30af\\u30ea\\u30fc\\u30c8\\u9020\\u3000\\u5730\\u4e0a4\\u968e\\u5efa\\u3066\\u3010\\u5ef6\\u3079\\u9762\\u7a4d\\u3011\\u30002,620\\u33a1\\u3010\\u7ae3\\u5de5\\u3011\\u30002024\\u5e7411\\u6708\\u672b\\u3010\\u904b\\u7528\\u958b\\u59cb\\u3011\\u30002025\\u5e741\\u6708\\u3010\\u8a2d\\u5099\\u30fb\\u5bfe\\u7b56\\u3011\\u3000\\u3000\\u5730\\u9707\\u5bfe\\u7b56\\u30fb\\u30fb\\u30fb\\u8010\\u9707\\u69cb\\u9020\\uff08\\u7279\\u7d1a\\uff09\\uff0f\\u30e9\\u30c3\\u30af\\u514d\\u9707\\u5bfe\\u5fdc\\u3000\\u843d\\u96f7\\u5bfe\\u7b56\\u30fb\\u30fb\\u30fb\\u76f4\\u6483\\u96f7\\uff1a\\u76f4\\u6483\\u96f7\\u7528SPD\\uff0f\\u8a98\\u5c0e\\u96f7\\uff1a\\u8a98\\u5c0e\\u96f7\\u7528SPD\\u3000\\u96fb\\u6e90\\u8a2d\\u5099\\u30fb\\u30fb\\u30fb\\u5197\\u9577\\u5316\\uff1a\\u5909\\u96fb\\u6240\\u304b\\u3089\\u306e2\\u7cfb\\u7d71\\u53d7\\u96fb\\u672c\\u7dda\\u30fb\\u4e88\\u5099\\u7dda\\u65b9\\u5f0f\\uff0f\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u81ea\\u5bb6\\u767a\\u96fb\\u6a5f\\uff1a\\u505c\\u96fb\\u6642\\u3082\\u505c\\u6b62\\u7121\\u304f\\u7a3c\\u50cd\\u3000\\u6d88\\u706b\\u8a2d\\u5099\\u30fb\\u30fb\\u30fb\\u8d85\\u9ad8\\u611f\\u5ea6\\u691c\\u77e5\\u5668\\u306b\\u3066\\u9ad8\\u901f\\u3067\\u7570\\u5e38\\u3092\\u5bdf\\u77e5\\uff0f\\u81ea\\u52d5\\u6d88\\u706b\\u8a2d\\u5099\\uff1aN2\\u30ac\\u30b9\\uff08\\u7a92\\u7d20\\uff09\\u3000\\u30bb\\u30ad\\u30e5\\u30ea\\u30c6\\u30a3\\u30fb\\u30fb\\u30fb\\u9759\\u8108\\u8a8d\\u8a3c\\u30b7\\u30b9\\u30c6\\u30e0\\u306b\\u3088\\u308b\\u5165\\u9928\\u304a\\u3088\\u3073\\u5165\\u9000\\u5ba4\\u7ba1\\u7406\\uff0f\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u76ee\\u8996\\uff0b\\u76e3\\u8996\\u30ab\\u30e1\\u30e9\\u306b\\u3088\\u308b\\u6620\\u50cf\\u76e3\\u8996\\uff0f24\\u6642\\u9593\\u30fb365\\u65e5\\u306e\\u5e38\\u99d0\\u6709\\u4eba\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u3000\\u76e3\\u8996\\u4f53\\u5236\\u3000\\u30e9\\u30c3\\u30af\\u30fb\\u30fb\\u30fb19\\u30a4\\u30f3\\u30c1\\u30e9\\u30c3\\u30af\",\"alignment\":\"left\"},\"tunes\":{\"textVariant\":null,\"indentTune\":{\"indentLevel\":\"0\"}}}],\"version\":\"2.29.1\"}', '皆さん頑張りましょう!', '1', '2024-07-17', '2024-07-17'),
(21, 'C_000000000001', 'タイトル未設定', NULL, NULL, '{\"time\":\"1721220020833\",\"blocks\":[{\"id\":\"HUJXTSZeMS\",\"type\":\"carousel\",\"data\":[{\"thumbnails\":\"undefined\",\"url\":\"data:image\\/jpeg;base64,\\/9j\\/4AAQSkZJRgABAQAAAQABAAD\\/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb\\/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv\\/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv\\/wAARCAEOAQ4DASIAAhEBAxEB\\/8QAHAAAAQUBAQEAAAAAAAAAAAAABAIDBQYHAQAI\\/8QATxAAAgECBAIGBQQPBwQBBAMAAQIDBBEABRIhBjETQVFhcYEUIpGhsQcjMkIVMzQ1UmJyc4KSorLB0fAkQ1N0k7PhFiVUY8IXRGSDRdLy\\/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMBBAUABv\\/EACwRAAICAgEEAgEDBAMBAAAAAAABAhEDITEEEkFRE2EiBXGRFBUjMkJSgaH\\/2gAMAwEAAhEDEQA\\/ANQzj7gX\\/M0\\/+8mFTffil\\/MTfGPHM4+4F\\/zNP\\/vJjs334pT\\/AOib4x4orgYgZfvbmv5yf93HqZqk0sPzOY\\/a15NEOrxx4fe3Nvzk5\\/ZwHTClNLDdco+1r9Kffl4YYiSRtU\\/4WZfrw\\/zx7+0\\/4OZfrQ\\/zwDaj\\/Ayb\\/V\\/4wq1H+Bk\\/+t\\/xjqRAZap\\/w8y\\/Xh\\/nj1qn\\/DzL9eH+eArUX+HlH+t\\/xhQFF+DlH+r\\/AMY6kdQZ\\/aP8LMf14v54UBP+BX+bRfzwGBR\\/g5V5S\\/8AGFD0Pb1cs8pf+MQ6JoNDTD+5rD4tH\\/PDod+uGfzK\\/wA8BJ6N1Cg8pMPp0XUKbya+AaRFBAkbb5lx42\\/nhQJP1SMNp3CPyOHR\\/VsCyGd8sByfdkv+W\\/icF4Ek+7Jf8t\\/E4mPJx5PvbS\\/\\/AKfiuFVdTS0TpPV1MNNFYrqlkCAk27evY4Sn3upR+Z+IxSqqqSrrKquYLJNLPJHFIwv0MKMUVUv9EMVLki19QvsAMHCN22Ek26ReaXMaGv1eh1lPU6fpdDKr28bYfxi+Y10lBO2YUzdHU0p6WORdmsu7AnrBAIIOxBxd6TjSvfMaIVeTvTUNfKIoJH2ZieR57jcc1Fwbgm25ywurRzg06Ljj2PY9isAd8scx7HscSewHX\\/bqX8t\\/9tsGYDzD7ZTflP8A7bYOPKOXIPGP+yg\\/\\/iRD3f8AOCqD7ZV\\/5lvguGUX\\/sKd9NH8Bh6i+nV\\/5lvgME+CRqGKp3ZOh0MdQZwSQeXLDklN6haqqZHQc1UaQfIbnqwvSkKgNOw072B\\/gMINPBUrdZmZ1IYNqvpI3G388DZILmskUmQVHQiyrZSpFrHUNj34EzL7dnn5EF\\/YcF5tAtPkdSNRYsQzMesllwJmQ+ezz8iD904YuDkF5p9rbbmiD9o45Fvn7bf\\/AGw+IwrNftZ\\/JT44QLxZm05Bt0QUbHf+re8YgNK0FZv9wr\\/maf8A3Uwqb78Uv5ib4x4Tm\\/3An+Zg\\/wB5MKm+\\/FL+Ym+MeBXAtAw+9ua\\/nJ\\/hhulkqhSwjpawARrYCmTsw6v3uzP85N8MKpqUeiQ+o5+bXf0uQdWDtJEnBJVf41Z50yYdU1J\\/vqoeMCY6KVfwH86pzhT9BSRGWeRYUXm8k5sB4nEX6IbQNX18OU0D1uY5p6JTx\\/SklRRv1Abbk9guTiPpuKaKopzUyVtRS0gNhU1NOscZ8zyv32xmnGfygrmXEVPPlSLJT5errTvOmpTKf70IdiQBZdV7Xva+2KtNm+a51mMTyy1FbXM2mN3cu4v1IPoqPAC2LsOlbSctCPlV0jdYeLuHp5Ojj4toS\\/UDJGt\\/biaiDzRrJFW9JGwuHRUIPmMfPktKpcw19bU186j16anlLqn5ch2HlbCo\\/TcjT0ygopaNAN5KeomQkflBtJ947sRLpk+GMtpW0fQojl\\/8hj+gMd6OT\\/HP6oxlXD3yp1aoi5hproeRLskU6eeyP56D3nF1i+UDhh471GZrRSAXMVYjQuPJhv4rcd+K08OSLqjlJPaLBok\\/xj+qMLs3W1\\/LEHQcZ8N5nUrTUWc0s0rmyoHsWPUBfmT2YnMJlGS5VE3Z7Asn3dJ\\/lv4nBWGCL1zdhhA\\/aOIXJIzPPFRZL6VOwWKmhErkmwAVb\\/wxl+W5jTDLaZbzysIl1vHTSMpa1zvp33vyxLZrmp4mqRpJGT07Wp4zyqmH96w61BHqr3ajvYAepl6OIk87deLcY9qp8jscWtlWzuZJIKpFY63jYBGUqxvsNj440apkXiHjmio6f16XJLy1Eg5dLyVfEFR7H7MU\\/pKWtVqariEkbixU7EdhB6iOdxiR4Z4gfhmo+x08vSxPISVKjXILFukBA3JVTe\\/WhGw02OVuOuUdJN7RqOPYRBUQ1MKT08qyRuLq6NcEYXig1Qg9j2PY9iDj2BK77ZTflP8A7bYLwJW\\/bKf8p\\/8AbbBx5RI2PvDH\\/l0+Ax6PVoqgrFS1XpuO\\/Tjo+8Mf+XT4DHI\\/o1P+dHxXBLaJRxYozS9JOzDpPV2YKEv1jv677nsx2SGnkgeWOxaME7G+\\/wDW+1sN0kInQvJdxF6qqDa3b5m+E1QSKeURqwCw2azcvHt6u\\/2nHBPmrB6qSV8gr1kdn6KYoGY3Ngy\\/84TmH27PfyIfgcdqR\\/2TNB\\/+S37y45mP27O\\/yIP3Tg\\/ByCs2PzJ\\/JT44dZC\\/1iLdhtgfNw5jIW26xgbb\\/SwWwIO+FvgL\\/ij2c\\/cC\\/wCZg\\/3kwqX770v5ib4x4Tm\\/3Av+Yg\\/3UwuX770v5ib4x45cClwDL97sz\\/OTfDB1MB6JDy+1r1d2AV+92Zjteb4YPpvuSH82vwx0uCWRfE+fR8OZM9Z0TVFRI6w0tOoJaaZtlUAc+s+A7cYfxTn1bmjtFViJpSxEkzMJJHsTsCPVRA1wFTYkXJY+sb38p+YSxZ5SxBiqU2XyTAq1mGuVI3I7+j1C\\/VcnGSxvAGJlgZ7n6AfQB7Ozyxp9LiXapVsrZZeLG1F2ALKveeQxKUzyR0zw5eGiWQWnrH9UletR+CvcNz1m22OQ1eTpu+VzBu0VGoe8YMjmjr0aWGM01NCbPVVDalj7lUfSY\\/gg+Nhi1OT9A44r2dpq18uhC5ciRhBqFTMoZvykQ+qo6tTXJ6ieWAzneb1NQXir8wmlY\\/TaoZifLlbuwPX1y1HzFMrR0qG41m8krfhuesns5AbDtwrLaeSqlMdNKySkX0jcnwX63gLnu68copK2jpT7n2phHoeaTPqbJJRIeckMJiDeNvU9wwTTT1mUX6SvWBDzolC1AfxRroPZjhoD0eurrIjGDb5mmH7TMAqHxue7D1K2T0jAK8ckhPqw046d28TbTf2gdmAcr1yNjDy9BkEdRncWmbKssoldbrJDTFJSvU1gwVQe08+oHFrh4tzikgRJc4jdIFWMs0QZnI\\/CbSRqO30iuokWIvfFYhr5K4zL6+W5bTevX1YbXNvyRWO3SNyA5jnsBiHzLiBs1aKmpqZaGkjR4o6eElgkbXB\\/LYggljuzC\\/grsc3TWkFKUYKltm\\/5HmRzbKoqplVZCSkiobqGBtcX6jsRfexGID5Qc2jo8vhy41HQtmZMUjgEsIV3k023Ja4Tb8Inqx75NfSm4emqKgWSoqmkiANwF0qLA9YBFrjmQTiczTKaTNJojOJIp6VS9PUwSGOWInZrMOogC4NwesHGdSjk+kEtlBiqUMY6CgzJowLDo8snKgdVvU5Yj8ykqHUlaLMVXtbL51t+xjRxScQUyA0+dU9UjWstdSXb9aMqP2cLFVxLGtny3LJzbmldIl\\/IxH44YppO1sa8jZixr445tLTKj3+i\\/qH2NviXhlhqnpDUVUtLEz+i1EsShm6KTlzB2DherkWxps82d1URiqOG6GZDsUlrwyn2xYrlXwBLmVXE0dBl+RxdKrzmiqJJGkUG+kLpRFNwPWFyMM+SL50QpUtnqiHNcghjzLL6pKyjkHzlRSAAA9rISVII2uDsewcpnKuMqWrGiutA6nSzgEKD2MDuh7jt34AquHM9yeV6jKapq6NvpISsc58b+pL+kAe\\/EKtVRVNb6NX0UsZUaSIVaKqox+Kh3aP8X1gPq3FlC6jJBaa2acjpIgdGDKwuGBuCP5Y7igU65zk0Zq8rqhmWXk7yUq6iO3pIe3tKWbtAxPZRxhQ18Y9IZYGO2sNqiJ\\/K+qe5reJwmWNra2A4vlFhwJX\\/AGyn8X\\/cbBd72IOx5W68C1v2yHxf9w4CP+wK5Gx94ox\\/6E+Ax6MepU9gq9R7racK\\/wD4VB\\/6V+Aw5SD1qnvnb4DEp6JGIrCEdE9mZQHUxswPftyNsIaNBC5eOR3CmxEWkDwv8cOOTMhZnKC5Hqkj4b+\\/DcdNTK4cAOwYW1At7yTiLC+wWoDfYOvYqwEk5dbixILLhGZfbc7\\/ACIf3TiRzv701A7l\\/eGAMwHz2c96Qj3HBp2iAnNPtd+wRk\\/rYfRi9zoYC+wOxwxmX0B4R2\\/Ww\\/KSNluWvuAbWwLD8I9m\\/wBxL\\/mIP91MLl++tN+Yl+KYTm\\/3Av8AmIP91MOyITmMD9SxSA+ZT+WOXAtcAg+4Mz\\/Lm+GDqf7mh\\/IX4YEAtQ5j3vKfdguIH0SMA2PRgAnqNsc+DmZB8rksb58Fp\\/WkSkWKoY\\/U1OCqg9pAuR2Hvxm2NB4+iMlTU1bkrKa6OeRDuyAoEIYdimMWPIg96k0BrazbYX5dmNvp1WNJFHMt2KiBDA9CJB2EEj3YdqqqqqGQVDHTGLRxhQqoOvSo2GGkEQsXZj+KotfzP\\/OHDUSuwSBAgYhQka2ZvPmScOfICeqsaKjWQCLE7E7XxySN4ra1ZesXFr4tMfDdPTZXNUVEcEiwqTLUTTOmthsViC7AA7BmB1N1WxBy+lZTWTUwq5YBGeo6SQRcErfnYjARyKVpDJYXGm\\/IRS5nm5ZWEnSWFg825A\\/K+lbuv5YLNTU1KE1ddHBTX0uYVJ1n8Fe0nzPcBvhimoq7MapaamdKiZk1u0ykCNe036yTyti05Zwl0biWvm9LlUdS+qB2AdQ7ha\\/XflhM5xjzVlnHjk\\/bFcHcOy8U19P09MabIqJtcdNf7YTtqbtJG1+y9u0pybgijpI6bNcxjElHPUvCs4sy0jiRo16WNgVdCQBq2tfcW3xrORUqUmT0qRoE1oHba1ydziH4ep4a35PhDUfaqmGcyE9ju5Pxvil88t+FdEySbr0TOTVL1WVQySRJDIt43SMWQMjFTp7BdTYdlsFWUzkfWMdvK+AeG9R4YysuNLtRxM4t9YoCfO5JwYPu8\\/mR+8cVJcslHZfVjQDqdB7xjpP9pQdqMfeMeqBdF\\/OKffjh+7I\\/zb\\/FcCiUO447rGLuyqO0m2IniuZ4eG6wRsVknC06MDYgyMIwR3jVfyxQF+wKgf8AYoizDUCYILEHkReMm3j2Yt9P0ks6bXgrZ+px4K7\\/ACaVLm+Vw3E2ZUafl1CD+OInNsy4LzWEQ5lm+USaN0Zq2NXjParBrqe8EYpQzLKY9o8kp78hp6EfCLDs2eUlE5i9HponXmokk2\\/VQYuR\\/TZLmyp\\/csf\\/ABTYqqq8tyeqNTk\\/FtBWAC+lqtVqAOzWt1kH4rjzJwk8Q8P5xaorXkgq229MoqaQSH85HpKuPaewDngV+LgAQrR2\\/LqCP3hgeTi1ifoQmxvvA7\\/vSYcuh9sl\\/qT8RJOh4pnyeo6GmnnqqbmHioJ+iPcUK3Q9fqkjx5Ysg45y2ojRmoszDrf1UoJWuSLbEgbb9dsZ2OIZEfpBKWa1hrpYmtuT9a\\/ad+fIcrY63FdSQRfYixtTQL8Exz6GN2R\\/cW99uzQhxxRrSiEZRnDhUCkilVeX5TDsw2PlApoS5GSZiNbl\\/nJKdPjL3YzGozb0mIxzLO8bG5UyqAezkvVYezAnS0nVRnzl\\/wCMd\\/QY15I\\/r5Pwah\\/9SIYgQuTGxN\\/nMwplPuc4FqPlOZgNGVUi6Tca8zU\\/uqcZz01KOVEh8ZXOOekQf+BD5u\\/\\/APbErosXlMn+um+Ei+1fymVVVA8LUeWIrc\\/7ZK1t79UXdgWX5QcxneqeOmyp3mj1uoefkg7So7beeKehhmo6mT0WKMxhArIzk3Ld5PUDh3J4hJNKT9YxQ\\/rSaj+zGcRPpsUItpDMHUZMmRRfBrGU5\\/8A9Q5fPO1EaWamnWCROk1qWGlvVbrFmHMDfE1UD+1yi3Z8MQHAlE0nCNPUadq6WSqY6rE6pSR+yBix1FPK07OgBDW68Y06UmkalrQrN\\/uJf8xB\\/upgyw1X6wLYDzbeiX\\/MQf7qYNOA8C\\/AFImihrfxjI3uwTB9zRfkD4YRUj+xzgfWjb4YXELQoOxQPdjm7R3KMy+WKJXSkZC3SdGS5A2ChrC57D0hHZcAdeMkx9BcfZQmZcO1TBgsqwOoBH2wfT0+IKAjwI68fPnPz2xsdHK8deinnVNMVgmgtDmtGW2AlQ3PVci3suDhpY\\/qsbMzaQD1dp8sFQ0b5k9QYlYnTrRQLkgdg6yFBPlizJrgDHF3aLnmctWlHR0+WTyQMZI4YijaV+16rt1m9iANrEHrxWKxKuTOCtWzVNcpVWckEJ2XbtG3Kx7xi0cPVstVTwQ1OUzGZG1GrsvRHYjWGv8ASNyLAcyTtvhdPS09ZnE06qNCvq1D6x\\/ligpdjejTcO+nZI5VlNNlNOY4bs7G8srD1nP8AOzq7zc4MzbJKp6ONmyta6OZlCAsCvrbAnsG4x3Fx4blMuTRg842ZPIG49xxVlNp9z2Ml+K0tGT5DmefcP5qZ8mo5DRCqEE2XGcyxzNr0noidgbgi4J5XO22NVybKJIeF1y2tVUaTpDLHE1wiu7NoDdYAbTfrtfbETmmWGmra70CMLOkQrqdFH0pEcPb9IgjwY4tVLUxVlJDVU7aop41kjbtUi49xx2bJ3JNKis1scACKAAAALAAWthm9q9j1CEfvHD+B3B9Lc\\/+i3vOKyJQ+bOB2XBw2fu6P80\\/xXC4\\/tafkjCD92R90bfFcccitcd1Oiloqdb6zLJOQOsRxtb9t48VSMpSLUoas+o2gaJNyALDYMNhvic4unE3EkUBCyLBBGpQm1y7l2G3LaFPbiDSaZcvJjLRhkLgI0gAub7fOW\\/Z8r49F0Ee3Dftnn\\/1KXdkS9Ii6dDLXwxbWZwduwb\\/AMMMzOk9fPMCrFqixRghuovbdlNuoXO3ccF5fIz1slTIWYxRM5Ym\\/hz88RVIbPJKVViq7BmUC58SOzqxozdspdLqapWOSIoUh4ASgUEoy2N9j9FOw9u1j14Ymo1p3LVRjvpusQLoSOS80HKxPVfDiVNKkYDeks66SWEVr9Z5t13PsGBauWKZgydKZCLuXW2\\/9W3PsGFtPjwaGV2r5f7DgjoUa7mN1AA0iVxf9nrwNJDCXOmoiVRy+kb+7DWhuek25XIwkjEOxXfFacDjADkwa\\/Z1YbwsjCWxwvliccOO49gSUGrGyZG0u1nqQp77IbfE4do5DS5VNUAespmmG1\\/oRhF\\/akOPVoEWT5dByLh5m8CbD3A4NyykFUuXUBH3U9LC1+Z6SUyt+wBir1LqCNLoFc3L0jWMogzLLMkoMvSma1LTRxbol7qoH+J3YfefOg4EdICttywUG\\/65wSZDJI4go430MQxdwu\\/sPZhBabpRF9jYSzKW+2jkNvwe\\/GA9uzWT+kO5nb0VQSAenhO5t\\/ergrpE\\/DX24Bp6SCo9JM0CMfSWN2UEmxBHltgr0Kk\\/8WD\\/AExgWktAaFl4ypGpbEW+ljwdNIGpdtvpYb9CpP8Axof9Ncd9Dpf\\/ABof9MYjR2iI4shqqrIJkoZoVlUhj0pOgqOdyOQ6772tjAzlGbjTUGlYidBIDGRsDuL25XFj4Y2niLM6ar6bKaJIzCp6OulQWB7YFI5k8nP1VJHNhavimBJdyNTG5sLYv4cjxRquTvhWTbejPKbhevnYKUZWbYAqRbsvf+vLfFwy7hyOhljAZh0FgjqbaxzHeCCT5G3K4M0AByAHhhWOnnlIbDDCHBD51XyU7vSoTd0Vma+4Bv8AG2BMpmETjfuOEccp6BmlHVH7VUQBH25EXKn3kYj6KqRyCp259uCULgn7CU1deS6IQVBHI4t\\/CwtlNzyaZj8Bij0UwkhG42xa8v8AsmchhGX9DGGdtUksujYnmDpbw5dXPFWavROTghZc8zfLc\\/WSty2eSqLOBHCOkAi1WBAXfSRY37bjc7Ys\\/DKSU+SrHPA1IgllNPBKRrjhLkorDexCkC3ULA74F4Wgeqkqc4eUOtQPR7dMZhIYpHGvWQBY3IAUAW33J2nnip\\/rJF5qMROSX40IbTF9LH+Gv6wxzXGfrqSRbZhhkjLxz9FHjpx1DQahpamvfaxW+FURQQCAOY9uGiQapbEH5s8j3jCiYwNyoHfbDT1NNAdbPGqIjOzAjYDc\\/wAcRFW6ORm2fVXT51mc6mwaodQSeWgJEP2kkPngKpqVemKwMpUDSxJS5\\/j5jDsCST08TyWeadkZ4wrl7kGZiCoNhqksbAnyw1mhSJxAEkBAuwaaRvDZlUg+3nj1vTpLHGNeDynWNyyykuLoGhIiyqum62AjH9eeAaQF4XiisJJWChhIVZOwgagDbfY9vZg6pX\\/s1PCg9aomJAAudv6GG6d2joo0YSU\\/RyEl5L6WvsbDQwuQQN779RwyTfgjpn2tSd6HCjoylpXCMdR+2EEBb8zLvvYbWO9+W2GpKmlhcrUSHUxBKOJm0jla4l3B3PXuSNhjs0kel2M8AYxlTrK3N+fODlsBbbxwNUTUwQwUqQFybGSToytgLbHQCCfjc2wlKXk1X1DlSTA5K9zFLGw6QSfXd3JW\\/UN7WG43ucDipRL3poW2A3B2t58zh2WNnEa\\/2ddNkBRlF+89vjhAo5pASnRncj7YoPvOGFVfK52lbEmqj\\/8AEg9jfzw36QllBpojptv61z479eFyUVSgJMe3cQfhhBoqkMR6PJcC5st8QM\\/zXuP\\/AMPPUxnYUkK+Bb+Jw5HV0yRqpy2B2UWLF3u3vthk0lSP\\/t5fNDhdDTPLmFPCymzzBTcd+\\/wPswIE3N\\/7Kh\\/PbrVinQbwwJGoHbb+bWxauFKUS8bUEagFIJaibwWKJYF95viriRaziVZGI6NqvpG\\/JU6z5WTF2+TKHpc7qqlz85T5dCpB\\/CmdpG\\/dXGd1kqVfRp9DGsbftmg0H2+q\\/On+OHD99I\\/zD\\/vLhui+31f5z+eHR99I\\/wAw37y4xvJdYPU0NPHGGhp0RzLGSyrYn11v7RfBoRU+ioHgMKIBtftvjNflM4+fLNeQ5RKVrWX+01CHeFT9VfxyN7\\/VB23NwWPG8su1AynSthPG\\/wAp1PkUkmWZOI6rMEOmSQ7xwHs2+kw7OQ6zfbGeTce8VV9U0z5rVR6k6PRTMIlAtzAta\\/Xfn2EbYq2CqI\\/PEdouMbOPp8cI1Vv7KfyOT5otuW8SZhHDHAaSJoolCIgiKaR4oWHabldySTvvifpc4paoxowemlkNo1lsVkPYrj1WPds3divZI5FTHa+5AxKzIsueVtHNL83LTwukbrqib6YIZeW5AN9m6wQcLnhhK6VFqOaUdPaJvHLkKT2C+AaaSWiQLOzvThlj1u2p6dz9FXb6yNyR9t\\/VaxAJmMvpjV5hTwW2ZwW7gNz7hijOLg6LsZqUbRF\\/KNk8k9BDCqXkhpxIth1gm\\/uvjNaKnzWHpZqejqJY4VDzFImYIpvYtbkDY792PoDiGSkp+gqJaeSrqZW6ClpIzYzubta52AABJY7BQTj3DHDqZBSTM5RqyrkEtQ0YsgNrKiX30qNhfc7k7nDMfUdmOmrKk0pSUk6ZjeUZ9HL6uuxtuCef88aPmmb5TmPyf1sQf1aaBWeFh9MoykL3hjZfM4lc84A4bz5zNU0Cw1LG5qKY9FIT3kbE+IOAco+TPLMsrI6iavrq9YXDxwTsvR6gbqWCj1iDY77XF7YCWTFKmrT9BdzaplwijSKJYo0WNEAVVUWCgcgLdXVhdr9V8cxE1uZRVFLXU0LsksbrAxIsRqIXUvhqI8RipTkzkrF0mYmszNo0RRTmEvEbbyWbSW8DtbtG\\/WMSdh2D2YgaTSmcUpVQoKzQBR1BdG3gCpxMRVUM6SSRuCiMVLX225+Q\\/hiWvQUlT0PYheLHaPh2uVfpVEYpVPYZWEY9mu\\/liQp8ypaqYR08hkJUsGCnSQDY2PI7kcr4r3HlUIqOigB9ZpnnI7RHG1v22jweGLlkS9sVOXbFt+CtdAsk8TSJERLG0yLpjc2dvV2LruAO+18A5lFGlIKgp0byfRUQaVsOw6zva21uvzw8kLRiXS5SOMKraI2YGyjc22vcnniOeOOSpUK4cu4B9W18eshF+9I8hOdt2uTubSNTiihUKWjhuQyhhv4+GB5o0Zgqym+xYoyeVrEb3HwOCa4ek5nUWhabQFUAC4Hb9Yct+V+WATRapWHSFAoOsmJrIew2v3nyxN\\/yWsdxhvh+B0UtROqFqupeZbMFCFwu\\/aG6turDUoeSIVD5nqYfR6SJ9yDe17WJuAcC1MAgAKzRy3J2S9x43GGhUzx6dE8i6DqWzkaT3dhwDs7ui3pUgyP0iTTN6fQO7KAVlK7b3sbra4P9WwNU1Lx9JTPDRMSLa4o1Nu8MuOSZjVyXEk7PqAB1+sTbfrwM0rvHoOm1y1wouT44FWTY\\/wCmUuk6stgLH6wdxb32v3\\/HCIpaBIgJKacyAbsk+m\\/7Ph7MCnHMSEpNbCRMhmAaoqliLG9muQvV17nB+XLSJW+kwVM8pp4XktNGFtZe4nrPLxxDYkKEdHleYT9ZVIgfFrn3DAkuTlyxnLoy00x61p3UH8ZysY\\/fOLXw1XyZRnM2YaGWCpmcRsov0sUdonHirKGt3jtxXsntGrztbSJ0JJ5WjR5W95XFuy\\/Jar\\/prLsskZTUzQLmFBIw0gSsNTxE9h1lfNTzxldU7k0\\/2N\\/pI9uJX52X6OGtI6alqImWX1tXU99weXf1YVqrUqYuk6JZejcagCwIuvVtbmO3Ff4Pz55KJaJYDIYwWjVmKsq33W1uak28LDqxYDNJUTozwmEIjC7XN76e7uxmNU9lhpp7QHxnxInC3Ds+Yeqahvm6ZTyaQ8vIAEnuGPnSaaWpnknnkaSWVy7u5uXY7knvJ3xd\\/lZz05pxT9jY2vT5auiwN7yNux8tl8jii41ukxdkLfLM7NO3R7B9BTesHO5OwGAo0MkqqObGwxYaOmMj6EFwo3NuX9eWLUnSBxxt2SeUXSZCLWBtfliSrIXl4nTZRejBA1bkCRt\\/Hflgemip6d2QzytOtiyxsvzd+WskaVJ6hck9hwZ0YrJjOJ3nYQmEAqEBBYN9LTzBUb6cIXI9lhoaFsxpZqYRpJMqMI1k2WZD9OF+5hY9xFxyx3h7MaXJkrZKk1E7QoopFZfnp0Z+jCEf4qy2ia9twCbBsRuT5jWZdWRinDGoOwpZ2ANQB1RuPVcgb6Toba4B5YkszWmrEg4lytUeLpxO6OLGGqQWs9\\/ohwAjX5OI2tscVc0bf0Ng2loseV5XWNXtnOcujVzKY4KeJrxUcRNyik\\/SY2BZ9r2AAAFsTWGMvrIcyy6mr6fV0NTCk0eoWOlhcXHbY4fxnTbsNHsNVU0EFOz1LhItgxN+s2HLxth3CJ4Y6mB4JF1I6lWHaP54BcklayqvqIJFopalpI5bxLKX16H5AhusHYW3sbcr2AME6M0dRU3QzvOs+lbkfWBHeCE27sPTQ1VHXSpEoq5ogDII2GqZBYjWh3LAWIZb2O3I2AMtR6boajAZ5DrS62B07nbt0i1u3FlLdj1FPaJBZJwkstUpWKmSRG0mxkZmubHq1WFiNwu\\/NhZuGOsqqh6Ij0g3BaEnTCpHaB9QEW07k6VHacMPUvHRUKAmWNYopnAYAO5uWueVr2XflY47TyTyUMsonLRAkO0TGOJpDtcn6UgF722Ww6+uKoKtWWOGWgym4mqulqZdOtwupmvsoCr9Fd7Act+s3OKzxnUrLn8ULjXHTwIpAO51uXYX6vVhXfvxI5OvTVsPQU2qCFrpcm4NrGSQ8tZGyruQDvbqred1RmzzMqhJGjJmkQEdYUJDb2pJ7cWuix92ZfRmdfLswve3oCkqo2iZpIGkkcl\\/XNwSTfmPHAmWp0mZISNIUMxHUP6vgmoeIUptGpbTZToYH26mHwwJQkxQ1lQdtMRAPef6GPRLSdHlK\\/IYJFc5OrUzT3CNIAN7nZSRt1cx48seenWJHUxNAzBQB64G\\/K5UuDe\\/LsHbthmhfo0mmMRcKljcsAPHSfA9YwRTxpU6EToy6EB3IjGvs0g6T7z7cC+Po1cKj2rv5fAHVSVUUzkzmSw0ai2q47Nxyv4bg4YWukCBHjgdVGkBol7Lcxvtg+ppmlDM6yMwGzkvsLG1\\/pAX52BHIjAYpItMhlnK6QCDEFkB7b7gjcjqPPA8rYueBxf47X0MpU0wRVloUcqLFxIysfHq92GQafoSGWUS7lWDAqfEW9\\/uw+aIPNIiVMPqAG8jaL9ux6wdrYbFBWOmtKWZkuQWVCRtz5dmBYtJnpI6Toi0dRJrCg6HisCfEHl42x4UUbhStfS3a11YsunbruttuXXgeSN42s6sp7GW2G8SSguLL6ieN3iEbKhII6VQdu4nceGH6hGpcijgYaZJap2ZT1aBp+JOIw7XPZiQzZvR46OD\\/ApgxHYTdj\\/DAsJWLiiZ8mMMVg86SBb9s0qQr+yjHG05tkz1eVLTU2hZaUBqZrEaWUWA8CNvO+MryijMmcZTQ2vpqKcN4QxdK3lrIxqm8cQdbq+tQCDe1yl\\/3iMYPUNuSo9NGPbFJeEUqonko8yps8pY+i9JlIljIsIqkX1KewOt7\\/jBus40Gjr1raSKphX1JVDC99u0eINx5Yp\\/FyxUdbLRsvSJm0YDrHZDFML9HKLntQk2vbTy3OE8F8SRw0bxVj9GhN7\\/AID\\/AFh4HY+\\/rwmce6KaGVatGLVNTLWVU1VOxaWeRpHY9bE3PvOGsex7G6tIxm72F5bE0tXcC+hS2\\/IdX8cTqTCnQpG6ppF3kPV2nyxHZZppqJ6lrWJLeOnYe8nDdA0tdXohY6FPSPY2J\\/o2PlhbVtv0Pg0kl7LDACUjRFZVU3Cvs1zzLd55m+56+3Fio6b0eIFiTIwuxPV\\/xiJy2nElQqgAKpubD+fM959gG2J\\/ChjfgblijqIjHMgdG5rex8iORHMEbg7jBFDWeh5hI1Y3TRT9FT5mHFlq4JvUhqbdTg\\/NvbnudrDDWBOIAU4fSsXmi1GXy2G5SVC8ZJ\\/FlRT54Cas6LovHBZkhyNsqmZmlyid6JmIsSqG8Z842Q4sGKpw1XCpz2Wov6ucZXS5gB1awDG\\/u6PFrxlZVUn9j1wca+k6bXttcXxBVmS1ZLT\\/AGQaot6zCobRYddmXZQPyfPExVVMFHA01TKkUa82c2t\\/z1W68VyqzFa6pXpxrubxUqr0zIPw3Rb+sfxrAXAAvc4GCfIyN8oGqfnUDPUoaiE\\/NsapZAV6l1rZwQbkMR1kE2OI+Wp9FrTNIpSWZGEin1WEjIQJLctwbErsSFOxvexHKaysXpZEjUlrrHMzeqO0hCLk8rXsALcycVbNI1FVLAkQKwsYnAXSux6hvYXJPPr6jfDk7HRpuhVTIkiU9FpVIYWWJj1Fbljt3AkeeCaerkniFHBD0qpOJHBXUCQiqBzAPImxO+3PEUXqHkBMZbctqLDc6SB8cG5cHeqgpJllRZ5RGNBBViQT645kbE7Ed9+WJfAyklsmBnlXTI5SoDimVpHgESsVVRex0gKgsOZbyPLFPRGkSnMzsKpyHcCIOtyvSNz5nXIRa3XfuxfM+jei4Rq6XRTxioC0yrBHoW0jCM7dRsxPlimR1MMlQHEgVtLuytZbF25A9YCgY0f05bcjz\\/6rNOKivdgWZGPSqukIYEnVFAIyfyrAYGc9FkDnrnmA8h\\/\\/AJw9m9QglIRm5XPrXBwxmoaOgoqYWB6MyMCbb\\/1fGz4SRgRtuwanKxwAAx9LI\\/qa2CgfrdXeGG+CZstWTS8iuOlewleOVQdr6i3rrYWttvy6sIp6hIFp5oJmjCpZ2ZGXv+kLgjVvYqeQPdh6ILIrS08UEjKPVan0hmNgd+jKN56TYk88Kk5LjSNrDKMcdSp\\/uRpp6ulvPSyHQNPrwzqxF+3Sdv8AkYYNXOtkfSwXbTIga1tuvsxMVBgpo2lm0VDqAiiRtdhc7aXRXG99wTtYchiGd6dpQ8iCzAkpExGgk7c+wf1fEJt7ZXb7Zfg6sQksOu88BZDe4R9J39vLCiaXWDBLPAb7E+tYW33HfhiXRq+aLWvyYcsN46hd097H6p3k51fpAUCxJIPv7P44GPjjpt24T5Y45tN2lQqKMyypEObsFHntg7NYxW569MvKSdKcW7Lhf545kkYkzaAn6KEyHuCi\\/wDDDdDK\\/wBkhVHcxJLUHxCG37TDAZHUW\\/obgj3ZEvsuPBsa1fFLVVvUipZqi9uXSzBV\\/YQ40ephjQRLGSVaRTctf6yfyGKX8nNH0T5tPpmIjaCjVoza3RxAna\\/a57cWrMqv0CjknjDvIVKp0kWk9ISAvVvvv18seeyu5Uj0e29FO4mqPSeKFnJusZlZbb2SOJvixv54lMj4J1IWzTT0TqrKscm7NYbnYWsNhzJuSTyxX6uLVn9XBe601IYAee7ypF7whPnjSEzOPcFCAOVmH8bYibaSSGNtKonzFj2ODHcbxiElUP0eUQxjm4F\\/Lc+84O4fiC0ksx9XW12c7BUXr9pPb3DqMNUyFyiX2QWGJunAShghMatHcKsbfRmlHO\\/4iXu3K5IXtsqWkOjt\\/sWTIZFl1Og0xsgKA8yO0+Njy27z1TOIfJWAZwWLFvWZr7ufwj3m1u4CwAA04mRb+hfCkMfILXGSOmM8P04jqt2j+X8N8JzWaOp4HzZlPqNHFIt9iDdreYIAwxTVwNc8TWMcrG19wD\\/Ij+B+tYR+ZE5dwxn2XMSFIglpjf6UbS7jyIYYlrX\\/AKRwWfhKtaHLOD6wo7L6PUUD6F1E3QSLsPzRGL0Mylf6GV1zd5VF\\/eYYzfJDLS\\/J3ldXEAZKCvppVBJA9f5s8t7WkOJpuIM5PIUKHtMbufe2M\\/ND8mW8SclaLVLV1kilPsSNJ5ieoQD3asdi+yEUWmCgoKdedlmYj2BBirUvEOYxOPStMy35wKkZ9hU39oxPUmf5bUWEtbNA520z2T3jb34rNNcIY4teAy+Z9c1KvctO7\\/8AyGKdmMbx53XpIwZzIrkhdN7ovVvbkcXyOSMqCjFlYXDC5B88U\\/iSMJxFIR\\/eU0TewuP4DE43bZ2N\\/kBF\\/VUd1sO5XCKniKgjOrSpllOlivJbcx3vgXEjw9LDDnzzzyIixUhALG27OP4R4N8MdLh0EcbRCny2kKRzdGKnXNMFkmEYEb6S2nUwGoruAbWxT46WKqR58srRLGACQo6dBbtaP1h+kgxo0nENCpIFXCveVdvgMRNdl\\/C2eTdLVvRiovcVMMTQTA\\/nAb4f0\\/UywqktGdn6SOenJO0UGbL6+dtSQpNGDZnpXEgXx03K\\/pWx6uzGllrnQiQdD82slPICCB2qee9+sYuM3B08lnyriCKu0C6x5kgmYfkzJpdffiKzHLs3pgfstkc06DbpolFdH43GmdR5nGjDr4y5Rmy\\/TpRdwZXCUljKwV0GphYiSMwP7V9U9m568dqI55JI3qqd2g16i9um2HVqUg2PLmD34ITL8ozJiKKoIkB3SnlEpXxik0OPa2GHySvpprUdTG8p5IkhhlP6D6SfK+LUc0JcPZXyQzqu+2kNxvBrM0U92hF4rS3t6vLRIO2\\/InmbDlgOeQqqJNBEdQD6gmlj2i47fPy5Yfqqqvpn6DMqUF+emqg0sfPY4Y6TLZR68E9O3bEwdfY2\\/vwX2Jcr+hFsvlkN+mplPKwElvhtzwg0yGZEgqY31C5ZvUC9xvh30GOX7mroJPxXPRN79vfhiooqumF5qeRV5htNx7RtgiEmIammGs9ExWMgOwFwL8tx24Hw6kskdzG7LcWOlrXw\\/HmUywpEyQyogsokiUledrHnYXvbtGICHcrPRU+YVH4FMUHi5t\\/PHsoiEkk1x9MwweTPqb9mM4UGEfD00gUL6TVhQo5BVF\\/cTj1K5pcpkqRbUPSJhcXB0RiNf2nOK3USqD+y90Mby36LNwfnUuS3qpQ8cNezVEyFLgo7ExyjcbAeqd+QN\\/ojF1erOd51Rwj7no\\/7TMdBQlh9EEHsNu0c99sMV\\/CvScK5dBTx3rstpUjjHLpQFAaM\\/lWvvyYA8r4jeH86y6n4araV5IKep6FhCzAI04IIUdRLKSVtz2HXfGLKpXJLZuKmtckXkf8Aac6knYFulradWsL30gyH3k40g1WXMx1yQBusSgKffjPuEoWmqUdF1iasqpgtr3VbRjn4nFz1PEoHrp3FiB79vYBgMvJM1Z82dmPY8MexvGKP08PpNSqF9Cnd3IvoUbk+QB87DExQSCtqpKjQUiVBDBHa+iMdXne5O9yTsSdJgg5CkD6wse\\/+rDErlkqimEa2ZtRZl5AdQ1EdXdzPK\\/URktDYPdFqylwKlLMNLAkG99dtiR3C1tttrXNtKzpF1IuRcWuBe2Kvl0pSbpixsCC7na\\/UPADYAdQ2Fj6mLSDcA9ovhHA5+ytVKSU9S+u6lSbgG9iNz7L3HaGB68e40RqngygzNSAUqpKeQDr1KHA8AyE+eJnMqNamJZBYMpVXJ6upW8ASUP4rg\\/VxEZnGZODKvL5AUaDM6YlG6iwZfgAPLs3x13\\/Jzposq0zQfJfmsYG9NHC4\\/wD16G\\/+OEmvy8uQlfFIb7CFWkP7IxIwn0n5Ns8Yf39O6jv1Ri3xGLNknS1mSZfVayBPSxSEA25oD1AduKOZ7bfss4Zdqop8atKLx0WZSDnqWjZR7XsMeMciGxpLbcpq2CP4EnErneQZqlbLXUrCujaTpBC1hJEfxNXqsPxTbs35Yj4+IsxhtFGvQuNiEoXDX7wI9jhS2rRZUm+BUEtXRaTT1lJQBzYEVEsi38NGgnuw\\/wATVQlzWKoSmqtAgKM3Qnb1rjY2NrE74Hkqs+rAbpmciMDqVqbo0I676yot44TkWZS5fPI8XST0scbh4Ip42hRrjTd79HHb1r2a+42Jx1eSHS2wT0yP8Gbw6IjB2TSUD1VQ1dTzssgRYyt9gL3uFN+bd\\/LE1V599j9D5hlFPF0gujelxaW8GfSPfhC8VV7qTTcOl0t6pWvhbV5ITiKbWkc52tIEq6Wgiz+kp1ptVJVQgKXLfTJbe5Nx9EC1vrdRxJjKaSNvVo6ZD2mxOInNM0jzvJqXOKJJI5YJnhlhlWzwyrZgjDqPSRoPBgcWr0miaFJjNEscih1LyBdiLjAz7kkB3OkIpQlOAoCgfiqQMFCQlbgE+AwJHmOWmQRx1tL0h5KsiknBe4538zbCXfkF87I3NckyrOhbMsqpqogWDyICy+DDceRGK\\/WcDpGhXLs5qqWPqpqwiqgt4SesB4Ni5HUVtZfPfCClgfXC+AAwccklwwaM7nyjiOghMZy1K2m6\\/sXMHTzgmGnyW+ISZMmqKn0aqpUo6o\\/3Tq9BKfBXDIx8AMa0Y0k5u79xZj\\/xgatyunrYDBV0aVELc0ljVl94xah1c4ip9PjnyjJ6nhhBcwVrQg8lrYtK\\/wCompPbbARy3O8tBkiWTox9emkEin9XmML43L8K8WtS5IzUEHQRv0MbEpqIN9jtv3YBo+NqiI3q6OGRrbywsYZPavPGrjzTlFNq0zOydLBNqLp\\/Yo5kZCRV0dPM3WSmh\\/auEkZZNyNRSse20qj4H44sH2ay+spxJXQMkV9OqvpCVG19pU2vYjnc499gsnrohJT9PEpG0lI4qUPb6p9b2DDFmxvzQiXTZY+LX0QVfURCgo6SOWORIQ7M0YIBu3XfrsPhgmCMLS0cDRPKGFLGY0Fy+uQzOP1bDCMz4bemo5pqbMqSqRbIVBKSgsQo9Rt+bDExlWVyZ3xNDRU1U9LaSonWWMbosQEKdnO\\/aMV+pkqVMvdBCu5yLX\\/1nntfK0WX5TErX26WZEI\\/WbfyGIGvoK2kzaOXO6eAemziUwQSm6kne7CwXWQQLH6Qv24kYsjz2rSU5XxS2YRxNodWmdCDa42fWNwQb7Ag7YEqeE88rZHjzGSeIzDQal40IiUD\\/wBbabAgG5AIIJxnKk9NI1E0noluCKaOWpjCxNHHDRa1UEqU6WVmA8QAB5Yuno0q\\/Qq5QOx9LW9ovigQZ5\\/0\\/kGY5q8iR1dUwpoUjUuYxFF9Mq2m97lwDa4ZO3F\\/o5GmoYJpRZ3iVmA6iRfCMqd2xc3vR80ZxQ\\/Y3NailF9CvdCetTuPcRgLF044y0mCnzJV9ZD0Mm1tjup9tx5jFLxt4p98Uyhmh2TaXB7Erlr\\/ADIANiCTsoOkdvZfqub9Q5bNFC5IA5nYAdeC4o6uEA9AVF7jpvVH7X8b4OXAELuyy0pt0bDaxHRi+q19ge9jy6yeQBF0FrptXQgTKyMNrEXYePYe7fGe02b1VK+rpqQd2tzz57p6xJ7b79d8SMfGU8KBVjy8KPqpDKL+1sJ7WObXBoNLl8tW4FM8ErEWMTvpLA8xY8wRcbXxVflASbI6WWidSJJej0MTcyRqS0bd7IdaHuKnlbAEXH7xG75ZR1AH1T0i\\/wDy2OHuKOLMv4yyWgpfQ5qTMKarVEV5TKrRvs1mO\\/MLse7c4DtmpK1o5NU1ey\\/U8S0vCIovw6oREdoVQD71xH8JZMlXwrllQn2Ohc04VmuyPdfVNytt9sSGZSrHBTRj\\/GnmPfeUge5cUOjz+hyqGShqKpY5IKiZSmhma3SMRyHYcInFyg65sfhavbrRooyjo96jiSSJR9WGtl\\/i+CKamo5puhpeJszD\\/gmcNfwLqfdjNZONsvj5dO57odI95w5TcZ5dU3GpoGHJZhYHwI29tsJ+HIlex9wbq9mntw3li2krIanM3XcelytOB4KfVHkMQme8WUtCmgmkpkp\\/ohlu6HqspGx8B54rsfFMegf9xQIOX9pAA9+EVfEXD2Zqq5tPl9cUGlTUxl2UdgcDUB3A4COOV3K2FSW7TAf\\/AKmnppVUVjxk7EyA6x13U+e2+O0\\/F2QVs6RPQJDJKbGQQrAR2eultz33HceWEGn+T+Zyq0lMrFSwMdfKi7ch6x2JxV+JMtocvqITl9elTFMlyitr6I8guoc79nPbFuMMcvDTESnOKvTL+z+j1QM5LmqsgmBCekad1u3JJ1AFm+i4Fjtusvl+X5Pm9oMtzhROg0tTVCaZkI2IK87juuPLEBwlwVnEuSPJn9RLSZbKUZaInTK1jcFm5x72sFGo8tuuxT8E5RUSPJQLAJH9d0rllqZCR1lXlAva30hcYrS7LascptpNaET8MzJUikFdQPO26wmbS5\\/RIw\\/BQ8UZSAIRJJGv92JA6+wn4WwC+XVMFO1M+VZjURsblEhoqZCfL1h46r9+AKiv4losxp6Oky6tippY3kFG1cHaRl56HDsSQpuU1C9iR14FRb0mgnOVbplhm4iro1tUUKxOOesMvuJwGeIKhz821OrE7Ws5\\/jiGh4go6qqMM0CU1WpsY5YfnR+vdvZcd+JBKh5Euk7Mh60bb3YFwrlBrta0gh8zzaUb1NXp5eohQe+2BWkq4nM8dZVwSXuWSpFz4rcg+YOPHc3O57Tjx3XELQVIz7jiunr+JGlqJhNIsEaFxHoJsOsDa+\\/VbwGK6fonwxo+bZJl+YuXqYSJbWEiNpbu8bd98Vet4SqY7mknSdLbK\\/qsP4H3Y1MOaHak9Gbl6efc2laNI4HiabJZBAzGRZbusUtmA6NLXA6j3g4frOGcsqJDLJQQia28sF6WUk9eqOwJ8VOKZRwSU8vTTRBGBBRw2lksiqbOLEfRvscWCm4qq6ey\\/ZKGtQf3VVH0x8nT1h+lqxRlGXc3FltQdcDtRkVRAAyZm7RRlSsWbU4kS4N\\/Vmi5Ebc1JxKcCcM12V1smY1tRRTaaQU8Qo5mkvd9bkkgWJNtu7AsfFH2QSQ0lAtLLEwWR5JDIASLjSBpJFiPpEeB54UsiajVTZ6KWVBqtT5f0THuHPUTysSeeBuXDO7dEBwPnqU\\/Fk1TGPR6XM6hi8F7iPW9wD2kM8djts7iwtjSOLKpaThivkNvXi6Lfq1+qfYCT5YxbpYos6rVSQsoqHfYqWANy19OwIR5DYcjEO7EnW8aZrxIj5TmKqkMJvUsLC9tm5AWGnWevkPHDZYXKSkhLaWgOhqDUZbSwVIdo55HnlRTuVdgSviykD9DsGNQ4J4hzHiCCulrooBDDMEikjWwLEXZOdiFuAGHMHfcHGUxVEkeUisqFVKuvS1LBaxSIlvnCO12Zgo\\/B1HkRjbOHKOiouHaCDLmY0vQq6P9Fn1esWPeSST3nA9RSW0SuDPqinjzKgqKKXlMhUn8E9R8jY72O3LGVyxSQyPDIpWRGKsp6iNsalTVEcsEcyNqjYBlsAALi4\\/FUnsF2xTeNKD0bNVrFFo6xdR2tZxs3t2PmcP6adScX5O6vHcVJeCvLJIl9DspO1wbHE7NkMEtNQVVPq6Oqp1c+tcmQGzjfv6u8YgcaBwOIsx4ZmhkJMmW1V1XqEUq397qcWczcI9yKvTpSl2sjcv4MiqfWqGkSMHezWJxMpwbkSDekdu9pnJ+OJuwCgAWA6hjuM555vyaSxQXhEKeD8ifb0EjvEzj+OIyq4Piy3iHI2pJ3aKqmSR45NzHpmVRv1gi535WO5xbYZUPTSlVFPTLqqKiViEQdiqvrSN1aVsLm177YDrfs\\/nGc0FXlnC80NNQqyok9SqtLs2liLHTpLk2udza9xseLJK9vX2IzQjWlsOqpjM6G9wsYUfE+8nFCr6WNs+zSCeFZIzP0gBOkjUAbqeYJ7dweVjyxdY8p4u6NF\\/6eh1KoBLZgov+zhmXgziGurjVVWR5eG9H6JWGYsrodVw2pU7CRYggg74c8kEqTQmEWmm0UyPKKfcNLLLCLksihpE7dSD6QH4S3t1gYkIeAUr4FqKOaSohfdZIELKfMdfdiwwfJ1xWdHS1GTwlSCGRpWO3LkBy7iLdVhtibyvgPPKCo9Li4lipZybymlotpvywz6WPfpv34U89cSLDUH4KGfkxzA\\/QM9+xqdj8MC1fyc55SQtMVRY15tM3RL7WtjZDw9NJpOY8RZpP2qkqUyn\\/AE1U+84VT8P8OU0wmWkpJJgbiWdumkH6TknALqprzf8A4LePG\\/BhmScJ8QZvOYaXLQ8ANnnqfVp179fX+jc41DhrgjJuE1WuqWFXXKSyzOh0xH\\/1IeVuWpt9udjbF5aSErvJHYfjDbFXzjM6f0gx0irIVO8jesoPcORPeb93bhc+oyZNcInHiSdD1VmVbXp8xpoqXl08r6S3geZ\\/R9uITRlEUxj\\/ALbUPb7YDoQd6rY\\/tYblleVzJK7O55s7XxC51xLSZQCm01SR6sIPsv2D+rYGGNt0kWdQVt0iUmop5HJgzpYVPJZcsDkeYk\\/hiPc1mUq\\/p9V6bRNIH9Np4yjU7X2YofoFTuGFxvY2BsaBU5rmeY1L1TVMxdjukUhGgdyjqAwZk+d5xRu88GqupG2mSclksdiGP1bja3YfPF34JJbaK6zxb0mX9+JaHNJFyXi\\/Joq2pUMenp49BVQdpPWIFmFmujHna2ExcKR1sZrOC+JIq2NOdNUSaivdq+kPBrDGeVEqIqpUxQRteymoDSsqncIqsWAUbgMu5698StNR5nG3piyPQLBBop6jNZSNNj6vQ3Cslhc9YxzxUrTIUneieqs2zLJJBDnuUz0x5CQDUjeDKP4eeGpOK4j9y0bS7bEsTf8AVU\\/HDtL8qU1FTPDmnQ5lAqgdAQZXbtJl0qvfbSb9oxe6vgnL6gGWiLUjt6wUjWnsvceRHhhE6hXcuRkcierM0nzbM6m2imWO\\/O0YHvZj8Bhk0+ZSN6z3UncdK1h5LbF9l4cNKD6XTTBQft1OQ6efJl\\/VPjhcOR0NTFqp5XmBNtcAMy38Qqi48cCssVwh34+WUAZPKWJaW19\\/VRfibnBUWSI5tMZZh2PIzD2csXT7AU5uIpX1jmjENb9FNRHngSbLpKYkPCQOq+1\\/I7+7EfK35CSi+CGyyijpqishRDEFMVtA0\\/UH9b4IzONzlFWpk1K0diGVdxcdmFRyRQZlVo7pGXEZQMdOqyW2vzIIwvM0P2Iqjvbo73HLmMdbck2dLhlGqpqiSsmMsxf51heZVdraiACWHZttbs2xymhkmmZVWlvyP9mju3j6vfjtbrFXKUAZmmZUX8JixAHnv5XwSYuipxTKVLubSHncHY38RcdW19x1aDaToz1sHMkkroTOxRysa6AEBS2kbqAbEchy02HdjUsj4yhp8moYKigmASliCvCyENZQOTFbeV\\/HGVtIZK6AWt88tjfc+sP6\\/o4uWWRSnK6QgKL08djpFz6oxVzpNKx+JKTaYJlEyyCRVXSq\\/PRrqsERyTpv1BZA62UXNhjvEtAa\\/IZlCjpYPnowBbl9Iea39gxB8N1zdHSylmLK3QOQBez7DwtIg33+2YtsJOzEC3edj\\/O\\/n\\/DAyThK\\/Q1VOFeGZL1Ys\\/ye1vo\\/ETUZJEeYU7w26i49dPehHniGzug+xmb1NIPoI10J61O49xt5YFpKqSgrIKyH7ZTSrKneVNx8LY0XU4P7RkxvHk\\/Zmv8Afjj3K29uFyPE7dNCbxOA8ZG91YXX3EYajfWxPUDYYxzaTsWgC6SuxUgrba1uWJOHP8xhAUSowAsNUYOIzHsQ0nyQ0nyTH\\/VOYfgwf6Z\\/nhJ4mzI8jCvhHiJx7Yf84jtXojsXokmz\\/NJBY1ZA\\/FRR\\/DAslfWSX6SsmYdhkNsR1RWrHcKLnEdLVVEjWW+5sLbE4NRCUV4RMPLHzZge8m+BpK+INpQa2JsFUXJxFPaOdKaZpZKqQerR06mWdv0RyHe1hitZtxJXdPJRQQPlYQ6JFYET94Y\\/Vv2ADxOGY8Xc6QE8sYLZaMy4lo8qNqlw0w5U8G7D8o8l8OfdgH\\/rsOt48mnLWuLzCx\\/ZxD5Vl1CYknjZTKBdhUfQfvJH0D1avWTvBxdciyuizOf0QSQ0tYouaWourkdq22cd6k4ZKOOC2rATnLd0in13EPENapEFK1LG2w6JSzfrH+FsQDUlWCXkhkLE3JO5xu0PCVPFzqCxHNYYuWHZsiyyID0kKvWGnkVfcbfA46PVRhpIVkxKfMmzCY64FlFXEXZSCkyHTKnn9YdzX8Rh+qzZqmbpp6mpqZbaSQqwXHfpuT7sadm\\/C2Q1kcno9N6W5Oy06sW\\/RYAAe324r1P8mtdO5MOSVAUnY1taFA8kUH9rDl1GN7aoW8M0qT0UyGtqqa70apR7WMkS2f8AXPre8YY6OprpiyiarlY7sgaVj7L41Wi+Syu2MlRl1Hb\\/AAKUSOP0pNRxOQ\\/JlQFQMwzSvrB1qZii\\/qjbEPqsaegfhTX5MxYZRULcVcKU6nY+kVCRe4+t7jjVMl+UKtRFjqaWTMEAsDSwOT\\/qPoU+O+LTQ8C8OZdvBlkYb8I8\\/dgvMkpMmyWsrqeigL0sDyKpUC5AuAT2XxVydQsrSasdGMIqkQVXxLxLI0UUOVU2Wyzi8cc0hqqhlP1hEllUfjM4UdZwHDleZRzyVWb5nlxmmYNIKp9TGwsAUjKqLDqBPeTgOvzGXL1lijqGLSnVV1ZOlqhxzZj1INwFFgo2tiiZtxfOzmHK2MMY2NQV9d\\/yb\\/RHv8OWChjc9RSQTrGrkzS0qKyhiROmpsygRApVWkDC3WqN9Lw1E9gPLByVkUdOs6FooJFDLIGWKJweWkxKSR4sD4Ywj7L14m6X7I1HSA31dM1\\/jjTvk44s6OlrBndVpSRwY41p5HZ3+u9lUgBrjxIJsDcmcvT9ivkCGZSdJMmMyloKlANUDtclvUO\\/iWYknxtiCzGioUyypaOOEME2IUDrGLtFlnDXEKvNlzxCQbv6O2llP48Z5H8oA4iM44TzGLL6paKKGrZoyECKqNfmLg89wOTeWERatXosd6cWjO6eK9fVVjAaIpXjjvtdiTqPkLDftbsuG3mR2kII9U+sSL27PgRbnsbb7H2b1EtPfL1oaukYEgLUJpkW\\/d1k8795PPnG1FRKUKJTTBC1wohYW2sPcLe\\/nuNNb2UuB8Rn0inlbZmmX1Qb3u1rbfHtHYRi85VB0uVUrROJF6BASjBgDpHZyPdijQyzSFAaZ2ZSCNgLkd3by8D3YvNLQUslHBrgXpVjVHeNijEgW3K7nzxXztUkWsCatlAyIsZqijUlWlWydoY20+xxGfLF+o5RVU0Ncx0pOiuu56xew6yRy8uvGdxFqbN4ihILEoCdtzy95U4u2UyrJTyBfoJKwQDc6HtIo8LOBbYbcjieoV0\\/YPTuk4+iI47pARSV6Dtgk7utf4jyxT8aTxDCtVkFYmxKJ0qW3sVN\\/hcbbYzbD+mlcKfgqdXCp37NB4VzP0zh6OAteWjPREdZTmh8LEj9HE1CTt3ch8f4ePPuxl+VZtLlNcKiAq1xpkjJsHXs8eu\\/V7sXqLi3KDECqVrSkbwrTEsPPlivmxNNtcMt4MicEm6aJ\\/HCQNyQPHEEc6zisNsu4eqSpGz1DhPcP54QKHi6pYlpMroR1l2DEe2+EfG\\/LSHfIvTZPdMnIEnwGGqmpjhQtUSpAg31TOEHvxFjhbOqhP7ZxaUTrFPC+\\/sAGGP+hOH0ctWZ5WzN1nQi3\\/WbEqEL2\\/4RDyS8R\\/kRVcT5NC+iOVqyRjYiP1I\\/N25DwBw\\/TZxkTm+acTpRx9dNlFPKXI6rzst+71QPHHhw1wFD9urKtyOd6uJf\\/lha5N8nC8+lb8rME\\/nhv+P0xMpZXq0iayz5QuAeHqcw5VR1MatuzR03rSHtZmOpj3knEXxRxnwHxVT6K3LM0WoUfN1UUMayJ2b69x+KbjwOOplPybOLCna9tiMwBI\\/bw3LwhwRWwulHW1tLMw9RxKkqr4rckjwse\\/HRWJO6afsU4ZGvDK1k9bRmX0VJmJBIiaRdDP37HZrbbG\\/ew2xNvCwjCaRNGp1CM7aCOZUruhH4SfpIOeKTmuWT5TmElBUlGePcMjaldTuGHcRY72PUQDiQyziOal0wVoaoguPWO7Lbl+VbvsR1EYfPDa7ouwsXUJfjNGg5TxXV09oq41GbUgW5XpLVEa9tlOmZfxlue7F6yeTIsxphV5UtLIh5skYDKew9YPjjK4jTZjAJ6eVZAzX1qd9XVfkdXf6r97csKhqKqjrFqoZpqerJsKmDdn7nXYSgdlg47DzxQnj8cMsuNq0zYpI31Xjcr3dWFx69PrgA93Xin5Lx\\/EwiizwR05kOmOtiOqnlPj9Q9zWxbCJJVDxTroO4IGoH\\/jFZwlHkS01pjGY5vQ5U0SVUjiSbV0UccLyvJpFzZVBJsCMB\\/Z+rmF6Ph7MpgeTy9FCp\\/XbV7sZ9xZlGZ0GepWZ201blSrLprGLOsbOwYalBPR6bW1KANhvfBeW8RZvk6LLTTrmtE24SWT17fiy8m\\/SufxhiwsUaTWyVG1aLuZ+JpwuijyyjB5mWoeYjyVVH7WES5RnNcjxVufBIpUKvHSUSICDsReTWd8JyXjHKc7vHDOYKpBeSmmXRInkeY7xcd+JY1aDrv4YS5OL4ojfoqE3yV5HLAImqsxl0iwE9W7qfLb3YHHyY0NN9z0dBIOoyKSf2r4ufpy9Qx700d2+C+XJ7OX7FUp+DamJgIqeihHathb2DE1Q8M08JD1chqWG4S1kHl1+fswca3vGEmvPbgHOT5DcpNUhVfkmXZkyPVUqGWPaOdCUlj\\/JdbMvkcAmhz2g+4cwTMIR\\/cZh6rjwlQfvKT34L9OO\\/rY4a49uOTaVeAe1kHmOY00sYp+IqF6FHNr1USyQnwmAZR+lpxFVnBGS1cQqaGmhRXAKtEoKEdzDa3gcW18xQAh2UAixB5HFeqKTKYpHny6SXLKhty9C+gN+Un0D5jzwyMq40Gk\\/RWJuFZaNyQhWMHZgbr3ctvfhynFTTKV1hl6tLW923xOJ588rKIf8AcKanroBznjKwSDxVzpPkw8MejfJ8yUT09QIQwvpLNGf1T8Rtg3KXkdGVaoyLMkZZozGrGUsrRqoJLc+XWbFRv7d8XXJcpz1o5Hp8lmWJ1S0tWwgQaSwB33I0leocvPBM+aZRwRCDEfScynF5KnQDLL1erfaNByHhsMVXMePM6rnJRkgB5MfnH\\/Wb+AGLj78iSite2U3KONtt7fgu3\\/T88sLrmOf01PG6kOlBT9IbHYjW1wNuvbEYaD5Ocmt0qmsdOYqKnUT+il\\/4YowGb53KNUlRVajsZGZlPh\\/xiPsV2Itgo4Hw5fwLyZ+H2\\/tZpD8f8M5cpXLMjpxbkUpht5uf4Yj5\\/lGrqtz6FlK6j5k325Io5nbyxVKKqp4tp4VNhYMFBJ8e7w38tjLJmFEyWWdVF7b3HxHYOwgC2xNkDPgivsFZpNeEPycR8UVV9CQwC9gREpJ7Lar3v3dhPLfDZPEdSCZs6dBe3qOQCez1be738sJFfSfWqIwNrgHkD1Dnv2k3t1knl77MUrsB07IlvXkVLsi\\/goD9Y9p2HMknbEqKXCRDm\\/bEjIKmslKvX1FQ4FyANRHjc2F9+Z7+W5Jl4RoaCnRqySeorJzppqOFgGlbxI+iOZbYADt2xyp42qHUUuTUKUynZGb138hyB7zfxw3FIck6TMs4qDVZlUpaOmLamCnrdupTt6o5jblfBqxbkmDZpktFlPoqFmmcKelIawmkPJU7FB5t2d+2O5Hwy2bzGolcw5ehIEl7GW3MjsGxOryHaOZZl0\\/Edc+Y5m7GmVrPb1elP+GvYB1kch34nM6zyPLoBCqIWK2jpwLJYbC4\\/AFuXXa3K+FTm77Y8jseNV3z4RD55lGT5ZRh0af0ic6qeJnBIj\\/DfbYHcgbcx34ru3YMPVNRPV1L1NTI00srandjck4attfqw+EWo03bK2SSk9aR7n249hwRMbX2uNW\\/Z2+B9+GzbVtg7FNPyP0dbUUM3TU0hRrWItcMOwjrHji3ZZxDSZn8xUqsEzjSUYgpJ4E\\/uty6iMUrHNuvCsmKM1vkfizyx\\/aNFkheN5GiO7erKrDUH7mDbN4NZuxzywXk+e5hkbhcvdREX0mincmFj1hGO8bfiNbuuN8UvK+Jqmh0w1IaogXYG\\/ziDuJ5j8U3GLRFNSZlTdNTyq6FNLchpH4LA8h+K107CuKM8bjprRpQyQyLX8GlZPxVlue3pSGpKwD5yjqBpceHUw7xiAzvgM08j1vD8woJWOp4NOqnlPen1T3rbwxUZ4yAEqF6SOMgqWYo8X5Lk3jPcxKnqbqxZMk4zr8uUwV3SZpRx7O+jTVU47HT647xz6rjCO1xdxZzhXBVa\\/QJlp86pGy2qU3jlDWRj2xyjke428cSVHxRnOSMI8wVsypBylCgTIO\\/qYd+x7zi\\/mHJ+KctMtM8FdTSCxFr28R1H2HFJzPgjMMp1Pks4aEbmiqSSg\\/IbmvuHjglOMvxkqIbssWVZ\\/Q5xB01HULIFNmUGzIewg7g+ODnqAFuTt287YyeQIK8WWfKc0U2Cn1S\\/cG+i4PYbeGJYcS590HRVBp9SixleIgnt67fHEPB\\/wBWcmX18xhT+9BPYLnDD5sEUtobSN9RbSB7cZvU8QSBrVGckXNtEAsfdgYSy17gQ5bWVbEkB6h9K7dVz193PErp3VsLuXCL7U8W0cN9VdAtupW1n3YjJuMFk+0w1dQDyOlYlPtP8MVxMqz5yOjpqOiB2Fl1EYJj4Tr6hx6VmkrKeaxDSf6\\/q3Xg1ixrlnXJ8IKquJa0Lfo6OkHUZpjI\\/sFsRU\\/EskjFXzeoduZSkhCfDf34kv8ApvIMs9asmQNz+eluT+j137Nx3YNppqKIBMtyx5ADcNoESDt+lvbwGJTxrhWTU3yyuQx1VaS1Lk0kxYG0tXJfu5t14t2Wx5gaZY62CABFCqY2JO2299vYTjhWvktrqIKQfgwprb9Zv5YUuV0s3rTvNUt+FNIW91wB5DAzmmg4xp3ZT8yoW4h4qzGczLTQK6r0mksqk2VVAHmbDkATtiQyjh6ihr6lHiEq0wUDWt9TFnBv2iyg22UX3BOCstzGryTIDXR9E7Vct1R11BCAxLDvOjrv1dW2JHKEJjqJpWLySVDAsevQBHfx9Qnzw3JkfbS4K2LCk+6W2PTSGloKmdQBohdh+qbe+3YO7GV1QAqpVXkrlRbrtt\\/DGl8S1HouSSEC+twCO5bufbotjLrnr3PWe3DOlWmxXWPhHsex7Hr2xdM88ASQBck7ADcnBiUGizV0y0qc9B3kP6PV+lbwOBhUyxgqkjIDz0bX8xhvEOwlolPspFSIUy2ARk85X9Zj3+PjsOoA74TlmXy5vXfOs5QteWS92a\\/UL\\/WPaeQ3OI4AkhRa52GNBocvi4dywliZJUUmV1HYpYhQeoBevmbX22wnLPsjrlljBD5Jb4QjMq6nyOgRFRA6jRDCpsqW6u3a9yee\\/aRalS1AnmeaZjUTObkkaVHl2DlbYC2O19fNmNU1RLYXHqIDcIt9gPiT1kk4F5Y7HjpW+SM+budLhDqRvKwA3JPsw9rjRzpVW6MaVLC6jtJ7Tfqw28hh+budWm5tsBtfb+fwwyWLWGwUclHVhtNitR\\/cXJKXY7sdRuWJuT44RjmPYJaAbb2dx7HMexJArDlLV1FFUCemmaORfrKbX\\/4w1jmIaT0yYtxdoueU8TU1Wyw1YWnm5BgdKHtsfq37N1PWDiUkpglnhLI0YuhU6TGOvSRfSPDVGesDGcYlsr4kqstVUlJnplNwpPrIe1T1HFPLgr8omhh6m\\/xkW+GoloqxquGaShq1GpqqnUDWOrpYxsy\\/jrde8csXDLeOYG6Ol4ihSleTaKsiOqnm8\\/qk9h8sVSNUqREU9Uuw6P6tmIvfb6J\\/GW3eDgZCYGRISNFVO0BjdQY5JOsOnKx\\/DWx7VOKbipaZccU9mjZ1wzl+b0hE8EdTGwuGG\\/sOKTU\\/JxRxksstRMo2CSzMbdnl7fDDeU53W5PSy1GTtpghk0zZfUMWivcA6G5r7LdwxLVWY8S5gnr19Ll0Z+rQw3f\\/AFHv7gMDHvjw9Cu3eyNi4egyoFxDHBGRYtIQAR+Ueodhv4jljhzvLYiVSoNW42K0qGX3jb2k4V\\/09RSSdNWGatl59JUyGQ+\\/bBooKZFAEK26h2Ylyj5bHJeERb5xXS3FNl8dOvU9VJqP6q\\/xOGiKmo+7MyqHUneOnXolPs\\/mcTXolPzEKi3YLY56HATcqbdgOI70uEFS8kRT09JTfc1BGjjm8jamPs\\/mcGiSR1N5rL1hBpwU1HBsbMAOoHC0poV5Rg97b\\/HEOVk6XAzT9D9Uaz1nngr3YGqK6KlkWJkdmJ2AsB\\/XlgaqzR6chXVUv1Kpb33HwxG2cf\\/Z\",\"caption\":null}],\"tunes\":{\"indentTune\":{\"indentLevel\":\"0\"}}}],\"version\":\"2.29.1\"}', NULL, '0', '2024-07-17', '2024-07-17');

-- --------------------------------------------------------

--
-- テーブルの構造 `w_notices`
--

CREATE TABLE `w_notices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `get_user_id` varchar(16) DEFAULT NULL,
  `send_user_id` varchar(16) DEFAULT NULL,
  `category` text DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `already_read` int(11) DEFAULT NULL,
  `notice_datetime` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_pre_companies`
--

CREATE TABLE `w_pre_companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `urltoken` varchar(128) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_pre_users`
--

CREATE TABLE `w_pre_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `urltoken` varchar(128) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_tags`
--

CREATE TABLE `w_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text DEFAULT NULL,
  `item_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `w_users`
--

CREATE TABLE `w_users` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `student_surname` text DEFAULT NULL,
  `student_name` text DEFAULT NULL,
  `student_kanasurname` text DEFAULT NULL,
  `student_kananame` text DEFAULT NULL,
  `user_name` text DEFAULT NULL,
  `school_name` text DEFAULT NULL,
  `department_name` text DEFAULT NULL,
  `faculty_name` text DEFAULT NULL,
  `major_name` text DEFAULT NULL,
  `course_name` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `mail` text DEFAULT NULL,
  `intro` text DEFAULT NULL,
  `user_from` text DEFAULT NULL,
  `programming_language` text DEFAULT NULL,
  `development_environment` text DEFAULT NULL,
  `software` text DEFAULT NULL,
  `acquisition_qualification` text DEFAULT NULL,
  `desired_work_region` text DEFAULT NULL,
  `hobby` text DEFAULT NULL,
  `other` text DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `mypr_movie_id` text DEFAULT NULL,
  `resume` text DEFAULT NULL,
  `graduation_year` text DEFAULT NULL,
  `desired_occupation` text DEFAULT NULL,
  `registered_datetime` text DEFAULT NULL,
  `border_color` text DEFAULT NULL,
  `background_color` text DEFAULT NULL,
  `border_style` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `w_users`
--

INSERT INTO `w_users` (`id`, `student_surname`, `student_name`, `student_kanasurname`, `student_kananame`, `user_name`, `school_name`, `department_name`, `faculty_name`, `major_name`, `course_name`, `password`, `mail`, `intro`, `user_from`, `programming_language`, `development_environment`, `software`, `acquisition_qualification`, `desired_work_region`, `hobby`, `other`, `icon`, `mypr_movie_id`, `resume`, `graduation_year`, `desired_occupation`, `registered_datetime`, `border_color`, `background_color`, `border_style`, `created_at`, `updated_at`) VALUES
('S_000000000001', '吉岡', '佑馬', 'ヨシオカ', 'ユウマ', 'yoshioka', '清風情報工科学院', NULL, NULL, NULL, NULL, '2023gakusei', '2211029@i-seifu.jp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025年卒業', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('S_000000000002', '坂東', '航希', 'バンドウ', 'コウキ', 'bandou', '清風情報工科学院', NULL, NULL, NULL, NULL, '2023gakusei', '2211023@i-seifu.jp', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025年卒業', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `w_works`
--

CREATE TABLE `w_works` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `work_id` varchar(255) DEFAULT NULL,
  `kind_id` varchar(255) DEFAULT NULL,
  `creator_id` varchar(255) DEFAULT NULL,
  `work_name` text DEFAULT NULL,
  `work_genre` text DEFAULT NULL,
  `youtube_url` text DEFAULT NULL,
  `thumbnail` text DEFAULT NULL,
  `work_intro` text DEFAULT NULL,
  `obsession` text DEFAULT NULL,
  `programming_language` text DEFAULT NULL,
  `development_environment` text DEFAULT NULL,
  `work_url` text DEFAULT NULL,
  `work_path` text DEFAULT NULL,
  `proposal_url` text DEFAULT NULL,
  `proposal_path` text DEFAULT NULL,
  `other` text DEFAULT NULL,
  `reaction` text DEFAULT NULL,
  `comment_id` text DEFAULT NULL,
  `post_datetime` datetime DEFAULT NULL,
  `sort_number` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- テーブルのインデックス `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- テーブルのインデックス `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- テーブルのインデックス `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- テーブルのインデックス `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- テーブルのインデックス `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- テーブルのインデックス `w_bookmark`
--
ALTER TABLE `w_bookmark`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_chats`
--
ALTER TABLE `w_chats`
  ADD PRIMARY KEY (`chat_id`);

--
-- テーブルのインデックス `w_companies`
--
ALTER TABLE `w_companies`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_images`
--
ALTER TABLE `w_images`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_items`
--
ALTER TABLE `w_items`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_kinds`
--
ALTER TABLE `w_kinds`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_movies`
--
ALTER TABLE `w_movies`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_news`
--
ALTER TABLE `w_news`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_notices`
--
ALTER TABLE `w_notices`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_pre_companies`
--
ALTER TABLE `w_pre_companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `w_pre_companies_urltoken_unique` (`urltoken`);

--
-- テーブルのインデックス `w_pre_users`
--
ALTER TABLE `w_pre_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `w_pre_users_urltoken_unique` (`urltoken`);

--
-- テーブルのインデックス `w_tags`
--
ALTER TABLE `w_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `w_tags_item_id_foreign` (`item_id`);

--
-- テーブルのインデックス `w_users`
--
ALTER TABLE `w_users`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `w_works`
--
ALTER TABLE `w_works`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_bookmark`
--
ALTER TABLE `w_bookmark`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_images`
--
ALTER TABLE `w_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_items`
--
ALTER TABLE `w_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_kinds`
--
ALTER TABLE `w_kinds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_movies`
--
ALTER TABLE `w_movies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_news`
--
ALTER TABLE `w_news`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- テーブルの AUTO_INCREMENT `w_notices`
--
ALTER TABLE `w_notices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_pre_companies`
--
ALTER TABLE `w_pre_companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルの AUTO_INCREMENT `w_pre_users`
--
ALTER TABLE `w_pre_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルの AUTO_INCREMENT `w_tags`
--
ALTER TABLE `w_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `w_works`
--
ALTER TABLE `w_works`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `w_tags`
--
ALTER TABLE `w_tags`
  ADD CONSTRAINT `w_tags_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `w_items` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
