import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import ReviewCard from '../Components/ReviewCard';

const HostelReviewForm = () => {

    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const [allForms,setAllForms]=useState([]);

    const getAllSavedForms =async()=>{
        try{
            const response = await fetch('http://localhost:7000/hostel/registration/saved', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                const result = await response.json();
                console.log(result);
                setAllForms(result);
            }
        }
        catch(err){
            alert(err);
        }
    }

    useEffect(()=>{
        getAllSavedForms();
    },[])
  
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
        <div className="w-full bg-defaultBg top-0">
          {/* Header */}
            <div className='w-full flex justify-center h-1/2 pt-10' >
              <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                  {/* content */}
                  <div className='w-1/2 flex flex-col ml-5'>
                      <div className='w-full mt-5'>
                          <p className='font-popins text-2xl font-semibold '>Hostel Management Software</p>
                      </div>
                      <div className='w-full mt-1'> 
                          <p className='font-popins text-lg font-medium text-orange-500 '>Saved Hostel registration Forms</p>
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

            <div className='w-full flex justify-center'>
               <div className='w-11/12'> {allForms.map((item, index) => (<ReviewCard data={item}/>))}</div>
            </div>

          </div>
    );
  };
  

export default HostelReviewForm