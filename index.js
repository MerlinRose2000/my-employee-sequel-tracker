const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Str4th4dam',
    database: 'staff',
  },
  console.log(`Connected to the staff database.`)
);
const question = [
  {
    type: 'list',
    name: 'Search',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'Add An Employee',
      'Update An Employees Role',
      'View All Roles',
      'Add A Role',
      'View All Departments',
      'Add A Department',
    ],
  },
];

function questionAnsweredThenWhat() {
  inquirer.prompt(question).then((answers) => {
    if (answers.doWhat == 'View All Departments') {
     viewAllDepartments()
    } else if (answers.doWhat == 'View All Roles') {
     viewAllRoles()
    } else if (answers.doWhat == 'View All Employees') {
      viewAllEmployees()
    } else if (answers.doWhat === 'Add A Department') {
     takeDepartmentInput();
        } else if( answers.doWhat === 'Add A Role' ) {
          takeRoleInput();
        } else if (answers.doWhat === 'Add An Employee') {
           takeAddEmployeeInput();
        } else if (answers.doWhat === 'Update An Employee Role') {
          updateEmployeeNewRole();
        }
        else {
            console.log("Not yet implemented.");
        } 

  });
}

function viewAllDepartments () { 
      db.query('select * from department', (err, res) => {
        console.table(res);
questionAnsweredThenWhat();
})};

function viewAllRoles () {
  db.query('select * from role', (err, res) => {
     if(err) console.log(err)    
    console.table(res);
questionAnsweredThenWhat();
      });
}

function viewAllEmployees () {
  db.query('select employee.id, first_name, last_name, title, salary, departmentName FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', (err, res) => {
        if(err) console.log(err)
        console.table(res);
    questionAnsweredThenWhat();
      });
}
questionAnsweredThenWhat();

function takeDepartmentInput() {
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "Enter the name of the department:"
        }
    ]).then((answer) => {
        addDepartmentToDatabase(answer.departmentName);
    });
}

function addDepartmentToDatabase(departmentName) {
    const sql = `INSERT INTO department (departmentName) VALUES ('${departmentName}');`
    db.query(sql,  (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Department '${departmentName}' added successfully!`);
        }
        questionAnsweredThenWhat();
    });
}

function takeRoleInput() {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "Enter the name of the role:"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary of the role:"
        },
        {
            name: "departmentId",
            type: "input",
            message: "Enter department ID:"
        },
    ]).then((answer) => {
        addRoleToDatabase(answer.roleName, answer.salary, answer.departmentId);
    });
}

function addRoleToDatabase(roleName, salary, departmentId) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES 
    ('${roleName}', '${salary}', '${departmentId}');`
    db.query(sql,  (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Role '${roleName}' added successfully!`);
        }
        questionAnsweredThenWhat()
    });
}
function takeAddEmployeeInput() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the employees first name:"
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter the employees last name:"
        },
        {
            name: "employeeRole",
            type: "input",
            message: "Enter the employees role:"
        },
        {
            name: "managerId",
            type: "input",
            message: "Enter the manager that the employee reports to:"
        }
    ]).then((answer) => {
        takeAddEmployeeInputDb(answer.firstName, answer.lastName, answer.employeeRole, answer.managerId);
    });
}

function takeAddEmployeeInputDb(firstName, lastName, employeeRole, managerId) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES 
    ('${firstName}', '${lastName}', '${employeeRole}', '${managerId}');`
   
    db.query(sql,  (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Role '${firstName}' added successfully!`);
        }
        questionAnsweredThenWhat();
    });
}

function updateEmployeeNewRole() {
    inquirer.prompt([
        {
            name: "employeeId",
            type: "input",
            message: "Provide the employee ID whose role you would like to update :"
        },
        {
            name: "roleId",
            type: "input",
            message: "Provide the ID of the role you would like this employee to have:"
        }
        
    ]).then((answer) => {
        updateEmployeeNewRoleDB(answer.employeeId, answer.roleId);
    });
}

function updateEmployeeNewRoleDB(employeeId, roleId) {
    const sql = `UPDATE employee SET role_id = '${roleId}' 
    WHERE id = '${employeeId}' `
  
    db.query(sql,  (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Role '${employeeId}' has been added to the employee successfully!`);
        }
        questionAnsweredThenWhat();
    });
}