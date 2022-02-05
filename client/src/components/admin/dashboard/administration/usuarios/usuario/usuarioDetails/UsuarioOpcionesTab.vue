<template>
  <div class="flex flex-col h-full overflow-auto">
    <div class="flex items-center flex-wrap gap-3">
      <div
        class="
          w-full
          pb-5
          border border-gray-700 border-r-0 border-l-0 border-t-0
        "
        v-if="access[19]"
      >
        <div class="flex items-center justify-between flex-wrap mb-2">
          <span>General</span>
        </div>
        <div class="flex items-center flex-wrap gap-2">
          <button
            class="btn btn-sm btn-secondary w-full md:w-auto"
            :disabled="usuario.idEstadoUsuario !== 1"
            @click="onEditUsuario"
            v-if="access[19]"
          >
            Editar usuario
          </button>
        </div>
      </div>
      <div
        class="
          w-full
          pb-5
          border border-gray-700 border-r-0 border-l-0 border-t-0
        "
        v-if="access[18]"
      >
        <div class="flex items-center justify-between flex-wrap mb-2">
          <span>Cambiar estado del usuario</span>
        </div>
        <div class="flex items-center flex-wrap gap-2">
          <button
            class="btn btn-sm flex-grow w-full md:w-auto"
            v-for="estado of ESTADOS_USUARIO"
            :key="estado.id"
            :class="`${
              estado.id === 1
                ? 'btn-success'
                : estado.id === 2
                ? 'btn-warning'
                : estado.id === 3
                ? 'btn-danger'
                : ''
            }`"
            :disabled="usuario.idEstadoUsuario === estado.id"
            @click="onChangeState(estado)"
          >
            {{ estado.nombre }}
          </button>
        </div>
      </div>
      <div class="w-full" v-if="access[20]">
        <div class="flex items-center justify-between flex-wrap mb-2">
          <span>Cambio de contraseña</span>
        </div>
        <div class="flex items-center flex-wrap gap-2">
          <button
            class="btn btn-sm btn-secondary w-full md:w-auto"
            @click="onGenerarCodigo"
          >
            Generar código
          </button>
          <div
            class="w-full text-sm flex flex-col  p-2 rounded bg-white"
            v-if="ultimoCodigo"
          >
            <span class="text-black">Código generado:</span>
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-black">{{ ultimoCodigo }}</span>
              <button class="btn btn-primary btn-sm" @click="onCopyCode">
                <i class="fas fa-copy"></i>
                <span>Copiar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { UI__SET_CHANGE } from "@/constants/ACTIONS/UI_ACTIONS.js";
import { showFloatingNotification } from "@/helpers/NotificationsHelper";
import { generateNewCode, access } from "@/helpers/customHooks/AuthHook";
import {
  USUARIO__UPDATE_USUARIO_ESTADO,
  USUARIO__SET_CURRENT_USUARIO,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const ultimoCodigo = ref(null);

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
  },
});

const ESTADOS_USUARIO = computed(
  () => STORE.getters.ESTADO_USUARIO__estadosUsuario
);

const onChangeState = async (estado) => {
  props.usuario.idEstadoUsuario = estado.id;
  props.usuario.estado = estado;
  const { id, nombreUsuario, idEstadoUsuario } = props.usuario;
  await STORE.dispatch(USUARIO__UPDATE_USUARIO_ESTADO, {
    id,
    nombreUsuario,
    idEstadoUsuario,
  });
};

const onEditUsuario = async () => {
  await STORE.dispatch(USUARIO__SET_CURRENT_USUARIO, props.usuario);
  await onClose();
};

const onGenerarCodigo = async () => {
  const { id, nombreUsuario } = props.usuario;
  const codigo = await generateNewCode({
    id,
    nombreUsuario,
  });

  ultimoCodigo.value = codigo.codigo;
};

const onClose = async () => {
  await STORE.dispatch(UI__SET_CHANGE, {
    name: "dynamicModal",
    value: {
      show: false,
      keyword: "",
    },
  });
};

const onCopyCode = async () => {
  if (ultimoCodigo.value) {
    navigator.clipboard.writeText(ultimoCodigo.value);
    await showFloatingNotification({
      titleMessage: "Código copiado al portapapeles",
      message:
        "El código de recuperación de cuenta ha sido copiado al portapapeles",
      messageType: "info",
    });
  }
};
</script>