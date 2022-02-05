import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { LOGOUT_USER } from "../constants/SOCKETS.js";

dotenv.config();

export let IO = null;

export let SESSIONS = [];

/**
 * Crea el servidor de sockets
 * @param {Object} server
 */
export const initSocketServer = async (server) => {
  IO = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL]
    }
  });

  IO.on('connection', (socket) => {
    const { id: socketId } = socket;
    const { idUsuario, nombreUsuario } = socket.handshake.query;
    if (socketId || nombreUsuario || idUsuario) {
      addSession(socketId, nombreUsuario, idUsuario);
    }

    socket.on('disconnect', () => {
      const { id: socketId } = socket;
      removeSession(socketId);
    });
  });
}

const addSession = (socketId, nombreUsuario, idUsuario) => {
  SESSIONS.push({
    socketId,
    idUsuario,
    nombreUsuario
  });
}

export const getSessions = (socketId, nombreUsuario, idUsuario) => {
  return SESSIONS.filter(s => s.socketId === socketId || (s.nombreUsuario === nombreUsuario && s.idUsuario.toString() === idUsuario.toString()));
}

export const removeSession = (socketId) => {
  SESSIONS = SESSIONS.filter(s => s.socketId !== socketId);
  const data = {
    titleMessage: 'Sesión finalizada',
    message: 'Su sesión ha sido finalizada. Esto pudo deberse a dos razones: Esta cuenta fue bloqueada o desactivada; o se ha restringido el acceso debido a un mantenimiento del sistema.'
  };
  IO.to(socketId).emit(LOGOUT_USER, data);
}
