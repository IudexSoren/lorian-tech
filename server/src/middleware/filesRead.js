import AccessDeniedException from "../config/exceptions/AccessDeniedException.js";
import { checkPermissions } from '../helpers/usuarios/UsuariosHelper.js';
import errorResponse from "../config/responses/errorResponse.js";
import { ARCHIVO__LECTURA } from "../constants/PERMISSIONS.js";

const filesRead = async (req, res, next) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ARCHIVO__LECTURA]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    next();
  } catch (error) {
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}

export default filesRead;