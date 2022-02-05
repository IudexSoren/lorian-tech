import { SUCCEED } from "../../constants/STATUS.js";

const successfulResponse = (
  data,
  titleMessage = undefined,
  message = undefined
) => {
  const response = {
    status: SUCCEED,
    data,
    titleMessage,
    message,
  };

  return response;
};

export default successfulResponse;
