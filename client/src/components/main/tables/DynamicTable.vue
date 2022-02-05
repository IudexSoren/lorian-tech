<template>
  <div :class="classes" class="border border-gray-700 rounded">
    <slot></slot>
    <table class="w-full">
      <slot name="thead"></slot>
      <slot name="tbody"></slot>
      <slot name="tfoot"></slot>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  classes: {
    type: String,
    default: () => "table-fixed w-full overflow-auto h-80 flex-grow xl:h-auto",
  },
});
</script>

<style scoped>
</style>
