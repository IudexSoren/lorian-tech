import AccessDeniedException from "../config/exceptions/AccessDeniedException.js";
import errorResponse from "../config/responses/errorResponse.js";
import { generateJWT, tokenExpires } from "../helpers/usuarios/UsuariosHelper.js";

const tokenRefresh = (req, res, next) => {
  try {
    const usuario = req.usuario;

    if (!usuario)
      throw new AccessDeniedException(
        "Su sesión es inválida, digite sus credenciales para ingresar nuevamente",
        "Sesión inválida"
      );

    const token = generateJWT(usuario);
    const expires = tokenExpires(usuario.tiempoSesion);

    res.cookie('ocelot-access-token', token, {
      httpOnly: true,
      sameSite: "strict",
      expires
    })

    next();
  } catch (error) {
    return res.status(error.statusCode || 500).send(errorResponse(error));
  }
};

export default tokenRefresh;
