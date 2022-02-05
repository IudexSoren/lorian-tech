<template>
  <div class="flex flex-col overflow-auto h-full" v-if="access[5]">
    <DashboardContentTitle title="Componentes" route="Seguridad &rsaquo;" />
    <dashboard-admin-wrapper>
      <dashboard-admin-column v-if="access[!currentComponente.id ? 16 : 17]"
        ><ComponenteForm
      /></dashboard-admin-column>
      <dashboard-admin-column
        class="overflow-auto flex-grow xl:self-stretch"
        :class="`${
          !access[!currentComponente.id ? 16 : 17] && 'xl:col-span-2'
        }`"
        v-if="access[15]"
        ><ComponenteListContainer
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
import ComponenteForm from "./ComponenteForm.vue";
import ComponenteListContainer from "./ComponenteListContainer.vue";

import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

import DashboardAdminWrapper from "../../../dashboardContent/DashboardAdminWrapper.vue";
import DashboardAdminColumn from "../../../dashboardContent/DashboardAdminColumn.vue";

const STORE = useStore();
const currentComponente = computed(
  () => STORE.getters.COMPONENTE__currentComponente
);
</script>

<style scoped>
</style>
