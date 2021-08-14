const Joi = require("joi");

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().max(12).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().max(12).optional(),
}).or("name", "email", "phone");

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);

    next();
  } catch (error) {
    next({
      status: 400,
      message: error.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validateAddContact: (req, res, next) => {
    return validate(schemaAddContact, req.body, next);
  },
  validateUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
  },
};
