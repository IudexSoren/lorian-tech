<template>
  <ul
    class="
      absolute
      bottom-full
      right-0
      z-10
      w-max
      bg-dark-gray
      rounded
      border border-gray-700
      mb-2
      shadow
      overflow-hidden
      p-1
      outline-none
      flex flex-col
      gap-1
    "
    id="profileMenu"
    tabindex="0"
  >
    <router-link
      class="
        pl-3
        pr-10
        py-2
        flex
        gap-2
        items-center
        transition
        ease-linear
        hover:bg-gray-100 hover:bg-opacity-5
        rounded
      "
      :to="DASHBOARD_PERFIL"
      @click="onCloseFloatingMenu"
    >
      <i class="fas fa-user text-sm"></i>
      <span>Ver perfil</span>
    </router-link>
    <hr class="border-gray-700 bg-dark-gray w-1/4 mx-auto" />
    <li
      class="
        pl-3
        pr-10
        py-2
        flex
        gap-2
        items-center
        transition
        ease-linear
        hover:bg-gray-100 hover:bg-opacity-5
        rounded
      "
      @click="onLogout"
    >
      <i class="fas fa-power-off text-sm"></i>
      <span>Cerrar sesión</span>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS";
import { logout } from "@/helpers/customHooks/AuthHook";
import { DASHBOARD_PERFIL } from "@/constants/ADMIN_ROUTES";

const STORE = useStore();

const emit = defineEmits(["on-close-menu"]);

const onLogout = async () => {
  await logout();
};

const onCloseFloatingMenu = async () => {
  const profileMenu = document.getElementById("profileMenu");
  profileMenu.blur();
  emit("on-close-menu");
  await onClick();
};

const onClick = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "navbarState",
    value: false,
  });
};
</script>