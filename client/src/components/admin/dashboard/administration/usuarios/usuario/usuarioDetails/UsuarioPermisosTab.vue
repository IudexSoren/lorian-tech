<template>
  <ul class="flex gap-2 flex-col h-full overflow-auto">
    <UsuarioPermisoItem
      v-for="permiso of permisos"
      :key="permiso.id"
      :permiso="permiso"
    />
    <li v-if="!permisos">Este usuario no posee permisos</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import UsuarioPermisoItem from "./UsuarioPermisoItem.vue";

defineProps({
  permisos: {
    type: Array,
  },
});
</script>