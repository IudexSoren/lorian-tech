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
        z-30
        flex
        items-start
        pt-5
        md:pt-10
        lg:pt-20
        justify-center
      "
      v-if="modal.show"
      @contextmenu="onContextMenu"
    >
      <div
        class="
          rounded
          modal
          overflow-y-auto overflow-x-hidden
          relative
          z-10
          flex flex-col
        "
        :class="classes"
      >
        <slot></slot>
      </div>
      <div class="h-full w-full absolute top-0 letf-0" @click="onClose"></div>
    </div>
  </transition>
</template>

<script setup>
import { computed, defineProps, ref } from "vue";
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";

const props = defineProps({
  classes: {
    type: String,
    default: "bg-dark-gray border border-gray-700 w-auto xl:w-2/5 md:w-3/5",
  },
});

const STORE = useStore();

const modal = computed(() => STORE.getters.UI__dynamicModal);

const onClose = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: false,
      keyword: "",
    },
  });
};

const keywordIscorrect = () => {
  return props.keyword === modal.value.keyword;
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