import React, { useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import Modal from 'react-modal';

const RoomAllocation = () => {
    const [formData, setFormData] = useState({});
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [showPopup, setShowPopup] = useState(false);


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
        { id: 1, name: 'John', Gender: 'M' , Room:''},
        { id: 2, name: 'Jane',  Gender: 'F' , Room:'' },
        { id: 3, name: 'Alex',  Gender: 'F' , Room:'' },
        { id: 4, name: 'Fin',  Gender: 'M' , Room:'' },
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
        { id: 1, name: 'John', Gender: 'M' , Room:''},
        { id: 2, name: 'Jane',  Gender: 'F' , Room:'' },
        { id: 3, name: 'Alex',  Gender: 'F' , Room:'' },
        { id: 4, name: 'Fin',  Gender: 'M' , Room:'' },
    ];
    
    const togglePopup  = (event) => {
        event.preventDefault();
        setShowPopup(!showPopup);
    };
    const Popup = ({ onClose }) => {
        return (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 flex-col">
            <div className='bg-white w-1/3 h-16 flex flex-col justify-center'>
                <p className='font-popins text-3xl font-medium text-orange-500 '>Hostel Name</p>
            </div>
            <div className="bg-white rounded-lg  w-1/3 h-1/2 flex flex-col">
              <div className='w-full flex flex-row h-1/2'>
                <div className='w-1/2 h-full bg-slate-100 flex flex-col justify-center'>
                    <p className='font-popins text-2xl font-medium text-black '>Tagor House</p>
                </div>
                <div className='w-1/2 h-full bg-slate-400 flex flex-col justify-center'>
                    <p className='font-popins text-2xl font-medium text-black '>Danbad House</p>
                </div>
              </div>
              <div className='w-full flex flex-row h-1/2'>
              <div className='w-1/2 h-full bg-slate-400 flex flex-col justify-center'>
                    <p className='font-popins text-2xl font-medium text-black '>Vishvanathan Anand House</p>
                </div>
                <div className='w-1/2 h-full bg-slate-100 flex flex-col justify-center'>
                    <p className='font-popins text-2xl font-medium text-black '>Miraj House</p>
                </div>
              </div>
            </div>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={onClose}
                >
                Close
            </button>
          </div>
        );
      };

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
                    <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
                        <div className="bg-white w-11/12 h-auto mt-5 border-none rounded-lg flex justify-center font-popins mb-12 flex-col">

                            {/* 1 */}
                            <div className='w-full flex mb-10 '>
                                {/* Header*/}
                                <div className='flex-col pl-5  '>
                                    <div className='w-full mt-3'>
                                        <p className='font-popins text-2xl font-bold '>Student List</p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='font-popins text-lg font-medium text-orange-500 '>List of students those who needs to Room Allocation </p>
                                    </div>
                                </div>
                            </div>


                            <div className='w-full flex justify-center mb-10'>
                            <div className='w-11/12 bg-gray-200 mt-3'>
                                <table className='w-full '>
                                    <thead>
                                        <tr className='w-full'>
                                            <th className='w-1/4 h-14 align-middle text-orange-500 ml-5 font-popins text-lg '><p className=''>Select Student </p></th>
                                            <th className='w-1/4 h-14 align-middle text-orange-500 font-popins text-lg' ><p className='mr-20'>Gender </p></th>
                                            <th className='w-1/4 h-14 align-middle text-orange-500 font-popins text-lg'><p className=''>Select Rooms </p></th>
                                            <th className='w-1/4 h-14 align-middle text-orange-500 font-popins text-lg'><p className='mr-20'>Selected Room </p></th>
                                        </tr>
                                    </thead>
                                    <tbody className='w-full'>
                                        {tableData.map((row) => (
                                            <tr key={row.id} className={`step ${row.id%2 ? 'w-full bg-gray-200 justify-around' : 'w-full bg-gray-100'}`}>
                                                <td
                                                    className='w-1/4'
                                                >
                                                    <p className='ml-20 text-sm'>{row.name}</p>  </td>
                                                <td
                                                    className='w-1/4'
                                                >
                                                   <p className='ml-20 text-sm font-semibold'>{row.Gender}</p>  </td>
                                                <td
                                                    className='w-1/4 text-center align-middle h-16'
                                                >
                                                    <button className='bg-gray-300 h-8 w-44' onClick={togglePopup}>
                                                        Select Room
                                                    </button>
                                                    {showPopup && <Popup onClose={togglePopup}/>}

                                                </td>
                                                <td> 
                                                    <p className='bg-slate-50 h-8 w-40'>
                                                        {row.Room}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>

                            <div className='w-full flex justify-end' >
                                <div className='w-96 flex flex-col justify-center mr-10'>
                                    <button className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                                        Save selected student and Continue
                                    </button>
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