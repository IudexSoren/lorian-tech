<template>
  <li class="font-bold text-white-75 uppercase text-sm px-3 py-2">
    {{ title }}
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
</style>