import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import ReviewCard from '../Components/ReviewCard';
import HostelRegistration from '../Pages/HostelRegistration';

const HostelReviewForm = () => {

    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const [FormData1,setFormData1]=useState(null);
    const [ShowForm,setShowForm]=useState(false);

    const [allForms,setAllForms]=useState([]);
    const [edit2,setEdit2]=useState(false);
    const [display,setDisplay]=useState(false);


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
        <div className="w-full bg-defaultBg top-0 rounded-lg">
          
        {!ShowForm && !edit2 && !display &&
            <div className='w-full flex justify-center'>
            <div className='w-11/12 rounded-lg'> {allForms.map((item, index) => (<ReviewCard data={item} setShowForm={setShowForm} setFormDataOut={setFormData1} setEdit2={setEdit2} setDisplay={setDisplay}/>))}</div>
            </div>
        }
        {ShowForm && <HostelRegistration ExistingFormData={FormData1} op={1}/>}
        {edit2 && <HostelRegistration ExistingFormData={FormData1} op={2}/> }
        {display && <HostelRegistration ExistingFormData={FormData1}op={3}/>}
          </div>
    );
  };
  

export default HostelReviewForm