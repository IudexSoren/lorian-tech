<template>
  <dynamic-table>
    <template #thead>
      <ComponenteTableHeader />
    </template>
    <template #tbody>
      <ComponenteTableBody
        :loaded="loaded"
        @on-toggle-loaded="onToggleLoaded"
      />
    </template>
    <template #tfoot>
      <ComponenteTableFoot />
    </template>
  </dynamic-table>
</template>

<script setup>
import DynamicTable from "@/components/main/tables/DynamicTable.vue";
import ComponenteTableHeader from "./ComponenteTableHeader.vue";
import ComponenteTableBody from "./ComponenteTableBody.vue";
import ComponenteTableFoot from "./ComponenteTableFoot.vue";

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