import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Message = ({ message, setIsDelete }) => {
    const [senderDetails, setSenderDetails] = useState(null);
    const [receiverDetails, setReceiverDetails] = useState(null);

    const fetchSender = async (id) => {
        try {
            const res = await axios.get(`/api/users/getSingleUser/${id}`, {
                withCredentials: true,
            });
            setSenderDetails(res.data);
            
        } catch (err) {
            console.log(err);
        }
    }
    const fetchReceiver = async (id) => {
        try {
            const res = await axios.get(`/api/users/getSingleUser/${id}`, {
                withCredentials: true,
            });
            setReceiverDetails(res.data);
            
        } catch (err) {
            console.log(err);
        }
    }

    const formatDate = (createdAt) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(createdAt).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        fetchSender(message.sender);
        fetchReceiver(message.receiver);
    }, [message.sender]);

    const deleteMessageHandler = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return; // If user cancels, do nothing
        
        try {
            const res = await axios.delete(`/api/users/deleteMessage/${id}`, {
                withCredentials: true,
            });
            toast.success("Message deleted successfully");
            console.log(res.data);
            
            setIsDelete(true); 
        
        } catch (err) {
            console.log(err);
            
        }
    }

    return (
        <div className='mt-10 mb-4 py-6 shadow shadow-white px-5 hover:scale-105 overflow-hidden transition-transform hover:shadow-blue-500 hover:shadow-lg rounded-md hover:border-b-white hover:border-b-2 cursor-pointer ml-10 w-[1100px]'>
            {senderDetails && (
                <div className='flex items-center justify-start gap-[10rem]'>
                   <p className='text-lg font-medium'>{senderDetails.name}</p>
                   <p className='text-ellipsis w-[200px]'>{message.message}</p>
                   <p>Date: {formatDate(message.createdAt)}</p>
                   <div className='flex gap-4'>
                    <button className='hover:text-black hover:bg-white px-2 py-1 border-none bg-blue-600 rounded-md'>Open</button>
                    <button className='bg-red-600 px-2 py-1 rounded-md' onClick={() => deleteMessageHandler(message._id)}>Delete</button>
                   </div>
                </div>
            )}
        </div>
    )
}

export default Message;
