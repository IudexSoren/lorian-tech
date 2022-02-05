import state from "../../states/seguridad/ESTADO_USUARIOState";
import actions from "../../actions/seguridad/ESTADO_USUARIOAction";
import mutations from "../../mutations/seguridad/ESTADO_USUARIOMutation";
import getters from "../../getters/seguridad/ESTADO_USUARIOGetters";

const ESTADO_USUARIOModule = {
  state,
  mutations,
  actions,
  getters,
};

export default ESTADO_USUARIOModule;
