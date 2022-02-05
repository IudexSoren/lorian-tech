import express from "express";

import * as CodigoCambioClaveController from "../../controllers/usuarios/CodigoCambioClaveController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();

// Ruta: /codigos-clave/...
router.post("", [middleware.authentication, middleware.tokenRefresh], CodigoCambioClaveController.insertCodigoCambioClave);

export default router;
