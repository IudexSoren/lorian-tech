<template>
  <li
    class="
      flex
      gap-3
      items-center
      flex-wrap
      text-white text-2xl
      w-full
      overflow-hidden
    "
    v-if="optionInfo.idPermiso && userPermissions.includes(optionInfo.idPermiso)"
  >
    <span
      class="
        w-full
        flex
        justify-between
        items-center
        cursor-pointer
        relative
        z-10
        bg-dark-gray-lighter
      "
      @click="onToggleShow"
      ><div class="flex gap-2 items-center">
        <div class="text-sm" :class="optionInfo.icon"></div>
        <span>{{ optionInfo.text }}</span>
      </div>
      <i
        class="fas fa-caret-down text-base"
        :class="show ? 'fa-caret-down' : 'fa-caret-right'"
      ></i
    ></span>
    <transition name="fade-slide-up" mode="out-in">
      <DropdownContent v-if="show" :options="optionInfo.options" />
    </transition>
  </li>
</template>

<script setup>
import { ref, defineProps } from "vue";
import DropdownContent from "./DropdownContent.vue";
import { userPermissions } from "@/helpers/customHooks/AuthHook";

defineProps({
  optionInfo: {
    type: Object,
    required: true,
  },
});

const show = ref(false);

const onToggleShow = () => (show.value = !show.value);
</script>

<style scoped>
</style>