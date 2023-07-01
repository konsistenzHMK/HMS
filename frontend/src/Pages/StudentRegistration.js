import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'


const Page1 = ({currentPage,formData, setFormData, nextPage }) =>{
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
    // Validate first_name
  if (!formData.first_name) {
    errors.first_name = "First name is required";
  }

  // Validate last_name
  if (!formData.last_name) {
    errors.last_name = "Last name is required";
  }

  // Validate father_name
  if (!formData.father_name) {
    errors.father_name = "Father's name is required";
  }

  // Validate mother_name
  if (!formData.mother_name) {
    errors.mother_name = "Mother's name is required";
  }

  // Validate address_type
  if (!formData.address_type) {
    errors.address_type = "Address type is required";
  }

  // Validate address1
  if (!formData.address1) {
    errors.address1 = "Address line 1 is required";
  }

  // Validate address2
  if (!formData.address2) {
    errors.address2 = "Address line 2 is required";
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

  // Validate gender
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }

  // Validate aadhar_id
  if (!formData.aadhar_id) {
    errors.aadhar_id = "Aadhar ID is required";
  }

  // Validate dob
  if (!formData.dob) {
    errors.dob = "Date of birth is required";
  }

  // Set the errors using setErrors
  setErrors(errors);
  return errors;
};

  const changeDate = date  =>{
    setFormData((prevData) => ({
      ...prevData,
      dob: date
    }));
  }

  const changeGender = event  =>{
    setFormData((prevData) => ({
      ...prevData,
      gender: event.target.value
    }));
  }

  const changeAddress =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      address_type: event.target.value
    }));
  }

  const handleNextPage =(e) =>{
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      nextPage();
    }
    else{
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
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
        </div>
        {/* Header */}

        <div className="form-progress flex justify-around items-center mt-8">
          <div
            className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center align-middle'}`}
          ><p className='text-center font-extrabold text-2xl align-middle'>1</p></div>
          <div
            className={`step ${currentPage >= 2 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>2</p></div>
          <div
            className={`step ${currentPage >= 3 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>3</p></div>
          <div
            className={`step ${currentPage >= 4 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>4</p></div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className='font-popins'>Basic Details</p>
              </div>
              {/* 1.1 -- Student Name*/}
              <div className='w-full h-auto flex justify-between'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Firstname <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.first_name && <span className="error text-red-500">{errors.first_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Lastname <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.last_name && <span className="error text-red-500">{errors.last_name}</span>}
                </div>
                </div>
              </div>

              {/* 2 -- Parents Name  */}
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Father's Name <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="father_name"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.father_name && <span className="error text-red-500">{errors.father_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Mother's Name <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="mother_name"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.mother_name && <span className="error text-red-500">{errors.mother_name}</span>}
                </div>
                </div>
              </div>

            <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-4 mb-2 font-popins'>
                <p className=' font-popins'>Address </p>
            </div>
            
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Address Line 1<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.address1 && <span className="error text-red-500">{errors.address1}</span>}
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
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.address2 && <span className="error text-red-500">{errors.address2}</span>}
                </div>
                </div>
              </div>
              {/* 2.2 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Country <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="state"
                      name="country"
                      value={'India'}
                      onChange={handleChange}
                      className='bg-slate-200 w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1'
                    />
                    {errors.country && <span className="error text-red-500">{errors.country}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">State <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={State} 
                        onChange={handleChangeState}
                        >
                        <option value="">Select an option</option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                    {errors.state && <span className="error text-red-500">{errors.state}</span>}
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
                    {errors.region && <span className="error text-red-500">{errors.region}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">District <p className='inline text-xl text-red-600'>**</p></div>
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">City<p className='inline text-xl text-red-600'>**</p></div>
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
                    {errors.city && <span className="error text-red-500">{errors.city}</span>}
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
                    {errors.pincode && <span className="error text-red-500">{errors.pincode}</span>}
                </div>    
            </div>
            </div>
            <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Address Type <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={formData.address_type} 
                        onChange={changeAddress}
                        >
                        <option value="none">Select an option</option>
                        <option value="Permanent Address">Permanent Address</option>
                        <option value="Relative Address">Relative Address</option>
                        <option value="College Address">College Address</option>
                        <option value="School Address">School Address</option>
                      </select>
                      {errors.address_type && <span className="error text-red-500">{errors.address_type}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Aadhar Number <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="aadhar_id"
                      name="aadhar_id"
                      value={formData.aadhar_id}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.aadhar_id && <span className="error text-red-500">{errors.aadhar_id}</span>}
                </div>
                </div> 
              </div>
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Gender <p className='inline text-xl text-red-600'>**</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={formData.gender} 
                        onChange={changeGender}
                        >
                        <option value="none">Select an option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-Binary</option>
                      
                      </select>
                      {errors.gender && <span className="error text-red-500">{errors.gender}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Date of Birth <p className='inline text-xl text-red-600'>**</p></div>
                    <DatePicker
                      selected={formData.dob}
                      onChange={changeDate}
                      dateFormat="yyyy-MM-dd"
                      className='w-80 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.dob && <span className="error text-red-500">{errors.dob}</span>}
                </div>
                </div> 
              </div>
            {/* end */}
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
                <div className='text-orange-600 text-xl font-semibold'>Student Registration Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl'>
                  Next Page
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
const Page2 = ({currentPage,formData,setFormData,nextPage,previousPage}) =>{
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts or renders
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

   
  const changeBloodGroup =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      blood_group: event.target.value
    }));
  }
  const changeHandicappStatus =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      handicapped: event.target.value
    }));
  }
  const changeHandicappType =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      handicapped_type: event.target.value
    }));
  }
  const changeOrphan =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      orphan: event.target.value
    }));
  }

  function validateForm() {
    let errors = {};
    // Validate height
    if (!formData.height || formData.height<0) {
      errors.height = "Height is required";
    }
    
    // Validate weight
    if (!formData.weight || formData.weight<0) {
      errors.weight = "Weight is required";
    }
  
    // Validate blood_group
    if (!formData.blood_group) {
      errors.blood_group = "Blood group is required";
    }
  
    // Validate medical_history
    if (!formData.medical_history) {
      errors.medical_history = "Medical history is required";
    }
  
    // Validate medicine_taken
    if (!formData.medicine_taken) {
      errors.medicine_taken = "Medicine taken is required";
    }
  
    // Validate birth_mark
    if (!formData.birth_mark) {
      errors.birth_mark = "Birthmark is required";
    }
  
    // Validate handicapped
    if (!formData.handicapped) {
      errors.handicapped = "Handicapped status is required";
    }
  
    // Validate handicapped_per
    if (!formData.handicapped_per) {
      errors.handicapped_per = "Percentage of handicap is required";
    }
  
    // Validate handicapped_type
    if (!formData.handicapped_type) {
      errors.handicapped_type = "Type of handicap is required";
    }
  
  
    // Set the errors using setErrors
    setErrors(errors);
    return errors;
  }

  const handleNextPage =(e) =>{
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      nextPage();
    }
    else{
      setErrors(formErrors);
    }
  }

  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
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
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form>
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
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
        </div>
        <div className="form-progress flex justify-around items-center mt-8">
          <div
            className={`step ${currentPage >= 1 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>1</p></div>
          <div
            className={`step ${currentPage >= 2 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>2</p></div>
          <div
            className={`step ${currentPage >= 3 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>3</p></div>
          <div
            className={`step ${currentPage >= 4 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>4</p></div>
        </div>
        {/* Form Data */}

        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-8 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
            <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className=' font-popins'>Medical History </p>
            </div>

            <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Height (in cm)<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.height && <span className="error text-red-500">{errors.height}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Weight (in kg) <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.weight && <span className="error text-red-500">{errors.weight}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Blood Group <p className='inline text-xl text-red-600'>**</p></div>
                    <select
                        className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5 ' 
                        value={formData.blood_group} 
                        onChange={changeBloodGroup}
                        >
                        <option value="none">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      {errors.blood_group && <span className="error text-red-500">{errors.blood_group}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="medical_history"> Medical History <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="medical_history"
                      name="medical_history"
                      value={formData.medical_history}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.medical_history && <span className="error text-red-500">{errors.medical_history}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Medicine taken</div>
                    <input
                      type="text"
                      id="medicine_taken"
                      name="medicine_taken"
                      value={formData.medicine_taken}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.medicine_taken && <span className="error text-red-500">{errors.medicine_taken}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Birth Mark</div>
                    <input
                      type="text"
                      id="birth_mark"
                      name="birth_mark"
                      value={formData.birth_mark}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.birth_mark && <span className="error text-red-500">{errors.birth_mark}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Handicapped <p className='inline text-xl text-red-600'>**</p></div>
                    <select
                        className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5 ' 
                        value={formData.handicapped} 
                        onChange={changeHandicappStatus}
                        >
                        <option value="none">Handicapped Status</option>
                        <option value='true'>Yes</option>
                        <option value='partial'>Partially</option>
                        <option value='false'>No</option>
                      </select>
                      {errors.mess && <span className="error text-red-500">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="medical_history">Handicapped Percentage<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="number"
                      id="handicapped_per"
                      name="handicapped_per"
                      value={formData.handicapped_per}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.handicapped_per && <span className="error text-red-500">{errors.handicapped_per}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Handicapped Type <p className='inline text-xl text-red-600'>*</p></div>
                    <select
                        className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={formData.handicapped_type} 
                        onChange={changeHandicappType}
                        >
                        <option value="">Select Handicap Type</option>
                        <option value="Physical">Physical</option>
                        <option value="Visual">Visual</option>
                        <option value="Hearing">Hearing</option>
                        <option value="Intellectual">Intellectual</option>
                        <option value="Developmental">Developmental</option>
                      </select>
                      {errors.handicapped_type && <span className="error text-red-500">{errors.handicapped_type}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="medical_history">Orphan<p className='inline text-xl text-red-600'>**</p></div>
                    <select
                          className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                          value={formData.orphan} 
                          onChange={changeOrphan}
                          >
                          <option value="">Select status </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.orphan && <span className="error text-red-500">{errors.orphan}</span>}
                </div>
                </div> 
              </div>
            {/* end */}
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
                <div className='text-orange-600 text-xl font-semibold'>Student Registration Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-52 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl'>
                  Next Page
                </button>
                <button onClick={handlePrevPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Previous Page 
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

const Page3 = ({currentPage,formData,setFormData,nextPage,previousPage}) =>{
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
  }


  const validateForm = () => {
    let errors = {};
    // Validate personal_mobile
    if (!formData.personal_mobile) {
      errors.personal_mobile = "Personal mobile number is required";
    }
  
    // Validate parent_mobile
    if (!formData.parent_mobile) {
      errors.parent_mobile = "Parent mobile number is required";
    }
  
    // Validate teacher_mobile
    if (!formData.teacher_mobile) {
      errors.teacher_mobile = "Teacher mobile number is required";
    }
  
    // Validate emergency_number
    if (!formData.emergency_number) {
      errors.emergency_number = "Emergency contact number is required";
    }
  
    // Validate personal_email
    if (!formData.personal_email) {
      errors.personal_email = "Personal email is required";
    }
  
    // Validate parent_email
    if (!formData.parent_email) {
      errors.parent_email = "Parent email is required";
    }
  
    // Validate teacher_email
    if (!formData.teacher_email) {
      errors.teacher_email = "Teacher email is required";
    }
  
    // Validate collage_name
    if (!formData.collage_name) {
      errors.collage_name = "College name is required";
    }
  
    // Validate principle_name
    if (!formData.principle_name) {
      errors.principle_name = "Principal's name is required";
    }
  
  
    // Validate religon
    if (!formData.religon) {
      errors.religon = "Religion is required";
    }
  
    // Validate category
    if (!formData.category) {
      errors.category = "Category is required";
    }
  
    // Validate subCategory
    if (!formData.subCategory) {
      errors.subCategory = "Sub-category is required";
    }
  
    // Validate income
    if (!formData.income) {
      errors.income = "Income is required";
    }
  
    // Set the errors using setErrors
    setErrors(errors);
    return errors;
  };

  const handleNextPage =(e) =>{
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      nextPage();
    }
    else{
      console.log(formErrors);
      setErrors(formErrors);
    }
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
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form>
        {/* Header */}
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
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
        </div>

        <div className="form-progress flex justify-around items-center mt-8">
          <div
            className={`step ${currentPage >= 1 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>1</p></div>
          <div
            className={`step ${currentPage >= 2 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>2</p></div>
          <div
            className={`step ${currentPage >= 3 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>3</p></div>
          <div
            className={`step ${currentPage >= 4 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>4</p></div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-8 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}

              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className=' font-popins'>Contact details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Personal Mobile no <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="personal_mobile"
                      name="personal_mobile"
                      value={formData.personal_mobile}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.personal_mobile && <span className="error text-red-600">{errors.personal_mobile}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Parents Mobile no <p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="parent_mobile"
                      name="parent_mobile"
                      value={formData.parent_mobile}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.parent_mobile && <span className="error text-red-600">{errors.parent_mobile}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Teacher Mobile no<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="Number"
                      id="teacher_mobile"
                      name="teacher_mobile"
                      value={formData.teacher_mobile}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.teacher_mobile && <span className="error text-red-600">{errors.teacher_mobile}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Emergency Contact no<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="Number"
                      id="emergency_number"
                      name="emergency_number"
                      value={formData.emergency_number}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.emergency_number && <span className="error text-red-600">{errors.emergency_number}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Personal Email ID<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="personal_email"
                      name="personal_email"
                      value={formData.personal_email}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.personal_email && <span className="error text-red-600">{errors.personal_email}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Parents Email ID<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="parent_email"
                      name="parent_email"
                      value={formData.parent_email}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.parent_email && <span className="error text-red-600">{errors.parent_email}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Teacher Email ID<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="teacher_email"
                      name="teacher_email"
                      value={formData.teacher_email}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.teacher_email && <span className="error text-red-600">{errors.teacher_email}</span>}
                </div>
              </div>

              <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Other details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">College Name<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="collage_name"
                      name="collage_name"
                      value={formData.collage_name}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.collage_name && <span className="error text-red-600">{errors.collage_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Principle Name<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="principle_name"
                      name="principle_name"
                      value={formData.principle_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.principle_name && <span className="error text-red-600">{errors.principle_name}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Religon<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="religon"
                      name="religon"
                      value={formData.religon}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.religon && <span className="error text-red-600">{errors.religon}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Category<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.category && <span className="error text-red-600">{errors.category}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Sub Category<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.subCategory && <span className="error text-red-600">{errors.subCategory}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Family Income (lakh per annum)<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="number"
                      id="income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.income && <span className="error text-red-600">{errors.income}</span>}
                </div>
                </div>
              </div>
            {/* end */}
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
                <div className='text-orange-600 text-xl font-semibold'>Student Registration Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-52 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl'>
                  Next Page
                </button>
                <button onClick={handlePrevPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Previous Page 
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

const Page4 = ({currentPage,previousPage,formData,setFormData}) =>{
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
      axios.post('http://localhost:7000/student/registration', formData)
      .then((response) => {
        // alert
        console.log('API response:', response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
      // setFormData({
      // });
      setErrors({});
    } else {
      console.log("error");
      setErrors(formErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    // Validate photo_file
  if (!formData.photo_file) {
    errors.photo_file = "Photo file is required";
  }

  // Validate aadhar_file
  if (!formData.aadhar_file) {
    errors.aadhar_file = "Aadhar file is required";
  }

  // Validate caste_file
  if (!formData.caste_file) {
    errors.caste_file = "Caste file is required";
  }

  // Validate medical_file
  if (!formData.medical_file) {
    errors.medical_file = "Medical file is required";
  }

  // Validate account_holder_name
  if (!formData.account_holder_name) {
    errors.account_holder_name = "Account holder name is required";
  }

  // Validate bank_name
  if (!formData.bank_name) {
    errors.bank_name = "Bank name is required";
  }

  // Validate ifsc
  if (!formData.ifsc) {
    errors.ifsc = "IFSC code is required";
  }

  // Validate account_number
  if (!formData.account_number) {
    errors.account_number = "Account number is required";
  }

  // Set the errors using setErrors
  setErrors(errors);
    return errors;
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      photo_file: file
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [AselectedFile, AsetSelectedFile] = useState(null);
  const [ApreviewURL, AsetPreviewURL] = useState('');
  const handleAadharChange = (e) => {
    const file = e.target.files[0];
    AsetSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      aadhar_file: file
    }));
    const reader2 = new FileReader();
    reader2.onloadend = () => {
      AsetPreviewURL(reader2.result);
    };
    if (file) {
      reader2.readAsDataURL(file);
    }
  };

  const [CselectedFile, CsetSelectedFile] = useState(null);
  const handleCasteChange = (e) => {
    const file = e.target.files[0];
    CsetSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      caste_file: file
    }));
  };

  const [MselectedFile, MsetSelectedFile] = useState(null);
  const handleMedicalChange = (e) => {
    const file = e.target.files[0];
    MsetSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      medical_file: file
    }));
  };
  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
  }

  return (
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form onSubmit={handleSubmit}>
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
                        <p className='font-popins text-ms '>🗓️ </p>
                    </div>
                </div>

                {/* Image */}
                <div className='w-1/2 flex justify-end mr-5 '>
                <img src={DashboardImg} alt="Circular" className='w-25 h-22 pt-4 pb-4'/>
                </div>
            </div>
          </div>

        <div className="form-progress flex justify-around items-center mt-8">
          <div
            className={`step ${currentPage >= 1 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>1</p></div>
          <div
            className={`step ${currentPage >= 2 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>2</p></div>
          <div
            className={`step ${currentPage >= 3 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>3</p></div>
          <div
            className={`step ${currentPage >= 4 ? 'rounded-full bg-green-500 w-10 h-10 flex-col justify-center' : 'rounded-full bg-gray-600 w-10 h-10 flex-col justify-center'}`}
          ><p className='text-center font-extrabold text-2xl'>4</p></div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-10/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Attachments </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Photo Attachment <p className='inline text-xl text-red-600'>**</p></div>
                    <input 
                      type="file" 
                      id="photo" 
                      accept=".jpg, .jpeg, .png"
                      onChange={handlePhotoChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {selectedFile && (
                      <img src={previewURL} alt="Preview" className='w-32 h-32 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' />
                    )}
                    {errors.photo_file && <span className="error text-red-500">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Upload Aadhar<p className='inline text-xl text-red-600'>**</p></div>
                  <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handleAadharChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {AselectedFile && (
                        <iframe
                        src={URL.createObjectURL(AselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                      />
                    )}
                    {errors.aadhar_file && <span className="error text-red-500">{errors.aadhar_file}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Caste Certificate  <p className='inline text-xl text-red-600'>**</p></div>
                    <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handleCasteChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {CselectedFile && (
                        <iframe
                        src={URL.createObjectURL(CselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat' 
                      />
                    )}
                    {errors.photo_file && <span className="error text-red-500">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Medical Certificates<p className='inline text-xl text-red-600'>**</p></div>
                  <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handleMedicalChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {MselectedFile && (
                        <iframe
                        src={URL.createObjectURL(MselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                      />
                    )}
                    {errors.aadhar_file && <span className="error text-red-500">{errors.aadhar_file}</span>}
                </div>
                </div>
              </div>

              <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-1 font-popins'>
                <p className=' font-popins'>Bank Details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Account Holder Name<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="account_holder_name"
                      name="account_holder_name"
                      value={formData.account_holder_name}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.account_holder_name && <span className="error text-red-500">{errors.account_holder_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Bank name<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="bank_name"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.bank_name && <span className="error text-red-500">{errors.bank_name}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">IFSC<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="text"
                      id="ifsc"
                      name="ifsc"
                      value={formData.ifsc}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.ifsc && <span className="error text-red-500">{errors.ifsc}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Account Number<p className='inline text-xl text-red-600'>**</p></div>
                    <input
                      type="number"
                      id="account_number"
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.account_number && <span className="error text-red-500">{errors.account_number}</span>}
                </div>
                </div>
              </div>

            {/* end */}
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
                <div className='text-orange-600 text-xl font-semibold'>Student Registration Form ✨</div>
                <img src={BgImg} className='absolute h-36 w-36 ml-[-40px]' />
              </div>
              <div className='w-52 flex flex-col justify-center'>
                <button className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl'>
                  Submit 
                </button>
                <button onClick={handlePrevPage} className='h-10 bg-accent2 text-lg font-semibold text-white border-none rounded-2xl mt-5'>
                  Previous Page 
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

const StudentRegistartion = () =>{
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    father_name:'',
    mother_name:'',
    address_type:'',
    address1:'',
    address2:'',
    country:'India',
    state:'',
    region:'',
    district:'',
    city:'',
    pincode:'',
    gender:'',
    aadhar_id:'',
    dob:null,
    height:Number,
    weight:Number,
    blood_group:'',
    medical_history:'',
    medicine_taken:'',
    birth_mark:'',
    handicapped:'',
    handicapped_per:Number,
    handicapped_type:String,
    orphan:Boolean,
    personal_mobile:'',
    parent_mobile:'',
    teacher_mobile:'',
    emergency_number:'',
    personal_email:'',
    parent_email:'',
    teacher_email:'',
    collage_name:'',
    principle_name:'',
    religon:'',
    category:'',
    subCategory:'',
    income:'',
    photo_file:null,
    aadhar_file:null,
    caste_file:null,
    medical_file:null,
    account_holder_name:'',
    bank_name:'',
    ifsc:'',
    account_number:''
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
        <Page1 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} />
      )}
      {currentPage === 2 && (
        <Page2 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} />
      )}
      {currentPage === 3 && (
        <Page3  currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} />
      )}
      {currentPage === 4 && (
        <Page4  currentPage={currentPage} formData={formData} setFormData={setFormData} previousPage={previousPage} />
      )}
    </>
    
  );
}
export default StudentRegistartion;