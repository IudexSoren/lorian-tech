<template>
  <form
    class="flex flex-col gap-3 flex-grow xl:w-1/4 overflow-auto"
    @submit="onSubmit"
  >
    <h2 class="text-2xl mb-5 text-white font-bold">
      Cambiar clave de {{ APP_NAME }}
    </h2>
    <FormControl
      :inputInfo="inputsInfo[0]"
      :value="form.nombreUsuario"
      :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :inputInfo="inputsInfo[1]"
      :value="form.clave"
      :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :inputInfo="inputsInfo[2]"
      :value="form.claveConfirmacion"
      :errorMessage="FormErrorsHook.errors[inputsInfo[2].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :inputInfo="inputsInfo[3]"
      :value="form.codigo"
      :errorMessage="FormErrorsHook.errors[inputsInfo[3].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <div class="flex mt-8 justify-between flex-wrap gap-2">
      <button class="btn btn btn-primary btn-block" type="submit">
        <i class="fas fa-unlock-alt"></i><span>Cambiar clave</span>
      </button>
      <router-link class="btn btn-secondary btn-block" :to="LOGIN">
        <span>Ingresar</span><i class="fas fa-arrow-right"></i>
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { LOGIN } from "@/constants/AUTH_ROUTES.js";
import { passwordResetByCode } from "@/helpers/customHooks/AuthHook";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import FormControl from "../main/forms/FormControl.vue";

const APP_NAME = process.env.VUE_APP_APP_NAME;
const STORE = useStore();

onUnmounted(() => {
  FormErrorsHook.resetErrors();
});

const formInitialState = {
  nombreUsuario: "",
  clave: "",
  claveConfirmacion: "",
  codigo: "",
};

const form = ref({ ...formInitialState });

const inputsInfo = ref([
  {
    index: 0,
    label: "Nombre de usuario",
    labelFor: "nombreUsuario",
    type: "text",
    placeholder: "",
  },
  {
    index: 1,
    label: "Contraseña",
    labelFor: "clave",
    type: "password",
    placeholder: "",
  },
  {
    index: 2,
    label: "Confirmar contraseña",
    labelFor: "claveConfirmacion",
    type: "password",
    placeholder: "",
  },
  {
    index: 3,
    label: "Código",
    labelFor: "codigo",
    type: "password",
    placeholder: "",
  },
]);

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  form.value[input.labelFor] = formControl.value;
};

const onReset = () => {
  FormErrorsHook.resetErrors();
  form.value = { ...formInitialState };
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    await passwordResetByCode(form.value);
    onReset();
  }
};

const isValid = () => {
  const { nombreUsuario, clave, claveConfirmacion, codigo } = form.value;
  FormErrorsHook.resetErrors();

  if (!nombreUsuario) {
    FormErrorsHook.addError(
      "nombreUsuario",
      "El nombre de usuario es un dato requerido"
    );
  }

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!clave) {
    FormErrorsHook.addError("clave", "La contraseña es un dato requerido");
  } else if (!clave.match(passwordPattern)) {
    FormErrorsHook.addError(
      "clave",
      "La contraseña debe poseer almenos: de 8 a 32 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$!%*#?&)"
    );
  }

  if (!claveConfirmacion) {
    FormErrorsHook.addError(
      "claveConfirmacion",
      "Debe confirmar la contraseña"
    );
  } else if (clave !== claveConfirmacion) {
    FormErrorsHook.addError("clave", "Las contraseñas no coinciden");
    FormErrorsHook.addError(
      "claveConfirmacion",
      "Las contraseñas no coinciden"
    );
  }

  if (!codigo) {
    FormErrorsHook.addError("codigo", "El código es un dato requerido");
  }

  return FormErrorsHook.isFormValid();
};
</script>

<style scoped>
</style>