const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { CONFIG } = require('../config/config');
const UserService = require('./user.service');

const service = new UserService();

class AuthService {

    async getUser(email, password){
        const user = await service.findByEmail(email);
        
        
        if(!user){
            throw boom.unauthorized();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw boom.unauthorized();
        }

        //delete password data
        delete user.dataValues.password;

        return user;
    }

    //Firmamos un token
    signToken(user){
        const payload = {
            sub: user.id,
            role: user.role
        };

        const token = jwt.sign(payload, CONFIG.JwtSecret);

        return {
            user,
            token
        }
    }
}

module.exports = AuthService;