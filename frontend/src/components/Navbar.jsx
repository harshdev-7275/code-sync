import React from 'react'
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';


const Navbar = () => {
  const {userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall, {error}] = useLogoutMutation()

  const logoutHandler=async(e)=>{
    e.preventDefault()
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      toast.success("Logout SuccessFully")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      console.log(error?.data?.message || error?.error);
      toast.error(error?.data?.message || "An error occurred");
    }
  }
  return (
    <nav className='max-w-[1400px] mx-auto py-10'>
    <div className='flex justify-between items-center'>
    <div>
          <img src={logo} alt="" width={90} height={90} />
      </div>
      <Link className="flex justify-center items-center">
        {userInfo ? <button className='bg-blue-500 px-6 py-2 rounded-md hover:scale-95 transition-transform' onClick={logoutHandler}>Logout</button> : <FaUser size={32} />}
      </Link>
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
    </nav>
  )
}

export default Navbar