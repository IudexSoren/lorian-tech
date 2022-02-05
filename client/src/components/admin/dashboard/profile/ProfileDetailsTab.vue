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
  </div>
</template>

<script setup>
defineProps({
  usuario: {
    type: Object,
    required: true,
  },
});
</script>