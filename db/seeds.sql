INSERT INTO department(department_name)
VALUES ("Managment"), 
("Human Resources"),
('Accounting'),
("Marketing"),
("Sales");

INSERT INTO role (title,salary,department_id)
VALUES ("CEO",125000,1) , 
("Manager",90000,1), 
("HR Head",90000,2), 
("Accountant", 100000, 3), 
("Marketing", 110000, 4), 
("Sales agent", 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin","Sparks",1,null) , 
("Frank","Jones",1,1), 
("Mary","Long",2,1) , 
("Sarah","Johnson",3,1) , 
("Karen","Mathews",4,1) , 
("Ryan","Holliday",5,1);

