import { ESTADO_USUARIO__initialState } from "../../states/seguridad/ESTADO_USUARIOState";
import * as EstadoUsuarioAPI from '@/api/services/seguridad/EstadoUsuarioAPI';

const mutations = {
  ESTADO_USUARIO__SET_ESTADOS_USUARIO: async (state, payload) => {
    state.estadosUsuario = await EstadoUsuarioAPI.getEstadosUsuario(payload);
  },
  ESTADO_USUARIO__UNSET_ESTADOS_USUARIO: (state) => {
    state.estadosUsuario = [];
  },
  ESTADO_USUARIO__RESET: (state) => {
    state = { ...ESTADO_USUARIO__initialState };
  },
};

export default mutations;
