// Import the models
const inquirer = require('inquirer');
const db = require('./db/connection');
const consoleTable = require('console.table');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

// Instantiate the models to interact with the database
const departmentModel = new Department();
const roleModel = new Role();
const employeeModel = new Employee();

// Main function to start the application
// Prompt user for action choice
function start() {  inquirer.prompt([
    {
      type: 'list',
      name: 'action', // The answer will be stored under the 'action' key
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
    // Handle user's choice using a switch statement
    // Call appropriate function based on user's choice
  ]).then(answer => {
    switch (answer.action) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update an Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
        break;
      default:
        console.log(`Invalid action: ${answer.action}`);
        start();
    }
  });
}
// fetches department data from database and displays it using console.table
function viewAllDepartments() {
  departmentModel.getAllDepartments()
    .then(([results]) => {
      console.table(results); // Display the results in a table format
      start(); // Return to the main menu after displaying the results
    })
    .catch(err => console.error(err)); // Catch any errors and log them to the console
}

function viewAllRoles() {
  roleModel.getAllRoles()
    .then(([results]) => {
      console.table(results);
      start();
    })
    .catch(err => console.error(err));
}

function viewAllEmployees() {
  employeeModel.getAllEmployees()
    .then(([results]) => {
      console.table(results);
      start();
    })
    .catch(err => console.error(err));
}

function addDepartment() {
  inquirer.prompt([
    {
      name: 'newDepartment',
      type: 'input',
      message: 'What is the name of the new department?'
    }
  ]).then(answer => {
    departmentModel.addDepartment(answer.newDepartment)
      .then(() => {
        console.log('Department added successfully!');
        start();
      })
      .catch(err => console.error(err));
  });
}

function addRole() {
  // fetch departments and list them as choices
  departmentModel.getAllDepartments()
    .then(([departments]) => {
      inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of the new role?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of the new role?'
        },
        {
          name: 'departmentId',
          type: 'list',
          message: 'Which department does the role belong to?',
          //  Map department data to format for inquirer choices
          choices: departments.map(department => ({
            name: department.name,
            value: department.id
          }))
        }
      ]).then(answer => {
        // Use answers to add a new role to the database
        roleModel.addRole(answer.title, answer.salary, answer.departmentId)
          .then(() => {
            console.log('Role added successfully!');
            start();
          })
          .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
}

function addEmployee() {
  // Use Promise.all to fetch roles and employees concurrently
  Promise.all([
    roleModel.getAllRoles(),
    employeeModel.getAllEmployees()
  ]).then(([[roles], [employees]]) => {
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the new employee?'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the new employee?'
      },
      {
        name: 'roleId',
        type: 'list',
        message: 'What is the role of the new employee?',
        //  Map department data to format for inquirer choices
        choices: roles.map(role => ({ name: role.title, value: role.id }))
      },
      {
        name: 'managerId',
        type: 'list',
        // Provide option for no manager. Map employee data for other options
        message: 'Who is the manager of the new employee?',
        choices: [{ name: 'None', value: null }].concat(employees.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id })))
      }
    ]).then(answers => {
       // Use the answers to add new employee to database
      const { firstName, lastName, roleId, managerId } = answers;
      employeeModel.addEmployee(firstName, lastName, roleId, managerId)
        .then(() => {
          console.log('Employee added successfully!');
          start();
        })
        .catch(err => console.error(err));
    });
  }).catch(err => console.error(err));
}

// fetches employees then prompts user to select employee and new role
function updateEmployeeRole() {
  // Fetch employees
  employeeModel.getAllEmployees()
    .then(([employees]) => {
      inquirer.prompt([
        {
          name: 'employeeId',
          type: 'list',
          message: 'Which employee\'s role do you want to update?',
          // mapping the data again for inquirer
          choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
        }
      ]).then(answer => {
        const employeeId = answer.employeeId;
        // Fetch roles
        roleModel.getAllRoles()
          .then(([roles]) => {
            inquirer.prompt([
              {
                name: 'roleId',
                type: 'list',
                message: 'What is the new role?',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
              }
            ]).then(answer => {
              const roleId = answer.roleId;
              employeeModel.updateEmployeeRole(employeeId, roleId)
                .then(() => {
                  console.log('Employee role updated successfully!');
                  start();
                })
                .catch(err => console.error(err));
            });
          })
          .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
}

start();