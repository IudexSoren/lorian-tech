export const PERMISO__currentPermisoInitialState = {
  id: 0,
  nombre: '',
  descripcion: ''
}

export const PERMISO__initialState = {
  permisos: [],
  currentPermiso: PERMISO__currentPermisoInitialState
}

const state = () => ({
  ...PERMISO__initialState
});

export default state;