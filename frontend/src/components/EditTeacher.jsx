import React, { useState } from 'react'
import axios from "axios"

const EditTeacher = ({singleTeacher, setSingleTeacher, setEditTeacherModel}) => {
    
    const [ name, setName] = useState(singleTeacher?.name)
    const [password, setPassword] = useState("")

    const updateTeacherHandler = async (e) => {
        e.preventDefault();
        try{
            const id = singleTeacher?.id
            const res = await axios.put(`/api/admin/updateTeacher`, {id,name, password},{
                withCredentials: true
            })
            console.log(res)
            setEditTeacherModel(false)
            setSingleTeacher(null)
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="absolute top-0 left-96 w-[40vw] h-[57vh] bg-black rounded-md border-white border-2 p-10">
            <form onSubmit={updateTeacherHandler} className='flex flex-col gap-5 items-center relative'>
                <div className='flex flex-col w-[400px] gap-2'>
                <label htmlFor="id">ID</label>
              <input type="text" value={singleTeacher?.id} className='outline-none border-2 border-white bg-[#3d3d3d] px-3 py-1 rounded' />
                </div>
                <div className='flex flex-col w-[400px] gap-2'>
                <label htmlFor="name">Name</label>
              <input type="text" value={name} className='outline-none border-2 border-white bg-[#3d3d3d] px-3 py-1 rounded' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='flex flex-col w-[400px] gap-2'>
                <label htmlFor="password">Password</label>
              <input type="text" value={password} className='outline-none border-2 border-white bg-[#3d3d3d] px-3 py-1 rounded' onChange={(e) => setPassword(e.target.value)} />
                </div>
            <button type='submit' className='bg-blue-500 px-4 py-3 rounded hover:scale-95 transition-transform'>Update Teacher</button>
            <button onClick={() => setEditTeacherModel(false)} className='absolute top-2 right-2 text-xl bg-red-500 py-1 px-3 rounded-md hover:scale-95 transition-transform'>X</button>
            </form>
        </div>
  )
}

export default EditTeacher