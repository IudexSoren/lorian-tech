import * as UI_ACTIONS from "@/constants/ACTIONS/UI_ACTIONS";

const actions = {
  UI__SET_CHANGE: ({ commit }, payload) =>
    commit(UI_ACTIONS.UI__SET_CHANGE, payload),
  UI__RESET: ({ commit }) => commit(UI_ACTIONS.UI__RESET),
};

export default actions;
