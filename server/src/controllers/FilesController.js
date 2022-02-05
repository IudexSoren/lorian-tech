import * as pathLIB from 'path';
import jimp from 'jimp';
import dotnev from 'dotenv';
import errorResponse from "../config/responses/errorResponse.js";
import { createLogger } from "../config/logger.js";
import BadRequestException from "../config/exceptions/BadRequestException.js";
import NotFoundException from "../config/exceptions/NotFoundException.js";
import { USUARIOS_CONTENT_FOLDER_NAME, HOES_CONTENT_FOLDER_NAME, MULTIMEDIA_CONTENT_FOLDER_NAME } from "../constants/ENTITY_FOLDER_NAMES.js";
import * as FilesHelper from '../helpers/FileHelper.js';

import { ARCHIVO__LECTURA, ARCHIVO__DESCARGAR } from "../constants/PERMISSIONS.js";
import { checkPermissions } from '../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../config/exceptions/AccessDeniedException.js";

dotnev.config();
const logger = createLogger("FILES_CONTROLLER");
const CONTENT_FOLDERS = [USUARIOS_CONTENT_FOLDER_NAME, HOES_CONTENT_FOLDER_NAME, MULTIMEDIA_CONTENT_FOLDER_NAME];

export const getImage = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ARCHIVO__LECTURA]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { FOLDER, path } = req.body;

    if (!FOLDER || !path) throw new BadRequestException();

    if (typeof FOLDER !== 'string' || typeof path !== 'string')
      throw new BadRequestException();

    if (!CONTENT_FOLDERS.includes(FOLDER)) throw new BadRequestException();

    if (!path.includes(FOLDER)) throw new BadRequestException();

    if (!FilesHelper.pathExists(`content/${path}`))
      throw new NotFoundException('El archivo solicitado no existe', 'Archivo no encontrado');

    let file = await jimp.read(`${pathLIB.resolve('content')}/${path}`);
    file = file.clone();

    file = await file.getBase64Async(jimp.MIME_PNG);

    return res.status(200).send(file);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}

export const getFile = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ARCHIVO__LECTURA]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { FOLDER, path } = req.body;

    if (!FOLDER || !path) throw new BadRequestException();

    if (typeof FOLDER !== 'string' || typeof path !== 'string')
      throw new BadRequestException();

    if (!CONTENT_FOLDERS.includes(FOLDER)) throw new BadRequestException();

    if (!path.includes(FOLDER)) throw new BadRequestException();

    if (!FilesHelper.pathExists(`content/${path}`))
      throw new NotFoundException('El archivo solicitado no existe', 'Archivo no encontrado');

    return res.status(200).send(`${process.env.BASE_URL}/content/${path}`);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}