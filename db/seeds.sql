USE employee_tracker;

-- Insert departments
INSERT INTO department (name) VALUES 
('Engineering'), 
('Human Resources'), 
('Marketing'), 
('Sales'), 
('Finance'), 
('Customer Support');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 90000.00, 1),
('Senior Software Engineer', 120000.00, 1),
('HR Manager', 65000.00, 2),
('HR Assistant', 45000.00, 2),
('Marketing Coordinator', 60000.00, 3),
('Marketing Manager', 80000.00, 3),
('Sales Associate', 55000.00, 4),
('Sales Manager', 90000.00, 4),
('Accountant', 70000.00, 5),
('Finance Manager', 95000.00, 5),
('Customer Support Specialist', 40000.00, 6),
('Customer Support Manager', 65000.00, 6);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, NULL),
('Michael', 'Brown', 4, 3),
('Jennifer', 'Davis', 5, NULL),
('Richard', 'Miller', 6, 5),
('Charles', 'Wilson', 7, NULL),
('Angela', 'Moore', 8, 7),
('Thomas', 'Taylor', 9, NULL),
('Christopher', 'Anderson', 10, 9),
('Patricia', 'Thomas', 11, NULL),
('Sarah', 'Jackson', 12, 11);