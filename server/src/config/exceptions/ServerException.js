import { SERVER_ERROR } from "../../constants/ERRORS.js";
import { FAILED } from "../../constants/STATUS.js";

class ServerException extends Error {
  constructor(
    message = SERVER_ERROR,
    titleMessage = "Algo salió mal",
    ...params
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerException);
    }

    this.name = "SERVER_ERROR";

    this.status = FAILED;
    this.statusCode = 500;
    this.titleMessage = titleMessage;
    this.message = message;
  }
}

export default ServerException;
