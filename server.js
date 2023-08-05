//importing and requiring dependencies

const inquirer = require('inquirer');
const mysql = require('mysql2');


//Function to prompt user for what they would like to do 

function firstPrompt() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                "1. View all departments",
                "2. View all roles",
                "3. View all employees",
                "4. Add a department",
                "5. Add a role",
                "6. Add an employee",
                "7. Update an employee role"
            ]
        })
        .then(function ({ action }) {
            switch (action) {
                case "1. View all departments": viewDepartments();
                    break;

                case "2. View all roles": viewRoles();
                    break;

                case "3. View all employees": viewEmployees();
                    break;

                case "4. Add a department": addDepartment();
                    break;

                case "5. Add a role": addRole();
                    break;

                case "6. Add an employee": addEmployee();
                    break;

                case "7. Update an employee role": updateEmployeeRole();
                    break;
            }
        });
}

function viewDepartments() {
    console.log("Viewing all Departments");
    db.query('SELECT * FROM department', (err, results) => {
        err ? console.error(err) : console.table(results);
        firstPrompt();
    })
};

function viewRoles() {
    console.log("Viewing all Roles");
    db.query('SELECT * FROM role', (err, results) => {
        err ? console.error(err) : console.table(results);
        firstPrompt();
    })
};

function viewEmployees() {
    console.log("Viewing all Employees");
    db.query('SELECT a.id, a.first_name, a.last_name, c.title, d.department_name, c.salary, b.first_name AS manager_firstname, b.last_name AS manager_lastname FROM employee a LEFT JOIN employee b ON a.manager_id = b.id INNER JOIN role c ON a.role_id = c.id INNER JOIN department d ON d.id = c.department_id', (err, results) => {
        err ? console.error(err) : console.table(results);
        firstPrompt();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What department are you trying to add?",
            name: "addDepartment"
        }
    ]).then(ans => {
        console.log("Adding a new department");
        db.query(`INSERT INTO department (department_name) VALUES (?)`, ans.addDepartment, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                db.query(`SELECT * FROM department`, (err, results) => {
                    err ? console.error(err) : console.table(results);
                    firstPrompt();
                })
            }
        })
    })
}

function addRole() {

    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({ name: department.department_name, value: department.department_id }));
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the role you want to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role you want to add?'
            },
            {
                name: 'deptName',
                type: 'list',
                message: 'Which department do you want to add the new role to?',
                choices: departments
            },
        ]).then((ans) => {
            connection.query(`INSERT INTO role SET ?`,
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.deptName,
                },
                console.log(`\n ${response.title} successfully added to database\n`)
            )

            firstPrompt();
        })
    })
}
function addEmployee() {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({ name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));

            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the new employee\'s first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the new employee\'s last name?'
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'What is the new employee\'s title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is the new employee\'s manager?',
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`,
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.role,
                        manager_id: response.manager,
                    },
                    (err, res) => {
                        if (err) throw err;
                    })
                db.query(`INSERT INTO role SET ?`,
                    {
                        department_id: response.dept,
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                        firstPrompt();
                    })
            })
        })
    })
};

updateEmployeeRole = () => {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({ name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should the employee\'s new role be?',
                    choices: roles
                },
            ]).then((response) => {
                connection.query(`UPDATE employee SET ? WHERE ?`,
                    [
                        {
                            role_id: response.newRole,
                        },
                        {
                            employee_id: response.employee,
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n Successfully updated employee's role in the database! \n`);
                        firstPrompt();
                    })
            })
        })
    })
}

//connecting to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlPASS123',
    database: 'employee_db'
},
    console.log('successfully connected to the employee_db database')
);

db.connect((err) => {
    if (err) throw err;
    console.log("connected to employee_db database");
    firstPrompt();
});

