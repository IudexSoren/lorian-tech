<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="in-out">
      <component :is="Component" />
    </transition>
    <MainLoading />
    <FloatingNotification />
  </router-view>
</template>

<script setup>
import MainLoading from "./components/main/loading/MainLoading.vue";
import FloatingNotification from "@/components/main/notifications/FloatingNotification.vue";
</script>

<style lang="scss">
a {
  transition: color 0.2s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
