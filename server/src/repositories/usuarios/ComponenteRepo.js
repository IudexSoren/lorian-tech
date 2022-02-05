import connection from "../../config/dbConnection.js";
import * as Permiso_ComponenteRepo from './Permiso_ComponenteRepo.js';

export const insertComponente = async ({ nombre, descripcion, idComponentePadre, permisos }) => {
  try {
    let newId = null;
    await connection.transaction();
    const result = await connection.query(
      "INSERT INTO \
      componente (nombre, descripcion, idComponentePadre) \
      VALUES (?, ?, ?)",
      [nombre, descripcion, idComponentePadre]
    );
    newId = result.insertId;

    for (const idPermiso of permisos) {
      await Permiso_ComponenteRepo.insertPermisoComponente(connection, {
        idComponente: newId,
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

export const updateComponente = async ({
  id,
  nombre,
  descripcion,
  idComponentePadre,
  permisos
}) => {
  try {
    await connection.transaction();
    const result = await connection.query(
      "UPDATE \
      componente SET \
      nombre = ?,\
      descripcion = ?,\
      idComponentePadre = ?\
      WHERE id = ?",
      [nombre, descripcion, idComponentePadre, id]
    );

    let permisosActuales = await Permiso_ComponenteRepo.getPermisosByComponente(id);
    permisosActuales = permisosActuales.map(pa => pa.idPermiso);

    for (const permisoActual of permisosActuales) {
      if (!permisos.includes(permisoActual)) {
        await Permiso_ComponenteRepo.deletePermisoComponente(connection, {
          idComponente: id,
          idPermiso: permisoActual
        });
      }
    }
    for (const idPermiso of permisos) {
      if (!await Permiso_ComponenteRepo.existPermisoComponente({ idComponente: id, idPermiso })) {
        await Permiso_ComponenteRepo.insertPermisoComponente(connection, {
          idComponente: id,
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

export const getComponentes = async ({ nombre, idComponentePadre }) => {
  try {
    nombre = `%${nombre ? nombre : ''}%`;
    let query = "";
    const params = [];

    if (idComponentePadre) {
      query += ' AND idComponentePadre = ?';
      params.push(idComponentePadre);
    }

    const result = await connection.query(
      "SELECT id, nombre, descripcion, idComponentePadre\
      FROM componente\
      WHERE nombre LIKE ?"
      + query +
      " ORDER BY nombre ASC",
      [nombre, ...params]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getComponente = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id, nombre, descripcion, idComponentePadre\
      FROM componente\
      WHERE id = ?",
      [id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const existsComponente = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id FROM componente WHERE id = ?",
      [id]
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
};
