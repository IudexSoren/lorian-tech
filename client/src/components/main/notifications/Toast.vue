<template>
  <div
    class="
      flex flex-col
      md:flex-row
      gap-2
      rounded
      w-full
      items-center
      p-2
      cursor-default
    "
    :class="`bg-${messageType}-50`"
    @click="onToggleShow"
  >
    <i v-if="icon" class="text-5xl" :class="`text-${messageType} ${icon}`"></i>
    <p class="font-bold" :class="`text-${messageType}`">{{ text }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const show = ref(true);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "fas fa-info-circle",
  },
  messageType: {
    type: String,
    default: "info",
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
});

const onToggleShow = () => {
  if (props.dismissable) show.value = !show.value;
};
</script>