<template>
  <div
    class="
      sidebar
      absolute
      lg:static
      h-screen
      w-full
      md:w-1/2
      lg:w-auto lg:col-span-1
      bg-dark-gray-lighter
      flex flex-col
      border-gray-600 border-r
      z-30
    "
    :class="!sidebarState && 'closed'"
  >
    <div
      class="
        flex flex-wrap
        items-center
        gap-3
        p-7
        pt-8
        border-gray-600
        bordser-b
        relative
      "
    >
      <img :alt="APP_NAME" class="h-12 w-12" src="@/assets/icons/logo-sshs-2.svg" />
      <h1
        class="
          text-primary text-center text-3xl
          flex-grow
          tracking-wider
          rubik
          font-bold
          uppercase
        "
      >
        {{ APP_NAME }}
      </h1>
      <i
        class="
          fas
          fa-times
          absolute
          right-5
          icon-option
          close-btn
          cursor-pointer
        "
        @click="onToggleSidebarState"
      ></i>
    </div>
    <Navbar />
    <Profile />
  </div>
</template>

<script setup>
import { computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import * as UI_ACTIONS from "@/constants/ACTIONS/UI_ACTIONS";
import Navbar from "./Navbar.vue";
import Profile from "./Profile.vue";

const APP_NAME = process.env.VUE_APP_APP_NAME;
const STORE = useStore();

const sidebarState = computed(() => STORE.getters.UI__navbarState);

onUnmounted(async () => {
  await STORE.dispatch(UI_ACTIONS.UI__RESET);
});

const onToggleSidebarState = async () =>
  await STORE.dispatch(UI_ACTIONS.UI__SET_CHANGE, {
    name: "navbarState",
    value: !sidebarState.value,
  });
</script>

<style scoped>
.title {
  font-size: 2.5rem;
}

.sidebar {
  transition: transform linear 0.2s, width linear 0.2s, opacity linear 0.3s;
}

.closed {
  opacity: 0;
  transform: translateX(-100%);
}

@media only screen and (min-width: 1024px) {
  .close-btn {
    display: none;
  }

  .closed {
    opacity: 1;
    transform: none;
    width: auto;
  }
}
</style>