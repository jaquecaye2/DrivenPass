import { NextFunction, Request, Response } from "express";

async function validateUser(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  const token = authorization?.replace("Bearer ", "");

  //const usuario = await db.collection("sessoes").findOne({ token });

  /*if (!usuario) {
    response.status(422).send();
    return;
  }

  response.locals.usuario = usuario;
  response.locals.token = token;*/

  next()
}

export default validateUser