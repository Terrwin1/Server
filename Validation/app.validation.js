const Joi = require('joi')


const itemSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(15)
        .required(),

    description: Joi.string()
        .min(3)
        .max(15)
        .required()
})


module.exports = {
    itemSchema
}