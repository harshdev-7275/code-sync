import React, { useState } from "react";
import Student from "../components/Student";
import axios from "axios";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllStudents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setData(null)
      const res = await axios.get("/api/admin/getAllStudents", {
        withCredentials: true,
      });
      setData(res.data);
      console.log(data);
    } catch (err) {
      setError(err.message || "Error fetching teachers");
    } finally {
      setIsLoading(false);
    }
  };
  const tabClickHandler = (tab) => {
    setActiveTab(tab);
    console.log(activeTab);
    if (tab === "teachers") {
    }
    if (tab === "students") {
        fetchAllStudents()
    }
  };
  return (
    <div className="max-w-[1400px] mx-auto relative">
      <div className="flex items-center gap-[15rem]">
        <section className="flex flex-col w-[150px] rounded-md bg-[#272626ee] items-center justify-center gap-10 h-[calc(100vh-300px)]">
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "home" && "bg-blue-500"
            } hover:text-white w-[100px] px-4 py-2 transition-all`}
            onClick={() => tabClickHandler("home")}
          >
            Home
          </button>
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "teachers" && "bg-blue-500"
            } hover:text-white w-[100px] px-4 py-2 transition-all flex items-center justify-center`}
            onClick={() => tabClickHandler("assignments")}
          >
            Assignments
          </button>
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "students" && "bg-blue-500"
            } hover:text-white w-[100px] px-4 py-2 transition-all`}
            onClick={() => tabClickHandler("students")}
          >
            Students
          </button>
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "messages" && "bg-blue-500"
            } hover:text-white w-[100px] px-4 py-2 transition-all`}
            onClick={() => tabClickHandler("messages")}
          >
            Messages
          </button>
        </section>
        <div className="container overflow-y-auto max-h-[500px] scroll-smooth">
        {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
             <div className="flex flex-col gap-5 ">
                {activeTab === "students" &&
                data.map((student) => (
                  <div key={student?._id}>
                    <Student student={student} editStudentModel={false}  />
                  </div>
                ))}
                </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
