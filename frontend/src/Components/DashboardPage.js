import React, { useState, useEffect } from 'react';
import DashboardImg from './DashboardImg.svg'

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();

      const formattedDate = formatDate(date);
      const formattedTime = formatTime(date);

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Helper function to format the date
  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
  };

  // Helper function to format the time
  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className='flex flex-col w-full  bg-defaultBg'>
        {/* Header */}
        <div className='w-full flex justify-center h-1/2 mt-10' >
            <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                {/* content */}
                <div className='w-1/2 flex flex-col ml-5'>
                    <div className='w-full mt-5'>
                        <p className='font-popins text-2xl font-semibold '>Hostel Management Software</p>
                    </div>
                    <div className='w-full mt-1'> 
                        <p className='font-popins text-lg font-medium text-orange-500 '>Rector Dashboard</p>
                    </div>

                    <div className='w-full mt-3'>
                        <p className='font-popins text-ms '>👋🏻 Hello <p className='inline font-bold'>Rajesh</p>, Welcome to your dashboard 🎉</p>
                    </div>
                    <div className='w-full mt-0.5 mb-5'>
                        <p className='font-popins text-ms '>🗓️ {currentDate}  | 🕛 {currentTime}</p>
                    </div>
                </div>

                {/* Image */}
                <div className='w-1/2 flex justify-end mr-5 '>
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
        </div>
        {/* 2 Layouts */}
        <div>

        </div>


        {/* Quick Links */}
        <div className='flex justify-center mt-10 mb-64'>
            <div className='w-11/12 flex flex-col'>

            <div className='w-full'>
                <p className='font-popins text-xl '>📌 Quick Clicks</p>
            </div>

            <div className='w-full mt-3 ml-6 flex justify-start'>
                <a href='http://localhost:3000/hostel-Registration'>
                <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full'>
                    <p className='font-popins text-normal'>+ Add Hostel</p>
                </button>
                </a>

                <a href='http://localhost:3000/student-Registration'>
                <button className='bg-defaultBg w-36 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'>
                    <p className='font-popins text-normal'>+ Add Student</p>
                </button>
                </a>

                <a href='http://localhost:3000/tower-Registration'>
                <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'>
                    <p className='font-popins text-normal'>+ Add Tower</p>
                </button>
                </a>

                <a href='http://localhost:3000/wing-Registration'>
                <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'>
                    <p className='font-popins text-normal'>+ Add Wing</p>
                </button>
                </a>

                <a href='http://localhost:3000/room-Registration'>
                <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'>
                    <p className='font-popins text-normal'>+ Add Room</p>
                </button>
                </a>
            </div>

            </div>
        </div>
    </div>
  )
}

export default DashboardPage