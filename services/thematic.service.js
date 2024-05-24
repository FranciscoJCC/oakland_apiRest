const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ThematicService {
    constructor(){}

    async list(){
        const categories = await models.Thematic.findAll();

        return categories;
    }

    async create(data){

        const newThematic = await models.Thematic.create(data);

        return newThematic;
    }
}

module.exports = ThematicService;