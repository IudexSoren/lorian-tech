import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//#region STYLES
import "./assets/tailwind.css";
import "./assets/styles/animations.css";
import "./assets/styles/main.css";
import "./assets/styles/forms.css";
import "./assets/styles/transitions.css";
import "./assets/styles/buttons.css";
import "./assets/styles/colors.css";
//#endregion STYLES
import "./assets/fontawesome-free-6.0.0-beta2-web/css/all.min.css";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
