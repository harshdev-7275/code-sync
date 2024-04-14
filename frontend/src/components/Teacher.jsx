import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Teacher = ({teacher, editTeacherModel, setEditTeacherModel,singleTeacher, setSingleTeacher, deleteTeacherModel, setDeleteTeacherModel }) => {
    const [editMode, setEditMode] = useState(true);
    const editClickHandler=(e)=>{
        e.preventDefault();
        setEditTeacherModel(!editTeacherModel)
        setSingleTeacher(teacher)
        console.log(singleTeacher);
    }
    const deleteClickHandler=(e)=>{
        e.preventDefault();
        setDeleteTeacherModel(!deleteTeacherModel)
        setSingleTeacher(teacher)
    }
  return (
    <div className="flex relative justify-between items-center max-w-[800px] bg-[#2b2b2b] px-4 py-3 rounded-md shadow-md hover:scale-95 cursor-pointer transition-all">
      <div className="flex flex-col gap-5 bg-[#2b2b2b]">
        <h1 className="bg-[#2b2b2b] text-xl font-semibold">{teacher?.name}</h1>
        <p className="bg-[#2b2b2b]">{teacher?.id}</p>
      </div>
      <div className="flex gap-5 bg-[#2b2b2b]">
        <CiEdit
        onClick={editClickHandler}
          size={50}
          color=""
          className="cursor-pointer hover:bg-blue-600 p-2 rounded-md hover:scale-95 transition-transform delay-75"
        />
        <MdDeleteForever
        onClick={deleteClickHandler}
          size={50}
          className="cursor-pointer hover:bg-red-600 p-2 rounded-md hover:scale-95 transition-transform delay-75"
        />
      </div>
      
    </div>
  );
};

export default Teacher;
