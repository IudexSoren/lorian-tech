import Joi from "joi";

export const insertPermiso = Joi.object({
  nombre: Joi.string().required().min(1).max(100).trim(),
  descripcion: Joi.string().max(200).trim().allow(null, ''),
});

export const updatePermiso = Joi.object({
  id: Joi.number().required().integer().positive(),
  nombre: Joi.string().required().min(1).max(100).trim(),
  descripcion: Joi.string().max(200).trim().allow(null, ''),
});
