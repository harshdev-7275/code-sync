import React from 'react'
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteStudent = ({singleStudent, setSingleStudent, setDeleteStudentModel}) => {
    const deleteStudent =async(e)=>{
        e.preventDefault();
        if(singleStudent?.id){
            const id  = singleStudent?.id
            try {
            const res = axios.delete(`/api/admin/deleteTeacher?id=${id}`, {
                withCredentials: true
            })
            console.log((await res).data);
            toast.success("Teacher deleted successfully")
            setSingleStudent(null)
            setDeleteStudentModel(false)
          
            
            } catch (error) {
                console.log(error);
                toast.error("An error occurred")
            }
        }
        
    }
  return (
    <div className='absolute top-44 left-96 w-[40vw] h-[25vh] bg-black rounded-md border-white border-2 p-10'>
        <div className='flex flex-col items-center gap-5'>
            <h1>Are you sure you want to delete <span className='text-blue-500 text-lg font-semibold'>{singleStudent?.name}</span>?</h1>
            <div className='flex items-center justify-center gap-10'>
                <button onClick={deleteStudent} className='px-4 py-1 bg-blue-500 rounded-md hover:scale-95 transition-transform'>Yes</button>
                <button onClick={() => setDeleteStudentModel(false)} className='px-4 py-1 bg-red-500 rounded-md hover:scale-95 transition-transform'>No</button>
            </div>
        </div>
        <ToastContainer className={"bg-transparent"}
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="lightdark"
        transition:Bounce
      />
    </div>
  )
}

export default DeleteStudent