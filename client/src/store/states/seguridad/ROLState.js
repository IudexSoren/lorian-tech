export const ROL__currentRolInitialState = {
  id: 0,
  nombre: '',
  permisos: []
}

export const ROL__initialState = {
  roles: [],
  currentRol: ROL__currentRolInitialState
}

const state = () => ({
  ...ROL__initialState
});

export default state;