import express from "express";
import * as ROUTES from "../constants/ROUTES.js";

// R O U T E R S

//#region hoes
//#endregion hoes

//#region multimedia
//#endregion multimedia

//#region Usuario
import UsuarioRouter from "./usuario/UsuarioRouter.js";
import PermisoRouter from "./usuario/PermisoRouter.js";
import EstadoUsuarioRouter from "./usuario/EstadoUsuarioRouter.js";
import RolRouter from "./usuario/RolRouter.js";
import ComponenteRouter from "./usuario/ComponenteRouter.js";
import CodigoCambioClaveRouter from "./usuario/CodigoCambioClaveRouter.js";
import FilesRouter from "./FilesRouter.js";
//#endregion Usuario

const router = express();

// R U T A S
router.use("/content", FilesRouter);

//#region hoes
//#endregion hoes

//#region multimedia
//#endregion multimedia

//#region Usuario
router.use("/usuarios", UsuarioRouter);
router.use("/permisos", PermisoRouter);
router.use("/estados-usuario", EstadoUsuarioRouter);
router.use("/roles", RolRouter);
router.use("/componentes", ComponenteRouter);
router.use("/codigos-clave", CodigoCambioClaveRouter);
//#endregion Usuario

export default router;
