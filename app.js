
// get the client
const mysql = require('mysql2');
const express = require('express');
const app = express();
const inquirer = require ("inquirer");
const cTable = require('console.table');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Charmeleon85!',
  database: 'employees'
});

function inquire() {
    const employeeArray = [];
    connection.query(
        'SELECT * FROM `employee`',
        function(err, results, fields) {
            results.forEach(result => {
                employeeArray.push(
                    result.first_name + ' ' + result.last_name
                )
            })
        }
    );
    // selection prompt    
    let sentinel = true
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Choose an Option",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Quit"],
            pageSize: 8
        },
    ]).then(answers => {
        switch (answers.action) {
            // option to view departments
            case "View All Departments":
                connection.query(
                    'SELECT * FROM `department`',
                    function(err, results, fields) {
                       console.log("\n");
                       console.table(results); // results contains rows returned by server
                       console.log("\n");
                    }
                  );
                  inquire()
                  break;
            // option to view roles
            case "View All Roles":
                connection.query(
                    'SELECT * FROM `role`',
                    function(err, results, fields) {
                        console.log("\n");
                        console.table(results);
                        console.log("\n");
                    }
                );
                inquire()
                break;
            // option to view employees
            case "View All Employees":
                connection.query(
                    'SELECT * FROM `employee`',
                    function(err, results, fields) {
                        console.log("\n");
                        console.table(results);
                        console.log("\n");
                    }
                );
                inquire()
                break;
            // option to add a department
                case "Add a Department":
                    inquirer.prompt([
                        {
                            name: "deptName",
                            type: "input",
                            message: "What is the department name?",
                        }
                    ]).then(answers => {
                        connection.query(
                            `INSERT INTO department (name)VALUES ('${answers.deptName}')`,
                            function(err, results, fields) {
                                if (err) return err;
                                console.log("\nA new department was added.");
                                console.table(results); // results contains rows returned by server
                                console.log("\n");
                            //   console.log(fields); // fields contains extra meta data about results, if available
                            //   console.table(fields);
                                }
                        );
                        inquire()
                    })
                break;
                // option to add a role
                    case "Add a Role":
                        inquirer.prompt([
                            {
                                name: "roleName",
                                type: "input",
                                message: "What is the new role?",
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "What is the salary?",
                            },
                            {
                                name: "deptId",
                                type: "input",
                                message: "What is the department ID?",
                            },
                        ]).then(answers => {
                            connection.query(
                                `INSERT INTO role (title, salary, department_id)VALUES ('${answers.roleName}', '${parseFloat(answers.salary)}', '${parseInt(answers.deptId)}')`,
                                function(err, results, fields) {
                                    console.log("\n");
                                    console.table(results);
                                    console.log("\n");
                                }
                            );
                            inquire()
                        })
                    break;
                // option to add an employee
                    case "Add an Employee":
                        inquirer.prompt([
                            {
                                name: "firstName",
                                type: "input",
                                message: "What is the employee's first name?",
                            },
                            {
                                name: "lastName",
                                type: "input",
                                message: "What is the employee's last name?",
                            },
                            {
                                name: "roleId",
                                type: "input",
                                message: "What is the employee's role ID?",
                            },
                            {
                                name: "empId",
                                type: "input",
                                message: "What is the ID of this employee's manager?",
                            },
                        ]).then(answers => {
                            connection.query(
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.roleId}', '${answers.empId}')`,
                                function(err, results, fields) {
                                    console.log("\n");
                                    console.table(results);
                                    console.log("\n");
                                }
                            );
                        inquire()
                    })
                    break;
                // option to update an emloyee
                    case "Update an Employee Role":
                    inquirer.prompt([
                        {
                            name: "employeeName",
                            type: "list",
                            message: "Which employee is being updated?",
                            choices: async function () {
                                const [rows] = await connection.promise().query('SELECT * FROM `employee`').catch(console.log)
                                return rows.map(item => {
                                    return {
                                        name: item.first_name + " " + item.last_name,
                                        value: item.last_name
                                    }
                                })    
                            }
                        },
                    ]).then(function (answer) {
                        const name = answer.employeeName;
                        connection.query("SELECT * FROM role", function (err, res) {
                          if (err) throw (err);
                          inquirer.prompt([
                              {
                                name: "role",
                                type: "list",
                                message: "What is their new role?",
                                choices: function () {
                                  const rolesArray = [];
                                  res.forEach(res => {
                                    rolesArray.push(res.title)
                                  })
                                  return rolesArray;
                                }
                              }
                            ]).then(function (rolesAnswer) {
                              const role = rolesAnswer.role;
                              connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                               // if (err) throw (err);
                                let roleId = res[0].id;
                                let sql = "UPDATE employee SET role_id = ? WHERE last_name= ?";
                                let values = [roleId, name]
                                //console.log(values);
                                connection.query(sql, values,
                                  function (err, res,) {
                                  //  if (err) throw (err);
                                    console.log(`You have updated ${name}'s role to ${role}.`)
                                    promptUser();
                                  })
                              })
                    })
                })
                inquire()
            })
                    break;
            case "Quit":

                break;
        }
        
    })
}

inquire();
