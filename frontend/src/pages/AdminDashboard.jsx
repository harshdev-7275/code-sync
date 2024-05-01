import React, { useState } from "react";
import axios from "axios";

import Teacher from "../components/Teacher";
import AdminHome from "../components/AdminHome";
import EditTeacher from "../components/EditTeacher";
import DeleteTeacher from "../components/DeleteTeacher";
import AddNewTeacher from "../components/AddNewUser";
import AddNewUser from "../components/AddNewUser";
import Student from "../components/Student";
import EditStudent from "../components/EditStudent";
import DeleteStudent from "../components/DeleteStudent";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editTeacherModel, setEditTeacherModel] = useState(false);
  const [editStudentModel, setEditStudentModel] = useState(false);
  const [singleTeacher, setSingleTeacher] = useState("");
  const [singleStudent, setSingleStudent] = useState("");
  const [deleteTeacherModel, setDeleteTeacherModel] = useState(false);
  const [deleteStudentModel, setDeleteStudentModel] = useState(false);
  const [addNewUserModel, setAddNewUserModel] = useState(false);
  

  const fetchAllTeachers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setData(null)
      const res = await axios.get("/api/admin/getAllTeachers", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (err) {
      setError(err.message || "Error fetching teachers");
    } finally {
      setIsLoading(false);
    }
  };
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
    if(tab==="teachers"){
      fetchAllTeachers();
    }
    if(tab==="students"){

      fetchAllStudents();
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto relative">
      <div className="absolute right-20 top-0">
        <button className="bg-blue-500 px-7 py-3 rounded-md" onClick={() => setAddNewUserModel(!addNewUserModel)}>
          Add New User
        </button>
      </div>
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
            } hover:text-white w-[100px] px-4 py-2 transition-all`}
            onClick={() => tabClickHandler("teachers")}
          >
            Teachers
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
              {activeTab === "teachers" &&
                data.map((teacher) => (
                  <div key={teacher?._id}>
                    <Teacher teacher={teacher} editTeacherModel={false} setEditTeacherModel={setEditTeacherModel} singleTeacher={singleTeacher} setSingleTeacher={setSingleTeacher} deleteTeacherModel= {deleteTeacherModel} setDeleteTeacherModel={setDeleteTeacherModel} />
                  </div>
                ))}
                {activeTab === "students" &&
                data.map((student) => (
                  <div key={student?._id}>
                    <Student student={student} editStudentModel={false} setEditStudentModel={setEditStudentModel} singleStudent={singleStudent} setSingleStudent={setSingleStudent} deleteStudentModel= {deleteStudentModel} setDeleteStudentModel={setDeleteStudentModel} />
                  </div>
                ))}
            </div>
          )}
          {data && (
            <div className="flex flex-col gap-5 ">
              {activeTab === "home" && <AdminHome teachers={data} />}
            </div>
          )}
        </div>
      </div>
      {editTeacherModel&&(
        <EditTeacher singleTeacher={singleTeacher} setSingleTeacher={setSingleTeacher} setEditTeacherModel={setEditTeacherModel}/>
      )}
       {editStudentModel&&(
        <EditStudent singleStudent={singleStudent} setSingleStudent={setSingleStudent} setEditStudentModel={setEditStudentModel}/>
      )}
      {
        deleteTeacherModel&&(
          <DeleteTeacher singleTeacher={singleTeacher} setSingleTeacher={setSingleTeacher} setDeleteTeacherModel={setDeleteTeacherModel}/>
        )
      }
      {
        deleteStudentModel&&(
          <DeleteStudent singleStudent={singleStudent} setSingleStudent={setSingleStudent} setDeleteStudentModel={setDeleteStudentModel}/>
        )
      }
      {
        addNewUserModel&&(
          <AddNewUser setAddNewUserModel={setAddNewUserModel}/>
        )
      }
    </div>
  );
};

export default AdminDashboard;
