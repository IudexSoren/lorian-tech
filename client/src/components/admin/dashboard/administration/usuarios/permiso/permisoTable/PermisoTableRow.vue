<template>
  <tr class="border-b border-gray-700">
    <td class="p-2 text-left">{{ permiso.id }}</td>
    <td class="p-2 text-left text-truncated w-1/3">
      {{ permiso.nombre }}
    </td>
    <td class="p-2 text-left" :title="permiso.descripcion">
      {{ permiso.descripcion }}
    </td>
    <td class="p-2 text-center">
      <div class="flex gap-1">
        <i
          title="Editar permiso"
          class="far fa-edit icon-option icon-option-sm"
          @click="onSetCurrentPermiso"
          v-if="access[21]"
        ></i>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { access } from "@/helpers/customHooks/AuthHook";
import { PERMISO__SET_CURRENT_PERMISO } from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";

const STORE = useStore();

const props = defineProps({
  permiso: {
    type: Object,
    required: true,
  },
});

const onSetCurrentPermiso = async () => {
  await STORE.dispatch(PERMISO__SET_CURRENT_PERMISO, props.permiso);
};
</script>

<style scoped>
</style>
