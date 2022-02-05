import connection from '../../config/dbConnection.js';

export const insertCodigoCambioClave = async ({ idUsuario, codigo, fechaCreacion, expira = true }) => {
  try {
    const result = await connection.query(
      "INSERT INTO \
      codigocambioclave (idUsuario, codigo, fechaCreacion, disponible, intentos, expira) \
      VALUES (?, ?, ?, true, 0, ?)",
      [idUsuario, codigo, fechaCreacion, expira]
    );

    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const updateDisponibleCodigoCambioClave = async ({
  codigo, fechaUso = null }) => {
  try {
    const result = await connection.query(
      "UPDATE \
      codigocambioclave\
      SET\
      disponible = false,\
      fechaUso = ?\
      WHERE codigo = CONVERT(? USING utf8mb4) COLLATE utf8mb4_bin",
      [fechaUso, codigo]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const updateDisponiblesCodigoCambioClaveByUsuario = async (idUsuario) => {
  try {
    const result = await connection.query(
      "UPDATE \
      codigocambioclave SET \
      disponible = false\
      WHERE idUsuario = ?",
      [idUsuario,]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const updateIntentosCodigoCambioClave = async (codigo) => {
  try {
    const result = await connection.query(
      "UPDATE \
      codigocambioclave SET \
      intentos = intentos + 1\
      WHERE codigo = CONVERT(? USING utf8mb4) COLLATE utf8mb4_bin",
      [codigo]
    );

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const getCodigoCambioClave = async ({ idUsuario, codigo }) => {
  const result = await connection.query(
    'SELECT id, idUsuario, codigo, fechaCreacion, disponible, fechaUso, intentos\
    FROM codigocambioclave\
    WHERE idUsuario = ? AND codigo = CONVERT(? USING utf8mb4) COLLATE utf8mb4_bin',
    [idUsuario, codigo]
  );

  return result[0];
}

export const getCodigoCambioClaveByCodigo = async (codigo) => {
  const result = await connection.query(
    'SELECT id, idUsuario, codigo, fechaCreacion, disponible, fechaUso, intentos\
    FROM codigocambioclave\
    WHERE codigo = CONVERT(? USING utf8mb4) COLLATE utf8mb4_bin',
    [codigo]
  );

  return result[0];
}