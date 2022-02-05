
<template>
  <form
    class="flex flex-col flex-grow xl:w-1/4 gap-3 overflow-auto"
    @submit="onSubmit"
  >
    <h2 class="text-2xl mb-5 text-white font-bold">
      Ingresar a {{ APP_NAME }}
    </h2>
    <FormControl
      :inputInfo="inputsInfo[0]"
      :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :inputInfo="inputsInfo[1]"
      :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <div class="flex mt-8 justify-between flex-wrap gap-2">
      <button class="btn btn-primary btn-block" type="submit">
        <span>Ingresar</span><i class="fas fa-arrow-right"></i>
      </button>
      <router-link class="btn btn-secondary btn-block" :to="PASS_RESET">
        <i class="fas fa-unlock-alt"></i><span>Cambiar clave</span>
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { PASS_RESET } from "@/constants/AUTH_ROUTES.js";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import { login } from "@/helpers/customHooks/AuthHook";
import FormControl from "../main/forms/FormControl.vue";

const APP_NAME = process.env.VUE_APP_APP_NAME;
const STORE = useStore();

onUnmounted(() => {
  FormErrorsHook.resetErrors();
});

const inputsInfo = ref([
  {
    index: 0,
    label: "Nombre de usuario",
    labelFor: "nombreUsuario",
    type: "text",
    text: "",
    placeholder: "",
  },
  {
    index: 1,
    label: "Contraseña",
    labelFor: "clave",
    type: "password",
    text: "",
    placeholder: "",
  },
]);

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  input.text = formControl.value;
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    const payload = {
      nombreUsuario: inputsInfo.value[0].text,
      clave: inputsInfo.value[1].text,
    };
    await login(payload);
  }
};

const isValid = () => {
  const nombreUsuario = inputsInfo.value[0].text;
  const clave = inputsInfo.value[1].text;
  FormErrorsHook.resetErrors();

  if (!nombreUsuario) {
    FormErrorsHook.addError(
      "nombreUsuario",
      "El nombre de usuario es un dato requerido"
    );
  }

  if (!clave) {
    FormErrorsHook.addError("clave", "La contraseña es un dato requerido");
  }

  return FormErrorsHook.isFormValid();
};
</script>

<style scoped>
</style>