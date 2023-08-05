INSERT INTO department (department_name)
VALUES 
("Medical"),
("Engineering"),
("Legal"),
("Operations"),
("Tech");

INSERT INTO role (title, salary, department_id)
VALUES
("Dentist", 150000, 1),
("Engineer", 120000, 2),
("Dentist", 170000, 1),
("Orthodentist", 110000, 1),
("Intern", 10000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 2, 1),
("Christian", "Dior", 1, null),
("Katrina", "Kaif", 1, null),
("Josh", "Smith", 4, 2),
("Mike", "Wiz", 2, null);