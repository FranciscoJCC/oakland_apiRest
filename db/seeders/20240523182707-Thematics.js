'use strict';
const { THEMATIC_TABLE } = require('../models/thematic.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(THEMATIC_TABLE, [
      {
        name: 'Ciencias'
      },
      {
        name: 'Matematicas'
      },
      {
        name: 'Deportes'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(THEMATIC_TABLE, null, {});
  }
};
