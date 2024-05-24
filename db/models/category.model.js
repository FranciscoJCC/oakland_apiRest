const { Sequelize, Model, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get(){
            const rawValue = this.getDataValue('createdAt');
            return rawValue.toLocaleString('es-MX', { timeZone: 'America/Mexico_City'});
        }
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

class Category extends Model {
    static associate(models){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = {
    CATEGORY_TABLE,
    CategorySchema,
    Category
}