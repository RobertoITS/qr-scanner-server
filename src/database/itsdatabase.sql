-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2023 a las 01:32:48
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `itsdatabase`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `attendance`
--

CREATE TABLE `attendance` (
  `id` bigint(200) NOT NULL,
  `attendance_date` varchar(50) DEFAULT NULL,
  `professor_id` int(10) DEFAULT NULL,
  `materia_id` int(10) DEFAULT NULL,
  `schedule_id` int(10) DEFAULT NULL,
  `classes_quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `attendance`
--

INSERT INTO `attendance` (`id`, `attendance_date`, `professor_id`, `materia_id`, `schedule_id`, `classes_quantity`) VALUES
(2, '15/04/2023', 2, 1, 21, 1),
(3, '16/05/2023', 2, 1, 21, 2),
(4, '15/04/2023', 4, 3, 22, 1),
(5, '20/04/2023', 4, 3, 22, 2),
(6, '20/04/2023', 4, 3, 22, 3),
(7, '20/04/2023', 4, 3, 22, 4),
(8, '20/04/2023', 4, 3, 22, 5),
(2147483647, '03/04/2023', 2, 3, 21, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `career`
--

CREATE TABLE `career` (
  `id` int(10) NOT NULL,
  `career_name` varchar(200) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `duration` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `career`
--

INSERT INTO `career` (`id`, `career_name`, `description`, `duration`) VALUES
(1, 'Tecnico Superior en Desarrollo de Software', 'Programador Full Stack', '3 años'),
(2, 'Prueba', 'Prueba', '3'),
(3, 'prueba 2', 'prueba', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `career_contains_materia`
--

CREATE TABLE `career_contains_materia` (
  `id` int(10) NOT NULL,
  `materia_id` int(10) DEFAULT NULL,
  `career_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `career_contains_materia`
--

INSERT INTO `career_contains_materia` (`id`, `materia_id`, `career_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscriptions`
--

CREATE TABLE `inscriptions` (
  `id` int(50) NOT NULL,
  `student_id` int(10) DEFAULT NULL,
  `materia_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscriptions`
--

INSERT INTO `inscriptions` (`id`, `student_id`, `materia_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(5, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id` int(10) NOT NULL,
  `materia_name` varchar(200) DEFAULT NULL,
  `professor_id` int(10) DEFAULT NULL,
  `actual_year` varchar(50) DEFAULT NULL,
  `classes_quantity` int(50) DEFAULT NULL,
  `career_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `materia_name`, `professor_id`, `actual_year`, `classes_quantity`, `career_id`) VALUES
(1, 'Programacion I', 2, '2023', 20, 1),
(2, 'Matematica I', 2, '2023', 20, 1),
(3, 'Ingles I', 2, '2023', 20, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_has_schedules`
--

CREATE TABLE `materia_has_schedules` (
  `id` int(10) NOT NULL,
  `materia_id` int(10) DEFAULT NULL,
  `schedule_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia_has_schedules`
--

INSERT INTO `materia_has_schedules` (`id`, `materia_id`, `schedule_id`) VALUES
(1, 1, 21),
(2, 2, 11),
(3, 3, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedules`
--

CREATE TABLE `schedules` (
  `id` int(10) NOT NULL,
  `class_day` varchar(20) DEFAULT NULL,
  `class_schedule` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `schedules`
--

INSERT INTO `schedules` (`id`, `class_day`, `class_schedule`) VALUES
(11, 'Lunes', '21:00 a 23:00'),
(21, 'Lunes', '19:00 a 21:00'),
(22, 'Martes', '19:00 a 21:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `cuil` varchar(50) DEFAULT NULL,
  `dir` varchar(100) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `birthdate` varchar(20) DEFAULT NULL,
  `age` int(20) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `file_number` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `last_name`, `name`, `cuil`, `dir`, `phone_number`, `birthdate`, `age`, `email`, `user_name`, `pass`, `role`, `file_number`) VALUES
(1, 'Aqueveque', 'Roberto', '20348605144', 'Lago Guillelmo 1025', '2994582194', '27/11/1989', 32, 'roberto27111989@gmail.com', 'alumno1', '$2a$08$wbhstZKo.1sAvmHnBR8y7.bKjzmjuzmROryL6Z1le9I/QasKvV88O', 'STUDENT', 'xxx'),
(2, 'Orellana', 'Matias', '20340000004', 'AV. Allem 204', '2994500000', '27/11/1989', 32, 'matias@gmail.com', 'profe1', '123456', 'TEACHER', 'xxx'),
(3, 'Carrillo', 'Javier', '20340000004', 'AV. Naciones Unidas 204', '2994500000', '27/11/1989', 32, 'javier@gmail.com', 'profe2', '$2a$08$wbhstZKo.1sAvmHnBR8y7.bKjzmjuzmROryL6Z1le9I/QasKvV88O', 'TEACHER', 'xxx'),
(4, 'Vagnoni', 'Yanina', '20340000004', 'Bolivia 204', '2994500000', '27/11/1989', 32, 'yani@gmail.com', 'profe3', '123456', 'TEACHER', 'xxx'),
(5, 'O\'Connor', 'Mathias', '23000000007', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'suser1', '$2a$08$fIOi6YyDduSomO8nNkjqs.6t2ocvwOGahlz/UHUd/xyW3igaoduMO', 'SUSER', '123'),
(6, 'Prueba', 'Super User', '23000000007', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'suser', '$2a$08$wbhstZKo.1sAvmHnBR8y7.bKjzmjuzmROryL6Z1le9I/QasKvV88O', 'SUSER', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_register_attendance`
--

CREATE TABLE `user_register_attendance` (
  `id` int(50) NOT NULL,
  `student_id` int(50) DEFAULT NULL,
  `attendance_id` bigint(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_register_attendance`
--

INSERT INTO `user_register_attendance` (`id`, `student_id`, `attendance_id`) VALUES
(2, 1, 2),
(5, 1, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor_id` (`professor_id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indices de la tabla `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `career_contains_materia`
--
ALTER TABLE `career_contains_materia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `career_id` (`career_id`);

--
-- Indices de la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `materia_id` (`materia_id`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `career_id` (`career_id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Indices de la tabla `materia_has_schedules`
--
ALTER TABLE `materia_has_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_id` (`materia_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indices de la tabla `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_register_attendance`
--
ALTER TABLE `user_register_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `attendance_id` (`attendance_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `career`
--
ALTER TABLE `career`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `career_contains_materia`
--
ALTER TABLE `career_contains_materia`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materia_has_schedules`
--
ALTER TABLE `materia_has_schedules`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user_register_attendance`
--
ALTER TABLE `user_register_attendance`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`);

--
-- Filtros para la tabla `career_contains_materia`
--
ALTER TABLE `career_contains_materia`
  ADD CONSTRAINT `career_contains_materia_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `career_contains_materia_ibfk_2` FOREIGN KEY (`career_id`) REFERENCES `career` (`id`);

--
-- Filtros para la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  ADD CONSTRAINT `inscriptions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `inscriptions_ibfk_2` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`);

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`career_id`) REFERENCES `career` (`id`),
  ADD CONSTRAINT `materia_ibfk_2` FOREIGN KEY (`professor_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `materia_has_schedules`
--
ALTER TABLE `materia_has_schedules`
  ADD CONSTRAINT `materia_has_schedules_ibfk_1` FOREIGN KEY (`materia_id`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `materia_has_schedules_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`);

--
-- Filtros para la tabla `user_register_attendance`
--
ALTER TABLE `user_register_attendance`
  ADD CONSTRAINT `user_register_attendance_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_register_attendance_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
