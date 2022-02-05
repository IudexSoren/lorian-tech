<template>
  <div class="flex flex-col w-full flex-grow p-5">
    <div
      class="
        flex
        gap-3
        items-center
        justify-between
        py-2
        mb-3
        sticky
        top-0
        bg-dark-gray
        border-b border-gray-700
      "
    >
      <div class="flex items-center gap-2 flex-grow">
        <i class="fas fa-filter text-sm"></i>
        <h1 class="text-xl font-bold text-truncated w-3/4">Filtrar usuarios</h1>
      </div>
      <i class="fas fa-times icon-option icon-option-sm" @click="onClose"></i>
    </div>
    <div class="flex-grow flex flex-col gap-3">
      <div class="flex md:items-end gap-2 flex-col md:flex-row">
        <FormControl
          :value="writtenUsername"
          :inputInfo="inputsInfo[0]"
          :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
          @on-value-changed="onFormControlChanged"
          class="flex-grow"
        />
        <button
          class="btn btn-secondary btn-sm"
          @click="onAddFilter(0)"
          :disabled="!writtenUsername"
        >
          <i class="fas fa-plus"></i><span>Agregar filtro</span>
        </button>
      </div>
      <div class="flex md:items-end gap-2 flex-col md:flex-row">
        <FormSelect
          :inputInfo="inputsInfo[1]"
          :OPTIONS="inputsInfo[1].options"
          :defaultOption="selectedRol?.value"
          :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
          @on-value-changed="onFormControlChanged"
          class="flex-grow"
        />
        <button
          class="btn btn-secondary btn-sm"
          @click="onAddFilter(1)"
          :disabled="!selectedRol || !selectedRol.value"
        >
          <i class="fas fa-plus"></i><span>Agregar filtro</span>
        </button>
      </div>
      <div class="flex md:items-end gap-2 flex-col md:flex-row">
        <FormSelect
          :inputInfo="inputsInfo[2]"
          :OPTIONS="inputsInfo[2].options"
          :defaultOption="selectedEstadoUsuario?.value"
          :errorMessage="FormErrorsHook.errors[inputsInfo[2].labelFor]"
          @on-value-changed="onFormControlChanged"
          class="flex-grow"
        />
        <button
          class="btn btn-secondary btn-sm"
          @click="onAddFilter(2)"
          :disabled="!selectedEstadoUsuario || !selectedEstadoUsuario.value"
        >
          <i class="fas fa-plus"></i><span>Agregar filtro</span>
        </button>
      </div>

      <div
        class="
          flex flex-col
          items-start
          gap-3
          flex-grow
          mt-3
          py-2
          px-3
          rounded
          bg-dark-gray-lighter
        "
      >
        <div
          class="
            flex flex-col
            md:flex-row md:items-center
            gap-2
            justify-between
            w-full
            border-b border-gray-700
            pb-3
          "
        >
          <h2 class="text-white text-lg font-bold">Filtros seleccionados</h2>
          <button class="btn btn-secondary btn-sm" @click="onRemoveAllFilters">
            <i class="fas fa-trash"></i><span>Eliminar filtros</span>
          </button>
        </div>
        <div
          class="
            flex flex-grow
            overflow-auto
            gap-2
            w-full
            justify-start
            flex-col
            h-full
          "
          v-if="
            filters.nombresUsuario.length ||
            filters.idsRol.length ||
            filters.idsEstadoUsuario.length
          "
        >
          <FilterTagsContainer
            filterName="Nombres de usuario"
            :filters="filters.nombresUsuario"
            :idFilter="1"
            @on-remove="onRemoveFilter"
            @on-remove-all="onRemoveAllFilters"
            v-if="filters.nombresUsuario && filters.nombresUsuario.length"
          />
          <FilterTagsContainer
            filterName="Roles"
            :filters="filters.idsRol"
            :idFilter="2"
            :namesList="inputsInfo[1].options"
            @on-remove="onRemoveFilter"
            @on-remove-all="onRemoveAllFilters"
            v-if="filters.idsRol.length"
          />
          <FilterTagsContainer
            filterName="Estados de usuario"
            :filters="filters.idsEstadoUsuario"
            :idFilter="3"
            :namesList="inputsInfo[2].options"
            @on-remove="onRemoveFilter"
            @on-remove-all="onRemoveAllFilters"
            v-if="filters.idsEstadoUsuario.length"
          />
        </div>
        <div class="flex flex-grow justify-center items-center w-full" v-else>
          Aún no hay filtros seleccionados
        </div>
      </div>

      <div class="flex gap-3 justify-between items-center w-full pt-3">
        <button class="btn btn-secondary" @click="onCancel">
          <i class="fas fa-times"></i><span>Cancelar</span>
        </button>
        <button class="btn btn-primary" @click="onSearch">
          <i class="fab fa-sistrix"></i><span>Buscar</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { getEstadosUsuario } from "@/api/services/seguridad/EstadoUsuarioAPI";
import { getRoles } from "@/api/services/seguridad/RolAPI";
import FormSelect from "@/components/main/forms/FormSelect.vue";
import FormControl from "@/components/main/forms/FormControl.vue";
import FilterTagsContainer from "@/components/main/filters/filterMultiple/FilterTagsContainer.vue";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";
import { USUARIO__SET_USUARIOS } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS.js";

const STORE = useStore();
const filters = ref({
  nombresUsuario: [],
  idsRol: [],
  idsEstadoUsuario: [],
});
const writtenUsername = ref(null);
const selectedRol = ref(null);
const selectedEstadoUsuario = ref(null);

const onClose = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: false,
      keyword: "",
    },
  });
};

const onCancel = async () => {
  await STORE.dispatch(USUARIO__SET_USUARIOS, {});
  await onClose();
};

const onSearch = async () => {
  await STORE.dispatch(USUARIO__SET_USUARIOS, filters.value);
  await onClose();
};

onMounted(async () => {
  const roles = [];
  for (const rol of await getRoles({})) {
    roles.push({
      value: rol.id,
      name: rol.nombre,
    });
  }
  const estadosUsuario = [];
  for (const estadoUsuario of await getEstadosUsuario({})) {
    estadosUsuario.push({
      value: estadoUsuario.id,
      name: estadoUsuario.nombre,
    });
  }
  inputsInfo.value[1].options = roles;
  inputsInfo.value[2].options = estadosUsuario;
});

onUnmounted(() => {
  FormErrorsHook.resetErrors();
});

const inputsInfo = ref([
  {
    index: 0,
    label: "Nombre de usuario",
    labelFor: "filterNombreUsuario",
    type: "text",
    text: "",
    placeholder: "",
  },
  {
    index: 1,
    label: "Rol",
    labelFor: "filterIdRol",
    showPlaceholder: true,
    options: [],
    selectedId: "",
  },
  {
    index: 2,
    label: "Estado",
    labelFor: "filterIdEstadoUsuario",
    showPlaceholder: true,
    options: [],
    selectedId: "",
  },
]);

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  switch (input.index) {
    case 0:
      writtenUsername.value = formControl.value;
      isValid(
        writtenUsername.value,
        filters.value.nombresUsuario,
        input.labelFor
      );
      break;
    case 1:
      input.selectedId = formControl.value;
      selectedRol.value = formControl;
      isValid(selectedRol.value.value, filters.value.idsRol, input.labelFor);
      break;
    case 2:
      input.selectedId = formControl.value;
      selectedEstadoUsuario.value = formControl;
      isValid(
        selectedEstadoUsuario.value.value,
        filters.value.idsEstadoUsuario,
        input.labelFor
      );
      break;

    default:
      break;
  }
};

const onAddFilter = (inputIndex) => {
  switch (inputIndex) {
    case 0:
      if (
        isValid(
          writtenUsername.value,
          filters.value.nombresUsuario,
          inputsInfo.value[inputIndex].labelFor
        )
      ) {
        filters.value.nombresUsuario.push(writtenUsername.value);
        writtenUsername.value = null;
      }
      break;
    case 1:
      if (
        isValid(
          selectedRol.value.value,
          filters.value.idsRol,
          inputsInfo.value[inputIndex].labelFor
        )
      ) {
        filters.value.idsRol.push(selectedRol.value.value);
        selectedRol.value = null;
      }
      break;
    case 2:
      if (
        isValid(
          selectedEstadoUsuario.value.value,
          filters.value.idsEstadoUsuario,
          inputsInfo.value[inputIndex].labelFor
        )
      ) {
        filters.value.idsEstadoUsuario.push(selectedEstadoUsuario.value.value);
        selectedEstadoUsuario.value = null;
      }
      break;
  }
};

const isValid = (value, filters, labelFor) => {
  FormErrorsHook.resetErrors();
  if (!value) {
    FormErrorsHook.addError(labelFor, "Debe introducir un valor");
  } else if (filters.find((f) => f === value)) {
    FormErrorsHook.addError(labelFor, "Este filtro ya fue añadido");
  }

  return FormErrorsHook.isFormValid();
};

const onRemoveFilter = (tagInfo) => {
  switch (tagInfo.idFilter) {
    case 1:
      filters.value.nombresUsuario.splice(tagInfo.index, 1);
      break;
    case 2:
      filters.value.idsRol.splice(tagInfo.index, 1);
      break;
    case 3:
      filters.value.idsEstadoUsuario.splice(tagInfo.index, 1);
      break;
  }
};

const onRemoveAllFilters = (idFilter) => {
  switch (idFilter) {
    case 1:
      filters.value.nombresUsuario.length = 0;
      break;
    case 2:
      filters.value.idsRol.length = 0;
      break;
    case 3:
      filters.value.idsEstadoUsuario.length = 0;
      break;
    default:
      filters.value.nombresUsuario.length = 0;
      filters.value.idsRol.length = 0;
      filters.value.idsEstadoUsuario.length = 0;
      break;
  }
};
</script>

<style scoped>
</style>
