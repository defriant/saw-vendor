-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Jun 2022 pada 16.10
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saw_vendor`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `asset`
--

CREATE TABLE `asset` (
  `id` bigint(20) NOT NULL,
  `periode` varchar(10) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `barang` varchar(255) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `asset`
--

INSERT INTO `asset` (`id`, `periode`, `semester`, `barang`, `jumlah`, `status`, `created_at`, `updated_at`) VALUES
(7, '2022', 'Ganjil', 'Komputer', 5, 'diterima', '2022-06-12 00:43:47', '2022-06-12 00:43:47'),
(8, '2022', 'Ganjil', 'Printer', 2, 'diterima', '2022-06-12 00:43:55', '2022-06-12 00:43:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `karyawan`
--

CREATE TABLE `karyawan` (
  `id` varchar(5) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(15) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `karyawan`
--

INSERT INTO `karyawan` (`id`, `nama`, `jenis_kelamin`, `tgl_lahir`, `alamat`, `created_at`, `updated_at`) VALUES
('K6241', 'test', 'Laki-laki', '2022-06-11', 'test', '2022-06-11 15:58:29', '2022-06-11 15:58:29'),
('K6651', 'afif', 'Laki-laki', '2022-06-11', 'asd', '2022-06-11 14:19:46', '2022-06-11 14:19:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kriteria`
--

CREATE TABLE `kriteria` (
  `id` varchar(5) NOT NULL,
  `periode` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `bobot` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kriteria`
--

INSERT INTO `kriteria` (`id`, `periode`, `semester`, `nama`, `bobot`, `created_at`, `updated_at`) VALUES
('12BWB', '2022', 'Ganjil', 'Harga', 5, '2022-06-12 00:45:04', '2022-06-12 00:45:04'),
('2MFVC', '2022', 'Ganjil', 'Kualitas', 8, '2022-06-12 00:45:10', '2022-06-12 00:45:10'),
('3Z6A9', '2022', 'Ganjil', 'Diskon', 5, '2022-06-12 00:45:17', '2022-06-12 00:45:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `n_kriteria`
--

CREATE TABLE `n_kriteria` (
  `id` varchar(5) NOT NULL,
  `periode` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `bobot` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `n_kriteria`
--

INSERT INTO `n_kriteria` (`id`, `periode`, `semester`, `nama`, `bobot`, `created_at`, `updated_at`) VALUES
('12BWB', '2022', 'Ganjil', 'Harga', '0.28', '2022-06-12 01:09:36', '2022-06-12 01:09:36'),
('2MFVC', '2022', 'Ganjil', 'Kualitas', '0.44', '2022-06-12 01:09:36', '2022-06-12 01:09:36'),
('3Z6A9', '2022', 'Ganjil', 'Diskon', '0.28', '2022-06-12 01:09:36', '2022-06-12 01:09:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `n_penilaian`
--

CREATE TABLE `n_penilaian` (
  `id` bigint(20) NOT NULL,
  `periode` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `id_vendor` bigint(20) NOT NULL,
  `id_kriteria` varchar(10) NOT NULL,
  `nilai` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `n_penilaian`
--

INSERT INTO `n_penilaian` (`id`, `periode`, `semester`, `id_vendor`, `id_kriteria`, `nilai`, `created_at`, `updated_at`) VALUES
(1, '2022', 'Ganjil', 13, '12BWB', '0.75', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(2, '2022', 'Ganjil', 13, '2MFVC', '0.80', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(3, '2022', 'Ganjil', 13, '3Z6A9', '0.33', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(4, '2022', 'Ganjil', 13, '47HWW', '1.00', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(5, '2022', 'Ganjil', 14, '12BWB', '1.00', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(6, '2022', 'Ganjil', 14, '2MFVC', '0.60', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(7, '2022', 'Ganjil', 14, '3Z6A9', '0.33', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(8, '2022', 'Ganjil', 14, '47HWW', '0.67', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(9, '2022', 'Ganjil', 15, '12BWB', '0.50', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(10, '2022', 'Ganjil', 15, '2MFVC', '1.00', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(11, '2022', 'Ganjil', 15, '3Z6A9', '1.00', '2022-06-12 00:59:55', '2022-06-12 00:59:55'),
(12, '2022', 'Ganjil', 15, '47HWW', '0.67', '2022-06-12 00:59:55', '2022-06-12 00:59:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penilaian`
--

CREATE TABLE `penilaian` (
  `id` bigint(20) NOT NULL,
  `periode` varchar(20) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `id_vendor` bigint(20) NOT NULL,
  `id_kriteria` varchar(10) NOT NULL,
  `nilai` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `penilaian`
--

INSERT INTO `penilaian` (`id`, `periode`, `semester`, `id_vendor`, `id_kriteria`, `nilai`, `created_at`, `updated_at`) VALUES
(462, '2022', 'Ganjil', 13, '12BWB', '3', '2022-06-12 00:58:25', '2022-06-12 00:58:56'),
(463, '2022', 'Ganjil', 13, '2MFVC', '4', '2022-06-12 00:58:25', '2022-06-12 00:58:56'),
(464, '2022', 'Ganjil', 13, '3Z6A9', '1', '2022-06-12 00:58:25', '2022-06-12 00:58:56'),
(466, '2022', 'Ganjil', 14, '12BWB', '4', '2022-06-12 00:59:12', '2022-06-12 00:59:39'),
(467, '2022', 'Ganjil', 14, '2MFVC', '3', '2022-06-12 00:59:12', '2022-06-12 00:59:39'),
(468, '2022', 'Ganjil', 14, '3Z6A9', '1', '2022-06-12 00:59:12', '2022-06-12 00:59:39'),
(470, '2022', 'Ganjil', 15, '12BWB', '2', '2022-06-12 00:59:17', '2022-06-12 00:59:55'),
(471, '2022', 'Ganjil', 15, '2MFVC', '5', '2022-06-12 00:59:17', '2022-06-12 00:59:55'),
(472, '2022', 'Ganjil', 15, '3Z6A9', '3', '2022-06-12 00:59:17', '2022-06-12 00:59:55');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_kriteria`
--

CREATE TABLE `sub_kriteria` (
  `id` varchar(5) NOT NULL,
  `id_kriteria` varchar(50) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sub_kriteria`
--

INSERT INTO `sub_kriteria` (`id`, `id_kriteria`, `nama`, `nilai`, `created_at`, `updated_at`) VALUES
('1ND3R', '12BWB', 'Sangat Mahal', 1, '2022-06-12 00:45:47', '2022-06-12 00:45:47'),
('1U6D5', '3Z6A9', '21% - 30%', 3, '2022-06-12 00:50:50', '2022-06-12 00:50:50'),
('26C56', '12BWB', 'Mahal', 2, '2022-06-12 00:45:51', '2022-06-12 00:45:51'),
('3HXHB', '12BWB', 'Cukup Murah', 3, '2022-06-12 00:46:05', '2022-06-12 00:46:05'),
('4LFNT', '12BWB', 'Murah', 4, '2022-06-12 00:46:15', '2022-06-12 00:46:15'),
('53GYC', '12BWB', 'Sangat Murah', 5, '2022-06-12 00:46:26', '2022-06-12 00:46:26'),
('65KK6', '2MFVC', 'Sangat Buruk', 1, '2022-06-12 00:46:46', '2022-06-12 00:46:46'),
('76AN1', '2MFVC', 'Buruk', 2, '2022-06-12 00:46:51', '2022-06-12 00:46:51'),
('8N8P7', '2MFVC', 'Cukup', 3, '2022-06-12 00:46:57', '2022-06-12 00:46:57'),
('9EK31', '2MFVC', 'Baik', 4, '2022-06-12 00:47:01', '2022-06-12 00:49:57'),
('B8KYF', '3Z6A9', '0% - 10%', 1, '2022-06-12 00:50:28', '2022-06-12 00:50:28'),
('R61TA', '2MFVC', 'Sangat Baik', 5, '2022-06-12 00:49:46', '2022-06-12 00:49:46'),
('W7PPZ', '3Z6A9', '11% - 20%', 2, '2022-06-12 00:50:41', '2022-06-12 00:50:41'),
('XFF8X', '3Z6A9', '31% - 40%', 4, '2022-06-12 00:50:58', '2022-06-12 00:50:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin', NULL, '$2y$10$sQqRoWMPBqXxILIZn3sWUuKczpfEyuJYvVugviSU8nVDrR07nNFKe', 'admin', NULL, '2021-12-30 12:12:52', '2021-12-30 12:12:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vendor`
--

CREATE TABLE `vendor` (
  `id` bigint(20) NOT NULL,
  `periode` varchar(10) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vendor`
--

INSERT INTO `vendor` (`id`, `periode`, `semester`, `nama`, `created_at`, `updated_at`) VALUES
(13, '2022', 'Ganjil', 'PT ABC', '2022-06-12 00:58:25', '2022-06-12 00:58:25'),
(14, '2022', 'Ganjil', 'PT QWERTY', '2022-06-12 00:59:12', '2022-06-12 00:59:12'),
(15, '2022', 'Ganjil', 'PT ZXC', '2022-06-12 00:59:17', '2022-06-12 00:59:17');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `asset`
--
ALTER TABLE `asset`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `n_kriteria`
--
ALTER TABLE `n_kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `n_penilaian`
--
ALTER TABLE `n_penilaian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_kriteria`
--
ALTER TABLE `sub_kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`username`);

--
-- Indeks untuk tabel `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `asset`
--
ALTER TABLE `asset`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=474;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
