import connection from "../../config/dbConnection.js";

export const insertRolPermiso = async (transaction, { idRol, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'INSERT INTO rol_permiso (idRol, idPermiso)\
      VALUES (?, ?)',
      [idRol, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deleteRolPermisoById = async (transaction, id) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM rol_permiso WHERE id = ?',
      [id]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deleteRolPermiso = async (transaction, { idRol, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM rol_permiso WHERE idRol = ? AND idPermiso = ?',
      [idRol, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const getPermisosByRol = async (idRol) => {
  try {
    const result = await connection.query(
      'SELECT rp.id, rp.idRol, rp.idPermiso, p.nombre, p.descripcion\
      FROM rol_permiso rp INNER JOIN permiso p ON rp.idPermiso = p.id\
      WHERE rp.idRol = ?',
      [idRol]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const getRolesByPermiso = async (idPermiso) => {
  try {
    const result = await connection.query(
      'SELECT rp.id, rp.idRol, rp.idPermiso, r.nombre\
      FROM rol_permiso rp INNER JOIN rol r ON rp.idRol = r.id\
      WHERE rp.idPermiso = ?',
      [idPermiso]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const existRolPermiso = async ({ id, idRol, idPermiso }) => {
  try {
    let query = '';
    const params = [];

    if (id) {
      query = ' id = ? ';
      params.push(id);
    }

    if (idRol) {
      if (id) {
        query += ' AND '
      }
      query = ' idRol = ? ';
      params.push(idRol);
    }

    if (idPermiso) {
      if (id || idRol) {
        query += ' AND '
      }
      query += ' idPermiso = ? ';
      params.push(idPermiso);
    }

    const result = await connection.query(
      'SELECT id from rol_permiso\
      WHERE ' + query,
      params
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
}