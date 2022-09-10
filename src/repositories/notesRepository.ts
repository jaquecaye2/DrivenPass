import { prisma } from "../config/database";
import { TypeNoteData } from "../types/noteTypes";

export async function insertNote(noteData: TypeNoteData) {
  await prisma.secure_notes.create({ data: noteData });
}

export async function findByTitle(title: string, user_id: number) {
  const result = await prisma.secure_notes.findFirst({
    where: { title, user_id },
  });
  return result;
}

export async function findAll(user_id: number) {
  const result = await prisma.secure_notes.findMany({ where: { user_id } });
  return result;
}

export async function findById(id: number, user_id: number) {
  const result = await prisma.secure_notes.findFirst({ where: { id, user_id } });
  return result;
}

export async function deleteById(id: number) {
  await prisma.secure_notes.delete({ where: { id } });
}
