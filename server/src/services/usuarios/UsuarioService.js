// Repositorios
import * as UsuarioRepo from "../../repositories/usuarios/UsuariosRepo.js";
import * as EstadoUsuarioRepo from "../../repositories/usuarios/EstadoUsuarioRepo.js";
import * as RolRepo from "../../repositories/usuarios/RolRepo.js";
import * as Rol_PermisoRepo from "../../repositories/usuarios/Rol_PermisoRepo.js";
import * as PermisoRepo from "../../repositories/usuarios/PermisoRepo.js";
import * as CodigoCambioClaveRepo from '../../repositories/usuarios/CodigoCambioClaveRepo.js';
// Servicios
import * as CodigoCambioClaveService from "../../services/usuarios/CodigoCambioClaveService.js";
// Excepciones
import BadRequestException from "../../config/exceptions/BadRequestException.js";
import BadCredentialsException from "../../config/exceptions/BadCredentialsException.js";
import AccessDeniedException from "../../config/exceptions/AccessDeniedException.js";
import NotFoundException from "../../config/exceptions/NotFoundException.js";
import ServerException from "../../config/exceptions/ServerException.js";
// Otros
import successfulResponse from "../../config/responses/successfulResponse.js";
import * as UsuarioModel from "../../models/usuarios/UsuarioModels.js";
import * as UsuarioHelper from "../../helpers/usuarios/UsuariosHelper.js";
import * as DatesHelper from "../../helpers/DatesHelper.js";
import validateSchema from "../../helpers/joiValidationsHelper.js";
import * as ENTITIES_STATES from '../../constants/ENTITIES_STATES.js';

/**
 * Creación de un nuevo usuario
 * @param { Object } payload
 * @param { String } payload.nombreUsuario
 * @param { String } payload.clave
 * @param { String } payload.claveConfirmacion
 * @param { File } payload.imagen
 * @param { Number } payload.tiempoSesion - En minutos
 * @param { Number } payload.idRol
 * @param { Array } payload.permisos
 * @property { String } payload.rutaImagen
 * @property { String } payload.createdAt
 * @returns Object
 */
export const insertUsuario = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.insertUsuario,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    // Verificar que el rol solicitado exista
    if (!(await RolRepo.existsRol(payload.idRol)))
      throw new NotFoundException("El rol solicitado no existe");

    // Verificar que el nombre de usuario solicitado esté disponible
    if (
      await UsuarioRepo.existsUsuario({ nombreUsuario: payload.nombreUsuario })
    )
      throw new BadRequestException(
        `El nombre de usuario ${payload.nombreUsuario} ya está en uso`,
        "Nombre de usuario no disponible"
      );

    // Verificar que las contraseñas coincidan
    if (payload.clave !== payload.claveConfirmacion)
      throw new BadRequestException(
        "Las contraseñas no coinciden",
        "Contraseñas desiguales"
      );

    for (const idPermiso of payload.permisos) {
      // Verificar que el permiso solicitado exista
      if (!await PermisoRepo.existsPermiso(idPermiso))
        throw new NotFoundException('El permiso solicitado no existe');

      // Verificar que el permiso sea asignable al rol solicitado
      if (!await Rol_PermisoRepo.existRolPermiso({ idRol: payload.idRol, idPermiso }))
        throw new BadRequestException('El permiso solicitado no puede ser asignado al rol solicitado');
    }

    // Establecer la fecha actual como la fecha de creación
    payload.createdAt = DatesHelper.mysqlDateFormat();

    // Guardar imagen del usuario
    if (payload.imagen) {
      payload.rutaImagen = await UsuarioHelper.uploadUserImage(
        payload.imagen,
        payload.nombreUsuario
      );
    }

    // Establecer el tiempo de sesión del usuario en segundos
    payload.tiempoSesion = UsuarioHelper.setTiempoSesion(payload.tiempoSesion);

    // Eliminar datos innecesarios
    delete payload.imagen;
    delete payload.claveConfirmacion;

    // Crear usuario
    const result = await UsuarioRepo.insertUsuario(payload);

    // Obtener la información del nuevo usuario
    let newUser = await UsuarioRepo.getUsuario({
      id: result
    });
    newUser = await UsuarioHelper.completeUsuario(newUser);

    // Retornar la información del usuario creado
    return successfulResponse({
      ...newUser
    },
      'Creación realizada',
      `El usuario ${payload.nombreUsuario} fue creado y registrado con el rol ${newUser.rol.nombre}`);
  } catch (error) {
    try {
      if (payload.rutaImagen) {
        // Eliminar la imagen del usuario en caso de que exista
        await UsuarioHelper.deleteUserImage(payload.rutaImagen);
      }
    } catch (deleteUserImageError) {
      throw deleteUserImageError;
    }

    throw error;
  }
};

/**
 * Actualizar usuario
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { Number } payload.tiempoSesion - En minutos
 * @param { File } payload.imagen
 * @param { Number } payload.idRol
 * @param { Array } payload.permisos
 * @property { String } payload.rutaImagen
 * @property { String } payload.createdAt
 * @returns Object
 */
export const updateUsuario = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.updateUsuario,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!payload.id && !payload.nombreUsuario) throw new BadRequestException();

    // Verificar que el rol solicitado exista
    if (!(await RolRepo.existsRol(payload.idRol)))
      throw new NotFoundException("El rol solicitado no existe");

    // Verificar que el usuario exista
    const usuario = await UsuarioRepo.getUsuario({ id: payload.id, nombreUsuario: payload.nombreUsuario })
    if (
      !usuario
    )
      throw new NotFoundException("El usuario solicitado no existe");

    if (usuario.idEstadoUsuario !== ENTITIES_STATES.ACTIVADO)
      throw new BadRequestException('El usuario solicitado se encuenta bloqueado o desactivado, por esta razón no puede ser actualizado');

    for (const idPermiso of payload.permisos) {
      // Verificar que el permiso solicitado exista
      if (!await PermisoRepo.existsPermiso(idPermiso))
        throw new NotFoundException('El permiso solicitado no existe');

      // Verificar que el permiso sea asignable al rol solicitado
      if (!await Rol_PermisoRepo.existRolPermiso({ idRol: payload.idRol, idPermiso }))
        throw new BadRequestException('El permiso solicitado no puede ser asignado al rol solicitado');
    }

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Guardar imagen del usuario
    if (payload.imagen) {
      payload.rutaImagen = await UsuarioHelper.uploadUserImage(
        payload.imagen,
        payload.nombreUsuario
      );
    }

    // Establecer el tiempo de sesión del usuario en segundos
    payload.tiempoSesion = UsuarioHelper.setTiempoSesion(payload.tiempoSesion);

    // Eliminar datos innecesarios
    delete payload.imagen;

    // Actualizar usuario
    await UsuarioRepo.updateUsuario(payload);

    // Obtener el usuario acualizado
    let updatedUser = await UsuarioRepo.getUsuario({
      id: payload.id,
      nombreUsuario: payload.nombreUsuario
    });
    updatedUser = await UsuarioHelper.completeUsuario(updatedUser);

    // Retornar la información del usuario actualizado
    return successfulResponse({
      ...updatedUser
    },
      'Actualización realizada',
      `El usuario ${payload.nombreUsuario} fue actualizado`);
  } catch (error) {
    try {
      if (payload.rutaImagen) {
        // Eliminar la imagen del usuario en caso de que exista
        await UsuarioHelper.deleteUserImage(payload.rutaImagen);
      }
    } catch (deleteUserImageError) {
      throw deleteUserImageError;
    }

    throw error;
  }
};

/**
 * Actualizar la contraseña del usuario por medio del código
 * @param { Object } payload
 * @param { String } payload.nombreUsuario
 * @param { String } payload.clave
 * @param { String } payload.claveConfirmacion
 * @param { String } payload.codigo
 * @return Object
 */
export const updateUsuarioClaveByCodigo = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.updateUsuarioClaveByCodigo,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    // Verificar que el usuario exista
    const usuario = await UsuarioRepo.getUsuario({ nombreUsuario: payload.nombreUsuario })
    if (
      !usuario
    )
      throw new NotFoundException("El usuario solicitado no existe");

    // Verificar que las contraseñas coincidan
    if (payload.clave !== payload.claveConfirmacion)
      throw new BadRequestException(
        "Las contraseñas no coinciden",
        "Contraseñas desiguales"
      );

    // Verificar que el código digitado sea válido
    const { codigo } = payload;
    const idUsuario = usuario.id;
    await CodigoCambioClaveService.isCodigoValido({
      idUsuario, codigo
    });

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Reiniciar contador de intentos
    payload.action = "Reset";
    await UsuarioRepo.updateUsuarioIntentos(payload);
    delete payload.action;

    // Establecer el código como usado
    await CodigoCambioClaveService.usarCodigo(payload.codigo);
    // Actualizar usuario
    await UsuarioRepo.updateUsuarioClave(payload);

    let updatedUser = await UsuarioRepo.getUsuario({
      id: payload.id,
      nombreUsuario: payload.nombreUsuario
    });
    updatedUser = await UsuarioHelper.completeUsuario(updatedUser);

    // Retornar la información del usuario actualizado
    return successfulResponse({
      ...updatedUser
    },
      'Cuenta habilitada y contraseña actualizada',
      `Esta cuenta ha sido habilitada. La contraseña para el usuario ${usuario.nombreUsuario} ha sido reestablecida exitosamente`);
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar la contraseña del usuario
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { String } payload.claveActual
 * @param { String } payload.clave
 * @param { String } payload.claveConfirmacion
 * @return Object
 */
export const updateUsuarioClave = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.updateUsuarioClave,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Verificar si las credenciales son correctas
    const { nombreUsuario, claveActual } = payload;
    const usuario = await UsuarioRepo.login({ nombreUsuario, clave: claveActual })
    if (
      !usuario
    ) {
      // Verificar si existe el usuario para aumentar su contador de intentos fallidos
      const usuarioExiste = await UsuarioRepo.getUsuario({
        nombreUsuario,
      });
      if (usuarioExiste) {
        // Sumar uno al contador de intentos fallidos del usuario
        await UsuarioRepo.updateUsuarioIntentos({
          id: usuarioExiste.id,
          modifiedAt: payload.modifiedAt,
          action: "Add",
        });

        if (usuarioExiste.intentos === 2) {
          // Bloqueo de la cuenta si su número de intentos era igual a 2 antes de aumentar
          await UsuarioRepo.updateUsuarioEstado({
            id: usuarioExiste.id,
            modifiedAt: payload.modifiedAt,
            idEstadoUsuario: 3,
          });

          throw new AccessDeniedException(
            `Demasiados intentos fallidos. ${usuarioExiste.nombreUsuario} ha sido bloqueado`,
            "Cuenta bloqueada"
          );
        }
      }

      // Lanzamiento de excepción si ambas credenciales fueron incorrectas
      throw new BadCredentialsException("La contraseña actual es incorrecta");
    }

    // Verificar que las contraseñas coincidan
    if (payload.clave !== payload.claveConfirmacion)
      throw new BadRequestException(
        "Las contraseñas no coinciden",
        "Contraseñas desiguales"
      );

    delete payload.claveActual;

    // Actualizar usuario
    await UsuarioRepo.updateUsuarioClave(payload);

    // Retornar el mensaje informando que el cambio fue realizado
    return successfulResponse(null,
      'Contraseña actualizada',
      `${usuario.nombreUsuario}, su contraseña ha sido reestablecida exitosamente`);
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar el estado de un usuario
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { Number } payload.idEstadoUsuario
 * @returns Object
 */
export const updateUsuarioEstado = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.updateUsuarioEstado,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!payload.id && !payload.nombreUsuario) throw new BadRequestException();

    // Verificar que el estado de usuario solicitado exista
    if (!(await EstadoUsuarioRepo.existsEstadoUsuario(payload.idEstadoUsuario)))
      throw NotFoundException("El estado solicitado no existe");

    // Verificar que el usuario exista
    if (
      !await existUsuario({
        id: payload.id,
        nombreUsuario: payload.nombreUsuario,
      })
    )
      throw new NotFoundException("El usuario solicitado no existe");

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Reiniciar contador de intentos si el usuario fue activado
    if (payload.idEstadoUsuario === ENTITIES_STATES.ACTIVADO) {
      payload.action = "Reset";
      await UsuarioRepo.updateUsuarioIntentos(payload);
      delete payload.action;
    }

    // Actualizar usuario
    await UsuarioRepo.updateUsuarioEstado(payload);

    let updatedUser = await UsuarioRepo.getUsuario({
      id: payload.id,
      nombreUsuario: payload.nombreUsuario
    });
    updatedUser = await UsuarioHelper.completeUsuario(updatedUser);

    // Retornar la información del usuario actualizado
    return successfulResponse({
      ...updatedUser
    },
      'Actualización realizada',
      `El estado del usuario ${payload.nombreUsuario} fue actualizado`);
  } catch (error) {
    throw error;
  }
};

export const updateUsuarioImagen = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.updateUsuarioImagen,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!payload.id && !payload.nombreUsuario) throw new BadRequestException();

    // Verificar que el usuario exista
    if (
      !await existUsuario({
        id: payload.id,
        nombreUsuario: payload.nombreUsuario,
      })
    )
      throw new NotFoundException("El usuario solicitado no existe");

    // Guardar imagen del usuario
    if (payload.imagen) {
      payload.rutaImagen = await UsuarioHelper.uploadUserImage(
        payload.imagen,
        payload.nombreUsuario
      );
    }

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Realizar el cambio de imagen del usuario
    await UsuarioRepo.updateUsuarioImagen(payload);

    // Obtener la información del usuario
    let updatedUser = await UsuarioRepo.getUsuario({
      id: payload.id
    });
    updatedUser = await UsuarioHelper.completeUsuario(updatedUser);

    // Retornar la información del usuario
    return successfulResponse({
      ...updatedUser
    },
      'Imagen de perfil actualizada',
      `La imagen de perfil ha sido actualizada`);
  } catch (error) {
    try {
      if (payload.rutaImagen) {
        // Eliminar la imagen del usuario en caso de que exista
        await UsuarioHelper.deleteUserImage(payload.rutaImagen);
      }
    } catch (deleteUserImageError) {
      throw deleteUserImageError;
    }

    throw error;
  }
}

export const deleteUsuarioImagen = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.deleteUsuarioImagen,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    if (!payload.id && !payload.nombreUsuario) throw new BadRequestException();

    // Verificar que el usuario exista
    const usuario = await UsuarioRepo.getUsuario({
      id: payload.id,
      nombreUsuario: payload.nombreUsuario,
    });

    if (
      !usuario
    )
      throw new NotFoundException("El usuario solicitado no existe");

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Eliminar la imagen del usuario en caso de que exista
    if (usuario.rutaImagen)
      await UsuarioHelper.deleteUserImage(usuario.rutaImagen);

    // Eliminar el registro de la imagen del usuario
    await UsuarioRepo.deleteUsuarioImagen(payload);


    // Obtener la información del usuario
    let updatedUser = await UsuarioRepo.getUsuario({
      id: payload.id
    });
    updatedUser = await UsuarioHelper.completeUsuario(updatedUser);

    // Retornar la información del usuario
    return successfulResponse({
      ...updatedUser
    },
      'Imagen de perfil eliminada',
      `La imagen de perfil ha sido eliminada`);
  } catch (error) {
    throw error;
  }
}

/**
 * Desactiva un usuario
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { String } payload.clave
 * @returns Object
 */
export const deactivateUser = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(
      UsuarioModel.deactivateUser,
      payload
    );
    if (!validationResult.isValid) throw new BadRequestException();

    // Establecer la fecha actual como la fecha de modificación
    payload.modifiedAt = DatesHelper.mysqlDateFormat();

    // Verificar si las credenciales son correctas
    const { id, nombreUsuario, clave } = payload;
    delete payload.clave;
    const usuario = await UsuarioRepo.login({ nombreUsuario, clave });
    if (!usuario) throw new BadCredentialsException();

    // Generar código sin expiración para el cambio de contraseña
    const response = await CodigoCambioClaveService.insertCodigoCambioClave({
      id, nombreUsuario, expira: false
    });

    // Actualizar usuario
    payload.idEstadoUsuario = 2;
    await UsuarioRepo.updateUsuarioEstado(payload);

    // Retorna el código creado
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Obtener la lista de los usuarios que cumplan con las condiciones
 * @param { Object } payload
 * @param { String } payload.nombreUsuario
 * @param { Number } payload.idRol
 * @param { Number } payload.idEstadoUsuario
 * @returns Array(Usuario)
 */
export const getUsuarios = async (payload) => {
  try {
    const usuarios = [];
    // Obtener usuarios
    const result = await UsuarioRepo.getUsuarios(payload);

    for (let usuario of result) {
      // Completar el usuario
      const usuarioCompleto = await UsuarioHelper.completeUsuario(usuario);
      usuario = {
        ...usuario,
        ...usuarioCompleto,
      };

      usuarios.push(usuario);
    }

    // Retornar la lista de usuarios
    return successfulResponse(usuarios);
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener un usuario que cumpla con las condiciones
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @returns Usuario
 */
export const getUsuario = async (payload) => {
  try {
    if (!payload.id || !payload.nombreUsuario) throw new BadRequestException();

    // Obtener usuario
    let result = await UsuarioRepo.getUsuario(payload);

    if (result) {
      // Completar el usuario
      await UsuarioHelper.completeUsuario(result);
    }

    // Retornar el usuario solicitado
    return successfulResponse(result);
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener el usuario junto con un token de sesión si las credenciales son correctas
 * @param { Object } payload
 * @param { String } payload.nombreUsuario
 * @param { String } payload.clave
 * @returns Usuario
 */
export const login = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(UsuarioModel.login, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    // Establecer la fecha actual como la fecha de modificación
    const modifiedAt = DatesHelper.mysqlDateFormat();

    // Verificar si las credenciales son correctas
    let usuarioLogin = await UsuarioRepo.login(payload);
    if (!usuarioLogin) {
      // Verificar si existe el usuario para aumentar su contador de intentos fallidos
      const usuarioExiste = await UsuarioRepo.getUsuario({
        nombreUsuario: payload.nombreUsuario,
      });
      if (usuarioExiste) {
        // Sumar uno al contador de intentos fallidos del usuario
        await UsuarioRepo.updateUsuarioIntentos({
          id: usuarioExiste.id,
          modifiedAt,
          action: "Add",
        });

        if (usuarioExiste.intentos === 2) {
          // Bloqueo de la cuenta si su número de intentos era igual a 2 antes de aumentar
          await UsuarioRepo.updateUsuarioEstado({
            id: usuarioExiste.id,
            modifiedAt,
            idEstadoUsuario: 3,
          });

          throw new BadCredentialsException(
            `Demasiados intentos fallidos. ${usuarioExiste.nombreUsuario} ha sido bloqueado`,
            "Cuenta bloqueada"
          );
        }
      }

      // Lanzamiento de excepción si ambas credenciales fueron incorrectas
      throw new BadCredentialsException();
    }

    if (usuarioLogin.idEstadoUsuario === ENTITIES_STATES.DESACTIVADO || usuarioLogin.idEstadoUsuario === ENTITIES_STATES.BLOQUEADO)
      // Negar el acceso si la cuenta está bloqueada
      throw new AccessDeniedException(
        `Esta cuenta no está disponible`,
        "Acceso denegado"
      );

    // Reinicio del contador de intentos fallidos
    await UsuarioRepo.updateUsuarioIntentos({
      id: usuarioLogin.id,
      modifiedAt,
      action: "Reset",
    });

    // Completar el usuario
    await UsuarioHelper.completeUsuario(usuarioLogin);

    // Crear token de autenticación
    const { id, nombreUsuario, tiempoSesion, idRol, permisos } = usuarioLogin;
    usuarioLogin.token = UsuarioHelper.generateJWT({
      id,
      nombreUsuario,
      tiempoSesion,
      idRol,
      permisos
    });

    // Deshabilitar códigos de cambio de contraseña del usuario
    await CodigoCambioClaveRepo.updateDisponiblesCodigoCambioClaveByUsuario(usuarioLogin.id);

    // Credenciales correctas, se retorna el usuario solicitado junto con su token de autenticación
    return successfulResponse(usuarioLogin);
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener el usuario junto con un nuevo token de sesión
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @param { String } payload.clave
 * @param { Number } payload.idRol
 * @param { Number } payload.tiempoSesion
 * @returns Usuario
 */
export const refreshToken = async (payload) => {
  try {
    // Validación de los datos
    const validationResult = validateSchema(UsuarioModel.refreshToken, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    const { id, nombreUsuario } = payload;
    if (!await UsuarioRepo.existsUsuario({ id, nombreUsuario }))
      throw new NotFoundException("El usuario solicitado no existe");

    let usuario = await getUsuario({
      id, nombreUsuario
    });
    usuario = usuario.data;

    if (usuario.idEstadoUsuario !== ENTITIES_STATES.ACTIVADO)
      // Negar el acceso si la cuenta está bloqueada
      throw new AccessDeniedException(
        `El usuario ${usuario.nombreUsuario} no está disponible debido a que
        únicamente se permite el acceso al sistema a cuentas activadas`,
        "Acceso denegado"
      );

    const { tiempoSesion, idRol, permisos } = usuario;
    usuario.token = UsuarioHelper.generateJWT({
      id,
      nombreUsuario,
      tiempoSesion,
      idRol,
      permisos
    });

    return successfulResponse(usuario);
  } catch (error) {
    throw error;
  }
}

/**
 * Conocer si el usuario especificado existe
 * @param { Object } payload
 * @param { Number } payload.id
 * @param { String } payload.nombreUsuario
 * @returns boolean
 */
export const existUsuario = async (payload) => {
  try {
    const validationResult = validateSchema(UsuarioModel.existUsuario, payload);
    if (!validationResult.isValid) throw new BadRequestException();

    if (!payload.id && !payload.nombreUsuario) throw new BadRequestException();

    // Obtener el usuario solicitado
    const result = await UsuarioRepo.existsUsuario(payload);

    return result;
  } catch (error) {
    throw error;
  }
};
