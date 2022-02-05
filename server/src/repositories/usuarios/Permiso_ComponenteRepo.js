import connection from "../../config/dbConnection.js";

export const insertPermisoComponente = async (transaction, { idComponente, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'INSERT INTO permiso_componente (idComponente, idPermiso)\
      VALUES (?, ?)',
      [idComponente, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deletePermisoComponenteById = async (transaction, id) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM permiso_componente WHERE id = ?',
      [id]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deletePermisoComponente = async (transaction, { idComponente, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM permiso_componente WHERE idComponente = ? AND idPermiso = ?',
      [idComponente, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const getPermisosByComponente = async (idComponente) => {
  try {
    const result = await connection.query(
      'SELECT pc.id, pc.idComponente, pc.idPermiso, p.nombre, p.descripcion\
      FROM permiso_componente pc INNER JOIN permiso p ON pc.idPermiso = p.id\
      WHERE pc.idComponente = ?',
      [idComponente]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const getComponentesByPermiso = async (idPermiso) => {
  try {
    const result = await connection.query(
      'SELECT pc.id, pc.idComponente, pc.idPermiso c.nombre, c.idComponentePadre\
      FROM permiso_componente pc INNER JOIN componente c ON pc.idComponente = c.id\
      WHERE pc.idPermiso = ?',
      [idPermiso]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const existPermisoComponente = async ({ id, idComponente, idPermiso }) => {
  try {
    let query = '';
    const params = [];

    if (id) {
      query = ' id = ? ';
      params.push(id);
    }

    if (idComponente) {
      query = ' idComponente = ? ';
      params.push(idComponente);
    }

    if (idPermiso) {
      query = ' idPermiso = ? ';
      params.push(idPermiso);
    }

    const result = await connection.query(
      'SELECT id from permiso_componente\
      WHERE ' + query,
      params
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
}