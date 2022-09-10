import dotenv from "dotenv";

import { secure_notes, users } from "@prisma/client";
import { TypeNoteData } from "../types/noteTypes";
import {
  insertNote,
  findByTitle,
  deleteById,
  findAll,
  findById
} from "../repositories/notesRepository";

dotenv.config();

export async function createNote(noteData: TypeNoteData) {
  const title: string = noteData.title || "";

  const result = await findByTitle(title, noteData.user_id);

  if (result) {
    throw {
      code: "Unauthorized",
      message: "Título da nota já está sendo utilizado",
    };
  }

  await insertNote(noteData);

  return "success";
}

export async function findNote(user: users, id: number | undefined) {
  if (!id) {
    const result: secure_notes[] = await findAll(user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Usuario não possui notas cadastradas",
      };
    }

    return result;
  } else {
    const result: secure_notes | null = await findById(id, user.id);

    if (!result) {
      throw {
        code: "NotFound",
        message: "Nota não encontrada",
      };
    }

    return result;
  }
}

export async function deleteNote(user: users, id: number) {
  const findNote = await findById(id, user.id);

  if (!findNote) {
    throw {
      code: "NotFound",
      message: "Nota não encontrada",
    };
  }

  await deleteById(id);

  return "success";
}
