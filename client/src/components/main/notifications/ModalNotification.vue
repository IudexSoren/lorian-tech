<template>
  <transition name="fade-scale">
    <div
      class="
        h-full
        w-full
        absolute
        top-0
        left-0
        overflow-hidden
        backdrop-filter backdrop-brightness-50 backdrop-blur-sm
        z-50
        flex
        items-center
        justify-center
      "
      v-if="notification?.show && notification?.type === MODAL_NOTIFICATION"
      @contextmenu="onContextMenu"
    >
      <div
        class="
          rounded
          modal
          overflow-auto
          p-5
          relative
          z-10
          bg-dark-gray
          border border-gray-700
          w-11/12
          xl:w-2/5
          md:w-3/5
          flex flex-col
          gap-5
        "
      >
        <h1
          class="text-2xl font-bold lg:text-3xl"
          :class="`text-${notification?.messageType}`"
        >
          {{ notification?.title }}
        </h1>
        <p
          class="text-justify text-white-75 text-lg lg:text-xl font-bold"
          v-if="notification?.message"
        >
          {{ notification?.message }}
        </p>
        <div class="flex flex-col-reverse md:flex-row items-center flex-wrap mt-3 gap-2 md:gap-0">
          <div
            :class="button.container"
            v-for="button of notification?.buttons"
            :key="button.index"
          >
            <button
              class="btn w-full"
              :class="button.class"
              @click="onClick(button.index)"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </div>
      <div class="h-full w-full absolute top-0 letf-0"></div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";
import { MODAL_NOTIFICATION } from "@/constants/NOTIFICATION_TYPES";

const STORE = useStore();

const notification = computed(() => STORE.getters.UI__notification);

const emit = defineEmits(["on-click"]);

const onClick = async (btnIndex) => {
  await onClose();
  emit("on-click", btnIndex);
};

const onClose = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "notification",
    value: {
      ...notification.value,
      show: false,
      type: null,
      messageType: "",
      title: "",
      message: "",
      buttons: [
        {
          index: 1,
          text: "Aceptar",
          class: "btn-primary",
        },
      ],
    },
  });
};

const onContextMenu = (e) => {
  e.preventDefault();
};
</script>

<style scoped>
.modal {
  max-height: calc(100% - 20px);
  max-width: calc(100% - 20px);
}
</style>