const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/auth.handler');
const verifyToken = require('../middlewares/token.handler');

const ThematicService = require('../services/thematic.service');
const { getThematicSchema, createThematicSchema, updateThematicSchema } = require('../schemas/thematic.schema');

const router = express.Router();
const service = new ThematicService();


router.get('/',
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator', 'reader', 'creator'),
    async(req, res, next) => {
        try {
            const thematics = await service.list();

            res.status(200).json(thematics);
        } catch (error) {
            next(error);
        }
    }
)

router.post('/',
    validatorHandler(createThematicSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator'),
    async(req, res, next) => {
        try {
            const data = req.body;
            
            const newThematic = await service.create(data);

            res.status(201).json(newThematic);
        } catch (error) {
            next(error);
        }
    }
)


module.exports = router;