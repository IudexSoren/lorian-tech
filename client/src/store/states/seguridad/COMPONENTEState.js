export const COMPONENTE__currentComponenteInitialState = {
  id: 0,
  nombre: '',
  descripcion: '',
  idComponentePadre: '',
  permisos: []
}

export const COMPONENTE__initialState = {
  componentes: [],
  currentComponente: COMPONENTE__currentComponenteInitialState
}

const state = () => ({
  ...COMPONENTE__initialState
});

export default state;