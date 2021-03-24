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
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "choose an option",
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        },
    ])
    .then(answers => {
        switch (answers.action) {
            case "view all departments":
                connection.query(
                    'SELECT * FROM `department`',
                    function(err, results, fields) {
                    //   console.table(results); // results contains rows returned by server
                    //   console.log(fields); // fields contains extra meta data about results, if available
                      console.table(fields);
                    }
                  );
        }
        
    })
}

inquire();