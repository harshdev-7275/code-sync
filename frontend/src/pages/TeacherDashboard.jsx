import React, { useState } from "react";
import Student from "../components/Student";
import axios from "axios";
import Messages from "../components/Messages";
import Assignments from "../components/Assignments";


const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllStudents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/admin/getAllStudents", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response.data.message || "Error fetching students");
    } finally {
      setIsLoading(false);
    }
  };

  const tabClickHandler = (tab) => {
    setActiveTab(tab);
    if (tab === "students") {
      fetchAllStudents();
    } 
    if(tab === "assignments"){
      console.log("assignments");
    }
    if(tab === "messages"){
      console.log("messages");
    }
  };

  return (
    <div className="max-w-[2000px] mx-auto relative">
      <div className="flex items-center gap-[15rem]">
        <section className=" flex flex-col w-[300px] rounded-md bg-[#272626ee] items-center ml-64 justify-center gap-10 h-[calc(100vh-300px)]">
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "home" && "bg-blue-500"
            } hover:text-white w-full px-4 py-4 transition-all shadow-2xl hover:shadow-blue-500 ${activeTab === "home" && "shadow-blue-500 bg-blue-500"}`}
            onClick={() => tabClickHandler("home")}
          >
            Home
          </button>
          <button
            className={`hover:bg-blue-500 ${
              activeTab === "assignments" && "bg-blue-500"
            } hover:text-white w-full px-4 py-4 transition-all shadow-2xl hover:shadow-blue-500 ${activeTab === "assignments" && "shadow-blue-500 bg-blue-500"}`}
            onClick={() => tabClickHandler("assignments")}
          >
            Assignments
          </button>
          <button
           className={`hover:bg-blue-500 ${
            activeTab === "students" && "bg-blue-500"
          } hover:text-white w-full px-4 py-4 transition-all shadow-2xl hover:shadow-blue-500 ${activeTab === "students" && "shadow-blue-500 bg-blue-500"}`}
            onClick={() => tabClickHandler("students")}
          >
            Students
          </button>
          <button
           className={`hover:bg-blue-500 ${
            activeTab === "messages" && "bg-blue-500"
          } hover:text-white w-full px-4 py-4 transition-all shadow-2xl hover:shadow-blue-500 ${activeTab === "messages" && "shadow-blue-500 bg-blue-500"}`}
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
                    <Student student={student} editStudentModel={false} />
                  </div>
                ))}
            </div>
          )}
          <div className="overflow-hidden">{
          activeTab === "messages" && <Messages/>
        }</div>
        <div>
          {activeTab === "assignments" && <Assignments/>}
        </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default TeacherDashboard;
