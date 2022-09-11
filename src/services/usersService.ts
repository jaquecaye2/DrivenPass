import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { findByEmail, findById, insertUser, updateToken } from "../repositories/usersRepository";
import { TypeUserData } from "../types/userTypes";
import { findAllCredentials } from "../repositories/credentialsRepository";
import { findAllNotes } from "../repositories/notesRepository";
import { findAllCards } from "../repositories/cardsRepository";
import { findAllWifi } from "../repositories/wifisRepository";


export async function createUser(user: TypeUserData) {
  const email: string = user.email;

  const compareEmail = await findByEmail(email);

  if (compareEmail) {
    throw {
      code: "Unauthorized",
      message: "Email already registered",
    };
  }

  const salt: number = 10;
  const password_hash: string = bcrypt.hashSync(user.password, salt);

  const userData = {
    email,
    password: password_hash,
  };

  await insertUser(userData);

  return "success";
}

export async function loginUser(user: TypeUserData) {
  dotenv.config();

  const email: string = user.email;

  const findUser = await findByEmail(email);

  if (!findUser) {
    throw {
      code: "Unauthorized",
      message: "E-mail or password incorrect",
    };
  }

  const passwordVerify = bcrypt.compareSync(user.password, findUser.password);

  if (!passwordVerify) {
    throw {
      code: "Unauthorized",
      message: "E-mail or password incorrect",
    };
  }

  const iduser: number = findUser.id;
  const secretKey: string = process.env.SECRET_KEY || "";
  const config = { expiresIn: 86400 };

  const token = Jwt.sign({ iduser }, secretKey, config);

  await updateToken(iduser, token)

  return token;
}

export async function findLengthOfTypes(id: number) {
  const findUser = await findById(id);

  if (!findUser) {
    throw {
      code: "Unauthorized",
      message: "Login required",
    };
  }

  const credentialLength = await findAllCredentials(id)
  const notesLength = await findAllNotes(id)
  const cardsLength = await findAllCards(id)
  const wifiLength = await findAllWifi(id)

  const data = {
    credentials: credentialLength.length,
    notes: notesLength.length,
    cards: cardsLength.length,
    wifi: wifiLength.length
  }

  return data;
}
