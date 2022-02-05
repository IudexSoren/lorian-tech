import {
  io
} from 'socket.io-client';

export let SOCKET = null;

export const initSocketConnection = (loggedUser) => {
  const options = {};
  if (loggedUser) {
    const { id: idUsuario, nombreUsuario } = loggedUser
    options.query = {
      idUsuario,
      nombreUsuario
    };
  }
  SOCKET = io(process.env.VUE_APP_API_PORT, options);
  require('./seguridad/UsuarioSockets');
}
