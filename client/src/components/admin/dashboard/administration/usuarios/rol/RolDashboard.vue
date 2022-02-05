<template>
  <div class="flex flex-col overflow-auto h-full" v-if="access[3]">
    <DashboardContentTitle title="Roles" route="Seguridad &rsaquo;" />
    <dashboard-admin-wrapper class="overflow-auto">
      <dashboard-admin-column v-if="access[!currentRol.id ? 10 : 11]"
        ><RolForm
      /></dashboard-admin-column>
      <dashboard-admin-column
        class="overflow-auto flex-grow xl:self-stretch"
        :class="`${!access[!currentRol.id ? 10 : 11] && 'xl:col-span-2'}`"
        v-if="access[9]"
        ><RolListContainer
      /></dashboard-admin-column>
      <ModalNotification />
    </dashboard-admin-wrapper>
  </div>
  <div v-else></div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { access } from "@/helpers/customHooks/AuthHook";

import DashboardContentTitle from "../../../dashboardContent/DashboardContentTitle.vue";
import RolForm from "./RolForm.vue";
import RolListContainer from "./RolListContainer.vue";

import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

import DashboardAdminWrapper from "../../../dashboardContent/DashboardAdminWrapper.vue";
import DashboardAdminColumn from "../../../dashboardContent/DashboardAdminColumn.vue";

const STORE = useStore();
const currentRol = computed(() => STORE.getters.ROL__currentRol);
</script>

<style scoped>
</style>
