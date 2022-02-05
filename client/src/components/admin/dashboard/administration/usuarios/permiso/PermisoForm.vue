<template>
  <form class="flex gap-3 flex-col h-full w-full" @submit="onSubmit">
    <h2 class="text-2xl mb-5">
      {{ permiso.id === 0 ? "Agregar" : "Editar" }} permiso
    </h2>
    <FormControl
      :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
      :inputInfo="inputsInfo[0]"
      :value="permiso.nombre"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :inputInfo="inputsInfo[1]"
      :value="permiso.descripcion"
      :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <div class="flex flex-wrap justify-between items-center gap-3 mt-8">
      <button
        class="btn btn-secondary flex-grow"
        type="reset"
        :disabled="loading"
        @click="reset"
      >
        <i class="fas fa-times"></i><span>Limpiar</span>
      </button>
      <button
        class="btn btn-primary flex-grow"
        type="submit"
        :disabled="loading"
      >
        <i class="far fa-save"></i><span>Guardar</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import FormControl from "@/components/main/forms/FormControl.vue";
import {
  PERMISO__ADD_PERMISO,
  PERMISO__UPDATE_PERMISO,
  PERMISO__UNSET_CURRENT_PERMISO,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const loading = ref(false);

onUnmounted(async () => {
  await reset();
});

const permiso = computed(() => ({ ...STORE.getters.PERMISO__currentPermiso }));

watch(permiso, () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  loading.value = false;
});

const inputsInfo = ref([
  {
    index: 0,
    label: "Nombre",
    labelFor: "nombre",
    type: "text",
    placeholder: "",
  },
  {
    index: 1,
    label: "Descripción",
    labelFor: "descripcion",
    type: "textarea",
    placeholder: "",
  },
]);

const reset = async () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  await STORE.dispatch(PERMISO__UNSET_CURRENT_PERMISO);
  loading.value = false;
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    try {
      loading.value = true;
      if (permiso.value.id) {
        await STORE.dispatch(PERMISO__UPDATE_PERMISO, permiso.value);
      } else {
        await STORE.dispatch(PERMISO__ADD_PERMISO, permiso.value);
      }
      await reset();
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }
};

const isValid = () => {
  const { nombre, descripcion } = permiso.value;
  FormErrorsHook.resetErrors();

  if (!nombre) {
    FormErrorsHook.addError("nombre", "Dato requerido");
  } else if (nombre.length > 100) {
    FormErrorsHook.addError(
      "nombre",
      `El nombre no debe exceder los 100 caracteres. Actual: ${nombre.length} caracteres.`
    );
  }

  if (descripcion.length > 200) {
    FormErrorsHook.addError(
      "descripcion",
      `La descripción no debe exceder los 200 caracteres. Actual: ${descripcion.length} caracteres.`
    );
  }

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  permiso.value[input.labelFor] = formControl.value;
};
</script>