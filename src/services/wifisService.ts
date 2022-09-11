import dotenv from "dotenv";
import Cryptr from "cryptr";

import { users, wifis } from "@prisma/client";

import {
  insertWifi,
  findByTitle,
  deleteById,
  findAllWifi,
  findById,
} from "../repositories/wifisRepository";
import { TypeWifiData } from "../types/wifiTypes";

dotenv.config();

export async function createWifi(wifiData: TypeWifiData) {
  const key = process.env.SECRET_KEY || "";
  const cryptr = new Cryptr(key);
  const encryptedPassword = cryptr.encrypt(wifiData.password);

  wifiData.password = encryptedPassword;

  await insertWifi(wifiData);

  return "success";
}

export async function findWifi(user: users, id: number | undefined) {
  if (!id) {
    const result: wifis[] = await findAllWifi(user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Usuario não possui wifi cadastrados",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);

    const resultDecrypted = result.map((r) => {
      r.password = cryptr.decrypt(r.password);
      return r;
    });

    return resultDecrypted;
  } else {
    const result: wifis | null = await findById(id, user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Wifi não encontrado",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);
    const decryptedPassword = cryptr.decrypt(result.password);

    result.password = decryptedPassword;

    return result;
  }
}

export async function deleteWifi(user: users, id: number) {
  const findCard = await findById(id, user.id);

  if (!findCard) {
    throw {
      code: "NotFound",
      message: "Wifi não encontrado",
    };
  }

  await deleteById(id);

  return "success";
}
