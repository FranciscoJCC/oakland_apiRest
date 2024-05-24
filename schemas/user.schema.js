const Joi = require('joi');

const id = Joi.number().integer();
const username = Joi.string().min(5).max(150);
const email = Joi.string().min(5).max(150);
const password = Joi.string().min(10).max(255);
const role = Joi.string();


const getUserSchema = Joi.object({
    id: id.required()
});

const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    role: role.required()
});

const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    role : role
});

/* const queryUserSchema = Joi.object({
    limit,
    offset
}) */

module.exports = { getUserSchema, createUserSchema, updateUserSchema };