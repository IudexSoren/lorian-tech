<template>
  <div class="flex flex-col gap-2 mt-4">
    <div class="flex gap-2 cursor-pointer" @click="onShow">
      <h3 class="text-truncated flex-grow text-xl font-bold">
        Asignación de permisos
      </h3>
      <button
        type="button"
        class="btn btn-sm"
        :class="!show ? 'btn-primary' : 'btn-secondary'"
      >
        {{ show ? "Ocultar" : "Mostrar" }}
      </button>
    </div>

    <transition mode="out-in" name="fade">
      <div class="flex items-center gap-2" v-if="show">
        <label for="nombre-permiso" class="text-sm"
          ><i class="fas fa-search"></i
        ></label>
        <input
          type="search"
          id="nombre-permiso"
          class="form-control form-control-sm text-sm"
          v-model="nombrePermiso"
          @keyup="onSearchPermiso"
          autocomplete="off"
          spellcheck="false"
          placeholder="Buscar permiso"
        />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="show && loaded" class="flex flex-col gap-2">
        <transition name="fade" mode="out-in">
          <div
            class="p-3 w-full flex flex-col gap-2 items-center"
            v-if="!loaded"
          >
            <div class="spinner"></div>
            <span class="text-white-50">Cargando permisos</span>
          </div>
          <ul
            class="
              rounded
              bg-dark-gray
              flex flex-col
              gap-2
              py-2
              max-h-96
              overflow-auto
              border border-gray-700
            "
            v-else
          >
            <PermisoCheckbox
              v-for="permiso of permisos"
              :key="permiso.id"
              :permiso="permiso"
              :isChecked="permisosChecked.includes(permiso.id)"
              :isAvailable="permiso.isAvailable"
              @on-checked="onChecked"
            />
          </ul>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import {
  PERMISO__SET_PERMISOS,
  PERMISO__RESET,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import TipoPermisoDivisor from "./TipoPermisoDivisor.vue";
import PermisoCheckbox from "./PermisoCheckbox.vue";

const emit = defineEmits(["on-permisos-changed"]);

const props = defineProps({
  permisosActuales: {
    type: Array,
    required: true,
  },
  idRol: {
    type: undefined,
  },
});

const STORE = useStore();
const nombrePermiso = ref("");
const loaded = ref(false);
const show = ref(false);
const permisosChecked = ref([...props.permisosActuales]);

const usuario = computed(() => ({ ...STORE.getters.USUARIO__currentUsuario }));

watch(props, () => {
  for (const permiso of permisos.value) {
    permiso.isAvailable = props.idRol
      ? permiso.roles.map((r) => r.idRol).includes(props.idRol)
      : true;
  }
  permisosChecked.value = [...props.permisosActuales];
});

onMounted(async () => {
  await STORE.dispatch(PERMISO__SET_PERMISOS, {});
  loaded.value = true;
});

onUnmounted(async () => {
  await STORE.dispatch(PERMISO__RESET);
});

const permisos = computed(() => [...STORE.getters.PERMISO__permisos]);

const onSearchPermiso = async () => {
  loaded.value = false;
  await STORE.dispatch(PERMISO__SET_PERMISOS, { nombre: nombrePermiso.value });
  loaded.value = true;
};

const onChecked = (permisoChecked) => {
  if (permisoChecked.checked) {
    permisosChecked.value = [...permisosChecked.value, permisoChecked.id];
  } else {
    permisosChecked.value = permisosChecked.value.filter((p) =>
      p === permisoChecked.id ? null : p
    );
  }
  emit("on-permisos-changed", permisosChecked.value);
};

const onShow = () => {
  show.value = !show.value;
};
</script>

<style scoped>
.spinner {
  animation: spin 1s infinite linear;
  border: 3px solid var(--primary);
  border-right-color: transparent;
  border-radius: 50%;
  height: 64px;
  width: 64px;
}
</style>