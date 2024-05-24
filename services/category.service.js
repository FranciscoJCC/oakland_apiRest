const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryService {
    constructor(){}

    async list(){
        const categories = await models.Category.findAll();

        return categories;
    }

    async create(data){
        
        const newCategory = await models.Category.create(data);

        return newCategory;
    }

}

module.exports = CategoryService;