import jwt from "jsonwebtoken";

import { Response } from "express";

import dotenv from "dotenv";
import { RandomUUIDOptions } from "crypto";
import { initModel } from "../models/init-model";
import { sequelize } from "../models";
const model = initModel(sequelize);



dotenv.config();

export const signToken = (
  id: RandomUUIDOptions,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  companyName: string,
  email: string,
  isVerified: boolean,
  isEnabled: boolean,
  profilePic: string,
  role: string,
  isSetPin: boolean

) => {
  const key = process.env.SECRET_KEY || "";
  const token = jwt.sign(
    {
      id,
      firstName,
      lastName,
      phoneNumber,
      companyName,
      email,
      isVerified,
      isEnabled,
      profilePic,
      role,
      isSetPin
    },
    key,
    { expiresIn: "10000d" }
  );
  return token;
};

export const verifyToken = (req: any, res: Response, next: any) => {
  const key = process.env.SECRET_KEY || "";
  const token = req.headers.authorization || req.params.token;
  if (!token) {
    return res.status(403).json({ status: 403, error: "No token provided" });
  }
  jwt.verify(token, key, (error: any, decoded: any) => {
    if (error) {
      console.log(error);
      res.status(401).json({ status: 401, error: "Unauthorized" });
    } else {
      console.log("decoded");
      console.log(decoded);
      if (decoded.isEnabled === false) {
        console.log("User has been disabled");
        res.status(401).json({
          status: 401,
          error:
            "User has been disabled, contact the admin to enable your account",
        });
      } else {
        req.user = decoded;
        next();
      }
    }
  });
};

export const isAdmin = async (req: any, res: Response, next: any) => {
  if (req.user.role === "Admin") {
    console.log(req.user.role);
    next();
  } else {
    console.log(req.user.role);
    res
      .status(401)
      .json({ status: 401, error: "Unauthorized to access this resource" });
  }
};

export const isMember = async (req: any, res: Response, next: any) => {
  if (req.user.role === "Member") {
    console.log(req.user.role);
    next();
  } else {
    console.log(req.user.role);
    res
      .status(401)
      .json({ status: 401, error: "Unauthorized to access this resource" });
  }
};


