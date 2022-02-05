import * as RolRepo from "../../repositories/usuarios/RolRepo.js";
import * as PermisoRepo from "../../repositories/usuarios/PermisoRepo.js";
import * as Rol_PermisoRepo from "../../repositories/usuarios/Rol_PermisoRepo.js";
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import successfulResponse from "../../config/responses/successfulResponse.js";
import * as RolModel from "../../models/usuarios/RolModels.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";

export const insertRol = async (payload) => {
  try {
    const validationResult = validateSchema(RolModel.insertRol, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    for (const idPermiso of payload.permisos) {
      // Verificar que el permiso solicitado exista
      if (!await PermisoRepo.existsPermiso(idPermiso))
        throw new NotFoundException('El permiso solicitado no existe');
    }

    const result = await RolRepo.insertRol(payload);

    return successfulResponse(
      result,
      "Creación realizada",
      `El rol ${payload.nombre} fue creado`
    );
  } catch (error) {
    throw error;
  }
};

export const updateRol = async (payload) => {
  try {
    const validationResult = validateSchema(RolModel.updateRol, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    if (!await existRol(payload.id))
      throw new NotFoundException("El rol solicitado no existe");

    for (const idPermiso of payload.permisos) {
      // Verificar que el permiso solicitado exista
      if (!await PermisoRepo.existsPermiso(idPermiso))
        throw new NotFoundException('El permiso solicitado no existe');
    }

    await RolRepo.updateRol(payload);

    const permisos = await Rol_PermisoRepo.getPermisosByRol(payload.id);

    return successfulResponse(
      permisos,
      "Actualización realizada",
      `El rol ${payload.nombre} fue actualizado`
    );
  } catch (error) {
    throw error;
  }
};

export const getRoles = async (payload) => {
  try {
    const result = await RolRepo.getRoles(payload);
    for (const rol of result) {
      rol.permisos = await Rol_PermisoRepo.getPermisosByRol(rol.id);
    }

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const getRol = async (id) => {
  try {
    const result = await RolRepo.getRol(id);
    if (result) {
      result.permisos = await Rol_PermisoRepo.getPermisosByRol(result.id);
    }

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const existRol = async (id) => {
  try {
    const result = await RolRepo.existsRol(id);

    return result;
  } catch (error) {
    throw error;
  }
};
