const Joi = require("joi");

exports.validateAdding = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

exports.validateUpdating = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string(),
}).or("name", "email", "phone");
