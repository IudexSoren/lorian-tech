<template>
  <div class="flex w-full self-start">
    <UsuarioInfoTabContainer
      :label="'Detalles'"
      :icon="'fas fa-info-circle'"
      :index="1"
      :current="currentTabIndex === 1"
      @click="onClick(1)"
    />
    <UsuarioInfoTabContainer
      :label="'Permisos'"
      :icon="'fas fa-list-ul'"
      :index="2"
      :current="currentTabIndex === 2"
      @click="onClick(2)"
    />
    <UsuarioInfoTabContainer
      :label="'Opciones'"
      :icon="'fas fa-cog'"
      :index="3"
      :current="currentTabIndex === 3"
      @click="onClick(3)"
    />
  </div>
</template>

<script setup>
import UsuarioInfoTabContainer from "./UsuarioInfoTabContainer.vue";

const emit = defineEmits(["on-click"]);

defineProps({
  currentTabIndex: {
    type: Number,
    required: true,
    default: 1,
  },
});

const onClick = (index) => {
  emit("on-click", index);
};
</script>