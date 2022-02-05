const getters = {
  UI__navbarState: (state) => state.data.navbarState,
  UI__mainLoading: (state) => state.data.mainLoading,
  UI__dynamicModal: (state) => state.data.dynamicModal,
  UI__notification: (state) => state.data.notification,
  UI__access: (state) => state.data.access,
};

export default getters;
