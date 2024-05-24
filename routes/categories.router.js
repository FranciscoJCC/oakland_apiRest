const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/auth.handler');
const verifyToken = require('../middlewares/token.handler');

const CategoryService = require('../services/category.service');

const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/category.schema');


const router = express.Router();
const service = new CategoryService();

router.get('/',
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator', 'reader', 'creator'),
    async(req, res, next) => {
        try {
            const categories = await service.list();

            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    validatorHandler(createCategorySchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator'),
    async(req, res, next) => {
        try {
            const data = req.body;
            
            const newCategory = await service.create(data);

            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;