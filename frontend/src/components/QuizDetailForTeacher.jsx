import axios from "axios";
import React, { useEffect, useState } from "react";

const QuizDetailForTeacher = ({ quizId, setViewQuizClicked }) => {
  const [allStudents, setAllStudents] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`api/teacher/getResultByQuiz/${quizId}`);
      console.log(res.data.data);
      setAllStudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchResults();
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="container flex flex-col justify-between mx-auto text-white w-[50vw] min-h-[60vh] p-5 rounded-md">
        <h1 className="text-5xl overflow-hidden text-center">Quiz Result</h1>
        <div>
          {allStudents.length === 0 ? (
            <div className="mt-10 ml-10">
              <h1 className="text-3xl text-center">No Result Found</h1>
            </div>
          ) : (
            <div className="mt-10 h-[50vh] overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-bold text-white uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-right text-lg font-bold text-white uppercase tracking-wider">
                      Total Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allStudents.map((student, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-xl">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xl">
                        {student.marks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <button className="bg-red-600 py-3 hover:scale-95 transition-transform text-lg font-bold" onClick={() => setViewQuizClicked(false)}>Cancel</button>
      </div>
     
    </div>
  );
};

export default QuizDetailForTeacher;
