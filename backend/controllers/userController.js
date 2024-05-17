import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Message from "../models/messageModel.js";
import expressAsyncHandler from "express-async-handler";
import Quiz from "../models/quizModel.js";
import Submission from "../models/submissionModel.js";
import Results from "../models/resultModel.js";

// @desc Auth user/ set token
//route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register new user
//route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { id, name, password, role } = req.body;
  const userExists = await User.findOne({ id });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    id,
    name,
    password,
    role,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout User
//route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc getUserProfile
//route POST /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = {
    _id: req.user._id,
    id: req.user.id,
    name: req.user.name,
    role: req.user.role,
  };
  res.status(200).json(user);
});

// @desc updateUserProfile
//route put /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});
//send message
const sendMessage = expressAsyncHandler(async (req, res) => {
  console.log("dad");

  const { sender, receiver, subject, message } = req.body;
  console.log(sender, receiver, subject, message);

  if (!sender || !receiver || !subject || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Fetch sender and receiver details from User collection
  const senderExists = await User.findOne({ id: sender });
  const receiverExists = await User.findOne({ id: receiver });

  console.log(senderExists);
  console.log(receiverExists);

  if (!senderExists || !receiverExists) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    // Create a new message with sender and receiver IDs
    const newMessage = await Message.create({
      sender: senderExists._id,
      receiver: receiverExists._id,
      subject,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage, // Optionally, you can return the newly created message
    });
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});
const getAllMessages = expressAsyncHandler(async (req, res) => {
  const messages = await Message.find();
  if (!messages) {
    res.status(404);
    throw new Error("Messages not found");
  }

  res.status(200).json({
    success: true,
    data: messages,
  });
});
const getSingleUser = expressAsyncHandler(async (req, res) => {
  console.log("getsingleuser");
  console.log(req.params.id);
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
const deleteMessage = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const message = await Message.deleteOne({ _id: id });
  if (message.deletedCount === 0) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.status(200).json({ message: "Message deleted" });
});
const getSentMessages = expressAsyncHandler(async (req, res) => {
  const messages = await Message.find({ sender: req.user._id });
  if (!messages) {
    res.status(404);
    throw new Error("Messages not found");
  }
  res.status(200).json({
    success: true,
    data: messages,
  });
});
const getAllQuiz = expressAsyncHandler(async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    if (!quizzes) {
      res.status(404);
      throw new Error("Quizzes not found");
    }

    // Map over quizzes to extract required fields
    const modifiedQuizzes = quizzes.map((quiz) => ({
      _id: quiz._id.toString(),
      title: quiz.title,
      teacher: quiz.teacher.toString(),
    }));

    return res.status(200).json({
      success: true,
      data: modifiedQuizzes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});
const submitQuizById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { student, answers } = req.body;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      res.status(404);
      throw new Error("Quiz not found");
    }

    // Check if the student exists
    const studentDetails = await User.findById(student);
    if (!studentDetails) {
      res.status(404);
      throw new Error("Student not found");
    }

    // Check if submission already exists
    const submissionExists = await Submission.findOne({ quiz: id, student });
    if (submissionExists) {
      res.status(400);
      throw new Error("Submission already exists");
    }

    // Calculate total marks
    let totalMarks = 0;
    answers.forEach(answer => {
      totalMarks += answer.marks;
    });
    const result = await Results.create({
      quiz: id,
     students:[
      {
        marks: totalMarks,
        student: student
      }
     ]
    })


    // Create submission
    const submission = new Submission({
      quiz: id,
      student,
      answers,
      totalMarks 
    });

    // Save submission
    const savedSubmission = await submission.save();
    if (!savedSubmission) {
      res.status(500);
      throw new Error("Failed to submit quiz");
    }

    // Prepare response data
    const responseData = {
      student: studentDetails.name,
      marks: savedSubmission.totalMarks,
    };

    // Send success response
    res.status(201).json({ message: "Submission created successfully", data: responseData });
  } catch (error) {
    next(error);
  }
});




export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  sendMessage,
  getAllMessages,
  getSingleUser,
  getSentMessages,
  deleteMessage,
  getAllQuiz,
  submitQuizById,
};
