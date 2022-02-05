<template>
  <div class="p-5 flex-grow overflow-auto rounded-b border-gray-700 border-t">
    <transition name="fade" mode="out-in">
      <ProfileDetailsTab :usuario="usuario" v-if="currentTabIndex === 1" />
      <ProfileOpcionesTab
        :usuario="usuario"
        v-else-if="currentTabIndex === 2"
        @on-selected-tab="onSelectedTab"
      />
      <ProfilePasswordResetTab
        v-else-if="currentTabIndex === 3"
        @on-selected-tab="onSelectedTab"
      />
      <ProfileDeactiveAccountTab
        v-else-if="currentTabIndex === 4"
        @on-selected-tab="onSelectedTab"
        :modalOptionAccepted="modalOptionAccepted"
      />
    </transition>
  </div>
</template>

<script setup>
import ProfileDetailsTab from "./ProfileDetailsTab.vue";
import ProfileOpcionesTab from "./ProfileOpcionesTab.vue";
import ProfilePasswordResetTab from "./ProfilePasswordResetTab.vue";
import ProfileDeactiveAccountTab from "./ProfileDeactiveAccountTab.vue";

const emit = defineEmits(["on-selected-tab"]);

defineProps({
  currentTabIndex: {
    type: Number,
    required: true,
  },
  usuario: {
    type: Object,
    required: true,
  },
  modalOptionAccepted: {
    type: Number,
  },
});

const onSelectedTab = (index) => {
  emit("on-selected-tab", index);
};
</script>