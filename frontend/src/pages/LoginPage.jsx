import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isSuccess }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
        toast.success("Welcome to CodeSync");
        setTimeout(() => {
            navigate("/dashboard")
          }, 2000);
     

    }
  }, [navigate, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();
    if(!id || !password){
        toast.error("Please enter all fields")
        return
    }
 
    try {
      const res = await login({ id, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000);
     
    } catch (error) {
      console.log(error?.data?.message || error?.error);
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="">
      <div className="text-white max-w-[1000px] mx-auto flex flex-col gap-10 items-center justify-center">
        <div>
          <h1 className="text-6xl overflow-hidden font-bold">
            Welcome to CodeSync
          </h1>
        </div>
        <form
          className="flex flex-col gap-5 w-[500px] items-center overflow-hidden"
          onSubmit={loginHandler}
        >
          <div className="flex flex-col gap-3 w-[400px]">
            <label htmlFor="id" className="text-xl font-bold">
              ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
              name="id"
              id="id"
              className="bg-[#545454] outline-none p-2 rounded-md text-white"
            />
          </div>
          <div className="flex flex-col gap-3 justify-center w-[400px]">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <div className="flex items-center bg-[#545454] justify-between pr-2 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                name="password"
                id="password"
                className="outline-none p-2 rounded-md text-white bg-[#545454]"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="text-blue-500 bg-transparent cursor-pointer"
                  color="blue"
                  size={20}
                  onClick={togglePasswordVisibility}
                  aria-label="Hide password"
                />
              ) : (
                <FaEye
                  className="text-blue-500 bg-transparent cursor-pointer"
                  size={20}
                  onClick={togglePasswordVisibility}
                  aria-label="Show password"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 px-10 py-2 rounded-md text-lg hover:scale-95 transition-transform"
          >
            Login
          </button>
        </form>
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
  );
};

export default Login;
