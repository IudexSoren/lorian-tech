const getters = {
  USUARIO__usuarios: (state) => state.usuarios,
  USUARIO__currentUsuario: (state) => state.currentUsuario,
  USUARIO__loggedUser: (state) => state.loggedUser,
  USUARIO__isAuth: (state) => state.isAuth,
};

export default getters;