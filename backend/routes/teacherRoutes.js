import express from "express";
import { createQuiz } from "../controllers/teacherController.js";
import { protect } from "../middlerwares/authMiddleware.js";

const router = express.Router();

router.post("/createQuiz", protect, createQuiz);

export default router;
