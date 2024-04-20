DROP DATABASE IF EXISTS staff;
CREATE DATABASE staff;
USE staff;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES 
    ('Executive Board'),
    ('Marketing'),
    ('Human Resources'),
    ('Finance'),
    ('Engineering'),
    ('Information Technology'),
    ('Customer Relations'),
    ('Research'),
    ('Legal'),
    ('Maintenance');

SELECT * FROM department;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO roles (title, salary, department_id) VALUES 
    ('Chief Executive Officer', 183000, 1),
    ('Marketing Manager', 138000, 2),
    ('HR Director', 189000, 3),
    ('Finance Manager', 98000, 4),
    ('Senior Engineer', 110000, 5),
    ('IT Manager', 95000, 6),
    ('Customer Relations Manager', 52000, 7),
    ('Research Manager ', 136000, 8),
    ('Legal Manager', 99000, 9),
    ('Maintenance Manager', 45000, 10);

SELECT * FROM roles;
    
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Emilia', 'Stewart', 3, null),
    ('Amy', 'Gallant', 1, 3),
    ('Vander', 'Stewart', 2, 1),
    ('Suzie', 'Morris', 8, null),
    ('Eddie', 'Stewart', 5, 1),
    ('Smokey', 'Cat', 9, 1),
    ('Beans', 'Cat', 4, 2),
    ('Carlo', 'Weka', 6, 9),
    ('Ricky', 'Albert', 7, 3),
    ('Danica', 'Arsenault', 10, 3);

SELECT * FROM employee;