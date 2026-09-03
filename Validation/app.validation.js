const Joi = require('joi')


const itemSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
        
    category: Joi.string()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .min(3)
        .max(100)
        .required()
})


module.exports = {
    itemSchema
}