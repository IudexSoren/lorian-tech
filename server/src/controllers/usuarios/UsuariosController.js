import { createLogger } from "../../config/logger.js";
import * as UsuarioService from "../../services/usuarios/UsuarioService.js";
import * as UsuariosSockets from '../../sockets/security/UsuariosSockets.js';
import { USUARIOS_FOLDER_NAME } from "../../constants/ENTITY_FOLDER_NAMES.js";
import * as ENTITIES_STATES from '../../constants/ENTITIES_STATES.js';
import errorResponse from "../../config/responses/errorResponse.js";
import { tokenExpires } from "../../helpers/usuarios/UsuariosHelper.js";

import { USUARIO__ACTUALIZAR, USUARIO__INSERTAR, USUARIO__LISTAR, USUARIO__ACTIVAR_DESACTIVAR_BLOQUEAR, ARCHIVO__CARGAR, ARCHIVO__LECTURA } from "../../constants/PERMISSIONS.js";
import { checkPermissions } from '../../helpers/usuarios/UsuariosHelper.js';
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";

const logger = createLogger("USUARIO_CONTROLLER", USUARIOS_FOLDER_NAME);

export const insertUsuario = async (req, res) => {
  try {
    const PERMISOS_REQUERIDOS = [USUARIO__INSERTAR];
    let imagen = null;
    if (req.files) {
      imagen = req.files.imagen;
      PERMISOS_REQUERIDOS.push(ARCHIVO__CARGAR);
    };

    if (!checkPermissions(req.usuario.permisos, PERMISOS_REQUERIDOS))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    let {
      nombreUsuario,
      clave,
      claveConfirmacion,
      tiempoSesion,
      idRol,
      permisos
    } = req.body;


    if (permisos) {
      permisos = permisos.split(',');
    }

    const result = await UsuarioService.insertUsuario({
      nombreUsuario,
      clave,
      claveConfirmacion,
      tiempoSesion,
      imagen,
      idRol,
      permisos
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const PERMISOS_REQUERIDOS = [USUARIO__ACTUALIZAR];
    let imagen = null;
    if (req.files) {
      imagen = req.files.imagen;
      PERMISOS_REQUERIDOS.push(ARCHIVO__CARGAR);
    };

    if (!checkPermissions(req.usuario.permisos, PERMISOS_REQUERIDOS))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    let { nombreUsuario, tiempoSesion, idRol, permisos } = req.body;

    if (permisos) {
      permisos = permisos.split(',');
    }

    const result = await UsuarioService.updateUsuario({
      id,
      nombreUsuario,
      tiempoSesion,
      imagen,
      idRol,
      permisos
    });

    return res
      .status(200)
      .send(
        result
      );
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateUsuarioClaveByCodigo = async (req, res) => {
  try {
    const { nombreUsuario, clave, claveConfirmacion, codigo } = req.body;

    const result = await UsuarioService.updateUsuarioClaveByCodigo({
      nombreUsuario,
      clave,
      claveConfirmacion,
      codigo
    });

    return res
      .status(200)
      .send(
        result
      );
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateUsuarioClave = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [USUARIO__ACTUALIZAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id, nombreUsuario } = req.usuario;
    const { claveActual, clave, claveConfirmacion } = req.body;

    const result = await UsuarioService.updateUsuarioClave({
      id,
      nombreUsuario,
      claveActual,
      clave,
      claveConfirmacion,
    });

    return res
      .status(200)
      .send(
        result
      );
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateUsuarioEstado = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [USUARIO__ACTIVAR_DESACTIVAR_BLOQUEAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const { nombreUsuario, idEstadoUsuario } = req.body;

    const result = await UsuarioService.updateUsuarioEstado({
      id,
      nombreUsuario,
      idEstadoUsuario,
    });

    if (idEstadoUsuario !== ENTITIES_STATES.ACTIVADO || idEstadoUsuario !== ENTITIES_STATES.DESACTIVADO) {
      await UsuariosSockets.logoutUser(null, nombreUsuario, id);
    }

    return res
      .status(200)
      .send(
        result
      );
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const updateUsuarioImagen = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ARCHIVO__CARGAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    let imagen = null;
    if (req.files) {
      imagen = req.files.imagen;
    };

    const { id } = req.params;
    const { nombreUsuario } = req.usuario;

    const result = await UsuarioService.updateUsuarioImagen({
      id, nombreUsuario, imagen
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}

export const deleteUsuarioImagen = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [ARCHIVO__CARGAR]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    let { nombreUsuario } = req.body;
    if (!nombreUsuario)
      nombreUsuario = req.usuario.nombreUsuario;

    const result = await UsuarioService.deleteUsuarioImagen({
      id, nombreUsuario
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}

export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreUsuario, clave } = req.body;

    const result = await UsuarioService.deactivateUser({
      id, nombreUsuario, clave
    });

    setTimeout(async () => {
      await UsuariosSockets.logoutUser(null, nombreUsuario, id);
    }, 20000);

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}

export const getUsuarios = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [USUARIO__LISTAR, ARCHIVO__LECTURA]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { nombresUsuario, idsRol, idsEstadoUsuario } = req.body;

    const result = await UsuarioService.getUsuarios({
      nombresUsuario,
      idsRol,
      idsEstadoUsuario,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const getUsuario = async (req, res) => {
  try {
    if (!checkPermissions(req.usuario.permisos, [USUARIO__LISTAR, ARCHIVO__LECTURA]))
      throw new AccessDeniedException('Se requiere la debida autorización para realizar esta acción', 'Acceso denegado');

    const { id } = req.params;
    const { nombreUsuario } = req.body;

    const result = await UsuarioService.getUsuario({
      id,
      nombreUsuario,
    });

    return res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const login = async (req, res) => {
  try {
    const { nombreUsuario, clave } = req.body;

    const result = await UsuarioService.login({
      nombreUsuario,
      clave,
    });

    const { token } = result.data;
    delete result.data.token;

    const expires = tokenExpires(result.data.tiempoSesion);

    return res
      .cookie("ocelot-access-token", token, {
        httpOnly: true,
        sameSite: "strict",
        expires
      })
      .status(200)
      .send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const logout = async (req, res) => {
  try {
    req.usuario = undefined;

    return res
      .clearCookie("ocelot-access-token")
      .status(200)
      .send(
        null
      );
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export const refreshToken = async (req, res) => {
  try {
    const usuario = req.usuario;
    const result = await UsuarioService.refreshToken(usuario);
    const { token } = result.data;
    delete result.data.token;

    const expires = tokenExpires(result.data.tiempoSesion);

    return res
      .cookie("ocelot-access-token", token, {
        httpOnly: true,
        sameSite: "strict",
        expires
      })
      .status(200)
      .send(result);
  } catch (error) {
    logger.error(error);
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
}
