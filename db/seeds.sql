INSERT INTO department (department_name)
VALUES 
("Physics"),
("Maths"),
("Biology"),
("Literature"),
("Chemistry");

INSERT INTO role (title, salary, department_id)
VALUES
("Dentist", 150,000, 1),
("Engineer", 120,000, 2),
("Dentist", 170,000, 1),
("Orthodentist", 110,000, 5),
("Plumber", 85,000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 2, 1),
("Christian", "Dior", 1),
("Katrina", "Kaif", 4),
("Josh", "Smith", 5, 1)