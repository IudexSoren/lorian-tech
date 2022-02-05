<template>
  <div
    class="
      absolute
      h-full
      w-full
      bg-dark-gray
      flex flex-col
      items-center
      justify-center
      py-10
      md:py-20
      lg:py-40
    "
  >
    <div
      class="
        flex flex-grow
        gap-20
        flex-col
        px-5
        md:px-0
        w-full
        md:w-3/4
        lg:w-1/2
        relative
        z-10
      "
    >
      <div class="w-full">
        <h1 class="text-5xl text-white font-bold mb-3">Página no encontrada</h1>
        <span class="text-white-75 text-xl font-bold"
          >El contenido que buscas no existe</span
        >
      </div>
      <div class="w-full flex flex-grow gap-3 justify-end self-end items-end">
        <a class="btn btn-secondary" href="/">Ir al inicio</a>
        <router-link class="btn btn-primary" :to="LOGIN" v-if="!loggedUser.id"
          >Iniciar sesión</router-link
        >
        <button
          class="btn btn-primary"
          @click="onBack"
          v-if="ROUTER.options.history.state.back"
        >
          Volver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { loggedUser } from "@/helpers/customHooks/AuthHook";
import { LOGIN } from "@/constants/AUTH_ROUTES";

const ROUTER = useRouter();

const onBack = async () => {
  ROUTER.replace(ROUTER.options.history.state.back);
};
</script>