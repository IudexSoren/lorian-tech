<template>
  <li
    class="
      flex
      gap-2
      items-center
      justify-between
      px-2
      py-1
      rounded-sm
      flex-wrap
      permiso-option
      mx-1
    "
    :class="`${checked && 'selected'}  ${show && 'bg-dark-gray-lighter'}`"
  >
    <div class="flex gap-2 items-center justify-between w-full">
      <div class="flex gap-2 w-4/6 text-truncated items-center flex-grow">
        <input type="checkbox" :checked="checked" @click="onChecked" />
        <transition mode="out-in" name="fade">
          <span
            class="w-5/6 text-truncated text-white"
            :class="`${show ? 'text-white-50' : 'text-white'} ${
              isAvailable === false && 'line-through text-danger'
            }`"
            @click="onToggleShow"
            >{{ permiso.nombre }}
          </span>
        </transition>
        <small
          v-if="isAvailable === false"
          class="text-danger flex gap-2 items-center"
          @click="onToggleShow"
        >
          <span>¡Este permiso no está disponible para este rol!</span></small
        >
      </div>
      <i
        class="fas"
        :class="show ? 'fa-caret-down' : 'fa-caret-right'"
        @click="onToggleShow"
      ></i>
    </div>
    <transition mode="out-in" name="fade">
      <div class="w-full pb-3" v-if="show" @click="onToggleShow">
        <span class="w-full font-bold">{{ permiso.nombre }}</span>
        <p class="w-full text-white-75 text-sm" v-if="permiso.descripcion">
          {{ permiso.descripcion }}
        </p>
      </div>
    </transition>
  </li>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  permiso: {
    type: Object,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["on-checked"]);

watch(props, () => {
  checked.value = !!props.isChecked;
});

const permiso = ref({
  ...props.permiso,
});
const checked = ref(!!props.isChecked);
const show = ref(false);

const onToggleShow = () => {
  show.value = !show.value;
};

const onChecked = () => {
  checked.value = !checked.value;
  emit("on-checked", {
    id: permiso.value.id,
    checked: checked.value,
  });
};
</script>

<style scoped>
.permiso-option {
  cursor: pointer;
  transition: background linear 0.2s;
}
.permiso-option.selected,
.permiso-option:hover {
  background: var(--dark-blue);
}
</style>