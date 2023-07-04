import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'
import ExpenseImage from './expenseImage.svg'


const Page1 = ({ currentPage, formData, setFormData, nextPage ,setCurrentPage}) => {
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
    const changeDateExpense = date  =>{
        setFormData((prevData) => ({
          ...prevData,
          doe: date
        }));
      }
    const changeDateBooking = date  =>{
    setFormData((prevData) => ({
        ...prevData,
        dob: date
    }));
    }

    const CalculatePerStudent =() =>{
        if(formData.total_amount && formData.total_student>0){
            var ans=parseInt(formData.total_amount)/parseInt(formData.total_student)
            return parseInt(ans);
        }
        return "Please Enter Total Expense and No of Students"
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
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Student Registration Form</p>
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
                                <button onClick={()=>{setCurrentPage(1)}}>
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
                                <button onClick={()=>{setCurrentPage(2)}}>
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
                                <button onClick={()=>{setCurrentPage(3)}}>
                                <div
                                    className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                                >
                                    <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                                </div>
                                </button>
                            </div>
                            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic & Amount Details</p></div>
                        </div>
                    </div>

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
                                            <DatePicker
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
                                            <DatePicker
                                                selected={formData.doe}
                                                onChange={changeDateBooking}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText='dd/mm/yyyy'
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
                            <div className='w-5/12 bg-blue-100 flex-col justify-end'>
                                <div className='flex-col mt-10'>
                                    {/* image */}
                                    <div className='flex justify-center'>
                                        <img src={ExpenseImage} className='h-44 w-44'/>
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

const Page2 = ({ currentPage, formData, setFormData, nextPage ,setCurrentPage}) => {
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
                                    <p className='font-popins text-lg font-medium text-orange-500 '>Student Registration Form</p>
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
                                <button onClick={()=>{setCurrentPage(1)}}>
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
                                <button onClick={()=>{setCurrentPage(2)}}>
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
                                <button onClick={()=>{setCurrentPage(3)}}>
                                <div
                                    className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                                >
                                    <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                                </div>
                                </button>
                            </div>
                            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic & Amount Details</p></div>
                        </div>
                    </div>

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
                                    
                                </form>
                            </div>
                            <div className='w-5/12 bg-blue-100 flex-col justify-end'>
                                <div className='flex-col mt-10'>
                                    {/* image */}
                                    <div className='flex justify-center'>
                                        <img src={ExpenseImage} className='h-44 w-44'/>
                                    </div>

                                    {/* text */}
                                    <div className='flex justify-center mt-2'>
                                        <p className='font-popins text-2xl font-bold text-gray-600'>Student Expenses</p>
                                    </div>
                                </div>

                                {/* Continue Button */}
                                <div className='flex justify-center mt-64'>
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





const ExpenseForm = () => {
    const [formData, setFormData] = useState({
    });

    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <>
            {currentPage === 1 && (
                <Page1 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} setCurrentPage={setCurrentPage}/>
            )}
         {currentPage === 2 && (
                <Page2 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} setCurrentPage={setCurrentPage}/>
             )}
      </>
    )
}

export default ExpenseForm