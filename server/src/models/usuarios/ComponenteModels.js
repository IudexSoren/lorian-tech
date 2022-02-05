import Joi from "joi";

export const insertComponente = Joi.object({
  nombre: Joi.string().required().min(1).max(100).trim(),
  descripcion: Joi.string().required().min(1).max(200).trim(),
  idComponentePadre: Joi.number().integer().allow(null, ''),
  permisos: Joi.array().items(Joi.number().integer())
});

export const updateComponente = Joi.object({
  id: Joi.number().required().integer().positive(),
  nombre: Joi.string().required().min(1).max(100).trim(),
  descripcion: Joi.string().required().min(1).max(200).trim(),
  idComponentePadre: Joi.number().integer().allow(null, ''),
  permisos: Joi.array().items(Joi.number().integer())
});
