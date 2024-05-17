import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllMessages,
  getSingleUser,
  deleteMessage,
  getSentMessages,
  getAllQuiz,
  submitQuizById

} from "../controllers/userController.js";
import { protect } from "../middlerwares/authMiddleware.js";
import { sendMessage } from "../controllers/userController.js";

const router = express.Router();

router.post("/", protect, registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.post("/sendMessage", protect, sendMessage);
router.get("/getAllMessages", protect, getAllMessages);
router.get("/getSentMessages", protect, getSentMessages);
router.get("/getSingleUser/:id",protect, getSingleUser)
router.delete("/deleteMessage/:id",protect, deleteMessage)

//view quiz
router.get("/getAllQuizes", protect, getAllQuiz)

router.post("/submitQuizById/:id", protect, submitQuizById);


export default router;
