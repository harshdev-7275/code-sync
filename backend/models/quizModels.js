import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Created by is required"],
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: [true, "Questions are required"],
    },
  ],
});

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: [true, "Question is required"],
  },
  answerText: {
    type: String,
    required: [true, "Answer is required"],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Is correct is required"],
  },
});

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  questionText: {
    type: String,
    required: [true, "Question text is required"],
  },
  questionType: {
    type: String,
    required: [true, "Question type is required"],
  },
  answers: [answerSchema],
});

const quizAssignmentSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  studentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  availabilityStartDate: Date,
  availabilityEndDate: Date,
});
const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);
const Answer = mongoose.model("Answer", answerSchema);

const QuizAssignment = mongoose.model("QuizAssignment", quizAssignmentSchema);

export { Quiz, Question, QuizAssignment, Answer };
