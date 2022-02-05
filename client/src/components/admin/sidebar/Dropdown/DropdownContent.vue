<template>
  <ul
    class="
      list-none
      flex flex-col
      gap-2
      rounded
      p-1
      bg-dark-gray
      w-full
      bordser
      border-gray-700
    "
  >
    <DropdownContentOption
      v-for="(option, index) of options"
      :key="index"
      :optionInfo="option"
    />
  </ul>
</template>

<script setup>
import { defineProps } from "vue";
import DropdownContentOption from "./DropdownContentOption.vue";

defineProps({
  options: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
</style>