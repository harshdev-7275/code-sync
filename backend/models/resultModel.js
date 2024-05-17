import mongoose from "mongoose";
const { Schema } = mongoose;

/** result model */
const resultModel = new Schema({
    quiz:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: [true, "Quiz ID is required"],
    },
    students: [{
       marks:{
           type: Number,
           required: [true, "Marks are required"],
           default: 0
       },
       student: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
           required: [true, "Student ID is required"],
       }
    }]
});

const Results = mongoose.model('Result', resultModel);
export default Results;
