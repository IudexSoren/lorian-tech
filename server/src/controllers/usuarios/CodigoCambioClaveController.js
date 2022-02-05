import * as CodigoCambioClaveService from '../../services/usuarios/CodigoCambioClaveService.js';
import errorResponse from "../../config/responses/errorResponse.js";
import { createLogger } from "../../config/logger.js";
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";

import { CODIGO_CAMBIO_CLAVE__GENERAR } from "../../constants/PERMISSIONS.js";
import { checkPermissions } from '../../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";

const logger = createLogger("CÓDIGO_CAMBIO_CLAVE_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertCodigoCambioClave = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [CODIGO_CAMBIO_CLAVE__GENERAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id, nombreUsuario } = req.body;
    const result = await CodigoCambioClaveService.insertCodigoCambioClave({
      id,
      nombreUsuario,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};