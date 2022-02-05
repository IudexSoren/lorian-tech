<template>
  <div class="h-full flex flex-col">
    <div class="w-full flex flex-col gap-3 mb-5 xl:mb-7">
      <h2 class="text-2xl">Cuenta</h2>
      <div class="flex flex-col xl:flex-row gap-3 xl:gap-0 w-full">
        <div
          class="
            px-0
            xl:px-2
            flex-grow
            xl:flex-grow-0
            w-full
            xl:w-1/2
            flex
            justify-between
            items-center
            flex-wrap
            gap-3
          "
        >
          <span>Imagen de perfil</span>
          <hr class="flex-grow border-gray-700" />
          <div class="flex items-center gap-1">
            <input
              type="file"
              class="hidden"
              id="imagen"
              :accept="ACCEPTED_FILE_TYPES"
              @change="onUpdateImage"
            />
            <label
              class="btn btn-primary btn-sm"
              v-if="!loggedUser.rutaImagen"
              :disabled="loading"
              for="imagen"
            >
              <i class="fas fa-upload"></i>
              <span>Subir</span>
            </label>
            <button
              class="btn btn-secondary btn-sm"
              v-if="loggedUser.rutaImagen"
              :disabled="loading"
              @click="onDeleteImage"
            >
              <i class="fas fa-trash"></i>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
        <div
          class="
            px-0
            xl:px-2
            flex-grow
            xl:flex-grow-0
            w-full
            xl:w-1/2
            flex
            justify-between
            items-center
            flex-wrap
            gap-3
          "
        >
          <span>Reestablecer contraseña</span>
          <hr class="flex-grow border-gray-700" />
          <button
            class="btn btn-secondary btn-sm"
            @click="onSelectedTab(PASSWORD_RESET_TAB)"
          >
            <span>Cambiar</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-3">
      <h2 class="text-2xl">Opciones avanzadas</h2>
      <div class="flex flex-col xl:flex-row gap-3 xl:gap-0 w-full">
        <div
          class="
            px-0
            xl:px-2
            flex-grow
            xl:flex-grow-0
            w-full
            xl:w-1/2
            flex
            justify-between
            items-center
            flex-wrap
            gap-3
          "
        >
          <span>Desactivar cuenta</span>
          <hr class="flex-grow border-gray-700" />
          <button
            class="btn btn-secondary btn-sm"
            @click="onSelectedTab(DEACTIVATE_ACCOUNT_TAB)"
          >
            <span>Iniciar</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex items-end justify-end flex-grow mt-5">
      <button
        class="btn btn-info btn-sm flex-grow sm:flex-grow-0"
        @click="onLogout"
      >
        <i class="fas fa-power-off"></i><span>Cerrar sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { logout, loggedUser } from "@/helpers/customHooks/AuthHook";
import {
  showModalNotification,
  showFloatingNotification,
} from "@/helpers/NotificationsHelper";
import {
  USUARIO__UPDATE_USUARIO_IMAGEN,
  USUARIO__DELETE_USUARIO_IMAGEN,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const loading = ref(false);

const ACCEPTED_FILE_TYPES = "image/png,image/jpg,image/jpeg,image/gif";
const PASSWORD_RESET_TAB = 3;
const DEACTIVATE_ACCOUNT_TAB = 4;
const emit = defineEmits(["on-selected-tab"]);

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
  },
});

const onLogout = async () => {
  await logout();
};

const onDesactivarCuenta = async () => {
  await showModalNotification({
    titleMessage: "¿Está seguro que desea desactivar su cuenta?",
    message:
      "Para recuperar su cuenta deberá solicitar a un ADMINISTRADOR DEL SISTEMA o a un ADMINISTRADOR DE USUARIOS que reactive su cuenta.",
    messageType: "primary",
    buttons: [
      {
        index: 1,
        text: "Desactivar cuenta",
        class: "btn-secondary flex-grow md:flex-grow-0",
      },
      {
        index: 2,
        text: "Cancelar",
        class: "btn-primary flex-grow",
      },
    ],
  });
};

const onSelectedTab = (index) => {
  emit("on-selected-tab", index);
};

const onUpdateImage = async (e) => {
  try {
    loading.value = true;
    const file = e.target.files[0];

    if (file) {
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        await showFloatingNotification({
          titleMessage: "Tipo de archivo inválido",
          message:
            "El tipo del archivo seleccionado no es válido como imagen de perfil",
          messageType: "danger",
        });

        throw new Error();
      }

      const formData = new FormData();
      formData.append("id", loggedUser.value.id);
      formData.append("imagen", file);
      await STORE.dispatch(USUARIO__UPDATE_USUARIO_IMAGEN, formData);
    }
  } catch (error) {
    throw error;
  } finally {
    e.target.value = "";
    loading.value = false;
  }
};

const onDeleteImage = async () => {
  try {
    loading.value = true;
    await STORE.dispatch(USUARIO__DELETE_USUARIO_IMAGEN, {
      id: loggedUser.value.id,
    });
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
};
</script>