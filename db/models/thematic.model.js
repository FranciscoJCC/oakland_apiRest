const { Sequelize, Model, DataTypes } = require('sequelize');

const THEMATIC_TABLE = 'thematics';

const ThematicSchema = {
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

class Thematic extends Model {
    static associate(models){
        
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: THEMATIC_TABLE,
            modelName: 'Thematic',
            timestamps: false,
            hooks: {

            }
        }
    }
}

module.exports = {
    THEMATIC_TABLE, 
    ThematicSchema,
    Thematic
}