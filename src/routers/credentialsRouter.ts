import { Router } from "express"

import { createCredentials, showCredentials, deleteCredentials } from "../controllers/credentialsController";

import validateUser from '../middlewares/validateUser';
import { validateSchema } from "../middlewares/validateSchema";
import credentialSchema from "../schemas/credentialSchema";

const router = Router()

router.post("/credentials", validateUser, validateSchema(credentialSchema), createCredentials);

router.get("/credentials", validateUser, showCredentials);

router.delete("/credentials/:id", validateUser, deleteCredentials)

export default router