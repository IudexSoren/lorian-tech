import * as PermisoService from "../../services/usuarios/PermisoService.js";
import errorResponse from "../../config/responses/errorResponse.js";
import { createLogger } from "../../config/logger.js";
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";

import { PERMISO__ACTUALIZAR, PERMISO__INSERTAR, PERMISO__LISTAR } from "../../constants/PERMISSIONS.js";
import { checkPermissions } from '../../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";

const logger = createLogger("PERMISO_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertPermiso = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [PERMISO__INSERTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre, descripcion } = req.body;
    const result = await PermisoService.insertPermiso({
      nombre,
      descripcion
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updatePermiso = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [PERMISO__ACTUALIZAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const result = await PermisoService.updatePermiso({
      id,
      nombre,
      descripcion
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getPermisos = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [PERMISO__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre } = req.query;
    const result = await PermisoService.getPermisos({
      nombre,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getPermiso = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [PERMISO__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const result = await PermisoService.getPermiso(id);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};
