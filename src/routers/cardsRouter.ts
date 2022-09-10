import { Router } from "express"

import validateUser from '../middlewares/validateUser';
import { validateSchema } from "../middlewares/validateSchema";
import { createCards, deleteCards, showCards } from "../controllers/cardsController";
import cardSchema from "../schemas/cardSchema";

const router = Router()

router.post("/cards", validateUser, validateSchema(cardSchema), createCards);

router.get("/cards", validateUser, showCards);

router.delete("/cards/:id", validateUser, deleteCards)

export default router