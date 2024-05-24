const Joi = require('joi');

const id = Joi.number().integer();
const categoryId = Joi.number().integer();
const thematicId = Joi.number().integer();
const title = Joi.string().min(10);
const content = Joi.string();

const getPostSchema = Joi.object({
    id: id.required()
});

const createPostSchema = Joi.object({
    categoryId : categoryId.required(),
    thematicId : thematicId.required(),
    title: title.required(),
    content: content.required()
});

const updatePostSchema = Joi.object({
    categoryId : categoryId,
    thematicId : thematicId,
    title: title,
    content: content
});

module.exports = { getPostSchema, createPostSchema, updatePostSchema }
