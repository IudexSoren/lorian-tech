<template>
  <div
    class="
      flex
      items-center
      justify-center
      gap-2
      py-3
      cursor-pointer
      transition-colors
      duration-300
      flex-grow
      rounded-t-sm
    "
    :class="`${current && 'bg-primary text-white'}`"
  >
    <i :class="icon"></i
    ><span class="font-bold hidden md:flex">{{ label }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  current: {
    type: Boolean,
    default: false,
  },
});
</script>