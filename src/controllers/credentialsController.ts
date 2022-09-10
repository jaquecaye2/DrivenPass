import { Request, Response } from "express";
import { users } from "@prisma/client";
import { TypeCredentialData } from "../types/credentialTypes";
import { createCredential, findCredentials, deleteCredential } from "../services/credentialsService";

export async function createCredentials(request: Request, response: Response) {
  const user: users = response.locals.user

  const credential = request.body;

  const credentialData: TypeCredentialData = {
    user_id: user.id,
    title: credential.title,
    url: credential.url,
    user_name: credential.user_name,
    password: credential.password
  }

  const success = await createCredential(credentialData);

  if (success === "success") {
    return response.status(200).send("Credencial criada com sucesso");
  }

  response.status(500).send();
}

export async function showCredentials(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number | undefined = Number(request.query.id)

  const result = await findCredentials(user, id);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function deleteCredentials(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number = Number(request.params.id)

  const success = await deleteCredential(user, id);

  if (success === "success") {
    return response.status(200).send("Credencial deletada com sucesso");
  }

  response.status(500).send();
}
