import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'


const TowerRegistartion = () => {
    const [status,changeStatus]=useState('');
    const handleDropdownStatus =(event)=>{
        changeStatus(event.target.value);
        setFormData((prevData) => ({
        ...prevData,
        status: event.target.value
        }));
    }

    const [formData, setFormData] = useState({
            hostel_id : '',
            uuid:'',
            tower_name: '',
            no_rooms:'',
            capacity:'',
            total_area:'', 
            other_facilities:'',
            no_wings:'',
            type:'',
            status:'',
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
        console.log('Form submitted successfully!');
        axios.post('http://localhost:7000/hostel/tower/wing', formData)
        .then((response) => {
            console.log('API response:', response.data);
        })
        .catch((error) => {
            console.error('API request error:', error);
        });
        setFormData({
            hostel_id : '',
            tower_name: '',
            no_rooms:'',
            capacity:'',
            total_area:'', 
            other_facilities:'',
            no_wings:'',
            type:'',
            status:'',
        });
        setErrors({});
        } else {
        console.log("error");
        setErrors(formErrors);
        }
    };

    const validateForm = () => {
        const errors = {};
        // Validate hostel_id
        if (!formData.hostel_id) {
          errors.hostel_id = "Hostel ID is required";
        }

        // Validate uuid
        if (!formData.uuid) {
          errors.uuid = "UUID is required";
        }

        // Validate tower_name
        if (!formData.tower_name) {
          errors.tower_name = "Tower name is required";
        }

        // Validate no_rooms
        if (!formData.no_rooms) {
          errors.no_rooms = "Number of rooms is required";
        }

        // Validate capacity
        if (!formData.capacity) {
          errors.capacity = "Capacity is required";
        }

        // Validate total_area
        if (!formData.total_area) {
          errors.total_area = "Total area is required";
        }

        // Validate other_facilities
        if (!formData.other_facilities) {
          errors.other_facilities = "Other facilities are required";
        }

        // Validate no_wings
        if (!formData.no_wings) {
          errors.no_wings = "Number of wings is required";
        }

        // Validate type
        if (!formData.type) {
          errors.type = "Type is required";
        }

        // Validate status
        if (!formData.status) {
          errors.status = "Status is required";
        }

        // Set the errors using setErrors
        setErrors(errors);
        return errors
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
      <div className="w-full bg-defaultBg top-0">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className='w-full flex justify-center h-1/2 pt-10' >
            <div className='flex flex-row w-11/12 h-40 bg-white rounded-lg drop-shadow-lg'>
                {/* content */}
                <div className='w-1/2 flex flex-col ml-5'>
                    <div className='w-full mt-5'>
                        <p className='font-popins text-2xl font-semibold '>Hostel Management Software</p>
                    </div>
                    <div className='w-full mt-1'> 
                        <p className='font-popins text-lg font-medium text-orange-500 '>Wing Registartion Form</p>
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

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              <div className='font-bold underline  underline-offset-1 text-sky-950 text-xl mb-3'>
                <p className='text-2xl font-semibold pt-4 mb-3 font-popins '>Basic Details</p>
              </div>
              
              {/* 1.1 */}
              <div className='w-full h-auto flex flex-col mt-1'>
                <div className="mb-1 font-popins text-lg font-medium  " htmlFor="description">Tower Name or ID  <p className='inline text-xl text-red-600'>*</p></div>
                <input
                  id="hostel_id"
                  name="hostel_id"
                  value={formData.hostel_id}
                  onChange={handleChange}
                  className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                ></input>
                {errors.hostel_id && <span className="error text-red-500">{errors.hostel_id}</span>}
              </div>

            {/* 1.2 */}
              {/*  --> UUID */}

            <div className='w-full h-auto flex flex-col mb-2 mt-2'>
            <div className="mb-1 font-popins text-lg font-medium " htmlFor="description">Wing Name <p className='inline text-xl text-red-600'>*</p></div>
            <input
                id="tower_name"
                name="tower_name"
                value={formData.tower_name}
                onChange={handleChange}
                className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
            ></input>
            {errors.tower_name && <span className="error text-red-500">{errors.tower_name}</span>}
            </div>

            <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">No of Rooms  <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="Number"
                      id="no_wings"
                      name="no_wings"
                      value={formData.no_wings}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_wings && <span className="error text-red-500">{errors.no_wings}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Capacity  <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="number"
                      id="no_rooms"
                      name="no_rooms"
                      value={formData.no_rooms}
                      onChange={handleChange}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_rooms && <span className="error text-red-500">{errors.no_rooms}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Total Area (sq.ft) <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="Number"
                      id="no_wings"
                      name="no_wings"
                      value={formData.no_wings}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_wings && <span className="error text-red-500">{errors.no_wings}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Other facility  <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="no_rooms"
                      name="no_rooms"
                      value={formData.no_rooms}
                      onChange={handleChange}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_rooms && <span className="error text-red-500">{errors.no_rooms}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mb-2 mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Type <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="other_facilities"
                      name="other_facilities"
                      value={formData.other_facilities}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.other_facilities && <span className="error text-red-500">{errors.other_facilities}</span>}
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Footer - Logo + Submit button*/}
        <div className='w-full h-52 flex items-center justify-center bg-defaultBg'>
          <div className='w-11/12 h-4/5 flex items-center justify-center bg-defaultBg'>
            <div className='w-11/12 h-1/2 flex justify-between'>
            <div className='w-auto flex flex-col justify-center items-start relative'>
                {/* Logo */}
                <div className='text-sky-950 text-2xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-xl font-semibold'>Wing Registartion Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button className='h-1/2  bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Submit 
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
      </div>

  );
};

export default TowerRegistartion;