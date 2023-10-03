import React, {useEffect, useState} from 'react';
import DashboardImg from '../assets/images/DashboardImg.svg'

const DashBoardBanner = () => {
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
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString(undefined, options);
  };
  const formatTime = (date) => {
    const options = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return date.toLocaleTimeString(undefined, options);
  };
  
  return (<div className='flex flex-col w-full bg-defaultBg '>
    {/* Header */}
    <div className='w-full flex justify-center h-1/2 mt-10'>
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
            <p className='font-popins text-ms '>👋🏻 Hello <p className='inline font-bold'>Rajesh</p>, Welcome to your
              dashboard 🎉
            </p>
          </div>
          <div className='w-full mt-0.5 mb-5'>
            <p className='font-popins text-ms '>🗓️ {currentDate} | 🕛 {currentTime}</p>
          </div>
        </div>
        
        {/* Image */}
        <div className='w-1/2 flex justify-end mr-5 '>
          <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
        </div>
      </div>
    </div>
  </div>)
}

export default DashBoardBanner;
