import authentication from "./authentication.js";
import tokenRefresh from "./tokenRefresh.js";
import filesRead from "./filesRead.js";

const middleware = {
  authentication,
  tokenRefresh,
  filesRead
};

export default middleware;
