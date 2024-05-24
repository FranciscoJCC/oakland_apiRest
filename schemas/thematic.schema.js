const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(5).max(150);

const getThematicSchema = Joi.object({
    id: id.required()
});

const createThematicSchema = Joi.object({
    name: name.required(),
});

const updateThematicSchema = Joi.object({
    name: name,
});

module.exports = { getThematicSchema, createThematicSchema, updateThematicSchema };