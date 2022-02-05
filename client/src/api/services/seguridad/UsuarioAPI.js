import API from '@/api/API';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';


export const insertUsuario = async (usuario) => {
  try {
    const response = await API.post('/usuarios', usuario);

    delete usuario.clave;
    delete usuario.claveConfirmacion;
    const newUser = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}

export const updateUsuario = async (usuario) => {
  try {
    const response = await API.put(`/usuarios/${usuario.get('id')}`, usuario);

    const updatedUser = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export const updateUsuarioEstado = async (usuario) => {
  try {
    const response = await API.put(`/usuarios/set-state/${usuario.id}`, usuario);

    const updatedUser = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export const updateUsuarioImagen = async (usuario) => {
  try {
    const response = await API.put(`/usuarios/set-image/${usuario.get("id")}`, usuario);

    const updatedUser = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export const deleteUsuarioImagen = async (usuario) => {
  try {
    const response = await API.put(`/usuarios/delete-image/${usuario.id}`, usuario);

    const updatedUser = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

export const deactivateUser = async (usuario) => {
  try {
    const response = await API.post(`/usuarios/deactivate/${usuario.id}`, usuario);

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

export const updateUsuarioClaveByCodigo = async (credentials) => {
  try {
    const response = await API.put('/usuarios/set-password-code', credentials);

    await NotificationsHelper.showModalNotification({
      ...response.data,
      messageType: 'success',
      buttons: [
        {
          index: 999,
          text: "Aceptar",
          class: "btn-success flex-grow",
          container: 'w-full'
        },
      ]
    });
  } catch (error) {
    throw error;
  }
}

export const updateUsuarioClave = async (credentials) => {
  try {
    const response = await API.put('/usuarios/set-password', credentials);

    await NotificationsHelper.showModalNotification({
      ...response.data,
      messageType: 'success',
      buttons: [
        {
          index: 999,
          text: "Aceptar",
          class: "btn-success flex-grow",
          container: 'w-full'
        },
      ]
    });
  } catch (error) {
    throw error;
  }
}

export const getUsuario = async (id) => {
  try {
    const response = await API.get(`/usuarios/${id}`);

    const usuario = response.data.data;

    return usuario;
  } catch (error) {
    throw error;
  }
}

export const getUsuarios = async ({ nombresUsuario = [], idsRol = [], idsEstadoUsuario = [] }) => {
  try {
    const response = await API.post('/usuarios/all', {
      nombresUsuario, idsRol, idsEstadoUsuario
    });

    const usuarios = response.data.data;

    return usuarios;
  } catch (error) {
    throw error;
  }
}

export const login = async (credentials) => {
  try {
    const response = await API.post('/usuarios/login', credentials);
    const usuario = response.data.data;

    await NotificationsHelper.showFloatingNotification({
      titleMessage: `Bienvenido a ${process.env.VUE_APP_APP_NAME}`,
      message: `Hola de nuevo, ${usuario.nombreUsuario}`,
      messageType: 'info'
    });

    return usuario;
  } catch (error) {
    throw error;
  }
}

export const logout = async () => {
  try {
    await API.post('/usuarios/logout');
  } catch (error) {
    throw error;
  }
}

export const refreshToken = async () => {
  try {
    const response = await API.post('/usuarios/refresh-token');
    const usuario = response.data.data;

    return usuario;
  } catch (error) {
    throw error;
  }
}