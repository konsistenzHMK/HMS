import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import Modal from 'react-modal';
import axios from 'axios';
import { useLocation } from "react-router-dom";


const RoomAllocation = () => {
    const [formData, setFormData] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [allStudents, setAllStudent] = useState([]);

    const { state } = useLocation();

    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:7000/get_students_for_room_allocation?hostel_id=${state.ans}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("result1", result[1]);
                setAllStudent(result[1]);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        getStudents();
    }, [])

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
    //dropdown
    const handleDropdownStatusType = (event) => {
        // changeroomAlc(event.target.value);
    };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        setErrors(errors);
        return errors;
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setFormData((prevData) => ({
            ...prevData,
            selection_option: option
        }));
    };

    const Prevent = (e) => {
        e.preventDefault();
    }

    const [selectedValues, setSelectedValues] = useState([
        { id: 1, name: 'John', Gender: 'M', Room: '' },
        { id: 2, name: 'Jane', Gender: 'F', Room: '' },
        { id: 3, name: 'Alex', Gender: 'F', Room: '' },
        { id: 4, name: 'Fin', Gender: 'M', Room: '' },
    ]);

    const handleRadioSelect = (id, name, hostel) => {
        if (selectedValues.some((value) => value.id == id)) {
            setSelectedValues(selectedValues.filter((value) => value.id !== id));
        } else {
            setSelectedValues([...selectedValues, { id, name, hostel }]);
        }
    };
    // console.log(selectedValues);

    const tableData = [
        { id: 1, name: 'John', Gender: 'M', Room: '' },
        { id: 2, name: 'Jane', Gender: 'F', Room: '' },
        { id: 3, name: 'Alex', Gender: 'F', Room: '' },
        { id: 4, name: 'Fin', Gender: 'M', Room: '' },
    ];

    // console.log("State",state);
    return (
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                <form >
                    <div className='w-full flex justify-center h-1/2 pt-10' >
                        <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                            {/* content */}
                            <div className='w-1/2 flex flex-col ml-5'>
                                <div className='w-full mt-5'>
                                    <p className='font-popins text-2xl font-semibold '>Hostel Management Software</p>
                                </div>
                                <div className='w-full mt-1'>
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Admin Dashboard</p>
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
                    {/* Header */}

                    {/* Form Data */}
                    <div className='flex flex-col w-full h-screen bg-defaultBg'>
                        <div className='w-full flex justify-center  mt-10' >
                            <div className='flex flex-row w-11/12 h-full bg-white rounded-lg drop-shadow-lg'>
                                <div className='w-full flex flex-col ml-5'>
                                    <div className='w-full flex mt-4'>
                                        <div className='w-3/4 flex-col '>
                                            <div><p className='text-black font-semibold text-2xl font-popins'>Student List</p></div>
                                            <div><p className='text-base font-popins text-orange-500'>List of students those who needs to be allotted the room </p></div>
                                        </div>
                                        <div className='w-1/4'>
                                            {/* Back */}
                                        </div>
                                    </div>
                                    <div className='m-5'>
                                        <table border="1" className='w-full font-popins'>
                                            <thead className='bg-slate-100 rounded-r-lg rounded-l-lg h-14'>
                                                <tr>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>ID</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Name</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Gender</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Select Room</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Room</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allStudents.map((item,i) => (
                                                    <tr className={`mt-1 h-12 ${i%2==0 ?'bg-slate-200' : 'bg-slate-100'}`} key={item[0]} >
                                                        <td className='w-1/5 text-center'>{item[0]}</td>
                                                        <td className='w-1/5 text-center'>{item[1] +" "+ item[2]}</td>
                                                        <td className='w-1/5 text-center'>{item[3]}</td>
                                                        <td className='w-1/5 text-cente'><button className='h-8 w-full bg-slate-300' onClick={(e)=>{e.preventDefault()}}>Select the Room</button></td>
                                                        <td className='w-1/5 text-center'><input className='w-2/3' readonly></input></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default RoomAllocation