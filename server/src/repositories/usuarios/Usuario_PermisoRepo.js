import connection from "../../config/dbConnection.js";

export const insertUsuarioPermiso = async (transaction, { idUsuario, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'INSERT INTO usuario_permiso (idUsuario, idPermiso)\
      VALUES (?, ?)',
      [idUsuario, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deleteUsuarioPermisoById = async (transaction, id) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM usuario_permiso WHERE id = ?',
      [id]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const deleteUsuarioPermiso = async (transaction, { idUsuario, idPermiso }) => {
  try {
    let dbObject = transaction || connection;
    const result = await dbObject.query(
      'DELETE FROM usuario_permiso WHERE idUsuario = ? AND idPermiso = ?',
      [idUsuario, idPermiso]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
}

export const getPermisosByUsuario = async (idUsuario) => {
  try {
    const result = await connection.query(
      'SELECT up.id, up.idUsuario, up.idPermiso, p.nombre, p.descripcion\
      FROM usuario_permiso up INNER JOIN permiso p ON up.idPermiso = p.id\
      WHERE up.idUsuario = ?',
      [idUsuario]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const getUsuariosByPermiso = async (idPermiso) => {
  try {
    const result = await connection.query(
      'SELECT up.id, up.idUsuario, up.idPermiso u.nombreUsuario, u.rutaImagen, u.createdAt, u.modifiedAt, u.idRol, u.idEstadoUsuario\
      FROM usuario_permiso up INNER JOIN usuario u ON up.idUsuario = u.id\
      WHERE up.idPermiso = ?',
      [idPermiso]
    );

    return result;
  } catch (error) {
    throw error;
  }
}

export const existUsuarioPermiso = async ({ id, idUsuario, idPermiso }) => {
  try {
    let query = '';
    const params = [];

    if (id) {
      query = ' id = ? ';
      params.push(id);
    }

    if (idUsuario) {
      if (id) query += ' AND ';
      query += ' idUsuario = ? ';
      params.push(idUsuario);
    }

    if (idPermiso) {
      if (id || idUsuario) query += ' AND ';
      query += ' idPermiso = ? ';
      params.push(idPermiso);
    }

    const result = await connection.query(
      'SELECT id from usuario_permiso\
      WHERE ' + query,
      params
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
}