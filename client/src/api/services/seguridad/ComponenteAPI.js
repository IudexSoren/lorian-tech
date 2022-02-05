import STORE from '@/store';
import API from '@/api/API';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';

export const insertComponente = async (componente) => {
  try {
    const response = await API.post('/componentes', componente);

    componente = {
      ...componente,
      id: response.data.data
    };

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return componente;
  } catch (error) {
    throw error;
  }
}

export const updateComponente = async (componente) => {
  try {
    const response = await API.put(`/componentes/${componente.id}`, componente);

    componente = {
      ...componente,
      permisos: response.data.data
    };

    await NotificationsHelper.showFloatingNotification({
      ...response.data,
      messageType: 'success'
    });

    return componente;
  } catch (error) {
    throw error;
  }
}

export const getComponente = async (id) => {
  try {
    const response = await API.get(`/componentes/${id}`);

    const componente = response.data.data;

    return componente;
  } catch (error) {
    throw error;
  }
}

export const getComponentes = async ({ nombre = '', idComponentePadre = '' }) => {
  try {
    const response = await API.get(`/componentes?nombre=${nombre}&idComponentePadre=${idComponentePadre}`);

    const componentes = response.data.data;

    return componentes;
  } catch (error) {
    throw error;
  }
}

export const checkAccess = async (idComponente) => {
  try {
    const response = await API.post(`/componentes/check-access/${idComponente}`);

    const access = response.data.data;

    return access;
  } catch (error) {
    throw error;
  }
}