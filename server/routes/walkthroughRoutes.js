import express from "express"
import protect from "../middleware/authMiddleware.js"
import { getWalkthroughs, saveWalkthrough } from "../controllers/walkthroughController.js";

const router = express.Router()

router.post("/", protect, saveWalkthrough)
router.get("/", protect, getWalkthroughs)

export default router