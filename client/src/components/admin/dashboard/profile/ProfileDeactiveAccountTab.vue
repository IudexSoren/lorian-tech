<template>
  <div class="flex flex-col gap-3" :class="codigoGenerado && 'h-full'">
    <BackOption @on-back="onSelectedTab(OPCIONES_TAB)" />
    <hr class="border-t border-gray-700 bg-dark-gray my-3" />
    <h2 class="text-2xl font-bold text-primary lg:mb-5">Desactivar cuenta</h2>
    <form
      class="flex flex-col gap-5 lg:gap-8 md:w-1/2 2xl:w-2/5 flex-grow"
      @submit="onSubmit"
      v-if="!codigoGenerado"
    >
      <FormControl
        :inputInfo="inputsInfo[0]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
        :value="form.clave"
        class="w-full"
        @on-value-changed="onFormControlChanged"
      />
      <Toast
        text="Al confirmar la desactivación de su cuenta, el sistema generará un código que le permitirá reactivar su cuenta por medio de un reinicio de contraseña."
      />
      <div
        class="flex 2xl:flex-wrap flex-wrap-reverse items-end gap-3 flex-grow"
      >
        <button
          class="btn btn-primary btn-sm flex-grow"
          type="submit"
          :disabled="loading"
        >
          <span>Generar código y desactivar cuenta</span>
        </button>
      </div>
    </form>
    <div class="flex flex-col gap-3 flex-grow md:w-1/2 2xl:w-2/5" v-else>
      <span class="text-white-50">Código generado</span>
      <h3 class="text-3xl">{{ codigoGenerado?.codigo }}</h3>
      <button class="btn btn-primary" @click="onCopyCode">
        <i class="fas fa-copy"></i>
        <span>Copiar código</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import FormControl from "@/components/main/forms/FormControl.vue";
import BackOption from "@/components/main/tabs/BackOption.vue";
import Toast from "@/components/main/notifications/Toast.vue";
import {
  loggedUser,
  deactivateUserAccount,
} from "@/helpers/customHooks/AuthHook.js";
import {
  showModalNotification,
  showFloatingNotification,
} from "@/helpers/NotificationsHelper";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook.js";

const STORE = useStore();

const props = defineProps({
  modalOptionAccepted: {
    type: Number,
  },
});

const OPCIONES_TAB = 2;
const formInitialState = {
  id: loggedUser.value.id,
  nombreUsuario: loggedUser.value.nombreUsuario,
  clave: "",
};

const emit = defineEmits(["on-selected-tab"]);
const form = ref({ ...formInitialState });
const loading = ref(false);
const codigoGenerado = ref(null);

const inputsInfo = ref([
  {
    index: 0,
    label: "Contraseña",
    labelFor: "clave",
    type: "password",
    placeholder: "",
  },
]);

onUnmounted(() => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  loading.value = false;
});

watch(props, async () => {
  if (props.modalOptionAccepted)
    if (props.modalOptionAccepted === 1) {
      const { id, nombreUsuario, clave  } = form.value;
      codigoGenerado.value = await deactivateUserAccount({
        id,
        nombreUsuario,
        clave,
      });
      onReset();
    }
});

const onSelectedTab = (index) => {
  emit("on-selected-tab", index);
};

const onSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    if (isValid()) {
      await showModalNotification({
        titleMessage: "¿Está seguro que desea desactivar su cuenta?",
        message:
          'Al presionar el botón "Desactivar cuenta", usted recibirá el código de recuperación de su cuenta. Su sesión será finalizada automáticamente en 20 segundos. Asegúrese de copiar el código antes de que su sesión sea finalizada y guárdelo en un lugar seguro. Podrá copiar el código fácilmente a su portapapeles si presiona el botón "Copiar código".',
        messageType: "primary",
        buttons: [
          {
            index: 1,
            text: "Desactivar cuenta",
            class: "btn-secondary",
            container: "md:pr-1 w-full md:w-1/2",
          },
          {
            index: 2,
            text: "Cancelar",
            class: "btn-primary",
            container: "md:pl-1 w-full md:w-1/2",
          },
        ],
      });
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
  const { clave } = form.value;

  if (!clave) FormErrorsHook.addError("clave", "Dato requerido");

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  form.value[input.labelFor] = formControl.value;
};

const onCopyCode = async () => {
  if (codigoGenerado.value) {
    navigator.clipboard.writeText(codigoGenerado.value.codigo);
    await showFloatingNotification({
      titleMessage: "Código copiado al portapapeles",
      message:
        "Su código de recuperación de cuenta ha sido copiado al portapapeles",
      messageType: "info",
    });
  }
};
</script>
