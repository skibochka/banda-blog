import * as express from 'express';
import * as Joi from 'joi';
import { ValidationError } from '../helpers/validation/ValidationError';

export function validatorMiddleware(validationSchema: any): express.RequestHandler {
  return (req, res, next) => {
    const bodyValidate = Joi.object(validationSchema).validate(req.body);
    const queryValidate = Joi.object(validationSchema).validate(req.query);
    if (bodyValidate.error && queryValidate.error) {
      throw new ValidationError(bodyValidate.error.details);
    }

    return next();
  };
}
