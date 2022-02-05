export const USUARIO__currentUsuarioInitialState = {
  id: 0,
  nombreUsuario: '',
  clave: '',
  claveConfirmacion: '',
  tiempoSesion: '',
  imagen: '',
  permisos: [],
  rol: null,
  estado: null,
  idRol: '',
  idEstadoUsuario: ''
}

export const USUARIO__initialState = {
  usuarios: [],
  currentUsuario: USUARIO__currentUsuarioInitialState,
  isAuth: false,
  loggedUser: null,
}

const state = () => ({
  ...USUARIO__initialState
});

export default state;