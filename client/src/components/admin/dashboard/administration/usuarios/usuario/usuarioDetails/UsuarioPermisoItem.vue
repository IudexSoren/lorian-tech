<template>
  <li class="flex gap-2 flex-col cursor-pointer" @click="onToggleShow()">
    <div class="flex gap-2 items-center">
      <i
        class="fas text-xs"
        :class="`${show ? 'fa-caret-down' : 'fa-caret-right'} ${
          !permiso.descripcion && 'opacity-0'
        }`"
      ></i>
      <span class="text-lg">{{ permiso.nombre }}</span>
    </div>
    <transition mode="out-in" name="fade">
      <p
        class="w-full pb-2 px-4 text-white-50"
        v-if="show && permiso.descripcion"
      >
        {{ permiso.descripcion }}
      </p>
    </transition>
  </li>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  permiso: { type: Object, required: true },
});

const show = ref(false);

const onToggleShow = () => {
  show.value = !show.value && props.permiso.descripcion;
};
</script>