CREATE DATABASE itsdatabase


/* USER'S TABLE */
CREATE TABLE users (
    id int PRIMARY KEY AUTO_INCREMENT not null,
    name varchar(50),
    last_name varchar(50),
    cuil int(20),
    dir varchar(200),
    email varchar(50),
    phone varchar(50),
    username varchar(50),
    pass varchar(200),
    role varchar(20)
)

