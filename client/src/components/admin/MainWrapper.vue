<template>
  <div class="h-screen w-screen overflow-hidden relative lg:grid main-wrapper">
    <Sidebar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Sidebar from "./sidebar/Sidebar.vue";
</script>

<style>
body {
  background: var(--dark-gray);
  color: var(--white);
}

@media only screen and (min-width: 1024px) {
  .main-wrapper {
    grid-template-columns: 370px 1fr;
  }
}
</style>