import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendNewMessage = ({setIsNewMessageClicked}) => {
    const [receiverId, setReceiverId] = useState("");
    const [subject, setSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");
    const {userInfo} = useSelector((state) => state.auth)
    const handleSendMessage = async () => {
    
        try {
          const res = await axios.post("/api/users/sendMessage", {
           sender: userInfo.id,
            receiver: receiverId,
            subject,
            message: messageBody,
          });
          
          toast.success("Message sent successfully");
          // Clear input fields and close modal
          setReceiverId("");
          setSubject("");
          setMessageBody("");
          setTimeout(() => {
            setIsNewMessageClicked(false);
          }, 1000);
          
        } catch (err) {
          console.error("Failed to send message:", err);
          toast.error("Failed to send message");
        }
      };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-700/50 flex items-center justify-center">
    <div className="w-[700px] h-[400px] bg-white rounded-md text-black">
      <h2 className="text-xl font-semibold mb-4 bg-[#eee] py-2 text-black px-4">New Message</h2>
      <div className="flex flex-col gap-4 bg-white px-10">
      <input
        type="text"
        placeholder="To"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="border border-gray-300 bg-white text-black rounded-md outline-none px-4 py-2 mb-4"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border border-gray-300 bg-white text-black rounded-md outline-none px-4 py-2 mb-4"
      />
      <textarea
        placeholder="Message Body"
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
        className="border border-gray-300 bg-white text-black rounded-md outline-none px-4 py-2 mb-4"
      />
      </div>
      <div className="flex bg-white items-center justify-center mt-6 ">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:scale-95 transition-transform"
          onClick={handleSendMessage}
        >
          Send
        </button>
        <button
          className="bg-gray-300 text-gray-800 ml-2 px-4 py-2 rounded-md hover:scale-95 transition-transform"
          onClick={() => setIsNewMessageClicked(false)}
        >
          Cancel
        </button>
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

export default SendNewMessage