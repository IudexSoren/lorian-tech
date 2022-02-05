<template>
  <div
    class="
      flex flex-wrap
      lg:flex-nowrap
      gap-3
      lg:gap-2
      items-center
      w-full
      2xl:w-auto
      flex-grow
      xl:flex-grow-0
    "
  >
    <label for="search"><i class="fab fa-sistrix"></i></label
    ><input
      class="form-control h-full form-control-sm search-bar flex-grow"
      v-model="text"
      id="search"
      autocomplete="off"
      spellcheck="false"
      placeholder="Buscar"
      type="search"
      v-if="showInput"
      @keyup="onChange"
    />
    <button
      class="btn btn-secondary btn-sm flex-grow"
      v-if="showButton"
      @click="onClick"
    >
      <i class="fas fa-filter"></i>
      <span class="">Más opciones de búsqueda</span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits, ref, defineProps } from "vue";

defineProps({
  showInput: {
    type: Boolean,
    default: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-click", "on-change"]);

const text = ref("");

const onClick = () => {
  emit("on-click");
};

const onChange = (e) => {
  if ((e.which <= 90 && e.which >= 48) || e.which == 32 || e.which == 8)
    emit("on-change", text.value);
};
</script>


<style scoped>
.search-bar {
  width: auto !important;
}
</style>