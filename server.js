//importing and requiring dependencies

const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');

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
    .then(function ( { action }){
        switch (action){
            case "1. View all departments" : viewDepartments();
            break;

            case "2. View all roles" : viewRoles();
            break;

            case "3. View all employees" : viewEmployees();
            break;

            case "4. Add a department" : addDepartment();
            break;

            case "5. Add a role" : addRole();
            break;

            case "6. Add an employee" : addEmployee();
            break;

            case "7. Update an employee role" : updateEmployeeRole();
            break;
        }
    });
}

function viewDepartments() {
    console.log("Viewing all Departments");
    
}


//connecting to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0v!$@u|!$Dg',
    database: 'employee_db'
},
    console.log('successfully connected to the employee_db database')
);

db.connect((err)=>{
    if(err)throw err;
    console.log("connected to employee_db database");

});

