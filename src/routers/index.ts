import { Router } from 'express';

import authRouter from '../routers/authRouter';
import credentialRouter from "../routers/credentialsRouter"
import notesRouter from "../routers/notesRouter"
import cardsRouter from "../routers/cardsRouter"

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(notesRouter);
router.use(cardsRouter);

export default router;