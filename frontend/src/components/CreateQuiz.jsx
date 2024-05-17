import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateQuiz = ({teacherId, setIsCreateClicked}) => {
 
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);


  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { question: '', answer: '' }]);
    }
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      // Perform validation
      if (!teacherId || !title || questions.some(q => !q.question || !q.answer)) {
        alert('Please fill in all fields for quiz creation.');
        return;
      }

      // Send data to backend
      const response = await axios.post('/api/teacher/createQuiz', {
        teacher: teacherId,
        title,
        questions
      });

      console.log('Quiz created:', response.data);
      toast.success("Quiz created successfully");
      setTimeout(() => {
        setIsCreateClicked(false);
      },1000)
     
      // Optionally, you can navigate to another page or perform other actions upon successful quiz creation
    } catch (error) {
      console.error('Quiz creation failed:', error);
      toast.error("Failed to create quiz");
    }
  };

  return (
    <div>
   
   
        <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white !important p-8 rounded-lg'>
            <h2 className='text-2xl bg-white text-black text-center font-semibold mb-4'>Create Quiz</h2>
            <label className='block mb-4 bg-white text-black text-xl'>
              Teacher ID:
              <input type="text" disabled value={teacherId} className='ml-5 px-2 py-1 bg-[#eee] outline-none border-[#a3a2a2] border-2 rounded-md'  />
            </label>
            <label className='block mb-4 bg-white text-black text-xl'>
              Title:
              <input type="text" value={title} className='ml-20 px-2 py-1 w-[50vw] bg-[#eee] outline-none border-[#a3a2a2] border-2 rounded-md' onChange={e => setTitle(e.target.value)} />
            </label>
            {questions.map((question, index) => (
              <div key={index} className='mb-4 bg-white'>
                <label className='block mb-4 bg-white text-black text-xl'>
                  Question {index + 1}:
                  <input type="text" value={question.question} className='ml-5 px-2 py-1 bg-[#eee] w-[50vw] outline-none border-[#a3a2a2] border-2 rounded-md' onChange={e => handleQuestionChange(index, 'question', e.target.value)} />
                </label>
                <label className='block mb-4 bg-white text-black text-xl'>
                  Answer:
                  <input type="text" value={question.answer}  className='ml-12 px-2 py-1 bg-[#eee] w-[50vw] outline-none border-[#a3a2a2] border-2 rounded-md' onChange={e => handleQuestionChange(index, 'answer', e.target.value)} />
                </label>
              </div>
            ))}
           <div className='flex bg-white items-center justify-between px-2'>
           {questions.length < 5 && <button className='text-black text-lg bg-blue-500 px-3 py-1 rounded-md hover:scale-95 transition-transform' onClick={handleAddQuestion}>Add Question</button>}
            <button className='ml-4 text-black text-lg bg-green-500 px-3 py-1 rounded-md hover:scale-95 transition-transform' onClick={() =>  handleSubmit()}>Create Quiz</button>
            <button onClick={() => setIsCreateClicked(false)} className='ml-4 text-lg text-white bg-red-600 px-3 py-1 rounded-md hover:scale-95 transition-transform' >Cancel</button>
           </div>
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
  );
};

export default CreateQuiz;
