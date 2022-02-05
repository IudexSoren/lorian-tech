import * as PermisoRepo from "../../repositories/usuarios/PermisoRepo.js";
import * as Rol_PermisoRepo from "../../repositories/usuarios/Rol_PermisoRepo.js";
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import successfulResponse from "../../config/responses/successfulResponse.js";
import * as PermisoModel from "../../models/usuarios/PermisoModels.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";

export const insertPermiso = async (payload) => {
  try {
    const validationResult = validateSchema(
      PermisoModel.insertPermiso,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    const result = await PermisoRepo.insertPermiso(payload);

    return successfulResponse(
      result,
      "Creación realizada",
      `El permiso ${payload.nombre} fue creado`
    );
  } catch (error) {
    throw error;
  }
};

export const updatePermiso = async (payload) => {
  try {
    const validationResult = validateSchema(
      PermisoModel.updatePermiso,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!await existPermiso(payload.id))
      throw new NotFoundException("El permiso solicitado no existe");

    await PermisoRepo.updatePermiso(payload);

    return successfulResponse(
      null,
      "Actualización realizada",
      `El permiso ${payload.nombre} fue actualizado`
    );
  } catch (error) {
    throw error;
  }
};

export const getPermisos = async (payload) => {
  try {
    const result = await PermisoRepo.getPermisos(payload);
    for (const permiso of result) {
      permiso.roles = await Rol_PermisoRepo.getRolesByPermiso(permiso.id);
    }

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const getPermiso = async (id) => {
  try {
    const result = await PermisoRepo.getPermiso(id);

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const existPermiso = async (id) => {
  try {
    const result = await PermisoRepo.existsPermiso(id);

    return result;
  } catch (error) {
    throw error;
  }
};
