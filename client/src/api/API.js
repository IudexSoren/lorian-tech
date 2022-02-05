import axios from 'axios';
import { computed } from 'vue';
import STORE from '@/store';
import * as NotificationsHelper from '@/helpers/NotificationsHelper';
import { USUARIO__LOGOUT } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS.js";

let logoutTimeout = null;
const loggedUser = computed(() => STORE.getters.USUARIO__loggedUser);

const API = axios.create({
  baseURL: process.env.VUE_APP_API_PORT,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true
});


API.interceptors.response.use(async (response) => {
  const { url } = response.config;

  if (!url.includes('login') && !url.includes('logout') && loggedUser.value) {
    clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(async () => {
      await STORE.dispatch(USUARIO__LOGOUT);
    }, getTimeoutLimit(loggedUser.value.tiempoSesion));
  }

  if (url.includes('logout')) clearTimeout(logoutTimeout);

  return response;
}, async (error) => {
  if (error.response) {
    const { status } = error.response.data;
    if (status === -1) await STORE.dispatch(USUARIO__LOGOUT);
    await NotificationsHelper.showErrorModalNotification(error.response.data);
  }

  throw 'Something went wrong! :c';
});

// Convertir el tiempo de sesión de minutos a milisegundos
const getTimeoutLimit = (tiempoSesion) => {
  return tiempoSesion * 60 * 1000;
}

export default API;