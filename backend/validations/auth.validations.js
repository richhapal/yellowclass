const Joi = require("joi");

const authSchema = Joi.object()
     .keys({
          name: Joi.string().required().max(25),
          email: Joi.string().required(),
          password: Joi.string().required().min(8),
     })
     .or("name", "password");

module.exports = authSchema;
