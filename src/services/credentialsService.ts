import Cryptr from "cryptr";
import dotenv from "dotenv";

import { TypeCredentialData } from "../types/credentialTypes";
import {
  deleteById,
  findAllCredentials,
  findById,
  findByTitle,
  insertCredential,
} from "../repositories/credentialsRepository";
import { credentials, users } from "@prisma/client";

dotenv.config();

export async function createCredential(credentialData: TypeCredentialData) {
  const title: string = credentialData.title || "";

  const result = await findByTitle(title, credentialData.user_id);

  if (result) {
    throw {
      code: "Unauthorized",
      message: "Título da credencial já está sendo utilizado",
    };
  }

  const key = process.env.SECRET_KEY || "";

  const cryptr = new Cryptr(key);
  const encryptedPassword = cryptr.encrypt(credentialData.password);

  const credentialDataEncrypted = {
    user_id: credentialData.user_id,
    title: credentialData.title,
    url: credentialData.url,
    user_name: credentialData.user_name,
    password: encryptedPassword,
  };

  await insertCredential(credentialDataEncrypted);

  return "success";
}

export async function findCredentials(user: users, id: number | undefined) {
  if (!id) {
    const result = await findAllCredentials(user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Usuario não possui credenciais cadastradas",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);

    const resultDecrypted = result.map(r => {
      r.password = cryptr.decrypt(r.password)
      return r
    })

    return resultDecrypted;
  } else {
    let result: credentials | null = await findById(id, user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Credencial não encontrada",
      };
    }

    const key = process.env.SECRET_KEY || "";

    const cryptr = new Cryptr(key);
    const decryptedPassword = cryptr.decrypt(result.password);

    result.password = decryptedPassword

    return result;
  }
}

export async function deleteCredential(user: users, id: number) {
  const findCredential = await findById(id, user.id) 

  if(!findCredential){
    throw {
      code: "NotFound",
      message: "Credencial não encontrada",
    };
  }

  await deleteById(id)

  return "success"
}
