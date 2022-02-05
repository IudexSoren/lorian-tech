import { PERMISO__initialState, PERMISO__currentPermisoInitialState } from "../../states/seguridad/PERMISOState";
import * as PermisoAPI from '@/api/services/seguridad/PermisoAPI';

const mutations = {
  PERMISO__SET_PERMISOS: async (state, payload) => {
    state.permisos = await PermisoAPI.getPermisos(payload);
  },
  PERMISO__UNSET_PERMISOS: (state) => {
    state.permisos = [];
  },
  PERMISO__RESET: (state) => {
    state = { ...PERMISO__initialState };
  },
  PERMISO__ADD_PERMISO: async (state, payload) => {
    const newPermiso = await PermisoAPI.insertPermiso(payload);
    state.permisos = [newPermiso, ...state.permisos];
  },
  PERMISO__UPDATE_PERMISO: async (state, payload) => {
    const updatedPermiso = await PermisoAPI.updatePermiso(payload);
    state.permisos = state.permisos.map(p => p.id === updatedPermiso.id ? updatedPermiso : p);
  },
  PERMISO__SET_CURRENT_PERMISO: async (state, payload) => {
    state.currentPermiso = payload;
  },
  PERMISO__UNSET_CURRENT_PERMISO: (state) => {
    state.currentPermiso = { ...PERMISO__currentPermisoInitialState };
  },
};

export default mutations;
