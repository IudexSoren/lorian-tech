<template>
  <div class="flex gap-3 flex-col h-full w-full overflow-auto">
    <div class="flex justify-between flex-wrap gap-2 items-center mb-5">
      <h2 class="text-2xl">Roles registrados</h2>
      <TableFilter
        @on-change="onSearch"
        :showButton="false"
      />
    </div>
    <RolTable :loaded="loaded" @on-toggle-loaded="onToggleLoaded" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import TableFilter from "@/components/main/filters/tableFilter/TableFilter.vue";
import { ROL__SET_ROLES } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import RolTable from "./rolTable/RolTable.vue";

const STORE = useStore();

const loaded = ref(false);

const onSearch = async (searchBarText) => {
  loaded.value = false;
  await STORE.dispatch(ROL__SET_ROLES, {
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