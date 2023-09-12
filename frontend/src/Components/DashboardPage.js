import React, { useState, useEffect } from 'react';
import DashboardImg from './DashboardImg.svg'
import {
    useNavigate,
} from 'react-router-dom';

const DashboardPage = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const navigate = useNavigate();

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


    const [hostelID, setHostelID] = useState(null);
    const [ans, setAns] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = (event) => {
        event.preventDefault();
        setShowPopup(!showPopup);
    };

    const fetchAllHostel = async () => {
        try {
            const response = await fetch("http://localhost:7000/gethostel_id/where/status_active", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("result", result);
                setHostelID(result);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        fetchAllHostel()
    }, [])

    const HandleHostelNavigator = () => {
        setShowPopup(true);
    }

    const onClicKEvent = (ele) => {
        setShowPopup(false);
        setAns(ele[0]);
        navigate('/room-Allocation')
    }
    let color=true;
    let lastColor=false;
    const Popup = () => {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 flex-col">
                <div className='bg-white w-1/3 h-16 flex flex-col justify-center'>
                    <p className='font-popins text-3xl font-medium text-orange-500 text-center'>Hostel Name</p>
                </div>
                <div className="bg-white rounded-lg  w-1/3 h-1/2 flex flex-col">
                    <div className='w-full flex flex-row h-1/2 flex-wrap'>
                        {hostelID.map((ele, i) => {
                            if(i%2==0){ 
                                color=lastColor;
                                lastColor=!lastColor;
                            }
                            else color=!color
                            return (
                                <div className={`w-1/2 h-full ${color==true ? 'bg-slate-100' : 'bg-slate-400'}  flex flex-col justify-center`}>
                                    <button className='font-popins text-2xl font-medium text-black ' onClick={async() => {
                                        setShowPopup(false);
                                        navigate('/room-Allocation',{
                                            state:{
                                                ans:ele[0]
                                            }
                                        })
                                    }}>{ele[1]}</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={togglePopup}
                >
                    Close
                </button>
            </div>
        );
    };

    return (
        <div className='flex flex-col w-full bg-defaultBg'>
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
                        <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4' />
                    </div>
                </div>
            </div>
            {/* 2 Layouts */}
            <div>
                {showPopup ? <Popup /> : null}
            </div>

            {/* Quick Links */}
            <div className='flex justify-center mt-10 mb-64'>
                <div className='w-11/12 flex flex-col'>

                    <div className='w-full'>
                        <p className='font-popins text-xl '>📌 Quick Clicks</p>
                    </div>

                    <div className='w-full mt-3 ml-6 flex justify-start'>

                        <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full'
                            onClick={() => { navigate('/hostel-Registration') }}
                        >
                            <p className='font-popins text-normal'>+ Add Hostel</p>
                        </button>


                        <button className='bg-defaultBg w-36 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                            onClick={() => { navigate('/student-Registration') }}
                        >
                            <p className='font-popins text-normal'>+ Add Student</p>
                        </button>

                        <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                            onClick={() => { navigate('/tower-Registration') }}
                        >
                            <p className='font-popins text-normal'>+ Add Tower</p>
                        </button>

                        <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                            onClick={() => { navigate('/wing-Registration') }}
                        >
                            <p className='font-popins text-normal'>+ Add Wing</p>
                        </button>


                        <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                            onClick={() => { navigate('/room-Registration') }}
                        >
                            <p className='font-popins text-normal'>+ Add Room</p>
                        </button>

                    </div>
                    <div className='w-full mt-3 ml-6 flex justify-start'>

                        <button className='bg-defaultBg w-96 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full'
                            onClick={HandleHostelNavigator}
                        >
                            <p className='font-popins text-normal'>+ Room Allocation</p>
                        </button>

                    </div>
                    <div className='w-full mt-3 ml-6 flex justify-start'>

                        <button className='bg-defaultBg w-96 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full'
                            onClick={() => { navigate('/hostel-FormReview') }}
                        >
                            <p className='font-popins text-normal'>+ Review Hostel Registrations</p>
                        </button>

                    </div>
                    <div className='w-full mt-3 ml-6 flex justify-start'>

                        <button className='bg-defaultBg w-96 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full'
                            onClick={() => { navigate('/student-FormReview') }}
                        >
                            <p className='font-popins text-normal'>+ Review Student Registartions</p>
                        </button>

            </div>

                </div>
            </div>
        </div>
    )
}

export default DashboardPage