<template>
  <transition name="fade-scale" mode="out-in">
    <div
      class="
        p-3
        lg:p-5
        flex flex-col
        gap-3
        fixed
        bottom-5
        right-5
        rounded
        bg-dark-gray-lighter
        shadow
        z-50
        cursor-pointer
        w-11/12
        md:w-2/3
        lg:w-1/3
        xl:w-1/4
        backdrop-filter backdrop-blur
      "
      v-if="notification?.show && notification?.type === FLOATING_NOTIFICATION"
      @click="onClose"
      :class="`bg-${notification?.messageType}-50`"
    >
      <h1
        class="text-lg font-bold"
        :class="`text-${notification?.messageType}`"
      >
        {{ notification?.title }}
      </h1>
      <p class="text-white">
        {{ notification?.message }}
      </p>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";
import { FLOATING_NOTIFICATION } from "@/constants/NOTIFICATION_TYPES";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";

const STORE = useStore();
let currentTimeout = null;

const notification = computed(() => STORE.getters.UI__notification);

watch(notification, () => {
  if (
    notification.value?.type === FLOATING_NOTIFICATION &&
    notification.value?.show
  ) {
    onTimeoutClose();
  } else {
    clearCurrentTimeout();
  }
});

const onClose = async () => {
  clearCurrentTimeout();
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "notification",
    value: {
      ...notification.value,
      show: false,
      type: null,
      messageType: "",
      title: "",
      message: "",
      buttons: [],
    },
  });
};

const onTimeoutClose = async () => {
  clearCurrentTimeout();
  currentTimeout = setTimeout(async () => {
    await onClose();
  }, 15000);
};

const clearCurrentTimeout = () => {
  clearTimeout(currentTimeout);
};
</script>

<style scoped>
</style>