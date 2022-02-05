<template>
  <div
    class="
      flex
      items-center
      gap-2
      text-lg
      cursor-pointer
      md:self-start
      py-1
      px-2
      rounded
      hover:bg-gray-100 hover:bg-opacity-5
      transition
    "
    @click="onBack"
  >
    <i class="fas fa-arrow-left"></i><span class="font-bold">Volver</span>
  </div>
</template>

<script setup>
const emit = defineEmits(["on-back"]);

const onBack = () => emit("on-back");
</script>