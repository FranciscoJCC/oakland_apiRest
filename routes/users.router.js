const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');

const UserService = require('../services/user.service');

const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();


router.get('/',
    async (req, res, next) => {
        try {
            const users = await service.list();

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    async (req, res, next) => {
        try {
            const { id }  = req.params;
            const user = await service.find(id); 

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body;

            const newUser = await service.create(data);

            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;