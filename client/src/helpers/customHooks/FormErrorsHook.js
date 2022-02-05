import { ref } from "vue";

const errorsInitialState = {
  count: 0,
};

const errors = ref({
  ...errorsInitialState,
});

/*
    property: Nombre de la propiedad inválida
    value: Mensaje de error
*/
const addError = (property, value) => {
  if (errors.value[property] === undefined) {
    errors.value["count"] = errorsCount() + 1;
  }
  errors.value[property] = value;
};

const resetErrors = () => {
  errors.value = {
    ...errorsInitialState,
  };
};

const resetError = (property) => {
  if (errors.value[property]) {
    delete errors.value[property];
    errors.value.count = errorsCount() - 1;
  }
};

const errorsCount = () => {
  return errors.value.count;
};

const isFormValid = () => {
  return errorsCount() === 0;
};

const FormErrorsHookRef = ref({
  errors,
  addError,
  resetErrors,
  resetError,
  errorsCount,
  isFormValid,
});

const FormErrorsHook = FormErrorsHookRef.value;

export default FormErrorsHook;
