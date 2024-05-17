import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { RiSpam2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux'

import axios from "axios";
import Message from "./Message";
import SendNewMessage from "./SendNewMessage";

const Messages = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isNewMessageClicked, setIsNewMessageClicked] = useState(false);
  const [viewSent, setViewSent] = useState(false); // State to track whether viewing sent messages

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let url = "/api/users/getAllMessages";
      if (viewSent) {
        url = "/api/users/getSentMessages"; // Assuming you have an endpoint for fetching sent messages
      }
      const res = await axios.get(url, { withCredentials: true });
      setMessages(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [viewSent]); // Fetch messages when viewSent changes

  return (
    <div className="absolute top-0 left-[25%] overflow-y-hidden">
      <h1 className="text-4xl font-medium flex gap-1">
        {viewSent ? "Sent" : "Inbox"}{" "}
        <span className="flex gap-1 text-md font-thin">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </h1>
      <div className="mt-10">
        <div className="flex items-center gap-2 border border-slate-500 px-4 w-[65vw] rounded-md">
          <label>
            <IoMdSearch size={32} />
          </label>
          <input
            type="text"
            placeholder="Search"
            className="outline-none py-4"
          />
        </div>
        <div className="flex items-center gap-10 mt-10 border border-slate-400 w-[500px] justify-around rounded-md">
          <button
            onClick={() => setIsNewMessageClicked(true)}
            className="text-lg w-[50%] py-5 hover:bg-white hover:text-black transition-colors rounded-s-md"
          >
            Send New Message
          </button>
          <button
            onClick={() => setViewSent(!viewSent)} // Toggle between Inbox and Sent view
            className="text-lg w-[50%] py-5 hover:bg-blue-500 hover:text-white transition-colors rounded-s-md"
          >
            {viewSent ? "Inbox" : "Sent"}
          </button>
        </div>
        <div className="border-t border-slate-500 pt-6">
          <div className="flex flex-col gap-1 ml-10">
            {loading ? (
              <p>Loading...</p>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            ) : (
              <div className="flex items-center justify-center mt-10">
                <h1 className="text-4xl">No Messages</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      {isNewMessageClicked && (
        <SendNewMessage setIsNewMessageClicked={setIsNewMessageClicked} />
      )}
      <ToastContainer
        className={"bg-transparent"}
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

export default Messages;
