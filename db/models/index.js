const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Thematic, ThematicSchema } = require('./thematic.model');
const { Post, PostSchema } = require('./post.model');


function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Thematic.init(ThematicSchema, Thematic.config(sequelize));
    Post.init(PostSchema, Post.config(sequelize));
    
    
    //relations
    Post.associate(sequelize.models);
}

module.exports = setupModels;