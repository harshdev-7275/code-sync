import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: [true, "Quiz ID is required"],
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Student ID is required"],
    },
    answers: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true
            },
            answer: {
                type: String,
                required: [true, "Answer is required"]
            },
            marks: {
                type: Number,
                default: 0
            }
        }
    ],
    totalMarks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
