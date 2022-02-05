import STORE from '@/store';
import API from '@/api/API';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';


export const insertPermiso = async (permiso) => {
  try {
    const response = await API.post('/permisos', permiso);

    permiso = {
      ...permiso,
      id: response.data.data
    };

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return permiso;
  } catch (error) {
    throw error;
  }
}

export const updatePermiso = async (permiso) => {
  try {
    const response = await API.put(`/permisos/${permiso.id}`, permiso);

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return permiso;
  } catch (error) {
    throw error;
  }
}

export const getPermiso = async (id) => {
  try {
    const response = await API.get(`/permisos/${id}`);

    const permiso = response.data.data;

    return permiso;
  } catch (error) {
    throw error;
  }
}

export const getPermisos = async ({ nombre = '' }) => {
  try {
    const response = await API.get(`/permisos?nombre=${nombre}`);

    const permisos = response.data.data;

    return permisos;
  } catch (error) {
    throw error;
  }
}