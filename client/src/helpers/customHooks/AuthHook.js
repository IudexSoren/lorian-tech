import { computed, watch, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import STORE from '@/store';
import ROUTER from '@/router';
import { initSocketConnection, SOCKET } from '@/sockets';
import { checkAccess } from '@/api/services/seguridad/ComponenteAPI';
import { deactivateUser } from '@/api/services/seguridad/UsuarioAPI';
import { getFile } from "@/api/FilesAPI";
import { AUTH } from '@/constants/AUTH_ROUTES';
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";
import { USUARIOS_CONTENT_FOLDER_NAME } from "@/constants/CONTENT_FOLDERS";
import { USUARIO__LOGOUT, USUARIO__LOGIN, USUARIO__UPDATE_USUARIO_CLAVE_BY_CODIGO, USUARIO__REFRESH_TOKEN, USUARIO__UPDATE_USUARIO_CLAVE } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS.js";
import { DASHBOARD } from "@/constants/ADMIN_ROUTES.js";
import * as PERMISSIONS from "@/constants/PERMISSIONS";
import { insertCodigoCambioClave } from '@/api/services/seguridad/CodigoCambioClaveAPI';

export const isAuth = computed(() => (STORE.getters.USUARIO__isAuth))
export const token = computed(() => (STORE.getters.USUARIO__token))
export const loggedUser = computed(() => ({ ...STORE.getters.USUARIO__loggedUser }));
export const access = computed(() => ({ ...STORE.getters.UI__access }));
export const userPermissions = ref([]);
export const userImage = ref(null);

const mainLoading = 'mainLoading';

export const login = async (credentials) => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });

    await STORE.dispatch(USUARIO__LOGIN, credentials);
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const logout = async () => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });
    await STORE.dispatch(USUARIO__LOGOUT);
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const refreshToken = async () => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });

    await STORE.dispatch(USUARIO__REFRESH_TOKEN);
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const passwordResetByCode = async (payload) => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });
    await STORE.dispatch(USUARIO__UPDATE_USUARIO_CLAVE_BY_CODIGO, payload);
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const passwordReset = async (payload) => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });
    await STORE.dispatch(USUARIO__UPDATE_USUARIO_CLAVE, payload);
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const generateNewCode = async (payload) => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });
    const codigo = await insertCodigoCambioClave(payload);

    return codigo;
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const checkUIAccess = async (idComponent) => {
  try {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: true,
    });
    const access = idComponent ? await checkAccess(idComponent) : {};
    await STORE.dispatch(UI__SET_CHANGE, {
      name: 'access',
      value: access
    });
  } catch (error) {
    throw error;
  } finally {
    await STORE.dispatch(UI__SET_CHANGE, {
      name: mainLoading,
      value: false,
    });
  }
}

export const deactivateUserAccount = async (usuario) => {
  try {
    const result = await deactivateUser(usuario);
    
    return result;
  } catch (error) {
    throw error;
  }
}

watch(isAuth, async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: mainLoading,
    value: true,
  });
  if (isAuth.value) {
    initSocketConnection(loggedUser.value);
    userPermissions.value = loggedUser.value.permisos.map(p => p.idPermiso);
    const storedRoute = localStorage.getItem('storedRoute');
    if (userPermissions.value.includes(PERMISSIONS.ACCESO__PANEL_CONTROL_PRINCIPAL)) {
      let destiny = DASHBOARD;
      if (storedRoute && !storedRoute.includes(AUTH) && storedRoute !== '/')
        destiny = storedRoute;

      await ROUTER.replace(destiny);
    }
  }
  else {
    localStorage.removeItem('storedRoute');
    if (SOCKET) {
      SOCKET.disconnect();
    }
    userPermissions.value = [];
    await ROUTER.replace(AUTH);
  }
  await STORE.dispatch(UI__SET_CHANGE, {
    name: mainLoading,
    value: false,
  });
});

watch(loggedUser, async () => {
  if (loggedUser.value.id)
    if (loggedUser.value.rutaImagen)
      userImage.value = `${await getFile(
        USUARIOS_CONTENT_FOLDER_NAME,
        loggedUser.value.rutaImagen
      )}?${uuidv4()}`;
    else
      userImage.value = await getFile(
        USUARIOS_CONTENT_FOLDER_NAME,
        "USERS/no-user.png"
      );
})

export default computed(() => ({
  isAuth: STORE.getters.USUARIO__isAuth,
  loggedUser: { ...STORE.getters.USUARIO__loggedUser }
}));