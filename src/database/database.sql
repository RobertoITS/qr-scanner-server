CREATE DATABASE itsdatabase


/* USER'S TABLE */
/**
* ROLE = [STUDENT, TEACHER, ADMIN, SUSER]
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

/* CAREER'S TABLE */
CREATE TABLE career (
	id int(10) PRIMARY KEY NOT null AUTO_INCREMENT,
    name varchar(200),
    description varchar(500),
    duration varchar(200)
)

/* MATERIA'S TABLE 
* ONE MATERIA HAS A ONLY PROFESSOR
! RELATIONAL TABLE
*/
CREATE TABLE materia(
	id int(10) PRIMARY key not null AUTO_INCREMENT,
    name varchar(200),
    professor_id int(10),
    actual_year varchar(50),
    classes_quantity int(50),
    career_id int(10),
    FOREIGN KEY (career_id) REFERENCES career(id),
    FOREIGN KEY (professor_id) REFERENCES users(id)
)

/* SCHEDULES'S TABLE */
CREATE TABLE schedules (
	id int(10) PRIMARY key not null,
    class_day varchar(20),
    class_schedule varchar(20)
)

/* ATTENDANCE'S TABLE 
* INFORMATION GENERATED BY THE QR
! RELATIONAL TABLE
*/
CREATE TABLE attendance (
	id int(50) PRIMARY key not null AUTO_INCREMENT,
    attendance_date varchar(50),
    attendance_day varchar(50),
    attendance_hour varchar(50),
    professor_id int(10),
    materia_id int(10),
    FOREIGN KEY (professor_id) REFERENCES users(id),
    FOREIGN KEY (materia_id) REFERENCES materia(id)
)

/*
! --------------------------- RELATIONAL TABLES ---------------------------
*/

/* STUDENTS (USERS) ENROLL IN MATERIA */
CREATE TABLE inscriptions (
	id int(50) PRIMARY KEY not null AUTO_INCREMENT,
    student_id int(10),
    materia_id int(10),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (materia_id) REFERENCES materia(id)
)

/* CAREER CONTAINS MATERIA */
CREATE TABLE career_contains (
	id int(10) PRIMARY KEY not null AUTO_INCREMENT,
    materia_id int(10),
    career_id int(10),
    FOREIGN KEY (materia_id) REFERENCES materia(id),
    FOREIGN KEY (career_id) REFERENCES career(id)
)

/* MATERIA HAS COMMISSIONS */
CREATE TABLE materia_has_commissions (
	id int(10) PRIMARY KEY not null AUTO_INCREMENT,
    materia_id int(10),
    commission_id int(10),
    FOREIGN KEY (materia_id) REFERENCES materia(id),
    FOREIGN KEY (commission_id) REFERENCES commission(id)
)

/* COMMISSIONS REGISTER ATTENDANCES */
CREATE TABLE commission_register_attendance (
	id int(50) PRIMARY KEY not null AUTO_INCREMENT,
    commission_id int(10),
    attendance_id int(50),
    FOREIGN KEY (commission_id) REFERENCES commission(id),
    FOREIGN KEY (attendance_id) REFERENCES attendance(id)
)

/* USERS REGISTER ATTENDANCE */
CREATE TABLE user_register_attendance (
	id int(50) PRIMARY KEY not null AUTO_INCREMENT,
    student_id int(50),
    attendance_id int(50),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (attendance_id) REFERENCES attendance(id)
)


/*
! SOME SQL QUERIES
*/

'select * from career C
inner join materia M
on C.id = M.career_id
order by C.id'