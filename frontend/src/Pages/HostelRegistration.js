import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'


const App = () => {
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');
  const [messType, setMessType] = useState('');

  const [State,changeState]=useState('');
  const [allRegion,changeAllRegion]=useState([]);
  const [region,ChangeRegion]=useState('');
  const [allDistrict,changeAllDistrict]=useState([]);
  const [District,changeDistrict]=useState('');
  const [City,changeCity]=useState('');

  const handleChangeDistrict = (event) =>{
    changeDistrict(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      district: event.target.value
    }));
  }

  const handleChangeCity = (event) =>{
    changeCity(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      city: event.target.value
    }));
  }

  const handleChangeRegion = async (event) => {
    ChangeRegion(event.target.value);
    const tempRegion=event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      region: tempRegion
    }));
    try{
      const response = await fetch('http://localhost:7000/allAddressDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        const result = await response.json();
        const d=result[tempRegion];
        changeAllDistrict(d);
        console.log("Changed District");
      }
    }
    catch(err){
      alert(err);
    }
  };

  const handleChangeState = async(event) => {
    changeState(event.target.value);
    const tempState=event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: tempState
    }));
    console.log("Changed State",tempState);
    try{
      const response = await fetch('http://localhost:7000/allAddressDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok) {
        const result = await response.json();
        const r=result[tempState];
        changeAllRegion(r);
        console.log("Changed Regions");
      }
    }
    catch(err){
      alert(err);
    }
  };
  
  const handleDropdownCat1 = (event) => {
    setCategory1(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      categ1: event.target.value
    }));
  };
  const handleDropdownCat2 = (event) => {
    setCategory2(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      categ2: event.target.value
    }));
  };
  const handleDropdownCat3 = (event) => {
    setCategory3(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      categ3: event.target.value
    }));
  };
  const handleDropdownMessType = (event) => {
    setMessType(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      mess: event.target.value
    }));
  };


  const [formData, setFormData] = useState({
    hostel_name: '',
    description:'',
    address1:'',
    address2:'',
    country:'India',
    state:'',
    region:'',
    district:'',
    city:'',
    pincode:'',
    uuid:'',
    rector_name:'',
    categ1:'',
    categ2:'',
    categ3:'',
    tower:'',
    floor:'',
    room:'',
    scapacity:'',
    bcapacity:'',
    area:'',
    mess:'',
    other_facility:'',
    status:'',
    email_id:'',
    website:'',
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
      axios.post('http://localhost:7000/hostel/registration', formData)
      .then((response) => {
        // alert
        console.log('API response:', response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
      setFormData({
        hostel_name: '',
        description:'',
        address1:'',
        address2:'',
        country:'India',
        state:'',
        region:'',
        district:'',
        city:'',
        pincode:'',
        uuid:'',
        rector_name:'',
        categ1:'',
        categ2:'',
        categ3:'',
        tower:'',
        floor:'',
        room:'',
        scapacity:'',
        bcapacity:'',
        area:'',
        mess:'',
        other_facility:'',
        status:'',
        email_id:'',
        website:'',
      });
      setErrors({});
    } else {
      console.log("error");
      setErrors(formErrors);
    }
  };


  const validateForm = () => {
    const errors = {};
      // Validate hostel_name
      if (!formData.hostel_name) {
        errors.hostel_name = "Hostel name is required";
      }

      // Validate description
      if (!formData.description) {
        errors.description = "Description is required";
      }

      // Validate address1
      if (!formData.address1) {
        errors.address1 = "Address is required";
      }

      // Validate country
      if (formData.country !== 'India') {
        errors.country = "Country should be India";
      }

      // Validate state
      if (!formData.state) {
        errors.state = "State is required";
      }

      // Validate region
      if (!formData.region) {
        errors.region = "Region is required";
      }

      // Validate district
      if (!formData.district) {
        errors.district = "District is required";
      }

      // Validate city
      if (!formData.city) {
        errors.city = "City is required";
      }

      // Validate pincode
      if (!formData.pincode) {
        errors.pincode = "Pincode is required";
      }

      // Validate rector_name
      if (!formData.rector_name) {
        errors.rector_name = "Rector name is required";
      }

      // Validate categ1
      if (!formData.categ1) {
        errors.categ1 = "Category 1 is required";
      }

      // Validate categ2
      if (!formData.categ2) {
        errors.categ2 = "Category 2 is required";
      }

      // Validate categ3
      if (!formData.categ3) {
        errors.categ3 = "Category 3 is required";
      }

      // Validate tower
      if (!formData.tower || formData.tower<=0) {
        errors.tower = "Tower is required";
      } 

      // Validate floor
      if (!formData.floor || formData.floor<=0) {
        errors.floor = "Floor is required";
      }

      // Validate room
      if (!formData.room || formData.room<=0) {
        errors.room = "Room is required";
      }

      // Validate scapacity
      if (!formData.scapacity || formData.scapacity<=0) {
        errors.scapacity = "Capacity is required";
      }
      // Validate bcapacity
      if (!formData.bcapacity || formData.bcapacity<=0) {
        errors.bcapacity = "Capacity is required";
      }

      // Validate area
      if (!formData.area || formData.area<=0) {
        errors.area = "Area is required";
      }

      // Validate email_id
      if (!isValidEmail(formData.email_id)) {
        errors.email_id = "Invalid email address";
      }

      // Validate website
      if (!isValidWebsite(formData.website)) {
        errors.website = "Invalid website URL";
      }
      // Set the errors using setErrors
      setErrors(errors);
    return errors;
  };

  function isValidEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to validate website URL
  function isValidWebsite(website) {
    // Regular expression for website URL validation
    const websiteRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)?$/i;
    return websiteRegex.test(website);
  }

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
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className='font-popins'>Basic Details</p>
              </div>
              
              {/* 1.1 */}
              <div className='w-full h-auto flex flex-col mt-3 font-popins'>
                <div className="mb-1 font-popins text-lg font-medium " htmlFor="description">Hostel Name <p className='inline text-xl text-red-600'>*</p></div>
                <input
                  id="hostel_name"
                  name="hostel_name"
                  value={formData.hostel_name}
                  onChange={handleChange}
                  className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                ></input>
                {errors.hostel_name && <span className="error text-red-500">{errors.hostel_name}</span>}
              </div>

              {/* 1.2 */}
              <div className='w-full h-auto flex flex-col mt-3 font-popins'>
                <div className="mb-1 font-popins text-lg font-medium  " htmlFor="description">Hostel Description <p className='inline text-xl text-red-600'>*</p></div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                ></textarea>
                {errors.description && <span className="error text-red-500">{errors.description}</span>}
              </div>

            {/* 2 --> Address*/}
            <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-7 mb-3 font-popins'>
                <p className=' font-popins'>Address </p>
            </div>
            {/* 2.1 */}

            <div className='w-full h-auto flex justify-between'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Address Line 1 <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.address1 && <span className="error  text-red-500">{errors.address1}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Address Line 2 <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5 '
                    />
                    {errors.address2 && <span className="error  text-red-500">{errors.address2}</span>}
                </div>
                </div>
              </div>
              {/* 2.2 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Country <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="state"
                      name="country"
                      value={'India'}
                      onChange={handleChange}
                      className='bg-slate-200 w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1'
                    />
                    {errors.country && <span className="error  text-red-500">{errors.country}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">State <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={State} 
                        onChange={handleChangeState}
                        >
                        <option value="NA">Select an option</option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                    {errors.state && <span className="error  text-red-500">{errors.state}</span>}
                </div>
                </div>
              </div>

              {/* 2.3 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Region <p className='inline text-xl text-red-600'>**</p></div>
                      <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={region} 
                        onChange={handleChangeRegion}
                        >
                        <option value="">Select an option</option>
                          {allRegion.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                      </select>
                    {errors.region && <span className="error  text-red-500">{errors.region}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">District <p className='inline text-xl text-red-600'>**</p></div>
                      <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={District} 
                        onChange={handleChangeDistrict}
                        >
                        <option value="">Select an option</option>
                          {allDistrict.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                      </select>
                    {errors.district && <span className="error text-red-500">{errors.district}</span>}
                </div>
                </div>

              </div>

              {/* 2.4 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">City <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={City} 
                        onChange={handleChangeCity}
                        >
                        <option value="">Select an option</option>
                          {allDistrict.map((region) => (
                            <option key={region.value} value={region.value}>
                              {region.label}
                            </option>
                          ))}
                      </select>
                    {errors.city && <span className="error text-red-600">{errors.city}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Pincode <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.pincode && <span className="error text-red-600">{errors.pincode}</span>}
                </div>
                </div>
              </div>

              {/* 4 */}
              <div className='underline underline-offset-1 text-sky-950 text-xl font-semibold pt-7 mb-3 font-popins'>
                <p className=''>Advance Details</p>
            </div>

            {/* 4.1 --> 1*/}
            <div className='w-full h-auto flex justify-between'>
                <div className='w-full'>
                  <div className="w-full mb-1 font-popins text-lg font-medium" htmlFor="email_id">Hostel Rector <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="rector_name"
                      name="rector_name"
                      value={formData.rector_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.rector_name && <span className="error text-red-600">{errors.rector_name}</span>}
                </div>
              </div>

              {/* 4.2 -->3 */}
              <div className='w-full h-auto flex justify-between mt-5'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Category-1 <p className='inline text-xl text-red-600'>*</p></div>
                      <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={category1} 
                        onChange={handleDropdownCat1}
                        >
                        <option value="">Select an option</option>
                        <option value="girls">Girls</option>
                        <option value="boys">Boys</option>
                        <option value="coed">Co-Ed</option>
                      </select>
                      {errors.categ1 && <span className="error text-red-600">{errors.categ1}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Category-2 <p className='inline text-xl text-red-600'>*</p></div>
                      <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={category2} 
                        onChange={handleDropdownCat2}
                        >
                        <option value="">Select an option</option>
                        <option value="t-1">type-1</option>
                        <option value="t-2">type-2</option>
                        <option value="t-3">type-3</option>
                      </select>
                      {errors.categ2 && <span className="error text-red-600">{errors.categ2}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Category-3 <p className='inline text-xl text-red-600'>*</p></div>
                      <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={category3} 
                        onChange={handleDropdownCat3}
                        >
                        <option value="">Select an option</option>
                        <option value="rented">Rented</option>
                        <option value="government">Government</option>
                      </select>
                      {errors.categ3 && <span className="error text-red-600">{errors.categ3}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.3 -> 3*/}
              <div className='w-full h-auto flex justify-between mt-5'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">No of Towers <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="number"
                        id="tower"
                        name="tower"
                        value={formData.tower}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.tower && <span className="error text-red-600">{errors.tower}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">No of Floors <p className='inline text-xl text-red-600'>**</p></div>
                      <input
                        type="number"
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.floor && <span className="error text-red-600">{errors.floor}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">No of Rooms <p className='inline text-xl text-red-600'>**</p></div>
                      <input
                        type="number"
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.room && <span className="error text-red-600">{errors.room}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.4 -->3 */}
              <div className='w-full h-auto flex justify-between mt-5'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Sanctioned Capacity <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="number"
                        id="scapacity"
                        name="scapacity"
                        value={formData.scapacity}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.scapacity && <span className="error text-red-600">{errors.scapacity}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Building Capacity <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="number"
                        id="bcapacity"
                        name="bcapacity"
                        value={formData.bcapacity}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.bcapacity && <span className="error text-red-600">{errors.bcapacity}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Total Area (sq.ft) <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.area && <span className="error text-red-600">{errors.area}</span>}
                  </div>
                  </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-5'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Mess Type <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={messType} 
                        onChange={handleDropdownMessType}
                        >
                        <option value="">Select an option</option>
                        <option value="government">Government</option>
                        <option value="contract">Contract</option>
                        <option value="other">Other</option>
                        <option value="not">Not Applicable</option>
                      </select>
                      {errors.mess && <span className="error text-red-600">{errors.mess}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Other Facility <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="text"
                        id="other_facility"
                        name="other_facility"
                        value={formData.other_facility}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.other_facility && <span className="error text-red-600">{errors.other_facility}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Status <p className='inline text-xl text-red-600'>*</p></div>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                      />
                      {errors.status && <span className="error text-red-600">{errors.status}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.5 */}
              <div className='w-full h-auto flex justify-between mt-5 mb-7'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Hostel Email <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="email_id"
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.email_id && <span className="error text-red-600">{errors.email_id}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div htmlFor="email_id" className='mb-1 font-popins text-lg font-medium'>Hostel Website <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.website && <span className="error text-red-600">{errors.website}</span>}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Logo + Submit button*/}
        <div className='w-full h-52 flex items-center justify-center bg-defaultBg'>
          <div className='w-11/12 h-4/5 flex items-center justify-center bg-defaultBg'>
            <div className='w-11/12  flex justify-between'>
              <div className='w-auto flex flex-col justify-center items-start relative'>
                {/* Logo */}
                <div className='text-sky-950 text-2xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-xl font-semibold'>Hostel Registration Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-52 flex flex-col justify-center'>
                <button className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl'>
                  Save
                </button>
                <button className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Send for Approval
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
  );
};

export default App;