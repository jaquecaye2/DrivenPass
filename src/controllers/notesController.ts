import { Request, Response } from "express";
import { users } from "@prisma/client";
import { TypeCredentialData } from "../types/credentialTypes";
import { createNote, deleteNote, findNote } from "../services/notesService";
import { TypeNoteData } from "../types/noteTypes";

export async function createNotes(request: Request, response: Response) {
  const user: users = response.locals.user

  const note = request.body;

  const noteData: TypeNoteData = {
    user_id: user.id,
    title: note.title,
    note: note.note
  }

  const success = await createNote(noteData);

  if (success === "success") {
    return response.status(200).send("Nota criada com sucesso");
  }

  response.status(500).send();
}

export async function showNotes(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number | undefined = Number(request.query.id)

  const result = await findNote(user, id);

  if (result) {
    return response.status(200).send(result);
  }

  response.status(500).send();
}

export async function deleteNotes(request: Request, response: Response) {
  const user: users = response.locals.user

  const id: number = Number(request.params.id)

  const success = await deleteNote(user, id);

  if (success === "success") {
    return response.status(200).send("Nota deletada com sucesso");
  }

  response.status(500).send();
}
