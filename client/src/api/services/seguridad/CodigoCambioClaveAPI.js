import API from '@/api/API';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';

export const insertCodigoCambioClave = async (usuario) => {
  try {
    const response = await API.post('/codigos-clave', usuario);

    const codigo = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return codigo;
  } catch (error) {
    throw error;
  }
}