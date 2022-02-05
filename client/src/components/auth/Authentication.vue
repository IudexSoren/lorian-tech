<template>
  <div class="h-screen">
    <div
      class="
        absolute
        h-full
        w-full
        z-10
        flex
        items-center
        justify-center
        max-h-full
        overflow-auto
      "
    >
      <div
        class="
          backdrop-filter backdrop-opacity-30 backdrop-blur-sm
          shadow-md
          md:w-auto
          border border-gray-600
          2xl:w-2/5
          rounded
          bg-gray-800 bg-opacity-80
          text-white
          flex
          items-center
          flex-col
          lg:flex-row
          p-5
          gap-6
          overflow-hidden
          md:h-autso
        "
      >
        <div
          class="
            flex
            items-center
            justify-around
            bg-primary
            lg:h-4/4
            xl:flex-grow
            lg:w-2/4
            xl:w-1/4
            p-2
            py-12
            rounded-md
            border-4 border-primary
            flex-col
            gap-5
            w-full
            relative
            overflow-hidden
          "
        >
          <img
            src="@/assets/icons/logo-sshs-1.svg"
            alt=""
            class="absolute top-0 left-0 w-full h-full object-cover"
          />
          <img
            src="@/assets/icons/logo-sshs-1.svg"
            :alt="APP_NAME"
            class="
              relative
              z-10
              h-full
              w-full
              hidden
              lg:block
              opacity-0
              lg:w-2/3 lg:h-2/3
            "
          />
          <h1
            class="
              absolute
              z-10
              text-4xl
              3xl:text-3xl
              font-bold
              tracking-widest
              rubik
              text-white text-center
              uppercase
              opacity-75s
              bottom-1
            "
          >
            {{ APP_NAME }}
          </h1>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="fade-slide-right" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <ModalNotification />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

const APP_NAME = process.env.VUE_APP_APP_NAME;

</script>

<style>
.form-error-message {
  font-weight: bold;
}
</style>