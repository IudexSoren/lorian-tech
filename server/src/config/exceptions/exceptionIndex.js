import ServerException from "./ServerException.js";
import BadCredentialsException from "./BadCredentialsException.js";
import AccessDeniedException from "./AccessDeniedException.js";
import BadRequestException from "./BadRequestException.js";
import NotFoundException from "./NotFoundException.js";

const exceptions = {
  ServerException,
  BadCredentialsException,
  AccessDeniedException,
  BadRequestException,
  NotFoundException,
};

export default exceptions;
