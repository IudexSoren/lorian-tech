<template>
  <transition mode="out-in" name="fade">
    <usuario-tab v-if="currentTabIndex === 1"
      ><UsuarioDetailsTab :usuario="usuario" @on-click="onClick"
    /></usuario-tab>
    <usuario-tab v-else-if="currentTabIndex === 2"
      ><UsuarioPermisosTab :permisos="usuario.permisos"
    /></usuario-tab>
    <usuario-tab v-else-if="currentTabIndex === 3"
      ><UsuarioOpcionesTab :usuario="usuario"
    /></usuario-tab>
  </transition>
</template>

<script setup>
import UsuarioTab from "./UsuarioTab.vue";
import UsuarioDetailsTab from "./UsuarioDetailsTab.vue";
import UsuarioPermisosTab from "./UsuarioPermisosTab.vue";
import UsuarioOpcionesTab from "./UsuarioOpcionesTab.vue";

defineProps({
  currentTabIndex: {
    type: Number,
    required: true,
  },
  usuario: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["on-click"]);

const onClick = (index) => {
  emit("on-click", index);
};
</script>