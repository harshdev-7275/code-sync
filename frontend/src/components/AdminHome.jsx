import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';


const AdminHome = ({ teachers }) => {
  const teacherCount = teachers.length;
  const maxValue = 100; // You might want to adjust this based on your needs

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="">
      <div className="max-w-[1000px] flex items-center ml-20">
        <div className="flex items-center justify-center mr-60 gap-20 mb-10">
          <div className="w-[150px] flex flex-col items-center gap-5">
            <CircularProgressbar
              value={(teacherCount / maxValue) * 100}
              maxValue={100}
              text={`${((teacherCount / maxValue) * 100).toFixed(2)}%`}
            />
            <h1 className="text-xl">{teacherCount} Teachers</h1>
          </div>
         
          <div className="w-[150px] flex flex-col items-center gap-5">
          <CircularProgressbar
              value={(teacherCount / maxValue) * 100}
              maxValue={100}
              text={`${((teacherCount / maxValue) * 100).toFixed(2)}%`}
            />
           <h1 className="text-xl">{teacherCount} Teachers</h1>
          </div>
        </div>
        <Calendar className={"mx-auto text-white bg-white rounded-md mt-10"} onChange={setSelectedDate} value={selectedDate} />
      </div>
    </div>
  );
};

export default AdminHome;
