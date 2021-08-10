const Joi = require("joi");
const { HttpCode } = require("../../helpers/constants");

const schemaAddContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: HttpCode.BAD_REQUEST,
      message: message.replace(/"/g, ""),
      data: "Bad Request",
    });
  }
  next();
};

module.exports.validateAddContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
