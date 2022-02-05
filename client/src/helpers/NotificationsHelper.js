import STORE from '@/store';
import * as UI_ACTIONS from '@/constants/ACTIONS/UI_ACTIONS';
import {
  FLOATING_NOTIFICATION,
  MODAL_NOTIFICATION,
} from "@/constants/NOTIFICATION_TYPES";

export const showFloatingNotification = async ({ titleMessage, message, messageType }) => {
  await STORE.dispatch(UI_ACTIONS.UI__SET_CHANGE, {
    name: "notification",
    value: {
      creationTime: new Date().getTime(),
      show: true,
      type: FLOATING_NOTIFICATION,
      messageType,
      title: titleMessage,
      message,
      buttons: [],
    },
  })
}

export const showModalNotification = async ({ titleMessage, message, messageType, buttons }) => {
  await STORE.dispatch(UI_ACTIONS.UI__SET_CHANGE, {
    name: "notification",
    value: {
      creationTime: new Date().getTime(),
      show: true,
      type: MODAL_NOTIFICATION,
      messageType,
      title: titleMessage,
      message,
      buttons,
    },
  })
}

export const showErrorModalNotification = async (data) => {
  const titleMessage = data.titleMessage ? data.titleMessage : 'Algo salió mal';
  await showModalNotification({
    ...data,
    titleMessage,
    messageType: 'danger',
    buttons: [
      {
        index: 999,
        text: "Aceptar",
        class: "btn-danger flex-grow",
        container: 'w-full'
      },
    ]
  });
}