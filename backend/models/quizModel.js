import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Teacher ID is required"],
    },
    title:{
        type: String,
        required: [true, "Title is required"],
    },
    questions:[
        {
            question: {
                type: String,
                required: [true, "Question is required"],
            },
            answer: {
                type: String,
                required: [true, "Answer is required"],
            }
        }
    ]
},{
    timestamps: true
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
