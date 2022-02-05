import connection from "../../config/dbConnection.js";
import * as Rol_PermisoRepo from './Rol_PermisoRepo.js';

export const insertRol = async ({ nombre, permisos }) => {
  try {
    let newId = null;
    await connection.transaction();
    const result = await connection.query(
      "INSERT INTO \
      rol (nombre) \
      VALUES (?)",
      [nombre]
    );
    newId = result.insertId;

    for (const idPermiso of permisos) {
      await Rol_PermisoRepo.insertRolPermiso(connection, {
        idRol: newId,
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

export const updateRol = async ({ id, nombre, permisos }) => {
  try {
    await connection.transaction();
    const result = await connection.query(
      "UPDATE \
      rol SET \
      nombre = ?\
      WHERE id = ?",
      [nombre, id]
    );

    let permisosActuales = await Rol_PermisoRepo.getPermisosByRol(id);
    permisosActuales = permisosActuales.map(pa => pa.idPermiso);

    for (const permisoActual of permisosActuales) {
      if (!permisos.includes(permisoActual)) {
        await Rol_PermisoRepo.deleteRolPermiso(connection, {
          idRol: id,
          idPermiso: permisoActual
        });
      }
    }
    for (const idPermiso of permisos) {
      if (!await Rol_PermisoRepo.existRolPermiso({ idRol: id, idPermiso })) {
        await Rol_PermisoRepo.insertRolPermiso(connection, {
          idRol: id,
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
  }
};

export const getRoles = async ({ nombre }) => {
  try {
    nombre = `%${nombre ? nombre : ''}%`;
    const result = await connection.query(
      "SELECT id, nombre\
      FROM rol\
      WHERE nombre LIKE ?\
      ORDER BY nombre ASC",
      [nombre]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getRol = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id, nombre\
      FROM rol\
      WHERE id = ?",
      [id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const existsRol = async (id) => {
  try {
    const result = await connection.query("SELECT id FROM rol WHERE id = ?", [
      id,
    ]);

    return !!result[0];
  } catch (error) {
    throw error;
  }
};
