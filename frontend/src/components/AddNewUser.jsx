import React, { useState } from "react";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddNewUser = ({setAddNewUserModel}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("teacher");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const addUserHandler=async(e)=>{
    e.preventDefault();
   if(id && name && password){
    try {
      console.log(role);
        const res=await axios.post("/api/admin/createNewTeacher",{id,name,password,role},{
            withCredentials:true
          })
          console.log(res.data);
          
          toast.success("User added successfully")
          setTimeout(() => {
            setAddNewUserModel(false)
          }, 1500);
    } catch (error) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message||"An error occurred")
    }
   }else{
    toast.error("Please fill all the fields")
   }
  }
  return (
    <div className="absolute top-0 left-96 w-[40vw] h-[57vh] bg-black rounded-md border-white border-2 px-10 pt-6 pb-4">
      <h1 className="text-center text-lg">Add New User</h1>
      <button onClick={() => setAddNewUserModel(false)} className="absolute top-3 right-3 text-xl px-3 bg-red-500 py-1 rounded flex items-center justify-center hover:scale-95 transition-transform">x</button>
      <form onSubmit={addUserHandler} className="flex flex-col gap-4">
        <div className="flex flex-col max-w-[400px] gap-4">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={id}
            placeholder="enter your id"
            onChange={(e) => setId(e.target.value)}
            className="outline-none border-2 border-white bg-[#2f2f2f] px-3 py-1 rounded"
          />
        </div>
        <div className="flex flex-col max-w-[400px] gap-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-2 border-white bg-[#2f2f2f] px-3 py-1 rounded"
          />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-col max-w-[300px] gap-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-2 border-white bg-[#2f2f2f] px-3 py-1 rounded"
            />
          </div>
          <select
            name="admin"
            id="adminDropdown"
            className="mt-10 w-[100px] px-2 outline-none"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 px-4 py-3 rounded cursor-pointer hover:scale-95 transition-transform">Add</button>
      </form>
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
  );
};

export default AddNewUser;
