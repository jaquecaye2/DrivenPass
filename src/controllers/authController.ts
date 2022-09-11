import { users } from "@prisma/client";
import { Request, Response } from "express";

import { createUser, loginUser, findLengthOfTypes } from "../services/usersService";

export async function signup(request: Request, response: Response) {
  const user = request.body;

  const success = await createUser(user);

  if (success === "success") {
    return response.status(200).send("Usuário criado com sucesso");
  }

  response.status(500).send();
}

export async function signin(request: Request, response: Response) {
  const user = request.body;

  const token = await loginUser(user);

  if (token) {
    return response.status(200).send(token);
  }

  response.status(500).send();
}

export async function logout(request: Request, response: Response) {

}

export async function lengthTypes(request: Request, response: Response) {
  const user: users = response.locals.user

  const result = await findLengthOfTypes(user.id);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}
