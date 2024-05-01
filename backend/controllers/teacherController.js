import mongoose from "mongoose";
import expressAsyncHandler from "express-async-handler";
import { Quiz, Question, Answer } from "../models/quizModels.js";

const createQuiz = expressAsyncHandler(async (req, res) => {
  const { title, description, duration, deadline, questions } = req.body;

  if (!title || !duration || !deadline || !questions) {
    res.status(400).json({
      message: "Title, duration, deadline, and questions are required",
    });
    return;
  }

  try {
    // Create quiz
    const quiz = new Quiz({
      title,
      description,
      duration,
      deadline,
      createdBy: req.user._id,
      questions: questions.map((questionData) => {
        const { questionText, questionType, answers } = questionData;

        // Create answers for the question
        const questionAnswers = answers.map(
          (answerData) =>
            new Answer({
              answerText: answerData.answerText,
              isCorrect: answerData.isCorrect,
            })
        );

        return new Question({
          quiz: null, // Will be set after quiz is saved
          questionText,
          questionType,
          answers: questionAnswers,
        });
      }),
    });

    const createdQuiz = await quiz.save();

    // Set quiz ID for each question and save them
    const updatedQuestions = [];

    for (let i = 0; i < createdQuiz.questions.length; i++) {
      const question = createdQuiz.questions[i];
      question.quiz = createdQuiz._id;

      const savedQuestion = await question.save();

      // Set question ID for each answer and save them
      for (let j = 0; j < savedQuestion.answers.length; j++) {
        const answer = savedQuestion.answers[j];
        answer.question = savedQuestion._id;

        await answer.save();
      }

      updatedQuestions.push(savedQuestion);
    }

    // Fetch the quiz again to populate the createdBy field and questions with answers
    const populatedQuiz = await Quiz.findById(createdQuiz._id)
      .populate("createdBy")
      .populate({
        path: "questions",
        populate: { path: "answers" },
      });

    res.status(201).json(populatedQuiz);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Quiz creation failed", error: error.message });
  }
});

export { createQuiz };
