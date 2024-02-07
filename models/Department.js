const connection = require('../db/connection');

class Department {
  getAllDepartments() {
    return connection.promise().query('SELECT * FROM department');
  }

  addDepartment(departmentName) {
    return connection.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
  }
}

module.exports = Department;