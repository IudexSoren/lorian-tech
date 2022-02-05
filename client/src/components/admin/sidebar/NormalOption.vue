<template>
  <li
    class="flex gap-3 items-center flex-wrap text-white text-2xl"
    v-if="
      optionInfo.idPermiso && userPermissions.includes(optionInfo.idPermiso)
    "
  >
    <router-link
      :to="optionInfo.route"
      class="w-full flex gap-3 items-center"
      @click="onClick"
      ><i class="text-base" :class="optionInfo.icon"></i>
      <span>{{ optionInfo.text }}</span></router-link
    >
  </li>
</template>

<script setup>
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS";
import { userPermissions } from "@/helpers/customHooks/AuthHook";

defineProps({
  optionInfo: {
    type: Object,
    required: true,
  },
  idPermiso: {
    type: Number,
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
</style>