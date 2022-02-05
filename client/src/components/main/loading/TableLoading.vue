<template>
  <td :colspan="colspan">
    <div class="flex items-center justify-center gap-3 py-5 text-primary">
      <div class="spinner"></div>
      <span class="text-xl font-bold">Cargando</span>
    </div>
  </td>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  colspan: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.spinner {
  animation: spin 1s infinite linear;
  border: 3px solid var(--primary);
  border-right-color: transparent;
  border-radius: 50%;
  height: 24px;
  width: 24px;
}
</style>