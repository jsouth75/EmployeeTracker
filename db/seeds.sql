USE employeeTracker_db;

INSERT INTO department (name)
VALUES  ("Management"),
        ("Accounting"),
        ("Human Resources"),
        ("Sales"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ("CEO", 250000, 1),
        ("Office Manager", 70000.00, 1),
        ("Credit Manager", 120000.00, 2),
        ("Hiring Manager", 60000.00, 3),
        ("Sales Manager", 150000.00, 1),
        ("Salesman 1", 120000.00, 4),
        ("Salesman 2", 120000.00, 4),
        ("Inside Sales", 70000.00, 4),
        ("Marketing Specialist", 60000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jon", "Jared", 1, NULL),
        ("Tom", "Thompson", 6, 5),
        ("Ben", "Beckman", 7, 5),
        ("Mike", "Vales", 2, 1),
        ("Josh", "Little", 5, 1),
        ("Sarah", "Strong", 3, 2),
        ("James", "Jameson", 9, 2),
        ("Becky", "Jordan", 4, 2),
        ("Joe", "Carter", 8, 5);

