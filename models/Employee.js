const connection = require('../db/connection');

class Employee {
  getAllEmployees() {
    return connection.promise().query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id'
    );
  }

  addEmployee(firstName, lastName, roleId, managerId) {
    return connection.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  }

  updateEmployeeRole(employeeId, roleId) {
    return connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
}

module.exports = Employee;