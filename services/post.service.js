const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PostService {
    constructor(){}

    async list(){

        //Opciones de la consulta
        const options = {
            include: ['user', 'thematic', 'category'],
        }

        const posts = await models.Post.findAll(options);

        return posts;
    }

    async create(data, user){
        data.userId = user.sub;
        
        const newPost = await models.Post.create(data);

        return newPost;
    }

}

module.exports = PostService;