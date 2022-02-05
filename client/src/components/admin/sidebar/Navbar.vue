<template>
  <ul
    class="
      flex-grow
      border-b border-gray-600
      p-5
      overflow-auto
      list-none
      flex flex-col
      gap-4
    "
  >
    <button class="btn btn-secondary mb-3">
      <i class="fab fa-sistrix"></i><span class="w-full text-left">Buscar</span>
    </button>
    <!-- INICIO -->
    <NormalOption :optionInfo="opcionInicio" />
    <hr class="border-t border-gray-600" />
    <!-- SEGURIDAD DROPDOWN -->
    <DropdownOption :optionInfo="opcionSeguridad" />
  </ul>
</template>

<script setup>
import DropdownOption from "./Dropdown/DropdownOption.vue";
import NormalOption from "./NormalOption.vue";
import * as ADMIN_ROUTES from "@/constants/ADMIN_ROUTES";
import * as PERMISSIONS from "@/constants/PERMISSIONS";

const opcionInicio = {
  text: "Inicio",
  route: ADMIN_ROUTES.DASHBOARD,
  icon: "fas fa-home",
  idPermiso: PERMISSIONS.ACCESO__PANEL_CONTROL_PRINCIPAL,
};

const opcionSeguridad = {
  text: "Seguridad",
  icon: "fas fa-user-shield",
  idPermiso: PERMISSIONS.ACCESO__MODULO_SEGURIDAD,
  options: [
    {
      text: "Usuarios",
      route: ADMIN_ROUTES.DASHBOARD_USUARIO,
      icon: "fas fa-users",
      idPermiso: PERMISSIONS.ACCESO__PANEL_CONTROL_USUARIOS,
    },
    {
      text: "Roles",
      route: ADMIN_ROUTES.DASHBOARD_ROL,
      icon: "fas fa-user-tag",
      idPermiso: PERMISSIONS.ACCESO__PANEL_CONTROL_ROLES,
    },
    {
      text: "Permisos",
      route: ADMIN_ROUTES.DASHBOARD_PERMISO,
      icon: "fas fa-user-shield",
      idPermiso: PERMISSIONS.ACCESO__PANEL_CONTROL_PERMISOS,
    },
    {
      text: "Componentes",
      route: ADMIN_ROUTES.DASHBOARD_COMPONENTE,
      icon: "fab fa-hive",
      idPermiso: PERMISSIONS.ACCESO__PANEL_CONTROL_COMPONENTES,
    },
  ],
};
</script>