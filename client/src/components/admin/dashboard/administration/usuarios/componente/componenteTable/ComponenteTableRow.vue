<template>
  <tr class="border-b border-gray-700">
    <td class="p-2 align-middle text-left">{{ componente.id }}</td>
    <td class="p-2 align-middle text-left">{{ componente.nombre }}</td>
    <td class="p-2 align-middle text-left">{{ componente.descripcion }}</td>
    <td class="p-2 align-middle text-center">
      <div class="flex gap-1">
        <i
          title="Editar componente"
          class="far fa-edit icon-option icon-option-sm"
          @click="onSetCurrentComponente"
          v-if="access[23]"
        ></i>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { access } from "@/helpers/customHooks/AuthHook";
import { COMPONENTE__SET_CURRENT_COMPONENTE } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const props = defineProps({
  componente: {
    type: Object,
    required: true,
  },
});

const onSetCurrentComponente = async () => {
  await STORE.dispatch(COMPONENTE__SET_CURRENT_COMPONENTE, props.componente);
};
</script>
