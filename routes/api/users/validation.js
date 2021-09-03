const Joi = require("joi");
const { Subscription } = require("../../../helpers/constants");

const schemaSignupUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(Subscription))
    .required(),
});

const schemaRepeatVerification = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
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
  validateUpdateSubscription: (req, res, next) => {
    return validate(schemaUpdateSubscription, req.body, next);
  },
  validateRepeatVerification: (req, res, next) => {
    return validate(schemaRepeatVerification, req.body, next);
  },
};
