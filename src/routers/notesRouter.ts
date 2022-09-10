import { Router } from "express"

import validateUser from '../middlewares/validateUser';
import { validateSchema } from "../middlewares/validateSchema";
import noteSchema from "../schemas/noteSchema"
import { createNotes, deleteNotes, showNotes } from "../controllers/notesController";

const router = Router()

router.post("/notes", validateUser, validateSchema(noteSchema), createNotes);

router.get("/notes", validateUser, showNotes);

router.delete("/notes/:id", validateUser, deleteNotes)

export default router