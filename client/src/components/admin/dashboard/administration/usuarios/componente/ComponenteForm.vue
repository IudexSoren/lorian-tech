<template>
  <form class="flex gap-3 flex-col h-full w-full" @submit="onSubmit">
    <h2 class="text-2xl mb-5">
      {{ componente.id === 0 ? "Agregar" : "Editar" }} componente
    </h2>
    <FormControl
      :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
      :inputInfo="inputsInfo[0]"
      :value="componente.nombre"
      @on-value-changed="onFormControlChanged"
    />
    <FormControl
      :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
      :inputInfo="inputsInfo[1]"
      :value="componente.descripcion"
      @on-value-changed="onFormControlChanged"
    />
    <FormSelect
      :inputInfo="inputsInfo[2]"
      :OPTIONS="COMPONENTES"
      :defaultOption="componente.idComponentePadre"
      :selectedOption="selectedComponentePadre"
      :errorMessage="FormErrorsHook.errors[inputsInfo[2].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <SeleccionPermisos
      :permisosActuales="permisosActuales"
      @on-permisos-changed="onPermisosChanged"
    />
    <transition name="fade" mode="out-in">
      <small
        class="form-error-message"
        v-if="FormErrorsHook.errors['permisos']"
      >
        {{ FormErrorsHook.errors["permisos"] }}
      </small>
    </transition>
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
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import { getComponentes } from "@/api/services/seguridad/ComponenteAPI";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import FormControl from "@/components/main/forms/FormControl.vue";
import FormSelect from "@/components/main/forms/FormSelect.vue";
import SeleccionPermisos from "../permiso/seleccionPermisosForm/SeleccionPermisos.vue";
import {
  COMPONENTE__UNSET_CURRENT_COMPONENTE,
  COMPONENTE__UPDATE_COMPONENTE,
  COMPONENTE__ADD_COMPONENTE,
  PERMISO__SET_PERMISOS,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const selectedComponentePadre = ref(null);
const loading = ref(false);

const COMPONENTES = ref([]);

onMounted(async () => {
  await cargarComponentes();
});

const cargarComponentes = async () => {
  const componentes = [];
  for (const componente of await getComponentes({})) {
    componentes.push({
      value: componente.id,
      name: componente.nombre,
    });
  }
  COMPONENTES.value = componentes;
};

onUnmounted(async () => {
  await reset();
});

const componente = computed(() => ({
  ...STORE.getters.COMPONENTE__currentComponente,
}));

const getIdPermisosActuales = () => {
  return componente.value.permisos.map((p) => (p.idPermiso ? p.idPermiso : p));
};

const permisosActuales = ref(getIdPermisosActuales());

watch(componente, () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  permisosActuales.value = getIdPermisosActuales();
  selectedComponentePadre.value = null;
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
  {
    index: 2,
    label: "Componente padre",
    labelFor: "idComponentePadre",
    showPlaceholder: true,
  },
]);

const reset = async () => {
  FormErrorsHook.resetErrors();
  await STORE.dispatch(COMPONENTE__UNSET_CURRENT_COMPONENTE);
  selectedComponentePadre.value = null;
  await cargarComponentes();
  await STORE.dispatch(PERMISO__SET_PERMISOS, {});
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    try {
      loading.value = true;
      if (componente.value.id) {
        componente.value.permisos = getIdPermisosActuales();
        await STORE.dispatch(COMPONENTE__UPDATE_COMPONENTE, componente.value);
      } else {
        await STORE.dispatch(COMPONENTE__ADD_COMPONENTE, componente.value);
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
  const { nombre, descripcion, idComponentePadre, permisos } = componente.value;
  FormErrorsHook.resetErrors();

  if (!nombre) {
    FormErrorsHook.addError("nombre", "Dato requerido");
  } else if (nombre.length > 100) {
    FormErrorsHook.addError(
      "nombre",
      `El nombre no debe exceder los 100 caracteres. Actual: ${nombre.length} caracteres.`
    );
  }

  if (!descripcion) {
    FormErrorsHook.addError("descripcion", "Dato requerido");
  } else if (descripcion.length > 200) {
    FormErrorsHook.addError(
      "descripcion",
      `La descripción no debe exceder los 200 caracteres. Actual: ${descripcion.length}`
    );
  }

  if (
    idComponentePadre &&
    (isNaN(idComponentePadre) || idComponentePadre < 0)
  ) {
    FormErrorsHook.addError(
      "idComponentePadre",
      "El componente padre solicitado es inválido"
    );
  }

  if (!permisos.length) {
    FormErrorsHook.addError(
      "permisos",
      "Debe asignar al menos un permiso al componente"
    );
  }

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  componente.value[input.labelFor] = formControl.value;
  if (input.labelFor === "idComponentePadre") {
    selectedComponentePadre.value = formControl;
  }
};

const onPermisosChanged = (permisos) => {
  componente.value.permisos = permisos;
};
</script>