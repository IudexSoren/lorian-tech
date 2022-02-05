<template>
  <div
    class="
      flex flex-col flex-grow
      self-end
      w-full
      h-full
      border border-gray-700
      rounded
    "
  >
    <UsuarioInfoTabsRow
      @on-click="onSelectedTab"
      :currentTabIndex="currentTabIndex"
    />
    <UsuarioTabs
      :currentTabIndex="currentTabIndex"
      :usuario="usuario"
      @on-click="onSelectedTab"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import UsuarioInfoTabsRow from "./UsuarioInfoTabsRow.vue";
import UsuarioTabs from "./UsuarioTabs.vue";

defineProps({
  usuario: {
    type: Object,
    required: true,
  },
});

const currentTabIndex = ref(1);

const onSelectedTab = (index) => {
  currentTabIndex.value = index;
};
</script>