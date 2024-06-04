-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 21, 2024 lúc 06:10 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `weshare`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_posts` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id_comment`, `id_user`, `id_posts`, `content`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'Đừng buồn nữa vui lên bạn', '2024-04-03', '0000-00-00'),
(2, 3, 1, 'Sao buồn z bn', '2024-04-11', '0000-00-00'),
(3, 2, 1, 'Vui lên bn', '2024-04-28', NULL),
(8, 4, 2, 'Hình đẹp', '2024-05-04', '2024-05-04'),
(9, 4, 1, 'ưedwdw', '2024-05-06', '2024-05-06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `friendships`
--

CREATE TABLE `friendships` (
  `id_friendship` int(11) NOT NULL,
  `id_user1` int(11) NOT NULL,
  `id_user2` int(11) NOT NULL,
  `status` tinyint(3) NOT NULL DEFAULT 0 COMMENT '0.Đang Chờ\r\n1.Đã Chấp Nhận\r\n2.Đã Chặn',
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `friendships`
--

INSERT INTO `friendships` (`id_friendship`, `id_user1`, `id_user2`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 5, 1, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_posts` int(11) NOT NULL,
  `id_comment` int(11) NOT NULL DEFAULT 0,
  `id_user` int(11) NOT NULL,
  `likes` int(10) NOT NULL DEFAULT 0,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `likes`
--

INSERT INTO `likes` (`id_like`, `id_posts`, `id_comment`, `id_user`, `likes`, `created_at`) VALUES
(79, 3, 0, 4, 0, '2024-05-04'),
(83, 2, 0, 4, 0, '2024-05-06'),
(92, 1, 0, 5, 0, '2024-05-14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id_message` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `id_receiver` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `status` tinyint(3) NOT NULL DEFAULT 0 COMMENT '0.Đã Xem\r\n1.Đã Gửi\r\n2.Đã Nhận',
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id_notification` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_relate` int(11) NOT NULL,
  `content` varchar(100) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id_posts` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id_posts`, `id_user`, `content`, `image`, `created_at`, `updated_at`) VALUES
(1, 5, 'Hôm Nay Tui Buồn', '', '2009-04-08 07:29:11', '2024-04-18 21:51:02'),
(2, 4, 'Chủ Nhật Xuất Phát', 'pexels-kamp-ve-enduro-15160621.jpg', '2009-04-24 08:34:11', '2024-04-27 21:51:27'),
(3, 4, 'Nghỉ 3 tuần về quê chơi rất thoải mái', 'pexels-kamp-ve-enduro-15160621.jpg', '2024-04-28 13:22:12', '2024-04-28 13:41:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `gender` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0.Trai\r\n1.Gái\r\n2.Khác',
  `picture_url` varchar(100) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `role` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0.User\r\n1.Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id_user`, `username`, `password_hash`, `email`, `full_name`, `birthday`, `gender`, `picture_url`, `created_at`, `updated_at`, `role`) VALUES
(2, 'teo456', '456789', 'teo@gmail.com', 'Trần Văn Tèo', '1998-05-19', 0, 'profile-3.jpg', '2009-04-09', '2009-04-09', 0),
(3, 'meo', 'meo123', 'meo@gmail.com', 'Mèo Meo Meo', '2002-01-01', 1, 'profile-4.jpg', '2012-11-09', '2012-11-09', 0),
(4, 'titran1234', '$2b$10$DgHvQQKLt9xdqvLPbxU7b.JLU4UKI1ZJXCZdusfZESaghlScF/Tfq', 'titran@gmail.com', 'Trần Văn Tí', '1999-04-09', 0, 'profile-2.jpg', '2024-04-27', '2024-04-27', 0),
(5, 'Mhoang123', '$2b$10$fWeXIK9O3M8MF7eaoWJMa.XPZt33aFU79uw1eL5ZZZHZmWJwR2sFW', '', 'HMH', '2001-12-09', 0, NULL, '2024-05-01', '2024-05-01', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `fk_comment_user` (`id_user`),
  ADD KEY `fk_comment_posts` (`id_posts`);

--
-- Chỉ mục cho bảng `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id_friendship`),
  ADD KEY `fk_friendship_user1` (`id_user1`),
  ADD KEY `fk_friendship_user2` (`id_user2`);

--
-- Chỉ mục cho bảng `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `fk_like_posts` (`id_posts`),
  ADD KEY `fk_like_user` (`id_user`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `fk_message_userSender` (`id_sender`),
  ADD KEY `fk_message_userReceiver` (`id_receiver`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id_notification`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id_posts`),
  ADD KEY `fk_posts_users` (`id_user`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `friendships`
--
ALTER TABLE `friendships`
  MODIFY `id_friendship` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id_notification` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id_posts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comment_posts` FOREIGN KEY (`id_posts`) REFERENCES `posts` (`id_posts`),
  ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Các ràng buộc cho bảng `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `fk_friendship_user1` FOREIGN KEY (`id_user1`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `fk_friendship_user2` FOREIGN KEY (`id_user2`) REFERENCES `users` (`id_user`);

--
-- Các ràng buộc cho bảng `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_like_posts` FOREIGN KEY (`id_posts`) REFERENCES `posts` (`id_posts`),
  ADD CONSTRAINT `fk_like_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Các ràng buộc cho bảng `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_message_userReceiver` FOREIGN KEY (`id_receiver`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `fk_message_userSender` FOREIGN KEY (`id_sender`) REFERENCES `users` (`id_user`);

--
-- Các ràng buộc cho bảng `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
