import dotenv from "dotenv";
import connection from "../../config/dbConnection.js";
import * as Usuario_PermisoRepo from './Usuario_PermisoRepo.js';
import * as ENTITIES_STATES from '../../constants/ENTITIES_STATES.js';

dotenv.config();

export const insertUsuario = async ({
  nombreUsuario,
  clave,
  rutaImagen,
  tiempoSesion,
  createdAt,
  idRol,
  permisos
}) => {
  try {
    let newId = null;
    await connection.transaction();
    const result = await connection.query(
      "INSERT INTO \
      usuario \
      (nombreUsuario, clave, rutaImagen, tiempoSesion, createdAt, intentos, idRol, idEstadoUsuario) \
      VALUES (?, AES_ENCRYPT(?, UNHEX(SHA2(?, 512))), ?, ?, ?, 0, ?, ?)", [
      nombreUsuario,
      clave,
      process.env.SECRET_DB_ENCRYPT,
      rutaImagen,
      tiempoSesion,
      createdAt,
      idRol,
      ENTITIES_STATES.DESACTIVADO
    ]
    );
    newId = result.insertId;

    for (const idPermiso of permisos) {
      await Usuario_PermisoRepo.insertUsuarioPermiso(connection, {
        idUsuario: newId,
        idPermiso
      });
    }

    await connection.commit();

    return newId;
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      throw rollbackError;
    }

    throw error;
  }
};

export const updateUsuario = async ({
  id,
  nombreUsuario,
  tiempoSesion,
  rutaImagen,
  modifiedAt,
  idRol,
  permisos
}) => {
  try {
    const queryImagen = rutaImagen ? ', rutaImagen = ? ' : '';
    const params = rutaImagen ? [rutaImagen] : []

    await connection.transaction();
    const result = await connection.query(
      "UPDATE \
        usuario SET \
        idRol = ?, tiempoSesion = ?" + queryImagen + ", modifiedAt = ?\
        WHERE (id = ? OR nombreUsuario = ?) AND idEstadoUsuario = ?", [idRol, tiempoSesion, ...params, modifiedAt, id, nombreUsuario, ENTITIES_STATES.ACTIVADO]
    );

    let permisosActuales = await Usuario_PermisoRepo.getPermisosByUsuario(id);
    permisosActuales = permisosActuales.map(pa => pa.idPermiso);

    for (const permisoActual of permisosActuales) {
      if (!permisos.includes(permisoActual.toString())) {
        await Usuario_PermisoRepo.deleteUsuarioPermiso(connection, {
          idUsuario: id,
          idPermiso: permisoActual
        });
      }
    }
    for (const idPermiso of permisos) {
      if (!await Usuario_PermisoRepo.existUsuarioPermiso({ idUsuario: id, idPermiso })) {
        await Usuario_PermisoRepo.insertUsuarioPermiso(connection, {
          idUsuario: id,
          idPermiso
        });
      }
    }

    await connection.commit();

    return result.affectedRows;
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      throw rollbackError;
    }

    throw error;
  };
}

export const updateUsuarioClave = async ({
  id,
  nombreUsuario,
  modifiedAt,
  clave,
}) => {
  try {
    const result = await connection.query(
      "UPDATE \
      usuario SET \
      clave = AES_ENCRYPT(?, UNHEX(SHA2(?, 512))), modifiedAt = ?, idEstadoUsuario = 1\
      WHERE id = ? OR nombreUsuario = ?", [clave, process.env.SECRET_DB_ENCRYPT, modifiedAt, id, nombreUsuario]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const updateUsuarioEstado = async ({
  id,
  nombreUsuario,
  modifiedAt,
  idEstadoUsuario,
}) => {
  try {
    const result = await connection.query(
      "UPDATE \
      usuario SET \
      idEstadoUsuario = ?, modifiedAt = ?\
      WHERE id = ? OR nombreUsuario = ?", [idEstadoUsuario, modifiedAt, id, nombreUsuario]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const updateUsuarioImagen = async ({
  id,
  nombreUsuario,
  modifiedAt,
  rutaImagen,
}) => {
  try {
    const result = await connection.query(
      "UPDATE \
      usuario SET \
      rutaImagen = ?, modifiedAt = ?\
      WHERE id = ? OR nombreUsuario = ?", [rutaImagen, modifiedAt, id, nombreUsuario]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const deleteUsuarioImagen = async ({
  id,
  nombreUsuario,
  modifiedAt,
}) => {
  try {
    const result = await connection.query(
      "UPDATE\
      usuario SET\
      rutaImagen = null, modifiedAt = ?\
      WHERE id = ? OR nombreUsuario = ?", [modifiedAt, id, nombreUsuario]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const updateUsuarioIntentos = async ({
  id,
  nombreUsuario,
  modifiedAt,
  action,
}) => {
  try {
    let query = '';
    switch (action) {
      case "Add":
        query = " intentos + 1 ";
        break;
      case "Reset":
        query = " 0 ";
        break;
    }
    const result = await connection.query(
      "UPDATE \
      usuario SET \
      intentos = " + query + ", modifiedAt = ?\
      WHERE id = ? OR nombreUsuario = ?", [modifiedAt, id, nombreUsuario]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const getUsuarios = async ({
  nombresUsuario,
  idsEstadoUsuario,
  idsRol,
}) => {
  try {
    let query = "";
    const params = [];

    if (nombresUsuario.length || idsEstadoUsuario.length || idsRol.length) query = ' WHERE ';

    if (nombresUsuario.length) {
      for (let i = 0; i < nombresUsuario.length; i++) {
        const nombreUsuario = nombresUsuario[i];
        if (i === 0) query += ' (';
        if (i !== nombresUsuario.length - 1)
          query += ' nombreUsuario LIKE ? OR ';
        else
          query += ' nombreUsuario LIKE ?) ';

        params.push("%" + nombreUsuario + "%");
      }
    }

    if (idsRol.length) {
      if (nombresUsuario.length) query += ' AND ';
      for (let i = 0; i < idsRol.length; i++) {
        const idRol = idsRol[i];
        if (i === 0) query += ' ( ';
        if (i !== idsRol.length - 1)
          query += ' idRol = ? OR ';
        else
          query += ' idRol = ?) ';

        params.push(idRol);
      }
    }

    if (idsEstadoUsuario.length) {
      if (nombresUsuario.length || idsRol.length) query += ' AND ';
      for (let i = 0; i < idsEstadoUsuario.length; i++) {
        const idEstadoUsuario = idsEstadoUsuario[i];
        if (i === 0) query += ' ( ';
        if (i !== idsEstadoUsuario.length - 1)
          query += ' idEstadoUsuario = ? OR ';
        else
          query += ' idEstadoUsuario = ?) ';

        params.push(idEstadoUsuario);
      }
    }

    query +=
      " ORDER BY nombreUsuario ASC, idEstadoUsuario ASC, idRol ASC LIMIT 25";

    const result = await connection.query(
      "SELECT \
      id, nombreUsuario, rutaImagen, tiempoSesion, intentos, createdAt, modifiedAt, idRol, idEstadoUsuario\
      FROM usuario"
      + query, params
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getUsuario = async ({ id, nombreUsuario }) => {
  try {
    let query = '';
    const params = [];

    if (id) {
      query += ' id = ? ';
      params.push(id);
    }

    if (nombreUsuario) {
      if (id) {
        query += ' AND ';
      }
      query += ' nombreUsuario = ? ';
      params.push(nombreUsuario);
    }

    const result = await connection.query(
      "SELECT \
      id, nombreUsuario, rutaImagen, tiempoSesion, intentos, createdAt, modifiedAt, idRol, idEstadoUsuario\
      FROM usuario\
      WHERE " + query, [...params]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const login = async ({ nombreUsuario, clave }) => {
  try {
    const result = await connection.query(
      "SELECT \
      id, nombreUsuario, rutaImagen, tiempoSesion, intentos, createdAt, modifiedAt, idRol, idEstadoUsuario\
      FROM usuario\
      WHERE nombreUsuario = CONVERT(? USING utf8mb4) COLLATE utf8mb4_bin AND clave = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))", [nombreUsuario, clave, process.env.SECRET_DB_ENCRYPT]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const existsUsuario = async ({ id, nombreUsuario }) => {
  try {
    const result = await connection.query(
      "SELECT id FROM usuario \
      WHERE id = ? OR nombreUsuario = ?", [id, nombreUsuario]
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
};