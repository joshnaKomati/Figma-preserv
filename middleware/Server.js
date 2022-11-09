const serviceModel = require("../model/serviceSchema")
const serviceController = require('../controller/serviceController')
const Joi = require("joi")
module.exports = {
    serviceValidate: async (req, res, next) => {
        const Schema = Joi.object({
            Id: Joi.optional(),
            Title: Joi.string().required(),
            Types: Joi.array().required(),
            Service_location: Joi.string().required(),
            Service_Duration: Joi.string().required(),
            Service_mode: Joi.string().required()
        })
        const result = Schema.validate(req.body)
        if (result.error) {
            res.json({ message: result.error.details[0].message })
        } else {
            next()
        }
    }
}