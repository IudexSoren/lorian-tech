import connection from "../../config/dbConnection.js";

export const insertPermiso = async ({ nombre, descripcion }) => {
  try {
    const result = await connection.query(
      "INSERT INTO \
      permiso (nombre, descripcion) \
      VALUES (?, ?)",
      [nombre, descripcion]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const updatePermiso = async ({
  id,
  nombre, descripcion
}) => {
  try {
    const result = await connection.query(
      "UPDATE \
      permiso SET \
      nombre = ?,\
      descripcion = ?\
      WHERE id = ?",
      [nombre, descripcion, id]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const getPermisos = async ({ nombre }) => {
  try {
    nombre = `%${nombre ? nombre : ''}%`;
    const result = await connection.query(
      "SELECT id, nombre, descripcion\
      FROM permiso\
      WHERE nombre LIKE ?\
      ORDER BY nombre ASC",
      [nombre]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getPermiso = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id, nombre, descripcion\
      FROM permiso\
      WHERE id = ?",
      [id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const existsPermiso = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id FROM permiso WHERE id = ?",
      [id]
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
};


