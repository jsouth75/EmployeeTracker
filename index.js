const mysql = require('mysql2');
const inquirer = require("inquirer");
const async = require('hbs/lib/async');
// const figlet =- require('figlet');

const questions = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Exit employeeTracker_db"
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
        } else if (answers.choice == "View All Employees") {
            viewEmployees()
        } else if (answers.choice == "Add a Department") {
            addDepartment()
        } else if (answers.choice == "Add a Role") {
            addRole()
        } else if (answers.choice == "Add an Employee") {
            addEmployee()
        } else if (answers.choice == "Update an Employee Role") {
            updateEmployeeRole()
        } else if (answers.choice == "View Employees by Manager") {
            viewEmployeeByMgr()
        } else if (answers.choice == "Update Employee Manager") {
            updateEmployeeMgr()
        } else if (answers.choice == "View Employees by Department") {
            viewEmployeeByDept()
        } else if (answers.choice == "Delete Department") {
            deleteDept()
        } else if (answers.choice == "Delete Role") {
            deleteRole()
        } else if (answers.choice == "Delete Employee") {
            deleteEmployee()
        }  else if (answers.choice == "Ext employeeTracker_db") {
            exit()
        } 

    })
};

function viewDept () {
    const sqlString = `
    SELECT *
    FROM department;`

    db.query(sqlString, (err, data) => {
        if (err) throw err;

        console.table(data)
        startRunning()
    })
};

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
};

function viewEmployees () {
    const sqlString = `
    SELECT employee.id, first_name, last_name, role.title AS "job title", department.name AS "department name", salary, manager_id
    FROM employee
    JOIN role 
    ON role_id = role.id
    JOIN department
    ON department_id = department.id;`

    db.query(sqlString, (err, data) => {
        if (err) throw err;

        console.table(data)
        startRunning()
    })
};

function addDepartment () {
    inquirer.prompt([
        {
            type: "input",
            name: 'newDept',
            message: 'What is the new department name'
        }
    ]).then(answers => {
        const sqlString = `
        INSERT INTO department (name)
        VALUES (?)`

        db.query(sqlString, [answers.newDept], (err, data) => {
         console.log("added new department");
         startRunning()   
        })
    })
}
        
function searchDepartments () {
    return db.promise().query('SELECT * FROM department')
}


async function addRole () {
    const [rows] = await searchDepartments()

    const organizedInfo = rows.map(index => (
        {
            name: index.name,
            value: index.id
        }
    ))  
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new role?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the new salary?',
            name: 'newSalary'
        },
        {
            type: 'list',
            message: 'What department does the new role belong to?',
            name: 'deptId',
            choices: organizedInfo
        },
    ]).then(answers => {
        console.log(answers)
        const sqlString = `
        INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`

        db.query(sqlString, [answers.newRole, answers.newSalary, answers.deptId], (err, data) => {
            console.log('added new role')
            startRunning()
        })
    })
};

// function addEmployee () {
//     const sqlString = 
    
//     db.query(sqlString, (err, data) => {
//         if (err) throw err;
        
//         console.table(data)
//         startRunning()
//     })
// };

// function updateEmployeeRole () {
//     const sqlString = 
    
//     db.query(sqlString, (err, data) => {
//         if (err) throw err;
        
//         console.table(data)
//         startRunning()
//     })
// };

// function viewEmployeeByMgr () {
//     const sqlString = 
    
//     db.query(sqlString, (err, data) => {
//         if (err) throw err;
        
//         console.table(data)
//         startRunning()
//     })
// };

// function viewEmployeeByDept () {
//     const sqlString = 
    
//     db.query(sqlString, (err, data) => {
//         if (err) throw err;
        
//         console.table(data)
//         startRunning()
//     })
// };


// const exit = () => {
//     inquirer.prompt ({
//         type: 'confirm',
//         name: 'exit',
//         message: 'Are you sure you want to exit?'
//     })
// }