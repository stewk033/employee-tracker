
  var faker = require('faker');
  
  let createRole = (knex, id, dptId) => {
    let title = faker.name.jobTitle()
    while (title.length > 30) {
      title = faker.name.jobTitle()
    }
    return knex('role').insert({
      id,
      title: title,
      salary: faker.finance.amount(50000, 10000000, 2),
      department_id: dptId
    })
  }
  
 // exports.seed = (knex) => {
    // return knex('role').del()
    //   .then(() => {
    //     let records = [];
  
    //     // for (let i = 1; i < 10; i++) {
    //     //   records.push(createDepartment(knex, i))
    //     // }
  
    //     for (let i = 1; i < 10; i++) {
    //       records.push(createRole(knex, i, Math.floor(Math.random() * 9) + 1))
    //     }
        
    //     // for (let i = 1; i < 10; i++) {
    //     //   records.push(createEmployee(knex, i, Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1))
    //     // }
  
    //     return Promise.all(records);
    //   });
  //};
  
