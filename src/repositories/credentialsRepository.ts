import { prisma } from "../config/database";

import { TypeCredentialData } from "../types/credentialTypes";

export async function insertCredential(credencialData: TypeCredentialData) {
  await prisma.credentials.create({ data: credencialData });
}

export async function findByTitle(title: string, user_id: number) {
  const result = await prisma.credentials.findFirst({
    where: { title, user_id },
  });
  return result;
}

export async function findAll(user_id: number) {
  const result = await prisma.credentials.findMany({ where: { user_id } });
  return result;
}

export async function findById(id: number, user_id: number) {
  const result = await prisma.credentials.findFirst({ where: { id, user_id } });
  return result;
}

export async function deleteById(id: number) {
  await prisma.credentials.delete({ where: { id } });
}
