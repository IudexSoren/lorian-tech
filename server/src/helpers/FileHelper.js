import fs from "mz/fs.js";
import { rm, rmdir } from 'fs/promises';
import ServerException from "../config/exceptions/ServerException.js";
import { allValidFileTypes } from "../utils/validFileTypes.js";

export const pathExists = (filePath) => fs.existsSync(filePath);

export const readFile = async (filePath) => await fs.readFile(filePath);

export const writeFile = async (filePath, fileRead) =>
  await fs.writeFile(filePath, fileRead);

export const removeFile = (filePath) => rm(filePath, { force: true });

export const createDirectory = (path) => fs.mkdir(path, {});

export const removeDirectory = async (path) => await rmdir(path);

export const setFileName = (fileName, fileType) => `${fileName}.${fileType}`;

export const getFileType = (fileName) => {
  const nameArray = fileName.split(".");
  const type = nameArray[nameArray.length - 1];

  return type;
};

export const isValidFileType = (fileType, validFileTypes = allValidFileTypes) =>
  validFileTypes.includes(fileType);

/**
 * Crea la ruta del archivo y le asigna el tipo indicado si es necesario
 * @param { String } fileName
 * @param { String } fileType
 * @param { String } destinyPath
 * @returns String
 */
export const createFilePath = (fileName, fileType, destinyPath = "") => {
  // Divide el nombre del archivo
  const nameArray = fileName.split(".");
  // Asignar el tipo al archivo si este no es el mismo a *fileType* en el nombre del archivo
  if (nameArray[nameArray.length - 1] !== fileType) {
    fileName = `${fileName}.${fileType}`;
  }

  // Validar que la ruta destino incluye '/' como último caracter
  if (
    destinyPath &&
    (destinyPath[0] === "/" || destinyPath[destinyPath.length - 1] !== "/")
  )
    throw new ServerException();

  // Retorna la ruta del archivo
  return `content/${destinyPath}${fileName}`;
};
