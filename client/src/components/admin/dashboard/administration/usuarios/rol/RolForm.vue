<template>
  <form class="flex gap-3 flex-col h-full w-full" @submit="onSubmit">
    <h2 class="text-2xl mb-5">{{ rol.id === 0 ? "Agregar" : "Editar" }} rol</h2>
    <FormControl
      :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
      :inputInfo="inputsInfo[0]"
      :value="rol.nombre"
      @on-value-changed="onFormControlChanged"
    />
    <SeleccionPermisos
      :permisosActuales="permisosActuales"
      @on-permisos-changed="onPermisosChanged"
    />
    <div class="flex justify-between items-center gap-3 mt-8">
      <button
        class="btn btn-secondary flex-grow"
        type="reset"
        @click="reset"
        :disabled="loading"
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
import SeleccionPermisos from "../permiso/seleccionPermisosForm/SeleccionPermisos.vue";
import {
  ROL__UNSET_CURRENT_ROL,
  ROL__UPDATE_ROL,
  ROL__ADD_ROL,
  PERMISO__SET_PERMISOS,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const loading = ref(false);

onUnmounted(async () => {
  await reset();
});

const rol = computed(() => ({ ...STORE.getters.ROL__currentRol }));

const getIdPermisosActuales = () => {
  return rol.value.permisos.map((p) => (p.idPermiso ? p.idPermiso : p));
};

const permisosActuales = ref(getIdPermisosActuales());

watch(rol, () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  permisosActuales.value = getIdPermisosActuales();
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
]);

const reset = async () => {
  FormErrorsHook.resetErrors();
  await STORE.dispatch(ROL__UNSET_CURRENT_ROL);
  await STORE.dispatch(PERMISO__SET_PERMISOS, {});
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    try {
      loading.value = true;
      if (rol.value.id) {
        rol.value.permisos = getIdPermisosActuales();
        await STORE.dispatch(ROL__UPDATE_ROL, rol.value);
      } else {
        await STORE.dispatch(ROL__ADD_ROL, rol.value);
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
  const nombre = rol.value.nombre;
  FormErrorsHook.resetErrors();

  if (!nombre) {
    FormErrorsHook.addError("nombre", "Dato requerido");
  } else if (nombre.length > 50) {
    FormErrorsHook.addError(
      "nombre",
      `El nombre no debe exceder los 50 caracteres. Actual: ${nombre.length} caracteres.`
    );
  }

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  rol.value[input.labelFor] = formControl.value;
};

const onPermisosChanged = (permisos) => {
  rol.value.permisos = permisos;
};
</script>