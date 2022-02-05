<template>
  <div class="flex flex-col overflow-auto h-full" v-if="access[2]">
    <DashboardContentTitle title="Usuarios" route="Seguridad &rsaquo;" />
    <dashboard-admin-wrapper class="overflow-auto">
      <dashboard-admin-column v-if="access[!currentUsuario.id ? 7 : 8]"
        ><UsuarioForm
      /></dashboard-admin-column>
      <dashboard-admin-column
        class="overflow-auto flex-grow xl:self-stretch"
        :class="`${!access[!currentUsuario.id ? 7 : 8] && 'xl:col-span-2'}`"
        v-if="access[6]"
      >
        <UsuarioListContainer />
      </dashboard-admin-column>
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
import UsuarioForm from "./UsuarioForm.vue";
import UsuarioListContainer from "./UsuarioListContainer.vue";

import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

import DashboardAdminWrapper from "../../../dashboardContent/DashboardAdminWrapper.vue";
import DashboardAdminColumn from "../../../dashboardContent/DashboardAdminColumn.vue";

const STORE = useStore();
const currentUsuario = computed(() => STORE.getters.USUARIO__currentUsuario);
</script>

<style scoped>
</style>
