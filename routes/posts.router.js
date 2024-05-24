const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validatorHandler');
const { checkRoles } = require('../middlewares/auth.handler');
const verifyToken = require('../middlewares/token.handler');

const PostService = require('../services/post.service');
const { getPostSchema, createPostSchema, updatePostSchema } = require('../schemas/post.schema');

const router = express.Router();
const service = new PostService();

router.get('/',
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator', 'reader', 'creator'),
    async(req, res, next) => {
        try {
            const posts = await service.list();

            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPostSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', {session: false}),
    checkRoles('administrator'),
    async(req, res, next) => {
        try {
            const data = req.body;
            const user = req.user;
            
            const newPost = await service.create(data, user);

            res.status(201).json(newPost);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;