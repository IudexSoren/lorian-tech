import log4js from "log4js";
import dotenv from "dotenv";
import { date_string } from "../utils/datesUtil.js";
import ServerException from "../config/exceptions/ServerException.js";

dotenv.config();

export const createLogger = (filename = "", entityFolderName) => {
  buildLoggerConfiguration(entityFolderName);

  return log4js.getLogger(filename);
};

const buildLoggerConfiguration = (folder) => {
  const configuration = {
    appenders: {
      everything: {
        type: "file",
        filename: buildLoggerFolder(folder),
      },
    },
    categories: {
      default: {
        appenders: ["everything"],
        level: "debug",
      },
    },
    // pm2: true,
    // pm2InstanceVar: process.env.PM2_INSTANCE_ID
  };

  return log4js.configure(configuration);
};

const buildLoggerFolder = (folder = "") => {
  if (folder && folder[folder.length - 1] !== "/") throw new ServerException();

  const folderRoute = `./logs/${folder}${date_string}.log`;

  return folderRoute;
};
