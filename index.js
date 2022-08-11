const mysql = require('mysql2');
const inquirer = require("inquirer");

const questions = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
        ]
    }
]

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jsonsouth',
    database: 'employeeTracker_db',
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySql Connected');
    startRunning()
});

function startRunning() {
    inquirer.prompt(questions)
    .then(answers => {
        // console.log(answers)
        if(answers.choice == "View All Departments") {
            viewDept()
        } else if (answers.choice == "View All Roles") {
            viewRoles()
        }
    })
}

function viewDept () {
    const sqlString = `
    SELECT *
    FROM department;`

    db.query(sqlString, (err, data) => {
        if (err) throw err;

        console.table(data)
        startRunning()
    })
}

function viewRoles () {
    const sqlString = `
    SELECT role.id, title, salary, department.name AS "department name"
    FROM role
    JOIN department
    ON department_id = department.id;`

    db.query(sqlString, (err, data) => {
        if (err) throw err;

        console.table(data)
        startRunning()
    })
}