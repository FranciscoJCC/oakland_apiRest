'use strict';

const { USER_TABLE } = require('../models/user.model');
const { CATEGORY_TABLE }  = require('../models/category.model');
const { THEMATIC_TABLE } = require('../models/thematic.model');
const { POST_TABLE } = require('../models/post.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /* TABLE USERS */
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },

      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },

      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING
      },

      password: {
        allowNull: false, 
        type: Sequelize.DataTypes.STRING
      },

      role: {
          type: Sequelize.DataTypes.ENUM,
          allowNull: false,
          values: ['administrator', 'reader', 'creator'],
          defaultValue: 'reader'
      },

      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },

      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },

      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
    });

    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      }
    });

    await queryInterface.createTable(THEMATIC_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
          allowNull: false,
          unique: true,
          type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        field: 'created_at',
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        field: 'updated_at',
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.fn('now')
      },
      deletedAt: {
        field: 'deleted_at',
          allowNull: true,
          type: Sequelize.DataTypes.DATE,
      }
    });

    await queryInterface.createTable(POST_TABLE, {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      categoryId: {
          field: 'category_id',
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
              model: CATEGORY_TABLE,
              key: 'id'
          }
      },
      thematicId: {
          field: 'thematic_id',
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
              model: THEMATIC_TABLE,
              key: 'id'
          }
      },
      userId : {
          field: 'user_id',
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
              model: USER_TABLE,
              key: 'id'
          }
      },
      title: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
      },
      content: {
          allowNull: false,
          type: Sequelize.DataTypes.TEXT
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
      deletedAt: {
        field: 'deleted_at',
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      }
    });

  },

  async down (queryInterface) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable(POST_TABLE), { transaction: t },
        queryInterface.dropTable(THEMATIC_TABLE), { transaction: t },
        queryInterface.dropTable(CATEGORY_TABLE), { transaction: t },
        queryInterface.dropTable(USER_TABLE), { transaction: t },
      ]);
    });
  }
};
