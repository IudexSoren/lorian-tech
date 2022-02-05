

-- INSTRUCTIONS:
-- DO NOT MODIFY THIS DOCUMENT, ONLY MODIFY WHAT THE INSTRUCTIONS SAYS
-- DO NOT EXECUTE UNTIL YOU DID WHAT THE INSTRUCTIONS SAYS
-- Scroll down until you find the INSERTS for the table USUARIO which means user in spanish.
-- Once you are there, assign the SECRET KEY which HAS TO BE THE SAME FOR EVERY USER INSERT. Read the README.md to understand why it is important.
-- After doing that, you can execute this query.

create database if not exists ocelot;

use ocelot;

-- ROL table
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `rol` VALUES (1,'ADMINISTRADOR DEL SISTEMA'),(2,'ADMINISTRADOR DE USUARIOS'),(3,'CLIENTE');

-- PERMISO table
CREATE TABLE `permiso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `permiso` VALUES (1,'Insertar usuarios','Permite la creación de nuevos usuarios'),(2,'Actualizar usuarios','Permite actualizar uno o más datos de un usuario'),(3,'Actualizar permisos','Permite actualizar uno o más datos de un permiso'),(4,'Lectura de usuarios','Permite obtener el listado de los usuarios registrados'),(5,'Insertar roles','Permite la creación de nuevos roles'),(6,'Actualizar roles','Permite actualizar uno o más datos de un rol'),(7,'Lectura de roles','Permite obtener el listado de los roles registrados'),(8,'Insertar permisos','Permite la creación de nuevos permisos'),(9,'Activar/Desactivar/Bloquear usuarios','Permite modificar el estado de los usuarios'),(10,'Lectura de permisos','Permite obtener el listado de los permisos registrados'),(11,'Cargar archivos','Permite guardar archivos en el sistema'),(12,'Descargar archivos','Permite la descarga de archivos almacenados en el sistema'),(13,'Lectura de archivos','Permite obtener un archivo almacenado en el sistema'),(14,'Insertar componentes','Permite la creación de nuevos componentes'),(15,'Actualizar componentes','Permite actualizar uno o más datos de un componente'),(16,'Lectura de componentes','Permite obtener el listado de los componentes registrados'),(17,'Acceso al Panel de Control Principal',''),(18,'Acceso al Panel de Control de Usuarios',''),(19,'Acceso al Panel de Control de Roles',''),(20,'Acceso al Panel de Control de Permisos',''),(21,'Acceso al Panel de Control de Componentes',''),(22,'Acceso al Módulo de Seguridad','Permite al usuario hacer uso de funcionalidades relativas al acceso al sistema y la configución de este'),(23,'Generar códigos de cambio de contraseña','Permite generar un código de 10 caracteres para cambiar la contraseña de una cuenta.  El código tiene un máximo de 3 intentos y una vez usado o alcanzados los 3 intentos queda invalidado');

-- ESTADOUSUARIO table
CREATE TABLE `estadousuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `estadousuario` VALUES (1,'ACTIVADO'),(2,'DESACTIVADO'),(3,'BLOQUEADO');

-- COMPONENTE table
CREATE TABLE `componente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idComponentePadre` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_componente_componente_padre_idx` (`idComponentePadre`),
  CONSTRAINT `FK_componente_componente_padre` FOREIGN KEY (`idComponentePadre`) REFERENCES `componente` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `componente` VALUES (1,'Panel de Control Principal','Componente principal para aquellos usuarios con roles diferentes a: CLIENTE',NULL),(2,'Panel de Control de Usuarios','Administración de los usuarios',1),(3,'Panel de Control de Roles','Administración de los roles',1),(4,'Panel de Control de Permisos','Administración de los Permisos',1),(5,'Panel de Control de Componentes','Administración de los componentes',1),(6,'Lista de Usuarios','Muestra el listado de registros de usuarios registrados.  Además posee la funcionalidad de filtrar estos registros.',2),(7,'Formulario de Creación de Usuarios','Formulario en el que se inserta la información para registrar un nuevo usuario',2),(8,'Formulario de Actualización de Usuarios','Formulario en el que se actualiza la información de un usuario',2),(9,'Lista de Roles','Muestra el listado de registros de roles registrados. Además posee la funcionalidad de filtrar estos registros.',3),(10,'Formulario de Creación de Roles','Formulario en el que se inserta la información para registrar un nuevo rol',3),(11,'Formulario de Actualización de Roles','Formulario en el que se actualiza la información de un rol',3),(12,'Lista de Permisos','Muestra el listado de registros de permisos registrados. Además posee la funcionalidad de filtrar estos registros.',4),(13,'Formulario de Creación de Permisos','Formulario en el que se inserta la información para registrar un nuevo permiso',4),(14,'Formulario de Actualización de Permisos','Formulario en el que se actualiza la información de un permiso',4),(15,'Lista de Componentes','Muestra el listado de registros de componentes registrados. Además posee la funcionalidad de filtrar estos registros.',5),(16,'Formulario de Creación de Componentes','Formulario en el que se inserta la información para registrar un nuevo componente',5),(17,'Formulario de Actualización de Componentes','Formulario en el que se actualiza la información de un componente',5),(18,'Modificador del Estado de Usuarios','Permite establecer un nuevo estado para un usuario.',2),(19,'Botón para la Edición de un Usuario','Permite autocompletar un formulario con los datos de un usuario existente y así modificar su información.',2),(20,'Generador de Códigos para el Cambio de Contraseña','Permite generar un código para el cambio de contraseña de un usuario.',2),(21,'Botón para la Edición de un Permiso','Permite autocompletar un formulario con los datos de un permiso existente y así modificar su información.',4),(22,'Botón para la Edición de un Rol','Permite autocompletar un formulario con los datos de un rol existente y así modificar su información.',3),(23,'Botón para la Edición de un Componente','Permite autocompletar un formulario con los datos de un componente existente y así modificar su información.',5);



-- USUARIO table
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(50) NOT NULL,
  `clave` blob NOT NULL,
  `rutaImagen` varchar(1000) DEFAULT NULL,
  `tiempoSesion` int NOT NULL,
  `intentos` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `idRol` int NOT NULL,
  `idEstadoUsuario` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Usuario_EstadoUsuario_idx` (`idEstadoUsuario`),
  KEY `FK_Usuario_Rol_idx` (`idRol`),
  CONSTRAINT `FK_Usuario_EstadoUsuario` FOREIGN KEY (`idEstadoUsuario`) REFERENCES `estadousuario` (`id`),
  CONSTRAINT `FK_Usuario_Rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- USER INSERTS
-- Assign the SAME SECRET_KEY to the password encryption
-- USE THESE USERS TO LOGIN IN THE SYSTEM
INSERT INTO `usuario` VALUES 
(1,'IudexSoren', 
-- SET THE SECRET KEY
AES_ENCRYPT('Iudex400@Soren', UNHEX(SHA2('SECRET KEY HERE', 512))),
'USERS/IudexSoren.jpg',1200,0,'2021-11-21 00:00:00','2022-02-04 13:29:02',1,1),
(2,'Soren', 
-- SET THE SECRET KEY
AES_ENCRYPT('Iudex400@Soren', UNHEX(SHA2('SECRET KEY HERE', 512))),
'USERS/Soren.jpg',900,0,'2021-11-21 00:00:00','2022-02-04 13:32:04',1,1);

-- CREDENTIALS
-- Username: IudexSoren | Password: Iudex400@Soren
-- Username: Soren | Password: Iudex400@Soren



-- CODIGOCAMBIOCLAVE table
CREATE TABLE `codigocambioclave` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `fechaUso` datetime DEFAULT NULL,
  `intentos` int NOT NULL DEFAULT '0',
  `expira` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `FK_codigocambioclave_usuario_idx` (`idUsuario`),
  CONSTRAINT `FK_codigocambioclave_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- USUARIO_PERMISO table
CREATE TABLE `usuario_permiso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idPermiso` int NOT NULL,
  PRIMARY KEY (`id`,`idUsuario`,`idPermiso`),
  KEY `FK_usuario_permiso_usuario_idx` (`idUsuario`),
  KEY `FK_usuario_permiso_permiso_idx` (`idPermiso`),
  CONSTRAINT `FK_usuario_permiso_permiso` FOREIGN KEY (`idPermiso`) REFERENCES `permiso` (`id`),
  CONSTRAINT `FK_usuario_permiso_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `usuario_permiso` VALUES (19,1,2),(21,1,5),(22,1,10),(23,1,7),(24,1,4),(42,1,6),(43,1,1),(44,1,9),(46,1,11),(47,1,12),(48,1,13),(49,1,15),(50,1,14),(51,1,16),(52,1,17),(53,1,18),(54,1,21),(56,1,19),(57,1,20),(58,1,3),(59,1,8),(61,1,22),(77,1,23),(11,2,10),(12,2,7),(62,2,22),(68,2,11),(87,2,4),(101,2,13),(106,2,1),(112,2,2),(113,2,23),(133,2,17),(135,2,18),(138,2,19);

-- ROL_PERMISO table
CREATE TABLE `rol_permiso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idRol` int NOT NULL,
  `idPermiso` int NOT NULL,
  PRIMARY KEY (`id`,`idRol`,`idPermiso`),
  KEY `FK_roles_permisos_rol_idx` (`idRol`),
  KEY `FK_roles_permisos_permiso_idx` (`idPermiso`),
  CONSTRAINT `FK_rol_permiso_permiso` FOREIGN KEY (`idPermiso`) REFERENCES `permiso` (`id`),
  CONSTRAINT `FK_rol_permiso_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `rol_permiso` VALUES (18,1,9),(19,1,3),(20,1,6),(21,1,2),(22,1,8),(23,1,5),(24,1,1),(25,1,10),(26,1,7),(27,1,4),(35,1,11),(36,1,12),(37,1,13),(40,1,15),(41,1,14),(42,1,16),(46,1,21),(47,1,20),(48,1,17),(49,1,19),(50,1,18),(52,1,22),(54,1,23),(16,2,10),(17,2,7),(29,2,9),(30,2,2),(31,2,1),(32,2,4),(38,2,11),(43,2,18),(44,2,17),(45,2,13),(53,2,22),(55,2,23);

-- PERMISO_COMPONENTE table
CREATE TABLE `permiso_componente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idComponente` int NOT NULL,
  `idPermiso` int NOT NULL,
  PRIMARY KEY (`id`,`idComponente`,`idPermiso`),
  KEY `FK_permiso_componente_permiso_idx` (`idPermiso`),
  KEY `FK_permiso_componente_componente_idx` (`idComponente`),
  CONSTRAINT `FK_permiso_componente_componente` FOREIGN KEY (`idComponente`) REFERENCES `componente` (`id`),
  CONSTRAINT `FK_permiso_componente_permiso` FOREIGN KEY (`idPermiso`) REFERENCES `permiso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `permiso_componente` VALUES (11,7,1),(30,8,2),(65,19,2),(47,14,3),(69,21,3),(9,6,4),(18,6,4),(23,6,4),(27,6,4),(38,10,5),(41,11,6),(71,22,6),(13,7,7),(34,8,7),(36,9,7),(46,13,8),(63,18,9),(12,7,10),(33,8,10),(39,10,10),(42,11,10),(44,12,10),(54,16,10),(60,17,10),(14,7,11),(31,8,11),(32,8,13),(53,16,14),(61,17,14),(59,17,15),(73,23,15),(50,15,16),(56,15,16),(1,1,17),(2,2,18),(6,6,18),(10,7,18),(15,6,18),(20,6,18),(24,6,18),(29,8,18),(62,18,18),(64,19,18),(66,20,18),(3,3,19),(35,9,19),(37,10,19),(40,11,19),(70,22,19),(4,4,20),(43,12,20),(45,13,20),(48,14,20),(68,21,20),(5,5,21),(49,15,21),(52,16,21),(55,15,21),(58,17,21),(72,23,21),(67,20,23);
















