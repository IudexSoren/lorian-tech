import Joi from "joi";
import { passwordPattern } from "../../utils/regex.js";

export const insertUsuario = Joi.object({
  nombreUsuario: Joi.string().required().min(3).max(50).trim(),
  clave: Joi.string().required().min(8).max(32).trim().pattern(passwordPattern),
  claveConfirmacion: Joi.ref("clave"),
  tiempoSesion: Joi.number().required().positive().max(180),
  idRol: Joi.number().required().integer().positive(),
  permisos: Joi.array().required().items(Joi.number().integer().positive())
});

export const updateUsuario = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().max(50).trim(),
  tiempoSesion: Joi.number().required().positive().max(180),
  idRol: Joi.number().required().integer().positive(),
  permisos: Joi.array().required().items(Joi.number().integer().positive())
});

export const updateUsuarioClaveByCodigo = Joi.object({
  nombreUsuario: Joi.string().required().trim(),
  clave: Joi.string().required().min(8).max(32).trim().pattern(passwordPattern),
  claveConfirmacion: Joi.ref("clave"),
  codigo: Joi.string().required().min(10).max(10)
});

export const updateUsuarioClave = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
  claveActual: Joi.string().required().trim(),
  clave: Joi.string().required().min(8).max(32).trim().pattern(passwordPattern),
  claveConfirmacion: Joi.ref("clave"),
});

export const updateUsuarioEstado = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
  idEstadoUsuario: Joi.number().required().integer().positive(),
});

export const updateUsuarioImagen = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
  imagen: Joi.required(),
});

export const deleteUsuarioImagen = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
});

export const deactivateUser = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
  clave: Joi.string().required().trim(),
});

export const login = Joi.object({
  nombreUsuario: Joi.string().required().trim(),
  clave: Joi.string().required().trim(),
});

export const refreshToken = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
  tiempoSesion: Joi.number().required().positive(),
  idRol: Joi.number().required().integer().positive(),
  permisos: Joi.array().required().items(Joi.number().integer().positive())
});

export const existUsuario = Joi.object({
  id: Joi.number().required().integer(),
  nombreUsuario: Joi.string().required().trim(),
});
