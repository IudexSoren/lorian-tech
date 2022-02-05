import { NOT_FOUND_ERROR } from "../../constants/ERRORS.js";
import { FAILED } from "../../constants/STATUS.js";

class NotFoundException extends Error {
  constructor(
    message = NOT_FOUND_ERROR,
    titleMessage = "Algo salió mal",
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException);
    }

    this.name = "NOT_FOUND_ERROR";

    this.status = FAILED;
    this.statusCode = 404;
    this.titleMessage = titleMessage;
    this.message = message;
  }
}

export default NotFoundException;
