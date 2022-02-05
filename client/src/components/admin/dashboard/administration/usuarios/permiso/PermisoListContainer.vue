<template>
  <div class="flex gap-3 flex-col h-full w-full overflow-auto">
    <div class="flex justify-between flex-wrap gap-2 items-center mb-5">
      <h2 class="text-2xl">Permisos registrados</h2>
      <TableFilter
        @on-change="onSearch"
        :showButton="false"
      />
    </div>
    <PermisoTable :loaded="loaded" @on-toggle-loaded="onToggleLoaded" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import TableFilter from "@/components/main/filters/tableFilter/TableFilter.vue";
import PermisoTable from "./permisoTable/PermisoTable.vue";
import {
  PERMISO__SET_PERMISOS
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const loaded = ref(false);

const onSearch = async (searchBarText) => {
  loaded.value = false;
  await STORE.dispatch(PERMISO__SET_PERMISOS, {
    nombre: searchBarText,
  });
  loaded.value = true;
};

const onToggleLoaded = (value) => {
  loaded.value = value;
};
</script>

<style scoped>
</style>