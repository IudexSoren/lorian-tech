<template>
  <transition name="fade" mode="out-in">
    <tbody v-if="loaded">
      <RolTableRow v-for="rol of roles" :key="rol.id" :rol="rol" />
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
  ROL__SET_ROLES,
  ROL__RESET,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import RolTableRow from "./RolTableRow.vue";
import TableLoading from "@/components/main/loading/TableLoading.vue";

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["on-toggle-loaded"]);

const STORE = useStore();

const roles = computed(() => [...STORE.getters.ROL__roles]);

onMounted(async () => {
  emit("on-toggle-loaded", false);
  await STORE.dispatch(ROL__SET_ROLES, {});
  emit("on-toggle-loaded", true);
});

onUnmounted(async () => {
  await STORE.dispatch(ROL__RESET);
});
</script>

<style scoped>
tr:nth-child(even) {
  background: var(--dark-gray);
}
</style>