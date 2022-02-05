<template>
  <form
    class="flex gap-3 flex-col h-full w-full"
    enctype="multipart/form-data"
    @submit="onSubmit"
  >
    <h2 class="text-2xl mb-5">
      {{ !usuario.id ? "Agregar" : "Editar" }} usuario
    </h2>
    <div class="w-full flex items-center justify-between gap-2 flex-wrap">
      <div
        class="
          h-24
          w-24
          border border-gray-700
          rounded-full
          overflow-hidden
          relative
          flex
          items-center
          justify-center
        "
      >
        <img
          :src="imagen.src"
          class="w-full h-full object-cover"
          v-if="!loading"
        />
        <div class="w-full h-full skeleton" v-if="loading"></div>
        <input
          type="file"
          id="imagen"
          :accept="ACCEPTED_FILE_TYPES"
          class="
            absolute
            top-0
            left-0
            z-10
            w-full
            h-full
            opacity-0
            cursor-pointer
          "
          @change="onImageChanged"
        />
      </div>
      <div class="flex-grow flex flex-col gap-3">
        <span v-if="imagen.name">Imagen seleccionada: {{ imagen.name }}</span>
        <label for="imagen" class="btn btn-secondary btn-sm cursor-pointer"
          >Seleccionar imagen de perfil</label
        >
      </div>
    </div>
    <transition>
      <FormControl
        :value="usuario.nombreUsuario"
        :inputInfo="inputsInfo[0]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[0].labelFor]"
        @on-value-changed="onFormControlChanged"
        v-if="!usuario.id"
      />
      <div v-else>
        <label for="" class="block mb-2">{{ inputsInfo[0].label }}</label>
        <span class="text-light-blue font-bold text-lg px-2">{{
          usuario.nombreUsuario
        }}</span>
      </div>
    </transition>
    <FormSelect
      :inputInfo="inputsInfo[1]"
      :OPTIONS="ROLES"
      :defaultOption="usuario.idRol"
      :selectedOption="selectedRol"
      :errorMessage="FormErrorsHook.errors[inputsInfo[1].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <transition mode="out-in" name="fade">
      <FormControl
        :value="usuario.clave"
        :inputInfo="inputsInfo[2]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[2].labelFor]"
        @on-value-changed="onFormControlChanged"
        v-if="!usuario.id"
      />
    </transition>
    <transition mode="out-in" name="fade">
      <FormControl
        :value="usuario.claveConfirmacion"
        :inputInfo="inputsInfo[3]"
        :errorMessage="FormErrorsHook.errors[inputsInfo[3].labelFor]"
        @on-value-changed="onFormControlChanged"
        v-if="!usuario.id"
      />
    </transition>
    <FormControl
      :value="usuario.tiempoSesion.toString()"
      :inputInfo="inputsInfo[4]"
      :errorMessage="FormErrorsHook.errors[inputsInfo[4].labelFor]"
      @on-value-changed="onFormControlChanged"
    />
    <SeleccionPermisos
      :permisosActuales="permisosActuales"
      :idRol="usuario.idRol"
      @on-permisos-changed="onPermisosChanged"
    />
    <transition name="fade" mode="out-in">
      <small
        class="form-error-message"
        v-if="FormErrorsHook.errors['permisos']"
      >
        {{ FormErrorsHook.errors["permisos"] }}
      </small>
    </transition>
    <Toast
      text="Únicamente se permite actualizar usuarios activados"
      icon="fas fa-exclamation-circle"
      messageType="danger"
      v-if="usuario.idEstadoUsuario && usuario.idEstadoUsuario !== 1"
    />
    <div class="flex justify-between items-center gap-3 mt-8 flex-wrap" v-else>
      <button
        class="btn btn-secondary flex-grow"
        type="reset"
        :disabled="loading"
        @click="reset"
      >
        <i class="fas fa-times"></i><span>Limpiar</span>
      </button>
      <button
        class="btn btn-primary flex-grow"
        type="submit"
        :disabled="loading"
      >
        <i class="far fa-save"></i><span>Guardar</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getImage } from "@/api/FilesAPI";
import {
  USUARIO__UNSET_CURRENT_USUARIO,
  USUARIO__ADD_USUARIO,
  USUARIO__UPDATE_USUARIO,
  ROL__SET_ROLES,
  ROL__UNSET_ROLES,
  PERMISO__SET_PERMISOS,
} from "@/constants/ACTIONS/SEGURIDAD_ACTIONS";
import { showFloatingNotification } from "@/helpers/NotificationsHelper";
import { USUARIOS_CONTENT_FOLDER_NAME } from "@/constants/CONTENT_FOLDERS";
import FormErrorsHook from "@/helpers/customHooks/FormErrorsHook";
import FormSelect from "@/components/main/forms/FormSelect.vue";
import FormControl from "@/components/main/forms/FormControl.vue";
import SeleccionPermisos from "../permiso/seleccionPermisosForm/SeleccionPermisos.vue";
import Toast from "@/components/main/notifications/Toast.vue";

const STORE = useStore();

const selectedRol = ref(null);
const loading = ref(false);
const imagen = ref({
  src: require("@/assets/images/NO_FILE_SELECTED.png"),
  name: null,
});

const ACCEPTED_FILE_TYPES = "image/png,image/jpg,image/jpeg,image/gif";

onMounted(async () => {
  await STORE.dispatch(ROL__SET_ROLES, {});
});

onUnmounted(async () => {
  FormErrorsHook.resetErrors();
  await STORE.dispatch(ROL__UNSET_ROLES);
  await STORE.dispatch(USUARIO__UNSET_CURRENT_USUARIO);
});

const usuario = computed(() => ({ ...STORE.getters.USUARIO__currentUsuario }));

const ROLES = computed(() => {
  const roles = [];
  for (const rol of [...STORE.getters.ROL__roles]) {
    roles.push({
      value: rol.id,
      name: rol.nombre,
    });
  }

  return roles;
});

const getIdPermisosActuales = () => {
  return usuario.value.permisos.map((p) => (p.idPermiso ? p.idPermiso : p));
};

const permisosActuales = ref(getIdPermisosActuales());

watch(usuario, async () => {
  loading.value = true;
  FormErrorsHook.resetErrors();
  permisosActuales.value = getIdPermisosActuales();
  selectedRol.value = null;
  try {
    if (usuario.value.rutaImagen) {
      imagen.value.src = await getImage(
        USUARIOS_CONTENT_FOLDER_NAME,
        usuario.value.rutaImagen
      );
    } else {
      imagen.value.src = require("@/assets/images/NO_FILE_SELECTED.png");
    }
  } catch (error) {
    throw error;
  } finally {
    loading.value = false;
  }
});

const inputsInfo = ref([
  {
    index: 0,
    label: "Nombre de usuario",
    labelFor: "nombreUsuario",
    type: "text",
    placeholder: "",
  },
  {
    index: 1,
    label: "Rol",
    labelFor: "idRol",
    showPlaceholder: true,
  },
  {
    index: 2,
    label: "Contraseña",
    labelFor: "clave",
    type: "password",
    placeholder: "",
  },
  {
    index: 3,
    label: "Confirmar contraseña",
    labelFor: "claveConfirmacion",
    type: "password",
    placeholder: "",
  },
  {
    index: 4,
    label: "Tiempo de sesión (Minutos)",
    labelFor: "tiempoSesion",
    type: "number",
    placeholder: "",
    classes: "form-control-50",
  },
]);

const reset = async () => {
  FormErrorsHook.resetErrors();
  await STORE.dispatch(USUARIO__UNSET_CURRENT_USUARIO);
  selectedRol.value = null;
  imagen.value.src = require("@/assets/images/NO_FILE_SELECTED.png");
  imagen.value.name = null;
  await STORE.dispatch(PERMISO__SET_PERMISOS, {});
};

const onSubmit = async (e) => {
  e.preventDefault();
  if (isValid()) {
    try {
      loading.value = true;
      const formData = new FormData();
      formData.append("idRol", usuario.value.idRol);
      formData.append("nombreUsuario", usuario.value.nombreUsuario);
      formData.append("tiempoSesion", usuario.value.tiempoSesion);
      formData.append("imagen", usuario.value.imagen);
      if (usuario.value.id) {
        formData.append("id", usuario.value.id);
        usuario.value.permisos = getIdPermisosActuales();
        formData.append("permisos", usuario.value.permisos);
        await STORE.dispatch(USUARIO__UPDATE_USUARIO, formData);
      } else {
        formData.append("clave", usuario.value.clave);
        formData.append("claveConfirmacion", usuario.value.claveConfirmacion);
        formData.append("permisos", usuario.value.permisos);
        await STORE.dispatch(USUARIO__ADD_USUARIO, formData);
      }
      await reset();
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }
};

const isValid = () => {
  const {
    nombreUsuario,
    idRol,
    clave,
    claveConfirmacion,
    tiempoSesion,
    permisos,
  } = usuario.value;
  FormErrorsHook.resetErrors();

  if (!nombreUsuario) {
    FormErrorsHook.addError("nombreUsuario", "Dato requerido");
  } else if (nombreUsuario.length > 50) {
    FormErrorsHook.addError(
      "nombreUsuario",
      `El nombre de usuario no debe exceder los 50 caracteres. Actual: ${nombreUsuario.length} caracteres.`
    );
  }

  if (!idRol) {
    FormErrorsHook.addError("idRol", "Dato requerido");
  } else if (isNaN(idRol) || idRol < 0) {
    FormErrorsHook.addError("idRol", "El rol solicitado es inválido");
  }

  if (!usuario.value.id) {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!clave) {
      FormErrorsHook.addError("clave", "Dato requerido");
    } else if (!clave.match(passwordPattern)) {
      FormErrorsHook.addError(
        "clave",
        "La contraseña debe poseer una longitud de 8 a 32 caracteres, una mayúscula, una minúscula, un número y un caracter especial (@$!%*#?&)"
      );
    }

    if (!claveConfirmacion) {
      FormErrorsHook.addError("claveConfirmacion", "Dato requerido");
    } else if (clave !== claveConfirmacion) {
      FormErrorsHook.addError("clave", "Las contraseñas no coinciden");
      FormErrorsHook.addError(
        "claveConfirmacion",
        "Las contraseñas no coinciden"
      );
    }
  }

  if (!tiempoSesion) {
    FormErrorsHook.addError("tiempoSesion", "Dato requerido");
  } else if (isNaN(tiempoSesion) || tiempoSesion <= 0) {
    FormErrorsHook.addError(
      "tiempoSesion",
      "El tiempo de sesión indicado es inválido"
    );
  } else if (!Number.isInteger(tiempoSesion)) {
    FormErrorsHook.addError(
      "tiempoSesion",
      "El tiempo de sesión debe ser un número entero"
    );
  } else if (parseInt(tiempoSesion) > 180) {
    FormErrorsHook.addError(
      "tiempoSesion",
      "El tiempo de sesión no debe exceder los 180 minutos"
    );
  }

  if (!permisos.length) {
    FormErrorsHook.addError(
      "permisos",
      "Debe asignar al menos un permiso al usuario"
    );
  }

  return FormErrorsHook.isFormValid();
};

const onFormControlChanged = (formControl) => {
  const input = inputsInfo.value[formControl.index];
  usuario.value[input.labelFor] = formControl.value;
  if (input.labelFor === "idRol") {
    selectedRol.value = formControl;
  }
};

const onPermisosChanged = (permisos) => {
  usuario.value.permisos = permisos;
};

const onImageChanged = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      await showFloatingNotification({
        titleMessage: "Tipo de archivo inválido",
        message:
          "El tipo del archivo seleccionado no es válido como imagen de perfil",
        messageType: "danger",
      });

      throw new Error();
    }

    reader.onloadend = function () {
      imagen.value.src = reader.result;
      imagen.value.name = file.name;
    };

    usuario.value.imagen = file;
    reader.readAsDataURL(file);
  } else {
    imagen.value.src = require("@/assets/images/NO_FILE_SELECTED.png");
    usuario.value.imagen = null;
    usuario.value.name = null;
  }
};
</script>

<style scoped>
</style>