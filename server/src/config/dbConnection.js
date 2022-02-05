import mysql from "mysql";
import dotenv from "dotenv";
import util from "util";
import { createLogger } from "./logger.js";

const logger = createLogger("DATABASE_CONNECTION");

dotenv.config();

const createConnection = () => {
  try {
    const conn = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.SECRET_DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    return {
      query(sql, args) {
        return util.promisify(conn.query).call(conn, sql, args);
      },
      close() {
        return util.promisify(conn.end).call(conn);
      },
      transaction() {
        return util.promisify(conn.beginTransaction).call(conn);
      },
      commit() {
        return util.promisify(conn.commit).call(conn);
      },
      rollback() {
        return util.promisify(conn.rollback).call(conn);
      },
    };
  } catch (error) {
    logger.fatal(error);
    console.log(error);
  }
};
const connection = createConnection();

export default connection;
