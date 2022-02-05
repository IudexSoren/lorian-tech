import { ACCESS_DENIED_ERROR } from "../../constants/ERRORS.js";
import { FORBID } from "../../constants/STATUS.js";

class AccessDeniedException extends Error {
  constructor(
    message = ACCESS_DENIED_ERROR,
    titleMessage = "Algo salió mal",
    status = FORBID,
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessDeniedException);
    }

    this.name = "ACCESS_DENIED_ERROR";

    this.status = status;
    this.statusCode = 401;
    this.titleMessage = titleMessage;
    this.message = message;
  }
}

export default AccessDeniedException;
