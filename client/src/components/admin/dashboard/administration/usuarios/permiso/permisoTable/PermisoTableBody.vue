<template>
  <transition name="fade" mode="out-in">
    <tbody v-if="loaded">
      <PermisoTableRow
        v-for="permiso of permisos"
        :key="permiso.id"
        :permiso="permiso"
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
  PERMISO__SET_PERMISOS,
  PERMISO__RESET,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import PermisoTableRow from "./PermisoTableRow.vue";
import TableLoading from "@/components/main/loading/TableLoading.vue";
import { getRoles } from "@/api/services/seguridad/RolAPI";

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["on-toggle-loaded"]);

const STORE = useStore();

const permisos = computed(() => [...STORE.getters.PERMISO__permisos]);

onMounted(async () => {
  emit("on-toggle-loaded", false);
  await STORE.dispatch(PERMISO__SET_PERMISOS, {});
  emit("on-toggle-loaded", true);
});

onUnmounted(async () => {
  await STORE.dispatch(PERMISO__RESET);
});
</script>

<style scoped>
tr:nth-child(even) {
  background: var(--dark-gray);
}
</style>