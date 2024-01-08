
import * as dotenv from "dotenv";
dotenv.config();


const config  = {
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},

  pool: {
    max: 5,
    min: 0,
    acquire: 100000000,
    idle: 100000000,
  },
};

export {config}