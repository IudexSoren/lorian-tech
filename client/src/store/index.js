import { createStore } from "vuex";
import UIModule from "./modules/UIModule";
import ROLModule from "./modules/seguridad/ROLModule";
import PERMISOModule from "./modules/seguridad/PERMISOModule";
import ESTADO_USUARIOModule from "./modules/seguridad/ESTADO_USUARIOModule";
import USUARIOModule from "./modules/seguridad/USUARIOModule";
import COMPONENTEModule from "./modules/seguridad/COMPONENTEModule";

const STORE = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ui: UIModule,
    rol: ROLModule,
    permiso: PERMISOModule,
    estadoUsuario: ESTADO_USUARIOModule,
    usuario: USUARIOModule,
    componente: COMPONENTEModule
  },
});

export default STORE;
