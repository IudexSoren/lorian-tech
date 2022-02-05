<template>
  <div class="flex gap-3 flex-col h-full w-full overflow-auto">
    <div class="flex justify-between flex-wrap gap-2 items-center mb-5">
      <h2 class="text-2xl">Usuarios registrados</h2>
      <TableFilter @on-click="onShowMoreFilters" @on-change="onSearch" />
    </div>
    <UsuarioTable
      :loaded="loaded"
      @on-toggle-loaded="onToggleLoaded"
      @on-show-details="onShowDetails"
    />
    <transition mode="out-in" name="fade">
      <dynamic-modal
        classes="bg-dark-gray border border-gray-700 w-5/6 md:w-3/5 lg:w-2/4 2xl:w-1/3  md:h-4/5"
        v-if="modal?.keyword === 'USUARIO__FILTER'"
        ><UsuarioFilterModal
      /></dynamic-modal>
    </transition>
    <transition mode="out-in" name="fade">
      <dynamic-modal
        classes="bg-dark-gray border border-gray-700 w-5/6 md:w-3/5 lg:w-2/4 2xl:w-1/3  md:h-auto"
        v-if="modal?.keyword === 'USUARIO__DETAILS'"
      >
        <UsuarioDetailsModal :usuario="usuarioDetails" />
      </dynamic-modal>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TableFilter from "@/components/main/filters/tableFilter/TableFilter.vue";
import UsuarioTable from "./usuarioTable/UsuarioTable.vue";
import UsuarioFilterModal from "./UsuarioFilterModal.vue";
import UsuarioDetailsModal from "./usuarioDetails/UsuarioDetailsModal.vue";
import { USUARIO__SET_USUARIOS } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS";
import DynamicModal from "@/components/main/modals/DynamicModal.vue";
import { MODAL_NOTIFICATION } from "@/constants/NOTIFICATION_TYPES";

const STORE = useStore();

const modal = computed(() => STORE.getters.UI__dynamicModal);

const loaded = ref(false);
const usuarioDetails = ref(null);

const onSearch = async (searchBarText) => {
  loaded.value = false;
  await STORE.dispatch(USUARIO__SET_USUARIOS, {
    nombresUsuario: [searchBarText],
  });
  loaded.value = true;
};

const onToggleLoaded = (value) => {
  loaded.value = value;
};

const onShowMoreFilters = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: true,
      keyword: "USUARIO__FILTER",
    },
  });
};

const onShowDetails = async (usuario) => {
  usuarioDetails.value = usuario;
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: true,
      keyword: "USUARIO__DETAILS",
    },
  });
};
</script>

<style scoped>
</style>