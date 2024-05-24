const { Sequelize, Model, DataTypes } = require('sequelize');
//Relations
const { CATEGORY_TABLE }  = require('./category.model');
const { THEMATIC_TABLE } = require('./thematic.model');
const { USER_TABLE } = require('./user.model');

const POST_TABLE = 'posts';


const PostSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        }
    },
    thematicId: {
        field: 'thematic_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: THEMATIC_TABLE,
            key: 'id'
        }
    },
    userId : {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        }
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    content: {
        allowNull: false,
        type: DataTypes.TEXT
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

class Post extends Model {
    static associate(models){
        //Un post tiene un usuario
        this.belongsTo(models.User, {
            as: 'user'
        });

        //Un post tiene una tematica 
        this.belongsTo(models.Thematic, {
            as: 'thematic'
        });

        //Un post tiene una categoria
        this.belongsTo(models.Category, {
            as: 'category'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: POST_TABLE,
            modelName: 'Post',
            timestamps: false,
            hooks: {

            }
        }
    }
}

module.exports =  {
    POST_TABLE,
    PostSchema,
    Post
}