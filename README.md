# Employee Tracker

This application is a command-line interface used to manage a companies employee, department, and role structures.

## User Story

- _AS A business owner_
- _I WANT to be able to view and manage the departments, roles, and employees in my company_
- _SO THAT I can organize and plan my business_

## Acceptance Criteria

- _GIVEN a command-line application that accepts user input_
- _WHEN I start the application_
- _THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role_
- _WHEN I choose to view all departments_
- _THEN I am presented with a formatted table showing department names and department ids_
- _WHEN I choose to view all roles_
- _THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role_
- _WHEN I choose to view all employees_
- _THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to_
- _WHEN I choose to add a department_
- _THEN I am prompted to enter the name of the department and that department is added to the database_
- _WHEN I choose to add a role_
- _THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database_
- _WHEN I choose to add an employee_
- _THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database_
- _WHEN I choose to update an employee role_
- _THEN I am prompted to select an employee to update and their new role and this information is updated in the database _

## Built With:
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>

## Installation:
In the command line, first run `npm install` to install the npm package dependencies.
The application can be invoked with `node app`.

## Solution:

![Demo Video](media/employee-tracker-walkthrough.mp4)

![employee_tracker gif](media/employee-tracker-gif.gif)

## Author

Kevin Stewart