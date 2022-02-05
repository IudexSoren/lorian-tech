import connection from "../../config/dbConnection.js";

export const insertEstadoUsuario = async ({ nombre }) => {
  try {
    const result = await connection.query(
      "INSERT INTO \
      estadousuario (nombre) \
      VALUES (?)",
      [nombre]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const updateEstadoUsuario = async ({ id, nombre }) => {
  try {
    const result = await connection.query(
      "UPDATE \
      estadousuario SET \
      nombre = ?\
      WHERE id = ?",
      [nombre, id]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const getEstadosUsuario = async () => {
  try {
    const result = await connection.query(
      "SELECT id, nombre\
      FROM estadousuario\
      ORDER BY nombre ASC"
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getEstadoUsuario = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id, nombre\
      FROM estadousuario\
      WHERE id = ?",
      [id]
    );

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const existsEstadoUsuario = async (id) => {
  try {
    const result = await connection.query(
      "SELECT id FROM estadousuario WHERE id = ?",
      [id]
    );

    return !!result[0];
  } catch (error) {
    throw error;
  }
};
