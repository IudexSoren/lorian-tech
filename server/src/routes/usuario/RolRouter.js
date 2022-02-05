import express from "express";

import * as RolController from "../../controllers/usuarios/RolController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

// Ruta: /roles/...
router.post("", [middleware.authentication, middleware.tokenRefresh], RolController.insertRol);
router.put("/:id", [middleware.authentication, middleware.tokenRefresh], RolController.updateRol);
router.get("", [middleware.authentication, middleware.tokenRefresh], RolController.getRoles);
router.get("/:id", [middleware.authentication, middleware.tokenRefresh], RolController.getRol);

export default router;
