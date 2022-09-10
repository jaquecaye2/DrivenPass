import { prisma } from "../config/database";
import { TypeCardData } from "../types/cardTypes";

export async function insertCard(cardData: TypeCardData) {
  await prisma.cards.create({ data: cardData });
}

export async function findByTitle(title: string, user_id: number) {
  const result = await prisma.cards.findFirst({
    where: { title, user_id },
  });
  return result;
}

export async function findAll(user_id: number) {
  const result = await prisma.cards.findMany({ where: { user_id } });
  return result;
}

export async function findById(id: number, user_id: number) {
  const result = await prisma.cards.findFirst({ where: { id, user_id } });
  return result;
}

export async function deleteById(id: number) {
  await prisma.cards.delete({ where: { id } });
}
