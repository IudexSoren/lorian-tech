const dynamicModalInitialState = {
  show: false,
  keyword: ''
};

const notificationInitialState = {
  creationTime: '',
  show: false,
  type: null,
  messageType: "",
  title: "",
  message: "",
  buttons: [
    {
      index: 999,
      text: "Aceptar",
      class: "btn-primary",
      container: 'w-full'
    },
  ],
};


export const UI__initialState = {
  data: {
    navbarState: false,
    mainLoading: false,
    dynamicModal: {
      ...dynamicModalInitialState
    },
    notification: {
      ...notificationInitialState
    },
    access: {},

  },
};

const state = () => ({
  ...UI__initialState,
});

export default state;
