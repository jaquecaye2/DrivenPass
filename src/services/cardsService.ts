import dotenv from "dotenv";

import { cards, users } from "@prisma/client";
import { TypeNoteData } from "../types/noteTypes";
import {
  insertCard,
  findByTitle,
  deleteById,
  findAllCards,
  findById,
} from "../repositories/cardsRepository";
import { TypeCardData } from "../types/cardTypes";
import Cryptr from "cryptr";

dotenv.config();

export async function createCard(cardData: TypeCardData) {
  const title: string = cardData.title || "";

  const result = await findByTitle(title, cardData.user_id);

  if (result) {
    throw {
      code: "Unauthorized",
      message: "Título do cartão já está sendo utilizado",
    };
  }

  const key = process.env.SECRET_KEY || "";
  const cryptr = new Cryptr(key);
  const encryptedPassword = cryptr.encrypt(cardData.password);
  const encryptedCvc = cryptr.encrypt(cardData.security_code);

  cardData.password = encryptedPassword
  cardData.security_code = encryptedCvc

  await insertCard(cardData);

  return "success";
}

export async function findCard(user: users, id: number | undefined) {
  if (!id) {
    const result: cards[] = await findAllCards(user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Usuario não possui cartões cadastrados",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);

    const resultDecrypted = result.map(r => {
      r.password = cryptr.decrypt(r.password)
      r.security_code = cryptr.decrypt(r.security_code)
      return r
    })

    return resultDecrypted;
  } else {
    const result: cards | null = await findById(id, user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Cartão não encontrado",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);
    const decryptedPassword = cryptr.decrypt(result.password);
    const decryptedCVC = cryptr.decrypt(result.security_code);

    result.password = decryptedPassword
    result.security_code = decryptedCVC
    
    return result;
  }
}

export async function deleteCard(user: users, id: number) {
  const findCard = await findById(id, user.id);

  if (!findCard) {
    throw {
      code: "NotFound",
      message: "Cartão não encontrado",
    };
  }

  await deleteById(id);

  return "success";
}
