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
    const { state } = useLocation();
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
                    <div className='flex flex-col w-full  bg-defaultBg'>
                        <div className='w-full flex justify-center h-1/2 mt-10' >
                            <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                                <div className='w-1/2 flex flex-col ml-5'>
                                    <div className='w-full mt-5'>
                                        <p className='font-popins text-2xl font-semibold '>Hostel Room Allocation</p>
                                    </div>

                                    <table border="1">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Gender</th>
                                                <th>Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {data.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.gender}</td>
                                                    <td>{item.room}</td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </table>
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