import express from "express";

import * as FilesController from "../controllers/FilesController.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

// Ruta: /content/...
router.post("/image", [middleware.authentication], FilesController.getImage);
router.post("/file", [middleware.authentication], FilesController.getFile);

export default router;
