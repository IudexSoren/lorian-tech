import { UI__initialState } from "../states/UIState";

const mutations = {
  UI__SET_CHANGE: (state, payload) => {
    state.data = {
      ...state.data,
      [payload.name]: payload.value,
    };
  },
  UI__RESET: (state) => {
    state.data = { ...UI__initialState };
  },
};

export default mutations;
