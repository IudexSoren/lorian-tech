<template>
  <transition name="fade" mode="out-in">
    <tbody v-if="loaded">
      <UsuarioTableRow
        v-for="usuario of usuarios"
        :key="usuario.id"
        :usuario="usuario"
        :ESTADOS_USUARIO="ESTADOS_USUARIO"
        @on-show-details="onShowDetails"
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
  USUARIO__SET_USUARIOS,
  USUARIO__UNSET_USUARIOS,
  ESTADO_USUARIO__SET_ESTADOS_USUARIO,
  ESTADO_USUARIO__UNSET_ESTADOS_USUARIO,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import UsuarioTableRow from "./UsuarioTableRow.vue";
import TableLoading from "@/components/main/loading/TableLoading.vue";

const STORE = useStore();

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["on-toggle-loaded", "on-show-details"]);

const usuarios = computed(() => [...STORE.getters.USUARIO__usuarios]);

onMounted(async () => {
  emit("on-toggle-loaded", false);
  await STORE.dispatch(USUARIO__SET_USUARIOS, {});
  await STORE.dispatch(ESTADO_USUARIO__SET_ESTADOS_USUARIO, {});
  emit("on-toggle-loaded", true);
});

onUnmounted(async () => {
  await STORE.dispatch(USUARIO__UNSET_USUARIOS);
  await STORE.dispatch(ESTADO_USUARIO__UNSET_ESTADOS_USUARIO);
});

const ESTADOS_USUARIO = computed(() => {
  const estadosUsuario = [];
  for (const estado of [...STORE.getters.ESTADO_USUARIO__estadosUsuario]) {
    estadosUsuario.push({
      value: estado.id,
      name: estado.nombre,
    });
  }

  return estadosUsuario;
});

const onShowDetails = (usuario) => {
  emit("on-show-details", usuario);
};
</script>

<style scoped>
tr:nth-child(even) {
  background: var(--dark-gray);
}
</style>