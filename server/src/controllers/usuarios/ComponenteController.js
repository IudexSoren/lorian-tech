import * as ComponenteService from "../../services/usuarios/ComponenteService.js";
import errorResponse from "../../config/responses/errorResponse.js";
import { createLogger } from "../../config/logger.js";
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";

import { COMPONENTE__ACTUALIZAR, COMPONENTE__INSERTAR, COMPONENTE__LISTAR } from "../../constants/PERMISSIONS.js";
import { checkPermissions } from '../../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";

const logger = createLogger("COMPONENTE_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertComponente = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [COMPONENTE__INSERTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre, descripcion, idComponentePadre, permisos } = req.body;
    const result = await ComponenteService.insertComponente({
      nombre,
      descripcion,
      idComponentePadre,
      permisos
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateComponente = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [COMPONENTE__ACTUALIZAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const { nombre, descripcion, idComponentePadre, permisos } = req.body;
    const result = await ComponenteService.updateComponente({
      id,
      nombre,
      descripcion,
      idComponentePadre,
      permisos
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getComponentes = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [COMPONENTE__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombre, idComponentePadre } = req.query;
    const result = await ComponenteService.getComponentes({
      nombre, idComponentePadre
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getComponente = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [COMPONENTE__LISTAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const result = await ComponenteService.getComponente(id);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const checkAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario } = req;
    const result = await ComponenteService.checkAccess(id, usuario);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}
