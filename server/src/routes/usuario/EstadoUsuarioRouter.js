import express from "express";

import * as EstadoUsuarioController from "../../controllers/usuarios/EstadoUsuarioController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

// Ruta: /estados-usuario/...
router.post(
  "",
  [middleware.authentication, middleware.tokenRefresh],
  EstadoUsuarioController.insertEstadoUsuario
);
router.put(
  "/:id",
  [middleware.authentication, middleware.tokenRefresh],
  EstadoUsuarioController.updateEstadoUsuario
);
router.get(
  "",
  [middleware.authentication, middleware.tokenRefresh],
  EstadoUsuarioController.getEstadosUsuario
);
router.get(
  "/:id",
  [middleware.authentication, middleware.tokenRefresh],
  EstadoUsuarioController.getEstadoUsuario
);

export default router;
