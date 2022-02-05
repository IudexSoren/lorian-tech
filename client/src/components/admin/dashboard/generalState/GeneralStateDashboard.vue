<template>
  <div class="flex flex-col overflow-auto h-full" v-if="access[1]">
    <DashboardContentTitle title="Inicio" route="&rsaquo;" />
    <div class="overflow-auto h-full w-full">
      <div
        class="
          flex flex-grow
          justify-between
          items-center
          text-lg
          flex-wrap
          mb-5
          text-white-50
          pt-5
          px-5
        "
      >
        <span>Estado general de {{ APP_NAME }}</span>
        <span>{{ today }}</span>
      </div>
      <div class="flex flex-col gap-3">
        <StateSection
          title="Seguridad"
          :cards="CARDS"
          v-if="userPermissions.includes(PERMISSIONS.ACCESO__MODULO_SEGURIDAD)"
        />
      </div>
    </div>
  </div>
  <div v-else></div>
</template>

<script setup>
import { ref } from "vue";
import * as ADMIN_ROUTES from "@/constants/ADMIN_ROUTES.js";
import * as PERMISSIONS from "@/constants/PERMISSIONS";
import { access, userPermissions } from "@/helpers/customHooks/AuthHook";
import DashboardContentTitle from "../dashboardContent/DashboardContentTitle.vue";
import StateSection from "./StateSection.vue";

const APP_NAME = process.env.VUE_APP_APP_NAME;

let today = ref();

setInterval(() => {
  const date = new Date();
  today.value = `${isLessThanTen(date.getFullYear())}-${isLessThanTen(
    date.getMonth() + 1
  )}-${isLessThanTen(date.getDate())} ${isLessThanTen(
    date.getHours()
  )}:${isLessThanTen(date.getMinutes())}:${isLessThanTen(date.getSeconds())}`;
}, 1000);

const isLessThanTen = (number) => {
  return number < 10 ? `0${number}` : number;
};

const CARDS = [
  {
    title: "Usuarios",
    route: ADMIN_ROUTES.DASHBOARD_USUARIO,
    data: "",
    buttonText: "Administrar usuarios",
    idComponente: 2,
  },
  {
    title: "Roles",
    route: ADMIN_ROUTES.DASHBOARD_ROL,
    data: "",
    buttonText: "Administrar roles",
    idComponente: 3,
  },
  {
    title: "Permisos",
    route: ADMIN_ROUTES.DASHBOARD_PERMISO,
    data: "",
    buttonText: "Administrar permisos",
    idComponente: 4,
  },
  {
    title: "Componentes",
    route: ADMIN_ROUTES.DASHBOARD_COMPONENTE,
    data: "",
    buttonText: "Administrar componentes",
    idComponente: 5,
  },
];
</script>

<style scoped>
</style>