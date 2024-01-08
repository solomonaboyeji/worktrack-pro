"use strict";

import fs from "fs";
import path from "path";
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {  DataTypes } from "sequelize";
const basename = path.basename(__filename);


import * as dotenv from "dotenv";
dotenv.config();


const options: SequelizeOptions = {
    dialect: "mysql",
    database: process.env.DATABASE_NAME,
    port: 3306,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: false,
  };

const db :any = {

};

let sequelize = new Sequelize(
    options
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected successfully...");
  })
  .catch((err: Error) => {
    console.log("Error " + err);
    throw err;
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model= require(path.join(__dirname, file))( sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;

export  {db, sequelize};
