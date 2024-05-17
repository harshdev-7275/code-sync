import express from "express";

import { protect } from "../middlerwares/authMiddleware.js";
import {createQuiz, getAllQuizByTeacher,getResultByQuiz} from "../controllers/teacherController.js"


const router = express.Router();


//createquiz
router.post("/createQuiz", protect, createQuiz);
router.get("/getAllQuizByTeacher/:id", protect, getAllQuizByTeacher);
router.get("/getResultByQuiz/:id", protect, getResultByQuiz);




export default router;
