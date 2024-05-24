const express = require('express');

const userRouter = require('./users.router');
const categoryRouter = require('./categories.router');
const thematicRouter = require('./thematics.router');
const postRouter = require('./posts.router');

const authRouter = require('./auth.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/users', userRouter);
    router.use('/categories', categoryRouter);
    router.use('/thematics', thematicRouter);
    router.use('/posts', postRouter),

    router.use('/auth', authRouter);
}

module.exports = routerApi;