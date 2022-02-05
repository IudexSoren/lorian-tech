import { BAD_REQUEST_ERROR } from "../../constants/ERRORS.js";
import { FAILED } from "../../constants/STATUS.js";

class BadRequestException extends Error {
  constructor(
    message = BAD_REQUEST_ERROR,
    titleMessage = "Algo salió mal",
    status = FAILED,
    data = null,
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }

    this.name = "BAD_REQUEST_ERROR";

    this.status = status;
    this.statusCode = 400;
    this.titleMessage = titleMessage;
    this.message = message;
    this.data = data;
  }
}

export default BadRequestException;
