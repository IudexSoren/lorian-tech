<template>
  <div class="flex flex-col overflow-auto h-full" v-if="access[4]">
    <DashboardContentTitle title="Permisos" route="Seguridad &rsaquo;" />
    <dashboard-admin-wrapper class="flex-grow  overflow-auto">
      <dashboard-admin-column v-if="access[!currentPermiso.id ? 13 : 14]"
        ><PermisoForm
      /></dashboard-admin-column>
      <dashboard-admin-column
        class="overflow-auto flex-grow xl:self-stretch"
        :class="`${!access[!currentPermiso.id ? 13 : 14] && 'xl:col-span-2'}`"
        v-if="access[12]"
        ><PermisoListContainer
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
import PermisoForm from "./PermisoForm.vue";
import PermisoListContainer from "./PermisoListContainer.vue";

import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

import DashboardAdminWrapper from "../../../dashboardContent/DashboardAdminWrapper.vue";
import DashboardAdminColumn from "../../../dashboardContent/DashboardAdminColumn.vue";

const STORE = useStore();
const currentPermiso = computed(() => STORE.getters.PERMISO__currentPermiso);
</script>

<style scoped>
</style>
