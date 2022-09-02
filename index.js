
const mysql = require('mysql2');
const inquirer = require("inquirer");
const fs = require("fs");
const { start } = require('repl');
const figlet =- require('figlet');


// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jasonsouth',
        database: 'employeeTracker_db'
    });

db.connect(function(err) {
    if(err) throw err;
    console.log(`
 -----------------------------   
 |   Welcome to X company    |
 -----------------------------   
 `)
    startRunning()
})

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
    ];
    
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
            }  else if (answers.choice == "Exit employeeTracker_db") {
                quit()
            } 
            
        })
    };
    
    // view Departments function
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
    
    // view Roles function
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

// view Employees function
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

// add Department function
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

// add Role function
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

// add Employee function
function searchRoles() {
    return db.promise().query('SELECT * FROM role')  
}

async function addEmployee () {
    const [rows] = await searchRoles()

    const organizedInfo = rows.map(index => (
        {
            name: index.title,
            value: index.id
        }
    ))  
    
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the new employee Name?',
            name: 'newName'
        },
        {
            type: 'input',
            message: 'What is the new employee Last Name?',
            name: 'newLast'
        },
        {
            type: 'list',
            message: 'What role does the new employee belong to?',
            name: 'roleId',
            choices: organizedInfo
        },
        {
            type: 'input',
            message: 'What is the new employee manager?',
            name: 'newMgrId'
        },
    ]).then(answers => {
        console.log(answers)
        const sqlString = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`

        db.query(sqlString, [answers.newName, answers.newLast, answers.roleId, answers.newMgrId], (err, data) => {
            console.log('added new role')
            startRunning()
        })
    })
};

// Update Employee Role function
//UPDATE
//SET role_id = ?
//WHERE id = ?

// function updateEmployeeRole () {
//     const sqlString = 
    
//     db.query(sqlString, (err, data) => {
//         if (err) throw err;
        
//         console.table(data)
//         startRunning()
//     })
// };

// Exit function
const quit = () => {
    console.log('Bye')
    process.exit()
}