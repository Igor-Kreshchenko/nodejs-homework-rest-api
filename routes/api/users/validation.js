const Joi = require("joi");

const schemaSignupUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

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
  validateSignupUser: (req, res, next) => {
    return validate(schemaSignupUser, req.body, next);
  },
  validateLoginUser: (req, res, next) => {
    return validate(schemaLoginUser, req.body, next);
  },
};
