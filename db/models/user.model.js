const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

//Schema
const UserSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },

    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },

    password: {
        allowNull: false, 
        type: DataTypes.STRING
    },

    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['administrator', 'reader', 'creator'],
        defaultValue: 'reader'
    },

    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        field: 'deleted_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}

class User extends Model {
    static associate(models){
        //Un usuario tiene muchos posts
        this.hasMany(models.Post, {
            as: 'posts',
            foreignKey: 'userId'
        });

    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            hooks: {
                beforeCreate: async (user, options)=> {
                    const password = await bcrypt.hash(user.password, 10);

                    user.password = password;
                }
            },
            defaultScope: {
                attributes: { exclude: ['password', 'recoveryToken']}
            },
            scopes: {
                allProperties: { attributes: {}},
            }
        }
    }
}

module.exports = {
    USER_TABLE,
    UserSchema,
    User,
}