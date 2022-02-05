<template>
  <div class="h-20 flex p-2 gap-3 items-center">
    <div
      class="w-14 h-14 max-w-14 rounded-full overflow-hidden"
      v-if="!userImage"
    >
      <div class="skeleton w-full h-full"></div>
    </div>
    <img
      :src="userImage"
      alt="IudexSoren"
      class="w-14 h-14 rounded-full object-cover"
      v-else
    />
    <div class="flex-grow flex justify-center flex-col w-1/2">
      <span
        class="text-white font-bold text-lg leading-5 text-truncated w-full"
        >{{ loggedUser && loggedUser.nombreUsuario }}</span
      >
      <small class="text-white-50 text-truncated w-full">{{
        loggedUser && loggedUser.rol && loggedUser.rol.nombre
      }}</small>
    </div>
    <div class="flex items-center">
      <div
        class="
          flex
          items-center
          justify-center
          rounded
          w-8
          h-8
          cursor-pointer
          relative
          bg-wine
        "
        @click="onShowMenu"
      >
        <i class="fas fa-ellipsis-v text-sm"></i>
        <transition name="fade" mode="out-in">
          <ProfileFloationgMenu v-if="showMenu" @on-close-menu="onCloseMenu" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loggedUser, userImage } from "@/helpers/customHooks/AuthHook";
import { USUARIOS_CONTENT_FOLDER_NAME } from "@/constants/CONTENT_FOLDERS";
import ProfileFloationgMenu from "./ProfileFloatingMenu.vue";

const showMenu = ref(false);

const onShowMenu = () => {
  setTimeout(() => {
    const profileMenu = document.getElementById("profileMenu");
    if (profileMenu) {
      profileMenu.addEventListener("blur", () => {
        showMenu.value = false;
      });
      profileMenu.focus();
    }
  }, 150);
  showMenu.value = true;
};

const onCloseMenu = () => {
  setTimeout(() => {
    showMenu.value = false;
  }, 100);
};
</script>

<style scoped>
</style>