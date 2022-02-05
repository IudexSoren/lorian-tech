const getters = {
  PERMISO__permisos: (state) => state.permisos,
  PERMISO__currentPermiso: (state) => state.currentPermiso,
  PERMISO__filterPermisosByRoles: (state) => (idsRoles) => state.permisos.filter(p => {
    if (!idsRoles.length || !idsRoles[0]) return p;
    for (const idRol of idsRoles) {
      return p.roles.map(r => r.idRol).includes(idRol);
    }
  })
};

export default getters;