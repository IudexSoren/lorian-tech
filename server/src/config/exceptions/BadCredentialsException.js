import { BAD_CREDENTIALS_ERROR } from "../../constants/ERRORS.js";
import { FAILED } from "../../constants/STATUS.js";

class BadCredentialsException extends Error {
  constructor(
    message = BAD_CREDENTIALS_ERROR,
    titleMessage = "Algo salió mal",
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadCredentialsException);
    }

    this.name = "BAD_CREDENTIALS_ERROR";

    this.status = FAILED;
    this.statusCode = 400;
    this.titleMessage = titleMessage;
    this.message = message;
  }
}

export default BadCredentialsException;
