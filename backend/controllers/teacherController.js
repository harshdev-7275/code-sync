

import expressAsyncHandler from "express-async-handler";
import Quiz from "../models/quizModel.js";
import Results from "../models/resultModel.js";
import User from "../models/userModel.js";

const createQuiz = expressAsyncHandler(async (req, res) => {
    // Assuming req.body contains the necessary data for quiz creation

    const { teacher, title, questions } = req.body;
    

 
    const limitedQuestions = questions.slice(0, 5);

    try {

        const quiz = await Quiz.create({
            teacher,
            title,
            questions: limitedQuestions
        });

        res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (error) {
        res.status(500).json({ message: "Quiz creation failed", error });
    }
});
const getAllQuizByTeacher = expressAsyncHandler(async (req, res) => {

    const { id } = req.params;

    const quiz = await Quiz.find({ teacher: id });
    const modifiedQuizzes = quiz.map((quiz) => ({
        _id: quiz._id.toString(),
        title: quiz.title,
        teacher: quiz.teacher.toString()
    }));
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found");
    }
    res.status(200).json({
        success: true,
        data: modifiedQuizzes
    });
    
})
const getResultByQuiz = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Results.findOne({ quiz: id });
      if (!result) {
        res.status(404);
        throw new Error("Result not found");
      }
      
      // Fetch student details and modify the result
      const modifiedResult = await Promise.all(result.students.map(async (student) => {
        const studentDetail = await User.findById(student.student);
        return {
          name: studentDetail.name,
          marks: student.marks,
          id: student.student // Assuming you also want to include the student ID
        };
      }));
  
      res.status(200).json({
        success: true,
        data: modifiedResult // Sending the modified result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  });
  


export {createQuiz, getAllQuizByTeacher, getResultByQuiz}