<template>
  <div class="flex flex-col overflow-auto h-full">
    <DashboardContentTitle
      :title="loggedUser.nombreUsuario || ''"
      route="Perfil &rsaquo;"
    />
    <dashboard-admin-wrapper class="overflow-auto h-full">
      <div class="flex flex-col col-span-2 gap-5 rounded">
        <div
          class="
            flex flex-col
            md:flex-row
            gap-5
            p-5
            bg-dark-gray-lighter
            items-center
            rounded
            border border-gray-700
          "
        >
          <div
            class="w-32 h-32 max-w-32 rounded-full overflow-hidden"
            v-if="!userImage"
          >
            <div class="skeleton w-full h-full"></div>
          </div>
          <img
            :src="userImage"
            alt="IudexSoren"
            class="w-32 h-32 rounded-full border border-gray-700 object-cover"
            v-else
          />
          <div class="flex flex-col text-center md:text-left">
            <span class="text-white-50 font-bold text-xl"
              >ID {{ loggedUser.id }}</span
            >
            <h1 class="font-bold text-4xl">
              {{ loggedUser.nombreUsuario }}
            </h1>
          </div>
        </div>
        <div
          class="
            flex flex-col flex-grow
            rounded
            border border-gray-700
            bg-dark-gray-lighter
          "
        >
          <ProfileTabsRow
            :currentTabIndex="currentTabIndex"
            @on-click="onSelectedTab"
          />
          <ProfileTabsContainer
            :currentTabIndex="currentTabIndex"
            :usuario="loggedUser"
            :modalOptionAccepted="modalOptionAccepted"
            @on-desactivar-cuenta="onDesactivarCuenta"
            @on-selected-tab="onSelectedTab"
          />
        </div>
      </div>
      <ModalNotification @on-click="onDesactivarCuenta" />
    </dashboard-admin-wrapper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { loggedUser, logout, userImage } from "@/helpers/customHooks/AuthHook";
import { USUARIOS_CONTENT_FOLDER_NAME } from "@/constants/CONTENT_FOLDERS";
import { USUARIO__UPDATE_USUARIO_ESTADO } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import DashboardContentTitle from "@/components/admin/dashboard/dashboardContent/DashboardContentTitle.vue";
import DashboardAdminWrapper from "@/components/admin/dashboard/dashboardContent/DashboardAdminWrapper.vue";
import ProfileTabsRow from "./ProfileTabsRow.vue";
import ProfileTabsContainer from "./ProfileTabsContainer.vue";
import ModalNotification from "@/components/main/notifications/ModalNotification.vue";

const STORE = useStore();

const currentTabIndex = ref(1);
const modalOptionAccepted = ref(null);

const onSelectedTab = (index) => {
  currentTabIndex.value = index;
};

const onDesactivarCuenta = async (btnIndex) => {
  if (btnIndex === 1) modalOptionAccepted.value = btnIndex;
};
</script>