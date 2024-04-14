import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getAllTeachers = expressAsyncHandler(async (req, res) => {
  const teachers = await User.find({ role: "teacher" });
  if (!teachers) {
    res.status(404);
    throw new Error("Teachers not found");
  }
  res.status(200).json(teachers);
});
const createNewTeacher = expressAsyncHandler(async (req, res) => {
  const { id, name, password, role } = req.body;
  const teacherExists = await User.findOne({ id });
  if (teacherExists) {
    res.status(400);
    throw new Error("Teacher already exists");
  }
  const teacher = await User.create({ id, name, password, role });
  if (!teacher) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.status(201).json({
    _id: teacher._id,
    id: teacher.id,
    name: teacher.name,
    role: teacher.role,
  });
});

const updateTeacher = expressAsyncHandler(async (req, res) => {
  const { id, name, password } = req.body;
  console.log(id);

  const teacher = await User.findOne({ id });
  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }
  teacher.name = name || teacher.name;
  teacher.password = password.length > 0 ? password : teacher.password;
  const updatedTeacher = await teacher.save();
  res.status(200).json({
    _id: updatedTeacher._id,
    id: updatedTeacher.id,
    name: updatedTeacher.name,
    role: updatedTeacher.role,
  });
});

const deleteTeacher = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const teacher = await User.deleteOne({ id });
  if (teacher.deletedCount === 0) {
    res.status(404);
    throw new Error("Teacher not found");
  }
  console.log(teacher);
  res.status(200).json({ message: "Teacher deleted" });
});

//students

const getAllStudents = expressAsyncHandler(async (req, res) => {
  const students = await User.find({ role: "student" });
  if (!students) {
    res.status(404);
    throw new Error("Students not found");
  }

  res.status(200).json(students);
});
const updateStudent = expressAsyncHandler(async (req, res) => {
  const { id, name, password } = req.body;
  console.log(id);

  const student = await User.findOne({ id });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  student.name = name || student.name;
  student.password = password.length > 0 ? password : student.password;
  const updatedStudent = await teacher.save();
  res.status(200).json({
    _id: updatedStudent._id,
    id: updatedStudent.id,
    name: updatedStudent.name,
    role: updatedStudent.role,
  });
});

const deleteStudent = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const student = await User.deleteOne({ id });
  if (student.deletedCount === 0) {
    res.status(404);
    throw new Error("Student not found");
  }
  console.log(teacher);
  res.status(200).json({ message: "Student deleted" });
});

export {
  getAllTeachers,
  createNewTeacher,
  updateTeacher,
  deleteTeacher,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
