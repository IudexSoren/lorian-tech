import { getSessions, removeSession } from "../../config/socket.js";

export const logoutUser = async (socketId, nombreUsuario, idUsuario) => {
  const sesionesUsuario = getSessions(socketId, nombreUsuario, idUsuario);
  if (sesionesUsuario && sesionesUsuario.length) {
    for (const sesion of sesionesUsuario) {
      removeSession(sesion.socketId);
    }
  }
}