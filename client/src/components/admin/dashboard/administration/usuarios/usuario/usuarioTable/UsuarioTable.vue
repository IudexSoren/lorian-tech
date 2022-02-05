<template>
  <dynamic-table>
    <template #thead>
      <UsuarioTableHeader />
    </template>
    <template #tbody>
      <UsuarioTableBody
        :loaded="loaded"
        @on-toggle-loaded="onToggleLoaded"
        @on-show-details="onShowDetails"
      />
    </template>
    <template #tfoot>
      <UsuarioTableFoot />
    </template>
  </dynamic-table>
</template>

<script setup>
import { useStore } from "vuex";
import DynamicTable from "@/components/main/tables/DynamicTable.vue";
import DynamicModal from "@/components/main/modals/DynamicModal.vue";
import UsuarioTableHeader from "./UsuarioTableHeader.vue";
import UsuarioTableBody from "./UsuarioTableBody.vue";
import UsuarioTableFoot from "./UsuarioTableFoot.vue";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS";

const emit = defineEmits(["on-toggle-loaded", "on-show-details"]);

const STORE = useStore();

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const onToggleLoaded = (value) => {
  emit("on-toggle-loaded", value);
};

const onShowDetails = async (usuario) => {
  emit("on-show-details", usuario);
};
</script>

<style scoped>
</style>