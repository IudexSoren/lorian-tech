import STORE from '@/store';
import API from '@/api/API';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';

export const insertRol = async (rol) => {
  try {
    const response = await API.post('/roles', rol);

    rol = {
      ...rol,
      id: response.data.data
    };

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return rol;
  } catch (error) {
    throw error;
  }
}

export const updateRol = async (rol) => {
  try {
    const response = await API.put(`/roles/${rol.id}`, rol);

    rol = {
      ...rol,
      permisos: response.data.data
    };

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return rol;
  } catch (error) {
    throw error;
  }
}

export const getRol = async (id) => {
  try {
    const response = await API.get(`/roles/${id}`);

    const rol = response.data.data;

    return rol;
  } catch (error) {
    throw error;
  }
}

export const getRoles = async ({ nombre = '' }) => {
  try {
    const response = await API.get(`/roles?nombre=${nombre}`);

    const roles = response.data.data;

    return roles;
  } catch (error) {
    throw error;
  }
}