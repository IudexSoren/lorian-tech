<template>
  <tab-options-container class="bg-dark-gray-lighter rounded-t">
    <TabOption
      :label="'Detalles'"
      :icon="'fas fa-info-circle'"
      :index="1"
      :current="currentTabIndex === 1"
      @click="onSelectedTab(1)"
    />
    <TabOption
      :label="'Opciones'"
      :icon="'fas fa-cog'"
      :index="3"
      :current="currentTabIndex === 2"
      @click="onSelectedTab(2)"
    />
  </tab-options-container>
</template>

<script setup>
import { ref } from "vue";
import TabOptionsContainer from "@/components/main/tabs/TabOptionsContainer.vue";
import TabOption from "@/components/main/tabs/TabOption.vue";

const emit = defineEmits(["on-click"]);

defineProps({
  currentTabIndex: {
    type: Number,
    required: true,
  },
});

const onSelectedTab = (index) => {
  emit("on-click", index);
};
</script>