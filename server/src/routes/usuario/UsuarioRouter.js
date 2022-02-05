import express from "express";
import fileUpload from "express-fileupload";

import * as UsuarioController from "../../controllers/usuarios/UsuariosController.js";
import middleware from "../../middleware/middleware.js";

const router = express.Router();
router.use(
  fileUpload({
    useTempFiles: true,
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  })
);

// Ruta: /usuarios/...
router.put("/set-password-code", UsuarioController.updateUsuarioClaveByCodigo);
router.put(
  "/set-password",
  [middleware.authentication, middleware.tokenRefresh],
  UsuarioController.updateUsuarioClave
);
router.put(
  "/set-state/:id",
  [middleware.authentication, middleware.tokenRefresh],
  UsuarioController.updateUsuarioEstado
);
router.put(
  "/set-image/:id",
  [middleware.authentication, middleware.tokenRefresh],
  UsuarioController.updateUsuarioImagen
);
router.put(
  "/delete-image/:id",
  [middleware.authentication, middleware.tokenRefresh],
  UsuarioController.deleteUsuarioImagen
);
router.put(
  "/:id",
  [middleware.authentication, middleware.tokenRefresh],
  UsuarioController.updateUsuario
);
router.post("/all", [middleware.authentication, middleware.tokenRefresh], UsuarioController.getUsuarios);
router.post("/deactivate/:id", [middleware.authentication], UsuarioController.deactivateUser);
router.post("/login", UsuarioController.login);
router.post("/logout", UsuarioController.logout);
router.post("/refresh-token", [middleware.authentication], UsuarioController.refreshToken);
router.post("/:id", [middleware.authentication, middleware.tokenRefresh], UsuarioController.getUsuario);
router.post("", [middleware.authentication, middleware.tokenRefresh], UsuarioController.insertUsuario);

export default router;
