<template>
  <transition name="fade-scale" mode="out-in">
    <div
      class="
        h-screen
        w-screen
        fixed
        z-50
        top-0
        left-0
        flex flex-col
        gap-3
        items-center
        justify-center
        backdrop-filter backdrop-brightness-50
        overflow-hidden
      "
      v-if="show"
      @contextmenu="onContextMenu"
    >
      <div class="spinner"></div>
      <span class="font-bold text-3xl text-white">Cargando</span>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const STORE = useStore();

const show = computed(() => STORE.getters.UI__mainLoading);

const onContextMenu = (e) => {
  e.preventDefault();
};
</script>

<style scoped>
.spinner {
  animation: spin 1s infinite linear;
  border: 5px solid var(--primary);
  border-left-color: transparent;
  border-radius: 50%;
  height: 76px;
  width: 76px;
}
</style>