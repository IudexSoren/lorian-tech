import * as ComponenteRepo from "../../repositories/usuarios/ComponenteRepo.js";
import * as PermisoRepo from "../../repositories/usuarios/PermisoRepo.js";
import { existsUsuario } from "../../repositories/usuarios/UsuariosRepo.js";
import * as Permiso_ComponenteRepo from "../../repositories/usuarios/Permiso_ComponenteRepo.js";
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
import successfulResponse from "../../config/responses/successfulResponse.js";
import * as ComponenteModel from "../../models/usuarios/ComponenteModels.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";

export const insertComponente = async (payload) => {
  try {
    const validationResult = validateSchema(
      ComponenteModel.insertComponente,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (payload.idComponentePadre && !await existComponente(payload.idComponentePadre))
      throw new NotFoundException("El componente solicitado no existe");

    if (payload.idComponentePadre === '') payload.idComponentePadre = null;

    for (const idPermiso of payload.permisos) {
      // Verificar que el permiso solicitado exista
      if (!await PermisoRepo.existsPermiso(idPermiso))
        throw new NotFoundException('El permiso solicitado no existe');
    }

    const result = await ComponenteRepo.insertComponente(payload);

    return successfulResponse(
      result,
      "Creación realizada",
      `El componente ${payload.nombre} fue creado`
    );
  } catch (error) {
    throw error;
  }
};

export const updateComponente = async (payload) => {
  try {
    const validationResult = validateSchema(
      ComponenteModel.updateComponente,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!await existComponente(payload.id))
      throw new NotFoundException("El componente solicitado no existe");

    if (payload.idComponentePadre && !await existComponente(payload.idComponentePadre))
      throw new NotFoundException("El componente solicitado no existe");

    if (payload.idComponentePadre === '') payload.idComponentePadre = null;

    await ComponenteRepo.updateComponente(payload);

    const permisos = await Permiso_ComponenteRepo.getPermisosByComponente(payload.id);

    return successfulResponse(
      permisos,
      "Actualización realizada",
      `El componente ${payload.nombre} fue actualizado`
    );
  } catch (error) {
    throw error;
  }
};

export const getComponentes = async (payload) => {
  try {
    const result = await ComponenteRepo.getComponentes(payload);
    for (const componente of result) {
      componente.permisos = await Permiso_ComponenteRepo.getPermisosByComponente(componente.id);
    }

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const getComponente = async (id) => {
  try {
    const result = await ComponenteRepo.getComponente(id);
    if (result) {
      result.permisos = await Permiso_ComponenteRepo.getPermisosByComponente(result.id);
    }

    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

export const checkAccess = async (idComponente, usuario) => {
  try {
    if (!idComponente || !usuario) throw new BadRequestException();

    const componente = await (await getComponente(idComponente)).data;
    if (!componente) throw new BadRequestException();

    const hijosComponente = await (await getComponentes({ idComponentePadre: idComponente })).data;
    const access = {
      [idComponente]: false
    }

    if (!await existsUsuario({ id: usuario.id, nombreUsuario: usuario.nombreUsuario })) throw new AccessDeniedException();

    let hasAccess = false;
    for (const permisoComponente of componente.permisos) {
      const { idPermiso } = permisoComponente;
      hasAccess = usuario.permisos.includes(idPermiso);
      if (!hasAccess) break;
    }
    access[idComponente] = hasAccess;

    for (const hijo of hijosComponente) {
      const { id, permisos } = hijo;
      let hasChildAccess = false
      for (const permisoHijo of permisos) {
        const { idPermiso: idPermisoHijo } = permisoHijo;
        hasChildAccess = usuario.permisos.includes(idPermisoHijo);
        if (!hasChildAccess) break;
      }
      access[id] = hasChildAccess;
    }

    return successfulResponse(access);
  } catch (error) {
    throw error;
  }
}

export const existComponente = async (id) => {
  try {
    const result = await ComponenteRepo.existsComponente(id);

    return result;
  } catch (error) {
    throw error;
  }
};
