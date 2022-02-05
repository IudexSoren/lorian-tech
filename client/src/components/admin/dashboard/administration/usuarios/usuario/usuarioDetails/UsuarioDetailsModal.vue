<template>
  <div class="flex flex-col w-full p-5">
    <div class="flex gap-3 items-center justify-between w-full mb-5">
      <div class="flex items-center gap-2 flex-grow">
        <i class="fas fa-info-circle text-sm"></i>
        <h2 class="text-xl font-bold text-truncated w-3/4">
          Detalles del usuario
        </h2>
      </div>
      <i class="fas fa-times icon-option icon-option-sm" @click="onClose"></i>
    </div>
    <div class="flex-grow flex flex-col gap-5 h-full">
      <div class="flex gap-4 items-center flex-col md:flex-row">
        <div
          class="rounded-full overflow-hidden h-20 w-20 border border-gray-700"
        >
          <img
            :src="imagen.src"
            alt=""
            class="w-full h-full object-cover"
            :class="`${!loaded && 'skeleton'}`"
          />
        </div>
        <div class="flex flex-col text-center md:text-left md:my-5">
          <span class="text-white-50 text-sm font-bold"
            >ID {{ usuario.id }}</span
          >
          <h1 class="text-3xl flex-grow font-bold">
            {{ usuario.nombreUsuario }}
          </h1>
        </div>
      </div>
      <UsuarioInfoWrapper :usuario="usuario" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";
import { USUARIOS_CONTENT_FOLDER_NAME } from "@/constants/CONTENT_FOLDERS";
import { getImage } from "@/api/FilesAPI";
import UsuarioInfoWrapper from "./UsuarioInfoWrapper.vue";

const STORE = useStore();

const loaded = ref(false);
const imagen = ref({
  src: "",
});

onMounted(async () => {
  await setImage();
});

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
    default: null,
  },
});

const onClose = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: false,
      keyword: "",
    },
  });
};

const setImage = async () => {
  loaded.value = false;
  if (props.usuario.rutaImagen) {
    imagen.value.src = await getImage(
      USUARIOS_CONTENT_FOLDER_NAME,
      props.usuario.rutaImagen
    );
  } else {
    imagen.value.src = await getImage(
      USUARIOS_CONTENT_FOLDER_NAME,
      "USERS/no-user.png"
    );
  }
  loaded.value = true;
};
</script>
