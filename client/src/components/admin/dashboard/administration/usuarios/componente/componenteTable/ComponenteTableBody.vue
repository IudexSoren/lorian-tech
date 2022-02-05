<template>
  <transition name="fade" mode="out-in">
    <tbody v-if="loaded">
      <ComponenteTableRow
        v-for="componente of componentes"
        :key="componente.id"
        :componente="componente"
      />
    </tbody>
    <tbody v-else>
      <TableLoading :colspan="4" v-if="!loaded" />
    </tbody>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import {
  COMPONENTE__SET_COMPONENTES,
  COMPONENTE__RESET,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import ComponenteTableRow from "./ComponenteTableRow.vue";
import TableLoading from "@/components/main/loading/TableLoading.vue";

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["on-toggle-loaded"]);

const STORE = useStore();

const componentes = computed(() => [...STORE.getters.COMPONENTE__componentes]);

onMounted(async () => {
  emit("on-toggle-loaded", false);
  await STORE.dispatch(COMPONENTE__SET_COMPONENTES, {});
  emit("on-toggle-loaded", true);
});

onUnmounted(async () => {
  await STORE.dispatch(COMPONENTE__RESET);
});
</script>

<style scoped>
tr:nth-child(even) {
  background: var(--dark-gray);
}
</style>