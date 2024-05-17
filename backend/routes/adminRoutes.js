import express from "express";
import { protect } from "../middlerwares/authMiddleware.js";
import {
  createNewTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
  getAllStudents,
  updateStudent,
  deleteStudent,
  
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/getAllTeachers", protect, getAllTeachers);
router.post("/createNewTeacher", protect, createNewTeacher);
router.put("/updateTeacher", protect, updateTeacher);
router.delete("/deleteTeacher", protect, deleteTeacher);

//send message


//students

router.get("/getAllStudents", protect, getAllStudents);

router.put("/updateStudent", protect, updateStudent);
router.delete("/deleteStudent", protect, deleteStudent);

export default router;
