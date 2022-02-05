import express from "express";

import * as ComponenteController from "../../controllers/usuarios/ComponenteController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

// Ruta: /componente/...
router.post("/check-access/:id", [middleware.authentication], ComponenteController.checkAccess);
router.post("", [middleware.authentication, middleware.tokenRefresh], ComponenteController.insertComponente);
router.put(
  "/:id",
  [middleware.authentication, middleware.tokenRefresh],
  ComponenteController.updateComponente
);
router.get("/:id", [middleware.authentication, middleware.tokenRefresh], ComponenteController.getComponente);
router.get("", [middleware.authentication, middleware.tokenRefresh], ComponenteController.getComponentes);

export default router;
