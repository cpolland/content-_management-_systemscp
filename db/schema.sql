DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   department_name: VARCHAR(30) NOT NULL


);

CREATE TABLE roll (
   id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   title: VARCHAR(30) NOT NULL,
   salary: DECIMAL (),
   department_id: INT 
   FOREIGN KEY (department_id)
   REFERENCES department(id)
);

CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT 
    manager_id: INT
    FOREIGN KEY (roll_id)
    REFERENCES roll(id)
    ON DELETE SET NULL

);
