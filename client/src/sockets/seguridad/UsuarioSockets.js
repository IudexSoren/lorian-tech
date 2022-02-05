import STORE from '@/store';
import { SOCKET } from "../index";
import { USUARIO__LOGOUT } from '@/constants/ACTIONS/SEGURIDAD_ACTIONS';
import { showErrorModalNotification } from '@/helpers/NotificationsHelper';

SOCKET.on('logout-user', async (result) => {
  await STORE.dispatch(USUARIO__LOGOUT);
  delete require.cache[require.resolve('../seguridad/UsuarioSockets')];
  setTimeout(async () => {
    await showErrorModalNotification(result);
  }, 2000);
});