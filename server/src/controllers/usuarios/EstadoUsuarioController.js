import * as EstadoUsuarioService from "../../services/usuarios/EstadoUsuarioService.js";
import errorResponse from "../../config/responses/errorResponse.js";
import { createLogger } from "../../config/logger.js";
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";

const logger = createLogger("ESTADO_USUARIO_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertEstadoUsuario = async (req, res) => {
  try {
    const { nombre } = req.body;
    const result = await EstadoUsuarioService.insertEstadoUsuario({
      nombre,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const result = await EstadoUsuarioService.updateEstadoUsuario({
      id,
      nombre,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getEstadosUsuario = async (req, res) => {
  try {
    const { nombre } = req.query;
    const result = await EstadoUsuarioService.getEstadosUsuario({
      nombre,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EstadoUsuarioService.getEstadoUsuario(id);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};
