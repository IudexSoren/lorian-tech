import STORE from '@/store';
import API from '@/api/API';


// export const insertEstadoUsuario = async (estadoUsuario) => {
//   try {
//     const response = await API.post('/estados-usuario', permiso);
//
//     estadoUsuario = {
//       ...estadoUsuario,
//       id: response.data.data
//     };

//     await NotificationsHelper.showFloatingNotification({
//       ...response.data,
//       messageType: 'success'
//     });

//     return estadoUsuario;
//   } catch (error) {
//     throw error;
//   }
// }

// export const updateEstadoUsuario = async (estadoUsuario) => {
//   try {
//     const response = await API.put(`/estados-usuario/${estadoUsuario.id}`, estadoUsuario);

//     await NotificationsHelper.showFloatingNotification({
//       ...response.data,
//       messageType: 'success'
//     });

//     return estadoUsuario;
//   } catch (error) {
//     throw error;
//   }
// }

export const getEstadoUsuario = async (id) => {
  try {
    const response = await API.get(`/estados-usuario/${id}`);

    const estadoUsuario = response.data.data;

    return estadoUsuario;
  } catch (error) {
    throw error;
  }
}

export const getEstadosUsuario = async ({ nombre = '' }) => {
  try {
    const response = await API.get(`/estados-usuario?nombre=${nombre}`);

    const estadosUsuario = response.data.data;

    return estadosUsuario;
  } catch (error) {
    throw error;
  }
}