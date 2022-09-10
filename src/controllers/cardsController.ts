import { Request, Response } from "express";
import { users } from "@prisma/client";
import { deleteCard, findCard, createCard } from "../services/cardsService";
import { TypeCardData } from "../types/cardTypes";

export async function createCards(request: Request, response: Response) {
  const user: users = response.locals.user

  const note = request.body;

  let cardData: TypeCardData = {
    user_id: user.id,
    title: note.title,
    number: note.number,
    name: note.name,
    security_code: note.security_code,
    expiration_date: note.expiration_date,
    password: note.password,
    isVirtual: note.isVirtual,
    type: note.type
}

  const success = await createCard(cardData);

  if (success === "success") {
    return response.status(200).send("Cartão criado com sucesso");
  }

  response.status(500).send();
}

export async function showCards(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number | undefined = Number(request.query.id)

  const result = await findCard(user, id);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function deleteCards(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number = Number(request.params.id)

  const success = await deleteCard(user, id);

  if (success === "success") {
    return response.status(200).send("Cartão deletado com sucesso");
  }

  response.status(500).send();
}
