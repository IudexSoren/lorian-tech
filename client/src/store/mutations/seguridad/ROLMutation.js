import { ROL__initialState, ROL__currentRolInitialState } from "../../states/seguridad/ROLState";
import * as RolAPI from '@/api/services/seguridad/RolAPI';

const mutations = {
  ROL__SET_ROLES: async (state, payload) => {
    state.roles = await RolAPI.getRoles(payload);
  },
  ROL__UNSET_ROLES: (state) => {
    state.roles = [];
  },
  ROL__RESET: (state) => {
    state = { ...ROL__initialState };
  },
  ROL__ADD_ROL: async (state, payload) => {
    const newRol = await RolAPI.insertRol(payload);
    state.roles = [newRol, ...state.roles];
  },
  ROL__UPDATE_ROL: async (state, payload) => {
    const updatedRol = await RolAPI.updateRol(payload);
    state.roles = state.roles.map(p => p.id === updatedRol.id ? updatedRol : p);
  },
  ROL__SET_CURRENT_ROL: async (state, payload) => {
    state.currentRol = payload;
  },
  ROL__UNSET_CURRENT_ROL: (state) => {
    state.currentRol = { ...ROL__currentRolInitialState };
  },
};

export default mutations;
