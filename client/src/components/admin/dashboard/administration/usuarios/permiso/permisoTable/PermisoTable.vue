<template>
  <dynamic-table>
    <template #thead>
      <PermisoTableHeader />
    </template>
    <template #tbody>
      <PermisoTableBody :loaded="loaded" @on-toggle-loaded="onToggleLoaded" />
    </template>
    <template #tfoot>
      <PermisoTableFoot />
    </template>
  </dynamic-table>
</template>

<script setup>
import DynamicTable from "@/components/main/tables/DynamicTable.vue";
import PermisoTableHeader from "./PermisoTableHeader.vue";
import PermisoTableBody from "./PermisoTableBody.vue";
import PermisoTableFoot from "./PermisoTableFoot.vue";

const emit = defineEmits(["on-toggle-loaded"]);

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const onToggleLoaded = (value) => {
  emit("on-toggle-loaded", value);
};
</script>

<style scoped>
</style>