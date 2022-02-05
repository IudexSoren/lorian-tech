import { USUARIO__initialState, USUARIO__currentUsuarioInitialState } from "../../states/seguridad/USUARIOState";
import * as UsuarioAPI from '@/api/services/seguridad/UsuarioAPI';

const mutations = {
  USUARIO__SET_USUARIOS: async (state, payload) => {
    state.usuarios = await UsuarioAPI.getUsuarios(payload);
  },
  USUARIO__UNSET_USUARIOS: (state) => {
    state.usuarios = [];
  },
  USUARIO__RESET: (state) => {
    state = { ...USUARIO__initialState };
  },
  USUARIO__ADD_USUARIO: async (state, payload) => {
    const newUsuario = await UsuarioAPI.insertUsuario(payload);
    state.usuarios = [newUsuario, ...state.usuarios];
  },
  USUARIO__UPDATE_USUARIO: async (state, payload) => {
    const updatedUsuario = await UsuarioAPI.updateUsuario(payload);
    state.usuarios = state.usuarios.map(p => {
      if (p.id === updatedUsuario.id) {
        if (state.currentUsuario.id === p.id) {
          state.currentUsuario = updatedUsuario;
        }

        return updatedUsuario;
      }

      return p;
    });

  },
  USUARIO__UPDATE_USUARIO_ESTADO: async (state, payload) => {
    const updatedUsuario = await UsuarioAPI.updateUsuarioEstado(payload);
    state.usuarios = state.usuarios.map(p => {
      if (p.id === updatedUsuario.id) {
        if (state.currentUsuario.id === p.id) {
          state.currentUsuario = updatedUsuario;
        }

        return updatedUsuario;
      }

      return p;
    });
  },
  USUARIO__UPDATE_USUARIO_IMAGEN: async (state, payload) => {
    const updatedUsuario = await UsuarioAPI.updateUsuarioImagen(payload);
    state.usuarios = state.usuarios.map(p => {
      if (p.id === updatedUsuario.id) {
        if (state.currentUsuario.id === p.id) {
          state.currentUsuario = updatedUsuario;
        }

        return updatedUsuario;
      }

      return p;
    });

    if (state.loggedUser.id === updatedUsuario.id) {
      state.loggedUser = updatedUsuario;
    }
  },
  USUARIO__DELETE_USUARIO_IMAGEN: async (state, payload) => {
    const updatedUsuario = await UsuarioAPI.deleteUsuarioImagen(payload);
    state.usuarios = state.usuarios.map(p => {
      if (p.id === updatedUsuario.id) {
        if (state.currentUsuario.id === p.id) {
          state.currentUsuario = updatedUsuario;
        }

        return updatedUsuario;
      }

      return p;
    });

    if (state.loggedUser.id === updatedUsuario.id) {
      state.loggedUser = updatedUsuario;
    }
  },
  USUARIO__UPDATE_USUARIO_CLAVE_BY_CODIGO: async (state, payload) => {
    await UsuarioAPI.updateUsuarioClaveByCodigo(payload);
  },
  USUARIO__UPDATE_USUARIO_CLAVE: async (state, payload) => {
    await UsuarioAPI.updateUsuarioClave(payload);
  },
  USUARIO__SET_CURRENT_USUARIO: async (state, payload) => {
    state.currentUsuario = payload;
  },
  USUARIO__UNSET_CURRENT_USUARIO: (state) => {
    state.currentUsuario = { ...USUARIO__currentUsuarioInitialState };
  },
  USUARIO__LOGIN: async (state, payload) => {
    state.loggedUser = await UsuarioAPI.login(payload);
    state.isAuth = !!state.loggedUser;
  },
  USUARIO__LOGOUT: async (state) => {
    await UsuarioAPI.logout();
    state.loggedUser = null;
    state.isAuth = !!state.loggedUser;
  },
  USUARIO__REFRESH_TOKEN: async (state) => {
    state.loggedUser = await UsuarioAPI.refreshToken();
    state.isAuth = !!state.loggedUser;
  },
};

export default mutations;
