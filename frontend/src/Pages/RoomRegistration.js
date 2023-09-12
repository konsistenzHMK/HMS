import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'

const RoomRegistartion = () => {
    const [room_status,changeStatus]=useState('');
    const handleDropdownStatus =(event)=>{
        changeStatus(event.target.value);
        setFormData((prevData) => ({
        ...prevData,
        room_status: event.target.value
        }));
    }

    const [formData, setFormData] = useState({
            hostel_id: '',
            tower_id: '',
            wing_id:'',
            room_no:'', 
            room_name:'',
            room_type:'',
            room_capacity:'',
            height:'',
            width:'',
            length:'',
            no_of_doors:'',
            no_of_windows:'',
            facility_list:'',
            room_status:'',
            room_furniture:'',
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
        axios.post('http://localhost:7000/hostel/room', formData)
        .then((response) => {
            console.log('API response:', response.data);
            alert(response.data)
        })
        .catch((error) => {
            console.error('API request error:', error);
        });
        setFormData({
            hostel_id: '',
            tower_id: '',
            wing_id:'',
            room_no:'', 
            room_name:'',
            room_type:'',
            room_capacity:'',
            height:'',
            width:'',
            length:'',
            no_of_doors:'',
            no_of_windows:'',
            facility_list:'',
            room_status:'',
            room_furniture:'',
        });
        setErrors({});
        } else {
        console.log("error");
        setErrors(formErrors);
        }
    };

    const validateForm = () => {
      let errors = {};

      // Validate hostel_id
      if (!formData.hostel_id) {
        errors.hostel_id = "Hostel Name is required";
      }
    
      // Validate tower_name
      if (!formData.tower_id) {
        errors.tower_id = "Tower Name is required";
      }
    
      // Validate wing
      if (!formData.wing_id) {
        errors.wing_id = "Wing Name is required";
      }

      // Validate room_no
      if (!formData.room_no) {
        errors.room_no = "Room Number is required";
      }
     
      // Validate status
      if (!formData.room_status) {
        errors.room_status = "Room Status is required";
      }
    
      // Set the errors using setErrors
      setErrors(errors);
      return errors;
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

    const [hostel_name_and_id, setHostel_name_and_id] = useState([]);
    const hostel_name_and_id_fetch = async () => {
      try{
        const response = await fetch("http://localhost:7000/gethostel_id/where/status_active",{
          method:"GET",
          headers:{"Content-Type":"application/json"},
        }); 
        if(response.ok){
          const result = await response.json();
          console.log(result);
          setHostel_name_and_id(result);
        }
      }
      catch(err){
        alert(err);
      }
    }

    const handleChange1 = (event) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hostel_id: event.target.value,
      }));
    };

    useEffect(() => {
      hostel_name_and_id_fetch();
    }, []);

    const [wing_name_and_id, setWing_name_and_id] = useState([]);
    const wing_name_and_id_fetch = async () => {
      try{
        const response = await fetch("http://localhost:7000/get_wing_id_where_status_active",{
          method:"GET",
          headers:{"Content-Type":"application/json"},
        }); 
        if(response.ok){
          const result = await response.json();
          console.log(result);
          setWing_name_and_id(result);
        }
      }
      catch(err){
        alert(err);
      }
    }

    const handleChange2 = (event) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        wing_id: event.target.value,
      }));
    };

    useEffect(() => {
      wing_name_and_id_fetch();
    }, []);
    const [tower_name_and_id, setTower_name_and_id] = useState([]);
    const tower_name_and_id_fetch = async () => {
      try{
        const response = await fetch("http://localhost:7000/get_tower_id_where_status_active",{
          method:"GET",
          headers:{"Content-Type":"application/json"},
        }); 
        if(response.ok){
          const result = await response.json();
          console.log(result);
          setTower_name_and_id(result);
        }
      }
      catch(err){
        alert(err);
      }
    }

    const handleChange3 = (event) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tower_id: event.target.value,
      }));
    };

    useEffect(() => {
      tower_name_and_id_fetch();
    }, []);

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
                        <p className='font-popins text-lg font-medium text-orange-500 '>Room Registartion Form</p>
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
                <p className='text-3xl font-semibold pt-4 mb-3 font-popins '>Basic Details</p>
              </div>
              
              {/* 1.1 */}
              <div className='w-full h-auto flex flex-col mt-1'>
        <div className="mb-1 font-popins text-lg font-medium" htmlFor="description">Hostel Name <p className='inline text-xl text-red-600'>*</p></div>
        <select
          id="hostel_id"
          name="hostel_id"
          value={formData.hostel_id} // Use formData.hostel_name_or_id to pre-select the dropdown option based on the state
          onChange={handleChange1} // Use handleChange for handling dropdown change
          className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
        >
          <option value="" disabled>-- Select an option --</option>
          {hostel_name_and_id.map((item) => (
            <option value={item[0]}>{item[1] + "  |  " + item[0]}</option>
          ))}
        </select>
        {errors.hostel_id && <span className="error">{errors.hostel_id}</span>}
      </div>
              

            {/* 1.2 */}
              {/*  --> UUID */}
            <div className='w-full h-auto flex flex-col mb-2 mt-2'>
            <div className="mb-1 font-popins text-lg font-medium " htmlFor="description">Tower*</div>
            <select
                id="tower_id"
                name="tower_id"
                value={formData.tower_id}
                onChange={handleChange3}
                className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
            >
              <option value="" disabled>-- Select an option --</option>\
              {tower_name_and_id.map((item) => (
                <option value={item[0]}>{item[1] + "  |  " + item[0]}</option>
              ))}
            </select>
            {errors.tower_id && <span className="error">{errors.tower_id}</span>}
            </div>

            <div className='w-full h-auto flex flex-col mb-2 mt-2'>

            <div className="mb-1 font-popins text-lg font-medium " htmlFor="description">Wing  <p className='inline text-xl text-red-600'>*</p></div>
            <select
                id="wing_id"
                name="wing_id"
                value={formData.wing_id}
                onChange={handleChange2}

        
                className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
            >
              <option value="" disabled>-- Select an option --</option>\
              {wing_name_and_id.map((item) => (
                <option value={item[0]}>{item[1] + "  |  " + item[0]}</option>
              ))}
            </select>
            {errors.wing_id && <span className="error">{errors.wing_id}</span>}
            </div>
           

            <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Name of Room  <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="room_name"
                      name="room_name"
                      value={formData.room_name}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.room_name && <span className="error">{errors.room_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                    
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Room Number <p className='inline text-xl text-red-600'>*</p></div>

   
                      <input
                      type="text"
                      id="room_no"
                      name="room_no"
                      value={formData.room_no}
                      onChange={handleChange}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.room_no && <span className="error">{errors.room_no}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Room Type</div>
                    <input
                      type="text"
                      id="room_type"
                      name="room_type"
                      value={formData.room_type}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.room_type && <span className="error">{errors.room_type}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Room capacity  <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="room_capacity"
                      name="room_capacity"
                      value={formData.room_capacity}
                      onChange={handleChange}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.room_capacity && <span className="error">{errors.room_capacity}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Height (m)  <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="text"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.height && <span className="error">{errors.height}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Width (m) <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="text"
                        id="width"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.width && <span className="error">{errors.width}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Length (m) <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="text"
                        id="length"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.length && <span className="error">{errors.length}</span>}
                  </div>
                  </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">No of Doors</div>
                    <input
                      type="text"
                      id="no_of_doors"
                      name="no_of_doors"
                      value={formData.no_of_doors}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_of_doors && <span className="error">{errors.no_of_doors}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">No of Windows  <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="no_of_windows"
                      name="no_of_windows"
                      value={formData.no_of_windows}
                      onChange={handleChange}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.no_of_windows && <span className="error">{errors.no_of_windows}</span>}
                </div>
                </div>
              </div>
              
              <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Facility List</div>
                    <input
                      type="text"
                      id="facility_list"
                      name="facility_list"
                      value={formData.facility_list}
                      onChange={handleChange}
                      className='w-11/12  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.facility_list && <span className="error">{errors.facility_list}</span>}
                </div>
                

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>

                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Room Status<p className='inline text-xl text-red-600'>*</p></div>
                    <select 
                      type="text"
                      id="room_status"
                      name="room_status"
                      value={room_status}
                      onChange={handleDropdownStatus}
                      className='w-full  border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    >
                      <option value="" disabled>-- Select an option --</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    {errors.room_status && <span className="error">{errors.room_status}</span>}
                </div>
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
                <div className='text-orange-600 text-xl font-semibold'>Room Registartion Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button className='h-1/2 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Save 
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
      </div>
  );
};

export default RoomRegistartion;