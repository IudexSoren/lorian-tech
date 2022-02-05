import * as ERRORS from "../../constants/ERRORS.js";

const errorResponse = (error) => {
  let { status, message, titleMessage, data } = error;

  if (status === undefined) status = 0;

  if (!ERRORS[error.name]) message = ERRORS.SERVER_ERROR;

  const response = {
    status,
    message,
    titleMessage,
    data,
  };

  return response;
};

export default errorResponse;
