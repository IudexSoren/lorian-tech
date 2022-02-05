import Joi from "joi";

export const insertCodigoCambioClave = Joi.object({
  id: Joi.number().required().integer().positive(),
  nombreUsuario: Joi.string().required(),
  expira: Joi.boolean().allow(null)
});

export const isCodigoValido = Joi.object({
  idUsuario: Joi.number().required().integer().positive(),
  codigo: Joi.string().required(),
});
