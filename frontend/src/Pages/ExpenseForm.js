import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'
import ExpenseImage from './expenseImage.svg'


const Page1 = ({ currentPage, formData, setFormData, nextPage, setCurrentPage }) => {
    

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


    const handleNextPage = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            nextPage();
        }
        else {
            setErrors(formErrors);
        }
    }
    const changeDateExpense = date => {
        const newDate = date.target.value;
        setFormData((prevData) => ({
            ...prevData,
            doe: newDate
        }));
    }
    const changeDateBooking = date => {
        const newDate = date.target.value;
        setFormData((prevData) => ({
            ...prevData,
            dob: newDate
        }));
    }

    const CalculatePerStudent = () => {
        if (formData.total_amount && formData.total_student > 0) {
            var ans = parseInt(formData.total_amount) / parseInt(formData.total_student)
            return parseInt(ans);
        }
        return "Please Enter Total Expense and No of Students"
    }

    return (
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                <form >
                    {/* Form Data */}
                    <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
                        <div className="bg-white w-11/12 h-auto mt-5 border-none rounded-lg flex justify-center font-popins mb-10">
                            <div className='w-7/12 flex-col pl-5 mb-10'>
                                <div className='w-full mt-5'>
                                    <p className='font-popins text-2xl font-bold '>Student Expenses</p>
                                </div>
                                <div className='w-full'>
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Book your expenses for student.</p>
                                </div>

                                {/* Complete Form */}
                                <form>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Expense Code <p className='inline text-xl text-red-600'>**</p></p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="text"
                                                id="exp_code"
                                                name="exp_code"
                                                value={formData.exp_code}
                                                onChange={handleChange}
                                                placeholder='Select expense code'
                                                className='text-sm h-9 pl-3 text-gray-500 w-11/12 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.exp_code && <span className="error text-red-500">{errors.exp_code}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Expense Name <p className='inline text-xl text-red-600'></p></p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="text"
                                                id="exp_name"
                                                name="exp_name"
                                                value={formData.exp_name}
                                                onChange={handleChange}
                                                placeholder='Select Expense code to see Expense Name'
                                                className='text-sm h-9 pl-3 text-gray-600 w-11/12 border-blue-300 bg-gray-300 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.exp_name && <span className="error text-red-500">{errors.exp_name}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Expense Type <p className='inline text-xl text-red-600'></p></p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="type"
                                                id="exp_type"
                                                name="exp_type"
                                                value={formData.exp_type}
                                                onChange={handleChange}
                                                placeholder='Select Expense code to see Expense Type'
                                                className='text-sm h-9 pl-3 text-gray-600 w-11/12 border-blue-300 bg-gray-300 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.exp_type && <span className="error text-red-500">{errors.exp_type}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Date of Expense <p className='inline text-xl text-red-600'>**</p></p>
                                        </div>
                                        <div className='mt-1 w-full'>
                                            <input
                                                type='date'
                                                selected={formData.doe}
                                                onChange={changeDateExpense}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText='dd/mm/yyyy'
                                                className='text-sm w-100 h-9 pl-3 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.doe && <span className="error text-red-500">{errors.doe}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Date of Booking  <p className='inline text-xl text-red-600'>**</p></p>
                                        </div>
                                        <div className='mt-1 w-full'>
                                            <input
                                                type='date'
                                                value={formData.dob}
                                                onChange={changeDateBooking}
                                                className='text-sm w-100 h-9 pl-3 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.dob && <span className="error text-red-500">{errors.dob}</span>}
                                        </div>
                                    </div>

                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Total Expense Amount <p className='inline text-xl text-red-600'>**</p> </p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="Number"
                                                id="total_amount"
                                                name="total_amount"
                                                value={formData.total_amount}
                                                onChange={handleChange}
                                                placeholder=''
                                                className='text-sm h-9 pl-3 w-11/12 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.total_amount && <span className="error text-red-500">{errors.total_amount}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Voucher Number <p className='inline text-xl text-red-600'>**</p></p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="type"
                                                id="vn"
                                                name="vn"
                                                value={formData.vn}
                                                onChange={handleChange}
                                                placeholder='Enter the Voucher Number as per gov. '
                                                className='text-sm h-9 pl-3 w-11/12 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.vn && <span className="error text-red-500">{errors.vn}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Voucher Amount  <p className='inline text-xl text-red-600'>**</p></p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="type"
                                                id="va"
                                                name="va"
                                                value={formData.va}
                                                onChange={handleChange}
                                                placeholder='Enter the Voucher Amount as per gov.'
                                                className='text-sm h-9 pl-3 w-11/12 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.va && <span className="error text-red-500">{errors.va}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>No. of Student  <p className='inline text-xl text-red-600'>**</p> </p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="type"
                                                id="total_student"
                                                name="total_student"
                                                value={formData.total_student}
                                                onChange={handleChange}
                                                placeholder='Enter No. of student for distribution. '
                                                className='text-sm h-9 pl-3 w-11/12 text-gray-500 border-blue-300 bg-defaultBg rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                            {errors.total_student && <span className="error text-red-500">{errors.total_student}</span>}
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex-col mt-4'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Per Student Amount </p>
                                        </div>
                                        <div className='mt-1 '>
                                            <input
                                                type="type"
                                                id="type"
                                                name="height"
                                                value={CalculatePerStudent()}
                                                className='text-sm h-9 pl-3 text-gray-600 w-11/12 border-blue-300 bg-gray-300 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='w-5/12 bg-blue-100 flex-col justify-end rounded-r-lg'>
                                <div className='flex-col mt-10'>
                                    {/* image */}
                                    <div className='flex justify-center'>
                                        <img src={ExpenseImage} className='h-44 w-44' />
                                    </div>

                                    {/* text */}
                                    <div className='flex justify-center mt-2'>
                                        <p className='font-popins text-2xl font-bold text-gray-600'>Student Expenses</p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className='flex justify-center mt-96'>
                                    <div className='w-60 flex flex-col justify-center mt-36'>
                                        <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Page2 = ({ currentPage, formData, setFormData, nextPage, setCurrentPage }) => {
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


    const handleNextPage = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            nextPage();
        }
        else {
            setErrors(formErrors);
        }
    }
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setFormData((prevData) => ({
            ...prevData,
            selection_option: option
        }));
    };
    return (
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                <form >
                    {/* Form Data */}
                    <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
                        <div className="bg-white w-11/12 h-auto mt-5 border-none rounded-lg flex justify-center font-popins mb-10">
                            <div className='w-7/12 flex-col pl-5 mb-10'>
                                <div className='w-full mt-5'>
                                    <p className='font-popins text-2xl font-bold '>Student Expenses</p>
                                </div>
                                <div className='w-full'>
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Book your expenses for student.</p>
                                </div>
                                {/* Complete Form */}
                                <form>
                                    <div className='w-full h-auto flex-col mt-6'>
                                        <div className=''>
                                            <p className='mb-1 font-popins text-medium '>Select the students for distribution of amount</p>
                                        </div>
                                        <div className='mt-5'>
                                            <div
                                                className={`w-11/12 bg-gray-300 text-lg flex justify-center rounded-xl font-popins ${selectedOption === 'All' ? 'bg-gray-500 text-white' : ''
                                                    } p-4 cursor-pointer`}
                                                onClick={() => handleOptionSelect('All')}
                                            >
                                                <p className='font-popins'>All Students</p>
                                            </div>
                                            <div
                                                className={`w-11/12 mt-3 text-lg bg-gray-300 flex justify-center rounded-xl font-popins ${selectedOption === 'Selected' ? 'bg-gray-500 text-white' : ''
                                                    } p-4 cursor-pointer`}
                                                onClick={() => handleOptionSelect('Selected')}
                                            >
                                                <p className='font-popins'>Selected Students</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='w-5/12 bg-blue-100 flex-col justify-end rounded-r-lg'>
                                <div className='flex-col mt-10'>
                                    {/* image */}
                                    <div className='flex justify-center'>
                                        <img src={ExpenseImage} className='h-44 w-44' />
                                    </div>
                                    {/* text */}
                                    <div className='flex justify-center mt-2'>
                                        <p className='font-popins text-2xl font-bold text-gray-600'>Student Expenses</p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className='flex justify-center mt-6 mb-6'>
                                    <div className='w-60 flex flex-col justify-center'>
                                        <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};


const Page3 = ({ currentPage, formData, setFormData, nextPage, setCurrentPage, previousPage }) => {
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


    const handleNextPage = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            nextPage();
        }
        else {
            setErrors(formErrors);
        }
    }
    const handlePreviousPage = (e) => {
        e.preventDefault();
        previousPage();
    }
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
        { id: 1, name: 'John', hostel: 'Shruti Mam Academy' },
        { id: 2, name: 'Jane', hostel: 'Shruti Mam Academy' },
        { id: 3, name: 'Alex', hostel: 'Rohit  Sir Academy' },
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
        { id: 1, name: 'John', hostel: 'Shruti Mam Academy' },
        { id: 2, name: 'Jane', hostel: 'Shruti Mam Academy' },
        { id: 3, name: 'Alex', hostel: 'Rohit  Sir Academy' },
    ];

    return (
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                <form >
                    {/* Form Data */}
                    <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
                        <div className="bg-white w-11/12 h-auto mt-5 border-none rounded-lg flex justify-center font-popins mb-12 flex-col">

                            {/* 1 */}
                            <div className='w-full flex mb-10 '>
                                {/* Header*/}
                                <div className='w-1/2 flex-col pl-5  '>
                                    <div className='w-full mt-3'>
                                        <p className='font-popins text-2xl font-bold '>Student Expenses</p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='font-popins text-lg font-medium text-orange-500 '>Book your expenses for student </p>
                                    </div>
                                </div>

                                {/* Back Button */}
                                <div className='w-1/2 flex justify-end align-middle'>
                                    <button className='w-2/5 h-10 bg-gray-200 rounded-xl mt-5 mr-20 border-1 border-gray-400' onClick={handlePreviousPage}>Back</button>
                                </div>
                            </div>


                            {/* 2 - Excel Buttons */}
                            <div className='w-full flex-col bg-blue-100 h-28'>
                                <div className='flex justify-center font-popins mt-3'>
                                    <p>Bulk Entry from Microsoft Excel</p>
                                </div>
                                <div className='flex justify-center font-popins w-full mb-5'>
                                    <button className='w-1/4 h-10 bg-gray-300 rounded-xl mt-5 mr-5 border-1 border-gray-400' onClick={Prevent}>Download for Excel</button>
                                    <button className='w-1/4 h-10 bg-gray-300 rounded-xl mt-5 ml-5 border-1 border-gray-400' onClick={Prevent}>Upload from Excel</button>
                                </div>
                            </div>

                            {/* Or text */}
                            <div className='w-full'>
                                <div className='flex justify-center font-popins mt-3 font-extrabold text-xl'>
                                    <p>OR</p>
                                </div>
                            </div>

                            {/* Text */}
                            <div className='w-full'>
                                <div className='flex font-popins mt-3 text-lg justify-start ml-5'>
                                    <p>Select the students whom you want to allocate the amount</p>
                                </div>
                            </div>
                            {/* The Table */}

                            <div className='w-full flex justify-center mb-10'>
                            <div className='w-11/12 bg-grey2 mt-3 border-none rounded-lg'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='w-full'>
                                            <th className='w-1/3 text-left text-orange-500 ml-5 font-popins text-lg h-12 '><p className='ml-20'>Name</p></th>
                                            <th className='w-1/3 text-center text-orange-500 font-popins text-lg' ><p className=''>Student Hostel Name </p></th>
                                            <th className='w-1/3 text-center text-orange-500 font-popins text-lg'><p className=''>Select Student </p></th>
                                        </tr>
                                    </thead>
                                    <tbody className='w-full '>
                                        {tableData.map((row) => (
                                            <tr key={row.id} className={`step ${row.id%2 ? 'w-full bg-gray-200 justify-center' : 'w-full bg-gray-100'}`}>
                                                <td
                                                    className='w-1/3 text-left h-10'
                                                >
                                                    <p className='ml-20 text-sm'>{row.name}</p>  </td>
                                                <td
                                                    className='w-1/3 text-left'
                                                >
                                                   <p className='ml-20 text-sm '>{row.hostel}</p>  </td>
                                                <td
                                                    className='w-1/3 text-center'
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={row.id}
                                                        checked={selectedValues.some((value) => value.id === row.id)}
                                                        onClick={() => handleRadioSelect(row.id, row.name, row.hostel)}
                                                        disabled={formData.selection_option=='All' ? true : false}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>

                            <div className='w-full flex justify-end' >
                                <div className='w-96 flex flex-col justify-center mr-10'>
                                    <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
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
};

const Page4 = ({ currentPage, formData, setFormData, nextPage, setCurrentPage }) => {
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


    const handleNextPage = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            nextPage();
        }
        else {
            setErrors(formErrors);
        }
    }
    const changeDateExpense = date => {
        setFormData((prevData) => ({
            ...prevData,
            doe: date
        }));
    }
    const changeDateBooking = date => {
        setFormData((prevData) => ({
            ...prevData,
            dob: date
        }));
    }

    const CalculatePerStudent = () => {
        if (formData.total_amount && formData.total_student > 0) {
            var ans = parseInt(formData.total_amount) / parseInt(formData.total_student)
            return parseInt(ans);
        }
        return "Please Enter Total Expense and No of Students"
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
          console.log('Form submitted successfully!');
          axios.post('http://localhost:7000/expense/header', formData)
          .then((response) => {
            // alert
            console.log('API response:', response.data);
            alert(response.data);
          })
          .catch((error) => {
            console.error('API request error:', error);
          });
        //   setFormData({
        //     exp_code: '',
        //     exp_name:'',
        //     exp_type:'',
        //     doe: '',
        //     dob:'',
        //     total_amount:'',
        //     vn: '',
        //     va:'',
        //     total_student:'',
        //   });
          setErrors({});
        } else {
          console.log("error");
          setErrors(formErrors);
        }
    };

    return (
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                <form >

                    {/* Form Data */}
                    <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
                        <div className="bg-white w-11/12 h-auto mt-5 border-none rounded-lg flex justify-center font-popins mb-10">
                            <div className='w-7/12 flex-col pl-5 mb-10'>
                                <div className='w-full mt-5'>
                                    <p className='font-popins text-2xl font-bold '>Student Expenses</p>
                                </div>
                                <div className='w-full'>
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Book your expenses for student.</p>
                                </div>

                                {/* Complete Form */}
                                    <div className='w-full h-auto flex mt-4 ml-2'>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Expense Code:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.exp_code}
                                            </div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Expense Name:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.exp_name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex mt-4 ml-2'>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Expense Type:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.exp_type}
                                            </div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Date of Expense:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.doe}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex mt-4 ml-2'>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Date of Booking:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.dob}
                                            </div>
                                        </div>

                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Total Expense Amount:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.total_amount}
                                            </div>
                                        </div>


                                    </div>
                                    <div className='w-full h-auto flex mt-4 ml-2'>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Voucher Number:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.vn}
                                            </div>
                                        </div>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>Voucher Amount:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.va}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full h-auto flex mt-4 ml-2'>
                                        <div className='w-1/2'>
                                            <div className=''>
                                                <p className='mb-1 font-popins text-medium '>No. of Student:</p>
                                            </div>
                                            <div className='mb-1 font-popins text-medium text-blue-500 font-medium'>
                                                {formData.total_student}
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className='w-5/12 bg-blue-100 flex-col justify-end rounded-r-lg'>
                                <div className='flex-col mt-10'>
                                    {/* image */}
                                    <div className='flex justify-center'>
                                        <img src={ExpenseImage} className='h-44 w-44' />
                                    </div>

                                    {/* text */}
                                    <div className='flex justify-center mt-2'>
                                        <p className='font-popins text-2xl font-bold text-gray-600'>Student Expenses</p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className='flex justify-center mt-10'>
                                    <div className='w-60 flex flex-col justify-center mt-10 mb-10'>
                                        <button onClick={handleSubmit} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                                            Send for Approval
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};




const ExpenseForm = () => {
    const [formData, setFormData] = useState({
        exp_code: '',
        exp_name:'',
        exp_type:'',
        doe: '',
        dob:'',
        total_amount:'',
        vn: '',
        va:'',
        total_student:'',
    });

    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };
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
        <>
        <div className="flex bg-defaultBg" >
            {/* Main Content */}
            <div className="w-full h-full">
                    <div className='w-full flex justify-center h-1/2 pt-10' >
                        <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                            {/* content */}
                            <div className='w-1/2 flex flex-col ml-5'>
                                <div className='w-full mt-5'>
                                    <p className='font-popins text-2xl font-semibold '>Hostel Management Software</p>
                                </div>
                                <div className='w-full mt-1'>
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Expense Booking Form</p>
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

                    <div className="form-progress flex justify-center items-center mt-5">
                        <div className='pl-2 pr-2 flex-col justify-center mr-16'>
                            <div className='flex justify-center'>
                                <button disabled={currentPage<1? true:false} onClick={() => { setCurrentPage(1) }}>
                                    <div
                                        className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                                    >
                                        <p className='text-center font-extrabold text-2xl align-middle'>1</p>
                                    </div>
                                </button>
                            </div>
                            <div><p className='font-popins font-sm text-sm text-gray-500'>Student Details</p></div>
                        </div>
                        <div className='pl-2 pr-2 flex-col justify-center  mr-16'>
                            <div className='flex justify-center'>
                                <button disabled={currentPage<2 ? true:false} onClick={() => { setCurrentPage(2) }}>
                                    <div
                                        className={`step ${currentPage >= 2 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                                    >
                                        <p className='text-center font-extrabold text-2xl align-middle'>2</p>
                                    </div>
                                </button>
                            </div>

                            <div><p className='font-popins font-sm text-sm text-gray-500'>Send for approval</p></div>
                        </div>
                        <div className='pl-2 pr-2 flex-col justify-center'>
                            <div className='flex justify-center'>
                                <button disabled={currentPage<4? true:false} onClick={() => { setCurrentPage(4) }}>
                                    <div
                                        className={`step ${currentPage >= 4 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                                    >
                                        <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                                    </div>
                                </button>
                            </div>
                            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic & Amount Details</p></div>
                        </div>
                    </div>
                </div>
            </div>
            {currentPage === 1 && (
                <Page1 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 2 && (
                <Page2 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 3 && (
                <Page3 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 4 && (
                <Page4 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} setCurrentPage={setCurrentPage} />
            )}
        </>
    )
}

export default ExpenseForm