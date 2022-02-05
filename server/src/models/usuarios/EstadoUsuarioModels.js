import Joi from "joi";

export const insertEstadoUsuario = Joi.object({
  nombre: Joi.string().required().min(1).max(50).trim().uppercase(),
});

export const updateEstadoUsuario = Joi.object({
  id: Joi.number().required().integer().positive(),
  nombre: Joi.string().required().min(1).max(50).trim().uppercase(),
});
