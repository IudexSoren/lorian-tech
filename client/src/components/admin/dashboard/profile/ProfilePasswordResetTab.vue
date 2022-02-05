<template>
  <div class="flex flex-col gap-3 h-full">
    <BackOption @on-back="onSelectedTab(OPCIONES_TAB)" />
    <hr class="border-t border-gray-700 bg-dark-gray my-3" />
    <h2 class="text-2xl font-bold text-primary lg:mb-5">Reestablecer contraseña</h2>
    <form
      class="flex flex-col gap-5 lg:gap-8 md:w-1/2 2xl:w-1/3 flex-grow"
      @submit="onSubmit"
    >
      <FormControl
        :inputInfo="inputsInfo[0]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
        :value="form.claveActual"
        class="w-full"
        @on-value-changed="onFormControlChanged"
      />
      <FormControl
        :inputInfo="inputsInfo[1]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
        :value="form.clave"
        class="w-full"
        @on-value-changed="onFormControlChanged"
      />
      <FormControl
        :inputInfo="inputsInfo[2]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[2].labelFor]"
        :value="form.claveConfirmacion"
        class="w-full"
        @on-value-changed="onFormControlChanged"
      />
      <div
        class="flex flex-wrap justify-between items-end gap-3 mt-8 flex-grow"
      >
        <button
          class="btn btn-secondary flex-grow"
          type="reset"
          :disabled="loading"
          @click="onReset"
        >
          <i class="fas fa-times"></i><span>Limpiar</span>
        </button>
        <button
          class="btn btn-primary flex-grow"
          type="submit"
          :disabled="loading"
        >
          <i class="fas fa-check"></i><span>Confirmar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import FormControl from "@/components/main/forms/FormControl.vue";
import BackOption from "@/components/main/tabs/BackOption.vue";
import { loggedUser, passwordReset } from "@/helpers/customHooks/AuthHook.js";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook.js";

const OPCIONES_TAB = 2;
const formInitialState = {
  id: loggedUser.id,
  nombreUsuario: loggedUser.nombreUsuario,
  claveActual: "",
  clave: "",
  claveConfirmacion: "",
};

const emit = defineEmits(["on-selected-tab"]);
const form = ref({ ...formInitialState });
const loading = ref(false);

const inputsInfo = ref([
  {
    index: 0,
    label: "Contraseña actual",
    labelFor: "claveActual",
    type: "password",
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
]);

onUnmounted(() => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  loading.value = false;
});

const onSelectedTab = (index) => {
  emit("on-selected-tab", index);
};

const onSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    if (isValid()) {
      await passwordReset(form.value);
      onReset();
    }
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
};

const onReset = () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  form.value = { ...formInitialState };
  loading.value = false;
};

const isValid = () => {
  FormErrorsHook.resetErrors();
  const { claveActual, clave, claveConfirmacion } = form.value;

  if (!claveActual) FormErrorsHook.addError("claveActual", "Dato requerido");

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!clave) FormErrorsHook.addError("clave", "Dato requerido");
  else if (!clave.match(passwordPattern))
    FormErrorsHook.addError(
      "clave",
      "La contraseña debe poseer al menos: de 8 a 32 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$!%*#?&)"
    );

  if (!claveConfirmacion)
    FormErrorsHook.addError("claveConfirmacion", "Dato requerido");
  else if (clave !== claveConfirmacion) {
    FormErrorsHook.addError("clave", "Las contraseñas no coinciden");
    FormErrorsHook.addError(
      "claveConfirmacion",
      "Las contraseñas no coinciden"
    );
  }

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  form.value[input.labelFor] = formControl.value;
};
</script>
