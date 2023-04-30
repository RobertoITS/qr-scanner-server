CREATE DATABASE itsdatabase


/* USER'S TABLE */
/*
* ROLE = [STUDENT, TEACHER, ADMIN, SUSER]
! Finish
*/
CREATE TABLE users (
	id int(50) PRIMARY KEY NOT null AUTO_INCREMENT,
    last_name varchar(50),
    name varchar(50),
    cuil varchar(50),
    dir varchar(100),
    phone_number varchar(50),
    birthdate varchar(20),
    age int(20),
    email varchar(200),
    user_name varchar(200),
    pass varchar(200),
    role varchar(20),
    file_number varchar(200)
)

INSERT INTO users(age, birthdate, cuil, dir, email, file_number, last_name, name, pass, phone_number, role, user_name) VALUES(
        32, '27/11/1989', '20348605144', 'Lago Guillelmo 1025', 'roberto27111989@gmail.com', 'xxx', 'Aqueveque', 'Roberto', '123456', '2994582194', 'STUDENT', 'alumno1'
    )

INSERT INTO users(age, birthdate, cuil, dir, email, file_number, last_name, name, pass, phone_number, role, user_name) VALUES(
        (32, '27/11/1989', '20340000004', 'AV. Allem 204', 'matias@gmail.com', 'xxx', 'Orellana', 'Matias', '123456', '2994500000', 'TEACHER', 'profe1')
        (32, '27/11/1989', '20340000004', 'AV. Naciones Unidas 204', 'matias@gmail.com', 'xxx', 'Carrillo', 'Javier', '123456', '2994500000', 'TEACHER', 'profe2')
        (32, '27/11/1989', '20340000004', 'Bolivia 204', 'matias@gmail.com', 'xxx', 'Vagnoni', 'Yanina', '123456', '2994500000', 'TEACHER', 'profe3')
    )

/* CAREER'S TABLE
! Finish
*/
CREATE TABLE career (
	id int(10) PRIMARY KEY NOT null AUTO_INCREMENT,
    career_name varchar(200),
    description varchar(500),
    duration varchar(200)
)

INSERT INTO career(description, duration, career_name) VALUES(
	'Programador Full Stack', '3 años', 'Tecnico Superior en Desarrollo de Software'
)

/* MATERIA'S TABLE 
* ONE MATERIA HAS A ONLY PROFESSOR
! RELATIONAL TABLE
!Finish
*/
CREATE TABLE materia(
	id int(10) PRIMARY key not null AUTO_INCREMENT,
    materia_name varchar(200),
    professor_id int(10),
    actual_year varchar(50),
    classes_quantity int(50),
    total_classes int(50),
    career_id int(10),
    FOREIGN KEY (career_id) REFERENCES career(id),
    FOREIGN KEY (professor_id) REFERENCES users(id)
)

INSERT INTO materia(actual_year, career_id, classes_quantity, materia_name, professor_id) VALUES
	('2023', 1, 20, 'Programacion I', 2), 
    ('2023', 1, 20, 'Matematica I', 3), 
    ('2023', 1, 20, 'Ingles I', 4)


/* SCHEDULES'S TABLE 
! Finish
*/
CREATE TABLE schedules (
	id int(10) PRIMARY key not null,
    class_day varchar(20),
    class_schedule varchar(20)
)

INSERT INTO schedules(id, class_day, class_schedule) VALUES
    (21 ,'Lunes', '19:00 a 21:00'),
    (11, 'Lunes', '21:00 a 23:00'),
    (22, 'Martes', '19:00 a 21:00')

/* ATTENDANCE'S TABLE 
* INFORMATION GENERATED BY THE QR
! RELATIONAL TABLE
la materia tiene sus horarios, lo mejor seria colocar eso
para usar: un droplist que muestre las materias del profesor
al hacer click sobre la materia, consultar la tabla materia_has_schedules, que
contiene los horarios de la materia.
con esa info, hacer el qr (el qr tiene que tener el dia)
hacer un timestamp desde el front
! todos estos datos se pueden conseguir
QR generado:
{id: id, day: attendance_day, professor: professor_name, last_name: professor_last_name,materia: materia_name}
! Finish
*/
CREATE TABLE attendance (
	id int(50) PRIMARY key not null,
    attendance_date varchar(50),
    professor_id int(10),
    materia_id int(10),
    schedule_id int(10),
    FOREIGN KEY (professor_id) REFERENCES users(id),
    FOREIGN KEY (materia_id) REFERENCES materia(id),
    FOREIGN KEY (schedule_id) REFERENCES schedules(id)
)

INSERT INTO attendance(attendance_date, materia_id, professor_id, schedule_id) VALUES(
	'15/04/2023', 1, 2, 21
)

/*
? TENER EN CUENTA QUE LOS PROFESORES SE BUSCAN EN LAS MATERIAS (nombre y apellido),
? Y LOS ALUMNOS SE BUSCAN EN LAS INSCRIPCIONES (nombre y apellido)
*/

/*
! --------------------------- RELATIONAL TABLES ---------------------------
*/

/* STUDENTS (USERS) ENROLL IN MATERIA 
! Finish
*/
CREATE TABLE inscriptions (
	id int(50) PRIMARY KEY not null AUTO_INCREMENT,
    student_id int(10),
    materia_id int(10),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (materia_id) REFERENCES materia(id)
)

INSERT INTO inscriptions(materia_id, student_id) VALUES
    (1, 1),
    (2, 1),
    (3, 1)

/* CAREER CONTAINS MATERIA 
! Finish
! SEE IF IT NEEDS TO BE USED
CREATE TABLE career_contains_materia (
	id int(10) PRIMARY KEY not null AUTO_INCREMENT,
    materia_id int(10),
    career_id int(10),
    FOREIGN KEY (materia_id) REFERENCES materia(id),
    FOREIGN KEY (career_id) REFERENCES career(id)
)

INSERT INTO career_contains_materia(career_id, materia_id) VALUES
	(1, 1),
    (1, 2),
    (1, 3)
*/

/* MATERIA HAS SCHEDULES 
! Finish
*/
CREATE TABLE materia_has_schedules (
	id int(10) PRIMARY KEY not null AUTO_INCREMENT,
    materia_id int(10),
    schedule_id int(10),
    FOREIGN KEY (materia_id) REFERENCES materia(id),
    FOREIGN KEY (schedule_id) REFERENCES schedules(id)
)

INSERT INTO materia_has_schedules(materia_id, schedule_id) VALUES
    (1, 21),
    (2, 11),
    (3, 22)

/* SCHEDULE REGISTER ATTENDANCES 
TODO Ver si realmente se necesita registrar el horario con la asistencia! (en la tabla attendance ya se hace eso)
*/
CREATE TABLE schedule_register_attendance (
	id int(50) PRIMARY KEY not null AUTO_INCREMENT,
    schedule_id int(10),
    attendance_id int(50),
    FOREIGN KEY (schedule_id) REFERENCES schedule(id),
    FOREIGN KEY (attendance_id) REFERENCES attendance(id)
)

/* USERS REGISTER ATTENDANCE */
CREATE TABLE user_register_attendance (
	id bigint(50) PRIMARY KEY not null,
    student_id int(50),
    attendance_id bigint(50),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (attendance_id) REFERENCES attendance(id)
)

INSERT INTO user_register_attendance(attendance_id, student_id) VALUES(
	2, 1
)

/*
! SOME SQL QUERIES
*/

'select * from career C
inner join materia M
on C.id = M.career_id
order by C.id'



OBTERNER TODAS LAS ASISTENCIAS DEL ALUMNO 
SELECT a.id AS attendance_id, 
    career_id, 
    a.professor_id, 
    ura.student_id, 
    a.materia_id, 
    attendance_date, 
    materia_name, 
    actual_year, 
    m.classes_quantity, 
    u.name AS professor, 
    u.last_name AS professor_last_name, 
    c.career_name 
FROM attendance a
INNER JOIN materia m ON a.materia_id = m.id
INNER JOIN career c ON m.career_id = c.id
INNER JOIN users u ON m.professor_id = u.id
INNER JOIN user_register_attendance ura ON ura.attendance_id = a.id
INNER JOIN inscriptions i ON ura.student_id = i.student_id AND m.id = i.materia_id
WHERE ura.student_id = 1 AND attendance_date LIKE '%24' ---------------> esta clausula es para filtrar por años
ORDER BY materia_name

SELECT 
    A.id AS attendance_id, 
    career_id, 
    A.professor_id, 
    URA.student_id, 
    A.materia_id, 
    attendance_date, 
    materia_name, 
    actual_year, 
    M.classes_quantity AS total_classes,
    A.classes_quantity,
    U.name AS professor,
    U.last_name AS professor_last_name,
    C.career_name 
FROM attendance A
INNER JOIN materia M ON A.materia_id = M.id
INNER JOIN career C ON M.career_id = C.id
INNER JOIN users U ON M.professor_id = U.id
INNER JOIN user_register_attendance URA ON URA.attendance_id = A.id
INNER JOIN inscriptions I ON URA.student_id = I.student_id AND M.id = I.materia_id
WHERE URA.student_id = ? AND attendance_date LIKE ? AND M.id = ?

ESTA ES UNA VARIACION, PODEMOS OBTENER MATERIA POR MATERIA, PERO SERIAN VARIAS CONSULTAS,
DEPENDIENDO DE LA CANTIDAD DE MATERIAS A LA QUE ESTE INSCRIPTO
SELECT A.id AS attendance_id, 
    career_id, 
    A.professor_id, 
    URA.student_id, 
    A.materia_id, 
    attendance_date, 
    materia_name, 
    actual_year, 
    M.classes_quantity AS total_classes,
    A.classes_quantity,
    U.name AS professor,
    U.last_name AS professor_last_name,
    C.career_name 
FROM attendance A
INNER JOIN materia M ON A.materia_id = M.id
INNER JOIN career C ON M.career_id = C.id
INNER JOIN users U ON M.professor_id = U.id
INNER JOIN user_register_attendance URA ON URA.attendance_id = A.id
INNER JOIN inscriptions I ON ura.student_id = I.student_id AND M.id = I.materia_id
WHERE URA.student_id = 1 AND attendance_date LIKE '%23' AND M.id = 1


SELECT * FROM users U
INNER JOIN inscriptions I ON U.id = I.student_id
INNER JOIN materia M ON I.materia_id = M.id
INNER JOIN users P ON M.professor_id = P.id
WHERE M.professor_id = 2

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2023 a las 16:42:10
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
  `id` bigint(50) NOT NULL,
  `attendance_date` varchar(50) DEFAULT NULL,
  `professor_id` int(10) DEFAULT NULL,
  `materia_id` int(10) DEFAULT NULL,
  `schedule_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `attendance`
--

INSERT INTO `attendance` (`id`, `attendance_date`, `professor_id`, `materia_id`, `schedule_id`) VALUES
(10520232111, '01/05/2023', 2, 1, 11),
(20520232111, '02/05/2023', 2, 1, 11),
(20520233211, '02/05/2023', 3, 2, 11),
(30520233211, '03/05/2023', 3, 2, 11),
(300420232111, '30/04/2023', 2, 1, 11);

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
(1, 'TSDS', 'Tecnico Superior en Desarrollo de Software', '3 años'),
(2, 'SysAdmin', 'IT', '3 años'),
(3, 'TSDS Full Stack', 'Tecnico Superior en Desarrollo de Software Full Stack', '3 años');

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
(2, 1, 2);

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
  `total_classes` int(50) DEFAULT NULL,
  `career_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `materia_name`, `professor_id`, `actual_year`, `classes_quantity`, `total_classes`, `career_id`) VALUES
(1, 'Programacion I', 2, '2023', 3, 20, 1),
(2, 'Matematica I', 3, '2023', 2, 20, 1),
(3, 'Ingles Tecnico I', 3, '2023', NULL, 20, 1);

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
(1, 1, 11),
(2, 2, 12);

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
(11, 'Monday', '19:00 pm to 21:00 pm'),
(12, 'Monday', '21:00 pm to 23:00 pm');

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
(1, 'Orellana', 'Matias', '0', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'alumno1', '$2a$08$U7ZLOOGEVuzkIZHjRS0TuO9HrbINOTP5izKLvQf0dGMQQIhgm/qiy', 'STUDENT', '123'),
(2, 'Carrillo', 'Javier', '0', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'profe1', '$2a$08$vwzrmhlmD7pQRB8euWNhc.Um9rxDWGwOo7gLMu8TWfKDgAw3jrR.2', 'TEACHER', '123'),
(3, 'Vagnoni', 'Yanina', '0', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'profe2', '$2a$08$tvvnwyRYgN0jISWmJEKA8etwHOXjE8j278u/3oXlz8T/t16ZrUYIe', 'TEACHER', '123'),
(4, 'Aqueveque', 'Roberto', '0', 'St. Anger 204', '+54 299 154054054', '01/01/1990', 32, 'mail@mail.com', 'suser', '$2a$08$804iMWQhkUHQPK6c4HjRNu0pyrhPMS2DeSzietvaFfJK/Z/9Ixobu', 'SUSER', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_register_attendance`
--

CREATE TABLE `user_register_attendance` (
  `id` bigint(50) NOT NULL,
  `student_id` int(50) DEFAULT NULL,
  `attendance_id` bigint(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_register_attendance`
--

INSERT INTO `user_register_attendance` (`id`, `student_id`, `attendance_id`) VALUES
(105202321111, 1, 10520232111),
(205202321111, 1, 20520232111),
(205202332111, 1, 20520233211),
(3004202321111, 1, 300420232111);

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
-- AUTO_INCREMENT de la tabla `inscriptions`
--
ALTER TABLE `inscriptions`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materia_has_schedules`
--
ALTER TABLE `materia_has_schedules`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
