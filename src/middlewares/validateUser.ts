import { NextFunction, Request, Response } from "express";

import { findByToken } from "../repositories/usersRepository"
import Jwt from "jsonwebtoken"
import dotenv from "dotenv";

async function validateUser(request: Request, response: Response, next: NextFunction) {
  dotenv.config();

  const { authorization } = request.headers;
  let token = authorization?.replace("Bearer ", "");

  if (!token){
    throw {
      code: "Unauthorized",
      message: "Login required",
    };
  }

  const secretKey: string = process.env.SECRET_KEY || "";


  try {
    Jwt.verify(token, secretKey)

    const user = await findByToken(token)

    if (!user){
      throw {
        code: "Unauthorized",
        message: "Login required",
      };
    }
  
    response.locals.user = user;
  
    next()
  } catch (error) {
    throw {
      code: "Unauthorized",
      message: "Login required",
    };
  }
}

export default validateUser