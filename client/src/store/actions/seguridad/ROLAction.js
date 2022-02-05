import * as SEGURIDAD_ACTIONS from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const actions = {
  ROL__SET_ROLES: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.ROL__SET_ROLES, payload),
  ROL__UNSET_ROLES: ({ commit }) => commit(SEGURIDAD_ACTIONS.ROL__UNSET_ROLES),
  ROL__RESET: ({ commit }) => commit(SEGURIDAD_ACTIONS.ROL__RESET),
  ROL__ADD_ROL: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.ROL__ADD_ROL, payload),
  ROL__UPDATE_ROL: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.ROL__UPDATE_ROL, payload),
  ROL__SET_CURRENT_ROL: ({ commit }, payload) =>
    commit(SEGURIDAD_ACTIONS.ROL__SET_CURRENT_ROL, payload),
  ROL__UNSET_CURRENT_ROL: ({ commit }) => commit(SEGURIDAD_ACTIONS.ROL__UNSET_CURRENT_ROL),
};

export default actions;
