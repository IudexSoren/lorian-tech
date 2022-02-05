import state from "../../states/seguridad/PERMISOState";
import actions from "../../actions/seguridad/PERMISOAction";
import mutations from "../../mutations/seguridad/PERMISOMutation";
import getters from "../../getters/seguridad/PERMISOGetters";

const PERMISOModule = {
  state,
  mutations,
  actions,
  getters,
};

export default PERMISOModule;
