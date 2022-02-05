<template>
  <dynamic-table>
    <template #thead>
      <RolTableHeader />
    </template>
    <template #tbody>
      <RolTableBody :loaded="loaded" @on-toggle-loaded="onToggleLoaded" />
    </template>
    <template #tfoot>
      <RolTableFoot />
    </template>
  </dynamic-table>
</template>

<script setup>
import DynamicTable from "@/components/main/tables/DynamicTable.vue";
import RolTableHeader from "./RolTableHeader.vue";
import RolTableBody from "./RolTableBody.vue";
import RolTableFoot from "./RolTableFoot.vue";

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