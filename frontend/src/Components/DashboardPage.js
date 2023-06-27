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
    <div className='flex flex-col w-full'>
        {/* Header */}
        <div className='w-full flex justify-center h-1/2 mt-10' >
            <div className='flex flex-row w-11/12 h-1/2 bg-defaultBg rounded-lg drop-shadow-lg'>
                {/* content */}
                <div className='w-1/2 flex flex-col ml-5'>
                    <div className='w-full mt-5'>
                        <p className='font-popins text-3xl font-semibold '>Hostel Management Software</p>
                    </div>
                    <div className='w-full mt-1'> 
                        <p className='font-popins text-xl font-medium text-orange-500 '>Rector Dashboard</p>
                    </div>

                    <div className='w-full mt-3'>
                        <p className='font-popins text-lg '>👋🏻 Hello <p className='inline font-bold'>Rajesh</p>, Welcome to your dashboard 🎉</p>
                    </div>
                    <div className='w-full mt-0.5 mb-5'>
                        <p className='font-popins text-lg '>🗓️ {currentDate}  | 🕛 {currentTime}</p>
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
        <div>

        </div>
    </div>
  )
}

export default DashboardPage