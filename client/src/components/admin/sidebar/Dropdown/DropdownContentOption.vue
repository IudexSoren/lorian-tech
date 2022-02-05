<template>
  <li
    class="
      dropdown-content-option
      flex
      gap-3
      text-lg
      rounded
      transition
      duration-200
    "
    @click="onClick"
    v-if="
      optionInfo.idPermiso && userPermissions.includes(optionInfo.idPermiso)
    "
  >
    <router-link
      :to="optionInfo.route"
      class="w-full flex gap-3 items-center px-2 p-1 rounded"
    >
      <i class="text-base" :class="optionInfo.icon"></i
      ><span>{{ optionInfo.text }}</span>
    </router-link>
  </li>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS";
import { userPermissions } from "@/helpers/customHooks/AuthHook";

defineProps({
  optionInfo: {
    type: Object,
    required: true,
  },
});

const STORE = useStore();

const onClick = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "navbarState",
    value: false,
  });
};
</script>

<style scoped>
.dropdown-content-option:hover {
  background: var(--dark-gray-lighter);
}
</style>