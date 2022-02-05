<template>
  <div class="flex gap-5 flex-col">
    <div class="flex flex-wrap gap-3 self-start w-full">
      <div class="flex-grow w-full lg:w-auto">
        <span class="text-sm block text-white-50">Nombre de usuario</span>
        <span class="text-xl block">{{ usuario.nombreUsuario }}</span>
      </div>
      <div class="flex-grow w-full lg:w-auto">
        <span class="text-sm block text-white-50">Tiempo de sesión</span>
        <span class="text-xl block">{{ usuario.tiempoSesion }} minutos</span>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 self-start w-full">
      <div class="flex-grow w-full lg:w-auto">
        <span class="text-sm block text-white-50">Rol</span>
        <span class="text-xl block capitalize">{{ usuario.rol.nombre }}</span>
      </div>
    </div>
    <div class="flex flex-wrap gap-3 self-start w-full">
      <div class="flex-grow w-full lg:w-auto">
        <span class="text-sm block text-white-50">Fecha de creación</span>
        <span class="text-xl block">{{ usuario.createdAt.slice(0, 10) }}</span>
      </div>
      <div class="flex-grow w-full lg:w-auto">
        <span class="text-sm block text-white-50">Ultima modificación</span>
        <span class="text-xl block">{{ usuario.modifiedAt.slice(0, 10) }}</span>
      </div>
    </div>
    <div class="flex items-center justify-between flex-wrap gap-2">
      <span>Estado del usuario:</span>
      <div class="flex items-center gap-2">
        <span
          class="font-bold"
          :class="`${
            usuario.idEstadoUsuario === 1
              ? 'text-success'
              : usuario.idEstadoUsuario === 2
              ? 'text-warning'
              : usuario.idEstadoUsuario === 3
              ? 'text-danger'
              : ''
          }`"
          >{{ usuario.estado.nombre }}</span
        >
        <button
          class="btn btn-secondary btn-sm"
          @click="onClick(3)"
          v-if="access[18]"
        >
          Cambiar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { access } from "@/helpers/customHooks/AuthHook";

defineProps({
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