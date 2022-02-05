import path from 'path';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AES from 'crypto-js/aes.js';
import * as RolRepo from "../../repositories/usuarios/RolRepo.js";
import * as EstadoUsuarioRepo from "../../repositories/usuarios/EstadoUsuarioRepo.js";
import * as Usuario_PermisoRepo from "../../repositories/usuarios/Usuario_PermisoRepo.js";
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import * as FileHelper from "../FileHelper.js";
import { imageValidFileTypes } from "../../utils/validFileTypes.js";

dotenv.config();

const USERS_FOLDER = "USERS/";

/**
 * Genera un token de sesión usando datos únicos de cada usuario
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { Number } payload.tiempoSesion
 * @param { Number } payload.idRol
 * @param { Array } payload.permisos
 * @returns String
 */
export const generateJWT = (payload) => {
  // Validación de los datos
  if (
    !payload.id ||
    !payload.nombreUsuario ||
    !payload.tiempoSesion ||
    !payload.idRol ||
    !payload.permisos
  )
    throw new BadRequestException();

  // Obtener el id de los permisos asignados al usuario
  const permisos = payload.permisos.map(p => typeof p === 'number' ? p : p.idPermiso);

  // Definir la fecha de creación del token
  const creationDate = new Date();
  payload = {
    ...payload,
    permisos,
    creationDate,
  };
  // Creación del token
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    algorithm: "HS256",
    expiresIn: `${payload.tiempoSesion}m`,
  });

  return token;
};

/**
 * Retorna el token de sesión encriptado
 * @param {String} token
 * @returns String
 */
export const encryptToken = (token) => {
  return AES.encrypt(token, process.env.SECRET_AES_TOKEN_ENCRYPT).toString();
}

/**
 * Retorna la cantidad de minutos del tiempo de sesión en segundos
 * @param { Number } minutos
 * @returns Number
 */
export const setTiempoSesion = (minutos) => minutos * 60;

/**
 * Retorna la cantidad de segundos del tiempo de sesión en minutos
 * @param { Number } minutos
 * @returns Number
 */
export const unsetTiempoSesion = (segundos) => segundos / 60;

/**
 * Guarda la imagen del usuario y devuelve la ruta en la que fue almacenada
 * @param { File } file
 * @param { String } nombreUsuario
 * @returns String
 */
export const uploadUserImage = async (file, nombreUsuario) => {
  let filePath = null;
  // Obtener la ruta temporal del archivo
  const tempFilePath = file.tempFilePath;
  try {
    // Leer el archivo temporal
    const fileRead = await FileHelper.readFile(tempFilePath);
    // Obtener el tipo del archivo
    const fileType = FileHelper.getFileType(file.name);

    // Validar el tipo del archivo
    if (!FileHelper.isValidFileType(fileType, imageValidFileTypes))
      throw new BadRequestException(
        `El tipo de archivo ${fileType} no es soportado`,
        "Tipo archivo inválido"
      );

    // Crear el nombre del archivo
    const fileName = FileHelper.setFileName(nombreUsuario, fileType);
    // Obtener la ruta del archivo
    filePath = FileHelper.createFilePath(fileName, fileType, USERS_FOLDER);
    filePath = filePath.substring(8);

    // Guardar la imagen
    await FileHelper.writeFile(`content/${filePath}`, fileRead);
  } catch (error) {
    throw error;
  } finally {
    // Eliminar el archivo temporal siempre
    await FileHelper.removeFile(tempFilePath);
  }

  // Retornar la ruta del archivo
  return filePath;
};

/**
 * Elimina la imagen del usuario ubicada en la ruta indicada
 * @param { String } filePath
 */
export const deleteUserImage = async (filePath) => {
  try {
    const filePathComplete = `${path.resolve('content')}/${filePath}`;
    if (!FileHelper.pathExists(filePathComplete))
      throw new ServerException();
      
    // Eliminar la imagen
    await FileHelper.removeFile(filePathComplete);
  } catch (error) {
    throw error;
  }
};

/**
 * Añade las dependencias del objeto usuario
 * @param { Object } usuario
 * @param { Number } usuario.id
 * @param { Number } usuario.idRol
 * @param { Number } usuario.idEstadoUsuario
 * @param { Number } usuario.tiempoSesion
 * @property { Object } usuario.rol
 * @property { Object } usuario.estado
 * @property { Array } usuario.permisos
 * @returns Usuario
 */
export const completeUsuario = async (usuario) => {
  try {
    if (usuario) {
      usuario.tiempoSesion = unsetTiempoSesion(usuario.tiempoSesion);
      usuario.rol = await RolRepo.getRol(usuario.idRol);
      usuario.estado = await EstadoUsuarioRepo.getEstadoUsuario(
        usuario.idEstadoUsuario
      );
      usuario.permisos = await Usuario_PermisoRepo.getPermisosByUsuario(usuario.id);

      return usuario;
    }
  } catch (error) {
    throw error;
  }
};

export const tokenExpires = (tiempoSesion) => {
  let expires = new Date();
  expires.setMinutes(expires.getMinutes() + tiempoSesion);

  return expires;
}

export const checkPermissions = (userPermissions, requiredPermissions) => {
  try {
    let hasAccess = false;
    for (const requiredPermission of requiredPermissions) {
      hasAccess = userPermissions.includes(requiredPermission);
      if (!hasAccess) break;
    }

    return hasAccess;
  } catch (error) {
    throw error;
  }
}