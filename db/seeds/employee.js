
  var faker = require('faker');

  // let createDepartment = (knex, id) => {
  //   return knex('department').insert({
  //     id,
  //     name: faker.commerce.department()
  //   })
  // }
  
  // let createRole = (knex, id, dptId) => {
  //   let title = faker.name.jobTitle()
  //   while (title.length > 30) {
  //     title = faker.name.jobTitle()
  //   }
  //   return knex('role').insert({
  //     id,
  //     title: faker.name.jobTitle(),
  //     salary: faker.finance.amount(50000, 10000000, 2),
  //     department_id: dptId
  //   })
  // }
  
  let createEmployee = (knex, id, roleId, empId) => {
    return knex('employee').insert({
      id,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      role_id: roleId,
      manager_id: empId
    })
  }
  
  exports.seed = (knex) => {
    return knex('employee').del()
      .then(() => {
        let records = [];
  
        // for (let i = 1; i < 10; i++) {
        //   records.push(createDepartment(knex, i))
        // }
  
        // for (let i = 1; i < 10; i++) {
        //   records.push(createRole(knex, i, Math.floor(Math.random() * 9) + 1))
        // }
        
        for (let i = 1; i < 10; i++) {
          records.push(createEmployee(knex, i, Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * i) + 1))
        }
  
        return Promise.all(records);
      });
  };
