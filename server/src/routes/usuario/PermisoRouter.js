import express from "express";

import * as PermisoController from "../../controllers/usuarios/PermisoController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

// Ruta: /permisos/...
router.post("", [middleware.authentication, middleware.tokenRefresh], PermisoController.insertPermiso);
router.put(
  "/:id",
  [middleware.authentication, middleware.tokenRefresh],
  PermisoController.updatePermiso
);
router.get("", [middleware.authentication, middleware.tokenRefresh], PermisoController.getPermisos);
router.get("/:id", [middleware.authentication, middleware.tokenRefresh], PermisoController.getPermiso);

export default router;
