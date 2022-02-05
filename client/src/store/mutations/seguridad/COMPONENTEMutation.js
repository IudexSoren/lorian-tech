import { COMPONENTE__initialState, COMPONENTE__currentComponenteInitialState } from "../../states/seguridad/COMPONENTEState";
import * as ComponenteAPI from '@/api/services/seguridad/ComponenteAPI';

const mutations = {
  COMPONENTE__SET_COMPONENTES: async (state, payload) => {
    state.componentes = await ComponenteAPI.getComponentes(payload);
  },
  COMPONENTE__UNSET_COMPONENTES: (state) => {
    state.componentes = [];
  },
  COMPONENTE__RESET: (state) => {
    state = { ...COMPONENTE__initialState };
  },
  COMPONENTE__ADD_COMPONENTE: async (state, payload) => {
    const newComponente = await ComponenteAPI.insertComponente(payload);
    state.componentes = [newComponente, ...state.componentes];
  },
  COMPONENTE__UPDATE_COMPONENTE: async (state, payload) => {
    const updatedComponente = await ComponenteAPI.updateComponente(payload);
    state.componentes = state.componentes.map(p => p.id === updatedComponente.id ? updatedComponente : p);
  },
  COMPONENTE__SET_CURRENT_COMPONENTE: async (state, payload) => {
    state.currentComponente = payload;
  },
  COMPONENTE__UNSET_CURRENT_COMPONENTE: (state) => {
    state.currentComponente = { ...COMPONENTE__currentComponenteInitialState };
  },
};

export default mutations;
