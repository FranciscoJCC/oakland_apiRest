'use strict';
const { CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: 'images',
        image: 'url',
      },
      {
        name: 'videos-url',
        image: 'url'
      },
      {
        name: 'documents',
        image: 'url'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
};
