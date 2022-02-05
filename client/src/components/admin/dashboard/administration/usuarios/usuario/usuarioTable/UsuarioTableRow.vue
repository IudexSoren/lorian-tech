<template>
  <tr class="border-b border-gray-700">
    <td class="p-2 align-middle text-left">{{ usuario.nombreUsuario }}</td>
    <td class="p-2 align-middle text-left">{{ usuario.rol.nombre }}</td>
    <td class="p-2 align-middle text-left">
      <FormSelect
        :inputInfo="inputInfo"
        :OPTIONS="ESTADOS_USUARIO"
        :defaultOption="defaultEstado"
        :selectedOption="selectedEstado"
        @on-value-changed="onFormControlChanged"
        v-if="access[18]"
      />
      <span v-else>{{ usuario.estado.nombre }}</span>
    </td>
    <td class="p-2">
      <div class="flex gap-1 justify-end">
        <i
          class="far fa-edit icon-option icon-option-sm"
          title="Editar usuario"
          @click="onSetCurrentUsuario"
          v-if="
            usuario.idEstadoUsuario === 1 &&
            access[19]
          "
        ></i>
        <i
          class="far fa-eye icon-option icon-option-sm"
          title="Ver detalles"
          @click="onShowDetails(usuario)"
        ></i>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { access } from "@/helpers/customHooks/AuthHook";
import {
  USUARIO__SET_CURRENT_USUARIO,
  USUARIO__UPDATE_USUARIO_ESTADO,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import FormSelect from "@/components/main/forms/FormSelect.vue";

const emit = defineEmits(["on-show-details"]);

const STORE = useStore();
const defaultEstado = ref(props.usuario.idEstadoUsuario);
const selectedEstado = ref({
  value: props.usuario.estado.id,
  name: props.usuario.estado.nombre,
});

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
  },
  ESTADOS_USUARIO: {
    type: Array,
    required: true,
  },
});

const onSetCurrentUsuario = async () => {
  await STORE.dispatch(USUARIO__SET_CURRENT_USUARIO, props.usuario);
};

const inputInfo = {
  index: 0,
  label: "",
  labelFor: "idEstadoUsuario",
  showPlaceholder: false,
};

const onFormControlChanged = async (formControl) => {
  const usuario = {
    ...props.usuario,
    idEstadoUsuario: formControl.value,
  };
  await STORE.dispatch(USUARIO__UPDATE_USUARIO_ESTADO, usuario);
};

const onShowDetails = (usuario) => {
  emit("on-show-details", usuario);
};
</script>
