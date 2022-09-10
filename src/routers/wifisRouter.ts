import { Router } from "express"

import validateUser from '../middlewares/validateUser';
import { validateSchema } from "../middlewares/validateSchema";
import wifiSchema from "../schemas/wifiSchema";
import { createWifis, deleteWifis, showWifis } from "../controllers/wifisController";

const router = Router()

router.post("/wifi", validateUser, validateSchema(wifiSchema), createWifis);

router.get("/wifi", validateUser, showWifis);

router.delete("/wifi/:id", validateUser, deleteWifis)

export default router