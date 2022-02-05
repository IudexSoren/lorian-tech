import * as EstadoUsuarioRepo from "../../repositories/usuarios/EstadoUsuarioRepo.js";
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import successfulResponse from "../../config/responses/successfulResponse.js";
import * as EstadoUsuarioModel from "../../models/usuarios/EstadoUsuarioModels.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";

export const insertEstadoUsuario = async (payload) => {
  try {
    const validationResult = validateSchema(
      EstadoUsuarioModel.insertEstadoUsuario,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    const result = await EstadoUsuarioRepo.insertEstadoUsuario(payload);

    return successfulResponse(
      result,
      "Creación realizada",
      `El estado de usuario ${payload.nombre} fue creado`
    );
  } catch (error) {
    throw error;
  }
};

export const updateEstadoUsuario = async (payload) => {
  try {
    const validationResult = validateSchema(
      EstadoUsuarioModel.updateEstadoUsuario,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (await existEstadoUsuario(payload.id))
      throw new NotFoundException("El estado de usuario solicitado no existe");

    await EstadoUsuarioRepo.updateEstadoUsuario(payload);

    return successfulResponse(
      null,
      "Actualización realizada",
      `El estado de usuario ${payload.nombre} fue actualizado`
    );
  } catch (error) {
    throw error;
  }
};

export const getEstadosUsuario = async () => {
  try {
    const result = await EstadoUsuarioRepo.getEstadosUsuario();

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const getEstadoUsuario = async (id) => {
  try {
    const result = await EstadoUsuarioRepo.getEstadoUsuario(id);

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const existEstadoUsuario = async (id) => {
  try {
    const result = await EstadoUsuarioRepo.existsEstadoUsuario(id);

    return result;
  } catch (error) {
    throw error;
  }
};
