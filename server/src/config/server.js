import { createServer } from 'http';
import express from "express";
import dotenv from "dotenv";
import helmet from 'helmet';
import cors from "cors";
import cookieParser from "cookie-parser";
import { createLogger } from "./logger.js";
import { initSocketServer } from './socket.js';
import router from "../routes/router.js";
import middleware from "../middleware/middleware.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
  })
);
app.use(cookieParser());
app.use(router);
app.use("/content", [middleware.authentication, middleware.filesRead, express.static("content")]);

const server = createServer(app);
initSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING AT PORT ${process.env.PORT}`);
});
