import { Router } from "express"

import {signup, signin, logout} from "../controllers/authController"
import validateUser from '../middlewares/validateUser';
import { validateSchema } from "../middlewares/validateSchema";
import userSchema from "../schemas/userSchema";

const router = Router()

router.post("/signup", validateSchema(userSchema), signup);

router.post("/signin", validateSchema(userSchema), signin);

router.delete("/logout", validateUser, logout)

export default router