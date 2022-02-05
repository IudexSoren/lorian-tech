import Joi from "joi";

export const insertRol = Joi.object({
  nombre: Joi.string().required().min(1).max(50).trim().uppercase(),
  permisos: Joi.array().required().items(Joi.number().integer())
});

export const updateRol = Joi.object({
  id: Joi.number().required().integer().positive(),
  nombre: Joi.string().required().min(1).max(50).trim().uppercase(),
  permisos: Joi.array().items(Joi.number().integer())
});
