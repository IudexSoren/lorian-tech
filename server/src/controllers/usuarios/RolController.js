import * as RolService from "../../services/usuarios/RolService.js";
import errorResponse from "../../config/responses/errorResponse.js";
import { createLogger } from "../../config/logger.js";
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";

import { ROL__ACTUALIZAR, ROL__INSERTAR, ROL__LISTAR } from "../../constants/PERMISSIONS.js";
import { checkPermissions } from '../../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";

const logger = createLogger("ROL_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertRol = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ROL__INSERTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre, permisos } = req.body;
    const result = await RolService.insertRol({
      nombre,
      permisos
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateRol = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ROL__ACTUALIZAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const { nombre, permisos } = req.body;
    const result = await RolService.updateRol({
      id,
      nombre,
      permisos
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getRoles = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ROL__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre } = req.query;
    const result = await RolService.getRoles({
      nombre,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getRol = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ROL__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const result = await RolService.getRol(id);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};
