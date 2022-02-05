import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AccessDeniedException from "../config/exceptions/AccessDeniedException.js";
import errorResponse from "../config/responses/errorResponse.js";

dotenv.config();

const authentication = (req, res, next) => {
  try {
    // Obtener cookie con el token
    const token = req.cookies['ocelot-access-token'];
    if (!token)
      return res.send(null);

    // Verificar que el token sea válido
    jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
      // Verificar si ocurrió algún error durante la verificación del token
      if (error)
        // La sesión expiró
        throw new AccessDeniedException(
          "Su sesión ha expirado, digite sus credenciales para ingresar nuevamente",
          "Sesión expirada"
        );

      // Obtener propiedades del token decodificado
      const { id, nombreUsuario, creationDate, idRol, tiempoSesion, permisos } = decoded;
      // Verificar que todas las variables existan
      if ((!id || !nombreUsuario || !creationDate, !idRol || !tiempoSesion || !permisos))
        throw new AccessDeniedException(
          "Su sesión es inválida, digite sus credenciales para ingresar nuevamente",
          "Sesión inválida"
        );

      // Definir un objeto con las variables obtenidas del token decodificado
      req.usuario = {
        id,
        nombreUsuario,
        idRol,
        tiempoSesion,
        permisos,
        creationDate,
      };

      // El token es válido por lo que se permite el acceso
      next();
    });
  } catch (error) {
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export default authentication;
