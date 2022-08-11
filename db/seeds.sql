USE employeeTracker_db;

INSERT INTO department(name)
VALUES ("Human Resources"),
("Sales"),
("Marketing");

INSERT INTO role(title, salary, department_id)
VALUES ("Salesman", 123456.00, 2),
("Hiring Manager", 400.00, 1),
("Marketing Specialist", 60000.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Jared", 3, NULL),
("James", "Jameson", 3, 1),
("Tom", "Thompson", 1, NULL),
("Ben", "Beckman", 1, 3)