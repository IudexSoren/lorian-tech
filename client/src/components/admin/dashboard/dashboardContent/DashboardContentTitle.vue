<template>
  <div
    class="
      font-bold
      px-5
      py-3
      border-b border-gray-600
      flex
      items-center
    "
  >
    <div class="flex flex-col flex-grow">
      <span class="block text-white-50 mb-2" v-if="route">{{ route }}</span>
      <h1 class="text-4xl font-bold">{{ title }}</h1>
    </div>
    <i
      class="fas fa-bars icon-option flex-grow-0"
      @click="onToggleSidebarState"
    ></i>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import * as UI_ACTIONS from "@/constants/ACTIONS/UI_ACTIONS";

const STORE = useStore();

defineProps({
  title: {
    type: String,
    required: true,
  },
  route: {
    tyé: String
  }
});

const sidebarState = computed(() => STORE.getters.UI__navbarState);

const onToggleSidebarState = async () =>
  await STORE.dispatch(UI_ACTIONS.UI__SET_CHANGE, {
    name: "navbarState",
    value: !sidebarState.value,
  });
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  .icon-option {
    display: none !important;
  }
}
</style>