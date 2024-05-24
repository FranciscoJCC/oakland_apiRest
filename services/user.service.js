const boom = require('@hapi/boom');

const { models }  = require('./../libs/sequelize');

class UserService {
    constructor(){}

    async list(){
        const users = await models.User.findAll();

        return users;
    }

    async find(id){
        const user = await models.User.findByPk(id);

        if(!user){
            throw boom.notFound('user not found');
        }

        return user;
    }

    async findByEmail(email){
        const response = await models.User.scope('allProperties').findOne({
            where: { email }
        });
        
        return response;
    }

    async create(data){
        console.log(data.role);
        //Validamos que sea un rol permitido, reader o creator
        if(data.role === 'reader' || data.role === 'creator'){
            const newUser = await models.User.create(data);

            delete newUser.dataValues.password;

            return newUser;
        }else{
            throw boom.badRequest('role invalid, try again');
        }
    }
}

module.exports = UserService;