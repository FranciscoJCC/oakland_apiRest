'use strict';
const { USER_TABLE }  = require('../models/user.model');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        username : 'administrator',
        email: 'admin@gmail.com',
        role: 'administrator',
        password: await bcrypt.hash('Admin123', 10)
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
