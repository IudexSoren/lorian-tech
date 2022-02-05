import * as SEGURIDAD_ACTIONS from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const actions = {
  PERMISO__SET_PERMISOS: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.PERMISO__SET_PERMISOS, payload),
  PERMISO__UNSET_PERMISOS: ({ commit }) => commit(SEGURIDAD_ACTIONS.PERMISO__UNSET_PERMISOS),
  PERMISO__RESET: ({ commit }) => commit(SEGURIDAD_ACTIONS.PERMISO__RESET),
  PERMISO__ADD_PERMISO: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.PERMISO__ADD_PERMISO, payload),
  PERMISO__UPDATE_PERMISO: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.PERMISO__UPDATE_PERMISO, payload),
  PERMISO__SET_CURRENT_PERMISO: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.PERMISO__SET_CURRENT_PERMISO, payload),
  PERMISO__UNSET_CURRENT_PERMISO: ({ commit }) => commit(SEGURIDAD_ACTIONS.PERMISO__UNSET_CURRENT_PERMISO),
};

export default actions;
