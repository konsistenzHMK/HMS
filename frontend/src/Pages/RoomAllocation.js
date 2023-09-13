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
    const [allRooms, setAllRooms] = useState(null);
    const [allStudentRoomMap,setAllStudentRoomMap]=useState(null);

    const { state } = useLocation();

    const getStudentsRoomMap = async () => {
        try {
            const response = await fetch(`http://localhost:7000/get_allocated_students_for_room_allocation?hostel_id=${state.ans}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Map", result);
                setAllStudentRoomMap(result);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    const getStudents = async () => {
        try {
            const response = await fetch(`http://localhost:7000/get_students_for_room_allocation?hostel_id=${state.ans}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("result1", result);
                setAllStudent(result[1]);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    const getRooms = async () => {
        try {
            const response = await fetch(`http://localhost:7000/get_room_details_for_room_allocation?hostel_id=${state.ans}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Rooms", result);
                setAllRooms(result);
                // setAllStudent(result[1]);
            }
        }
        catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        getStudents();
        getRooms();
        getStudentsRoomMap();
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


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    let color = true;
    let lastColor = false;
    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const togglePopupButton = (event) => {
        event.preventDefault();
        setShowPopup(!showPopup);
    };
    // const handleRoomClickForStudent=()=>{

    // }
    const Popup = () => {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 flex-col">
                <div className='bg-white w-1/3 h-16 flex flex-col justify-center'>
                    <p className='font-popins text-3xl font-medium text-orange-500 text-center'>Rooms</p>
                </div>
                <div className="bg-white rounded-lg  w-1/3 h-1/2 flex flex-col">
                    <div className='w-full flex flex-row h-1/2 flex-wrap'>
                        {allRooms.map((ele, i) => {
                            if (i % 2 == 0) {
                                color = lastColor;
                                lastColor = !lastColor;
                            }
                            else color = !color
                            return (
                                <button 
                                    className={`w-1/2 h-full ${color == true ? 'bg-slate-100' : 'bg-slate-400'}  flex flex-col justify-center`}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                
                                        const previous_room_id=allStudentRoomMap[currentStudent]?.room_id;
                                        const current_room_id=ele.room_id;

                                        console.log('previous_room_id',previous_room_id);

                                        
                                        setAllStudentRoomMap((prevData) => ({
                                            ...prevData,
                                            [currentStudent]: {
                                                'room_id':ele.room_id,
                                                'room_no':ele.room_no
                                            }
                                        }));
                                        
                                        if(previous_room_id){
                                            console.log("worked0")
                                            allRooms.forEach((ele,i)=>{
                                                if(ele.room_id==previous_room_id){
                                                    console.log("worked1")
                                                    if(ele.pending_capacity){

                                                        
                                                        let outerCopy=[...allRooms];
                                                        let innerCopy=ele;
                                                        console.log("worked2")
                                                        
                                                        let num=Number(innerCopy.pending_capacity)
                                                        // innerCopy.pending_capacity-=1;
                                                        num-=1;
                                                        num.toString();
                                                        innerCopy.pending_capacity=num;
                                                        outerCopy[i]=innerCopy;
                                                        setAllRooms(outerCopy);
                                                    }
                                                }
                                            })
                                        }
                                        if(current_room_id){
                                            allRooms.forEach((ele)=>{
                                                if(ele.room_id==current_room_id){
                                                    if(ele.pending_capacity){
                                                        let outerCopy=[...allRooms];
                                                        let innerCopy=ele;
    
                                                        let num=Number(innerCopy.pending_capacity)
                                                        // innerCopy.pending_capacity-=1;
                                                        num+=1;
                                                        num.toString();
                                                        innerCopy.pending_capacity=num;
                                                        outerCopy[i]=innerCopy;
    
                                                        setAllRooms(outerCopy);
                                                    }
                                                    else{
                                                        let outerCopy=[...allRooms];
                                                        let innerCopy=ele;
    
                                                        let num=0
                                                        // innerCopy.pending_capacity-=1;
                                                        num+=1;
                                                        num.toString();
                                                        innerCopy.pending_capacity=num;
                                                        outerCopy[i]=innerCopy;
    
                                                        setAllRooms(outerCopy);
                                                    }
                                                }
                                            })
                                        }

                                        console.log(allStudentRoomMap);
                                        console.log(allRooms);
                                        
                                        togglePopup();
                                    }}
                                >
                                   <div className='w-full flex justify-center'>Room No : {ele.room_no}</div>
                                   <div className='w-full flex justify-center'>Occupied : {ele.pending_capacity==undefined ? 0 : ele.pending_capacity}/{ele.room_capacity}</div>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <button
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={togglePopupButton}
                >
                    Close
                </button>
            </div>
        );
    };

    const tableData = [
        { id: 1, name: 'John', Gender: 'M', Room: '' },
        { id: 2, name: 'Jane', Gender: 'F', Room: '' },
        { id: 3, name: 'Alex', Gender: 'F', Room: '' },
        { id: 4, name: 'Fin', Gender: 'M', Room: '' },
    ];

    // console.log("State",state);

    const [currentStudent,setCurrentStudent]=useState(null);

    const inClickButton=(item)=>{

    }
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
                                    {showPopup? <Popup />:null}
                                    <div className='m-5 '>
                                        <table border="1" className='w-full font-popins rounded-2xl'>
                                            <thead className='bg-slate-100 h-14'>
                                                <tr>
                                                    <th className='w-1/5 text-center text-xl text-orange-400 '>ID</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Name</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Gender</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Select Room</th>
                                                    <th className='w-1/5 text-center text-xl text-orange-400'>Room</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allStudents.map((item, i) => (
                                                    <tr className={`mt-1 h-12 ${i % 2 == 0 ? 'bg-slate-200' : 'bg-slate-100'} `} key={item[0]} >
                                                        <td className='w-1/5 text-center'>{item[0]}</td>
                                                        <td className='w-1/5 text-center'>{item[1] + " " + item[2]}</td>
                                                        <td className='w-1/5 text-center font-semibold'>{item[3] == 'male' ? 'M' : 'F'}</td>
                                                        <td className='w-1/5 text-cente'><button className='h-8 w-full bg-zinc-300 border rounded-md' onClick={(e) => {
                                                            e.preventDefault();
                                                            setCurrentStudent(item[0].toString());
                                                            togglePopup(true);
                                                        }}>Select the Room</button></td>
                                                        <td className='w-1/5 text-center'>
                                                        <input
                                                            className={`w-2/3 font-semibold text-center ${i % 2 == 0 ? 'bg-slate-200' : 'bg-slate-100'}`}
                                                            readonly
                                                            type="text"
                                                            disabled={true}
                                                            value={allStudentRoomMap[item[0].toString()]?.room_no}
                                                        />
                                                        <button className='text-red-500 font-semibold mb-1' onClick={(e)=>{e.preventDefault()}}>x</button>
                                                        {/* {console.log(allStudentRoomMap[item[0].toString()])} */}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='w-full mt-4 flex justify-end mb-5'>
                                        <div className='w-96 flex mr-5'>
                                            <button className={`h-10 bg-accent2  text-lg font-semibold text-white border-none rounded-2xl mt-5 p-1 w-full`}>
                                                    Save selected student and Continue
                                            </button>
                                        </div>
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