<template>
  <tr class="border-b border-gray-700">
    <td class="p-2 align-middle text-left">{{ rol.id }}</td>
    <td class="p-2 align-middle text-left">{{ rol.nombre }}</td>
    <td class="p-2 align-middle text-center">
      <div class="flex gap-1">
        <i
          title="Editar rol"
          class="far fa-edit icon-option icon-option-sm"
          @click="onSetCurrentRol"
          v-if="access[22]"
        ></i>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { access } from "@/helpers/customHooks/AuthHook";
import { ROL__SET_CURRENT_ROL } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const props = defineProps({
  rol: {
    type: Object,
    required: true,
  },
});

const onSetCurrentRol = async () => {
  await STORE.dispatch(ROL__SET_CURRENT_ROL, props.rol);
};
</script>
