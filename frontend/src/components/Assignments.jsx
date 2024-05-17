import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateQuiz from "./CreateQuiz";
import QuizDetailForTeacher from "./QuizDetailForTeacher";

const Assignments = () => {
  const [allQuizes, setAllQuizes] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [viewQuizClicked, setViewQuizClicked] = useState(false);
  const [quizId, setQuizId] = useState("");
  const fetchAllQuiz = async () => {
    try {
      const id = userInfo._id;
      const res = await axios.get(`/api/teacher/getAllQuizByTeacher/${id}`, {
        withCredentials: true,
      });
      // console.log(res.data.data);
      setAllQuizes(res.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllQuiz();
  }, []);
  useEffect(() => {
    fetchAllQuiz();
  }, [isCreateClicked]);
  useEffect(() => {
    if(!viewQuizClicked){
      setQuizId("")
    }
  }, [viewQuizClicked]);
  const viewQuiz = (id) => {
    setQuizId(id);
    setViewQuizClicked(true);
  }
  return (
    <div className="max-w-[100vw] absolute top-4 left-[25%] mx-auto">
      <div className="container flex flex-col w-[70vw] px-10">
        <div className="flex items-center justify-between">
          <h1 className="text-6xl overflow-hidden">Quiz</h1>
          <button
            className="text-3xl bg-blue-600 px-4 py-2 rounded-md hover:scale-95 transition-transform"
            onClick={() => setIsCreateClicked(true)}
          >
            Create Quiz
          </button>
        </div>
        {allQuizes.length == 0 ? (
          <div className="mt-10 ml-10">
            <h1 className="text-3xl text-center">No Quiz Found</h1>
          </div>
        ) : (
          <div className="mt-10 h-[50vh] scroll-m-0">
            {allQuizes.map((quiz, i) => (
              <div
                key={quiz._id}
                className="mt-10 flex items-center justify-between ml-10 border-2 py-4 px-3 rounded-md bg-[#3c3b3b] hover:scale-95 cursor-pointer transition-transform z-50"
              >
                <div className="flex text-3xl gap-4 bg-[#3c3b3b]">
                  <h1 className="bg-[#3c3b3b]">Quiz {i + 1}:</h1>
                  <h1 className=" bg-[#3c3b3b]">{quiz.title}</h1>
                </div>
                <div className="bg-transparent">
                  <button onClick={() => viewQuiz(quiz._id)} className="text-3xl bg-blue-600 px-4 py-2 rounded-md hover:scale-95 transition-transform">View Detail</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isCreateClicked && (
        <CreateQuiz
          teacherId={userInfo._id}
          setIsCreateClicked={setIsCreateClicked}
        />
      )}
      {
        viewQuizClicked && (
          <QuizDetailForTeacher quizId={quizId} setViewQuizClicked={setViewQuizClicked}/>
        )
      }
    </div>
  );
};

export default Assignments;
