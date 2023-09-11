import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardImg from '../Components/DashboardImg.svg'
import BgImg from './grid.svg'


const Page1 = ({currentPage,formData, setFormData, nextPage ,display}) =>{
  const [State,changeState]=useState('');
  const [allState,changeAllState]=useState([]);
  const [City,changeCity]=useState('');
  const [allCity,changeAllCity]=useState([]);
  const [myAuth,setMyAuth]=useState('');

  const getStatesByCountryId =(countryId) =>{
    axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`, {
      headers: ({
        "Accept": "application/json",
        "api-token": "pjdU9BePqECXUt90qUtoOSxbwGqM2T8YS4yGeNSsibStNv0Foy7ROPLVHoP-oKLTHZA",
        "user-email": "konsistenz.ind@gmail.com"
      }),
    }).then((response)=>{
      let myAuth=response.data.auth_token;
      setMyAuth(myAuth);
      axios.get(`https://www.universal-tutorial.com/api/states/${countryId}`, {
        headers: ({
          "Authorization": `Bearer ${myAuth}`,
          "Accept": "application/json"
        }),
      }).then((response)=>{
      //  console.log(response.data);
       changeAllState(response.data);
      })
    })
  }

  const getCitiesByStateId = (stateId) =>{
    console.log(myAuth);
    axios.get(`https://www.universal-tutorial.com/api/cities/${stateId}`, {
      headers: ({
        "Authorization": `Bearer ${myAuth}`,
        "Accept": "application/json"
      }),
    }).then((response)=>{
      console.log(response.data);
      changeAllCity(response.data);
    })
  }

  const handleStateChange =(event)=>{
    changeState(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      state: event.target.value
    }));
    getCitiesByStateId(event.target.value);
  }

  const handleCityChange =(event)=>{
    changeCity(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      city: event.target.value
    }));
  }


  useEffect(() => {
    getStatesByCountryId('India');
  }, []);

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

  const allowNumbers = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      handleChange(event)
    }
  };

  const validateForm = () => {
    const errors = [];
    // Validate first_name
  if (!formData.first_name) {
    errors.push(1);
  }

  // Validate last_name
  if (!formData.last_name) {
    errors.push(2);
  }

  // Validate father_name
  if (!formData.father_name) {
    errors.push(3);
  }

  // Validate mother_name
  if (!formData.mother_name) {
    errors.push(4);
  }


  // Validate address1
  if (!formData.address1) {
    errors.push(5);
  }


  // Validate state
  if (!formData.state) {
    errors.push(6);
  }
  // Validate religion
  if (!formData.religon) {
    errors.push(9);
  }

  // Validate category
  if (!formData.category) {
    errors.push(10);
  }

  // Validate city
  if (!formData.city) {
    errors.push(1);
  }

  // Validate pincode
  if (formData.pincode.length<6) {
    errors.push(1);
  }

  // Validate gender
  if (!formData.gender) {
    errors.push(1);
  }

  // Validate aadhar_id
  if (formData.aadhar_id.length<12) {
    errors.push(1);
  }

  // Validate dob
  // if (!formData.dob) {
  //   errors.push(1);
  // }

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

  const handleDropdownStatusType = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      status: event.target.value
    }));
  };

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
  const changeOrphan =(event) =>{
    setFormData((prevData) => ({
      ...prevData,
      orphan: event.target.value
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
  const [sendForm,setSendForm]=useState(false);

  useEffect(()=>{
    const errors=validateForm();
    if(errors.length==0) setSendForm(false);
    else setSendForm(true)
    console.log(errors);
  },[formData])

  const maxDate=new Date().toLocaleDateString('fr-ca')
  // maxDate.setDate(maxDate.getDate() - 1);

  return (
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form >
        {/* Header */}
        <div className="form-progress flex justify-around items-center mt-8">
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>1</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic Details</p></div>
          </div>

          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 2 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>2</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Medical Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Parents and College Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 4 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>4</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Attachments</p></div>
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
              {/* 1.1 -- Student Name*/}
              <div className='w-full h-auto flex justify-between'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">First Name <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="first_name"
                      disabled={display}
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.first_name && <span className="error text-red-500">{errors.first_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Last Name <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="last_name"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Father's Name <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="father_name"
                      disabled={display}
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.father_name && <span className="error text-red-500">{errors.father_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Mother's Name <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="mother_name"
                      disabled={display}
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.mother_name && <span className="error text-red-500">{errors.mother_name}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Gender <p className='inline text-xl text-red-600'>*</p></div>
                    <select 
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={formData.gender} 
                        onChange={changeGender}
                        disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium w-full">Date of Birth <p className='inline text-xl text-red-600'>*</p></div>
                    {/* <DatePicker
                      selected={formData.dob}
                      disabled={display}
                      onChange={changeDate}
                      dateFormat="yyyy-MM-dd"
                      maxDate={maxDate}
                      className='w-80 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    /> */}
                    <input 
                      type="date"
                      id="dob"
                      name="dob"
                      disabled={display}
                      value={formData.dob}
                      max={maxDate}
                      onChange={handleChange}
                      className='w-80 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.dob && <span className="error text-red-500">{errors.dob}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-full flex flex-col items-start'>
                  <div className='w-full'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Aadhar Number <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="aadhar_id"
                      name="aadhar_id"
                      disabled={display}
                      value={formData.aadhar_id}
                      maxLength={12} 
                      onChange={allowNumbers}
                      className='w-full border-gray-400 rounded-md font-montserrat px-2 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.aadhar_id && <span className="error text-red-500">{errors.aadhar_id}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Religon<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="religon"
                      disabled={display}
                      name="religon"
                      value={formData.religon}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.religon && <span className="error text-red-600">{errors.religon}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Category<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="category"
                      disabled={display}
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.category && <span className="error text-red-600">{errors.category}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Height (in cm)<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="Number"
                      id="height"
                      name="height"
                      disabled={display}
                      value={formData.height}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.height && <span className="error text-red-500">{errors.height}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Weight (in kg) <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="Number"
                      id="weight"
                      name="weight"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Handicapped <p className='inline text-xl text-red-600'></p></div>
                    <select
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5 ' 
                        value={formData.handicapped} 
                        onChange={changeHandicappStatus}
                        disabled={display}
                        >
                        <option value='true'>Yes</option>
                        <option value='partial'>Partially</option>
                        <option value='false'>No</option>
                      </select>
                      {errors.mess && <span className="error text-red-500">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="medical_history">Handicapped Percentage<p className='inline text-xl text-red-600'></p></div>
                    <input
                      disabled={formData.handicapped=='false' ? true:false}
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
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Handicapped Type <p className='inline text-xl text-red-600'></p></div>
                    <select
                        disabled={formData.handicapped=='false' ? true:false}
                        className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                        value={formData.handicapped_type} 
                        onChange={changeHandicappType}
                        >
                        <option value="nil">Select Handicap Type</option>
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
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="medical_history">Orphan<p className='inline text-xl text-red-600'></p></div>
                    <select
                          className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                          value={formData.orphan} 
                          onChange={changeOrphan}
                          disabled={display}
                          >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                          
                        </select>
                        {errors.orphan && <span className="error text-red-500">{errors.orphan}</span>}
                </div>
                </div> 
              </div>

            <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-4 mb-2 font-popins'>
                <p className=' font-popins'>Address </p>
            </div>
            
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Address Line 1<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      disabled={display}
                      value={formData.address1}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.address1 && <span className="error text-red-500">{errors.address1}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Address Line 2 <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Country <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="state"
                      name="country"
                      disabled={display}
                      value={'India'}
                      onChange={handleChange}
                      className='bg-slate-200 w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1'
                    />
                    {errors.country && <span className="error text-red-500">{errors.country}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">State <p className='inline text-xl text-red-600'>*</p></div>
                  <select id="state" onChange={handleStateChange}
                   className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                   value={State} 
                   disabled={display}
                  >
                    <option value="">Select a state</option>
                    {allState.map((state) => (
                      <option value={state.state_name}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                    {errors.state && <span className="error text-red-500">{errors.state}</span>}
                </div>
                </div>
              </div>

              {/* 2.4 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">City <p className='inline text-xl text-red-600'>*</p></div>
                  <select id="city" onChange={handleCityChange}
                   className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                   value={City} 
                   disabled={display}
                  >
                    <option value="">Select a City</option>
                    {allCity.map((city) => (
                      <option value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                    {errors.state && <span className="error text-red-500">{errors.state}</span>}
                </div>

                

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Pincode <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      maxLength={6} 
                      onChange={allowNumbers}
                      value={formData.pincode}
                      disabled={display}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {errors.pincode && <span className="error text-red-500">{errors.pincode}</span>}
                </div>
                
                </div> 
                <div className='w-1/2 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Status <p className='inline text-xl text-red-600'></p></div>
                      <select
                        disabled={display} 
                          className='bg-slate-200 w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1' 
                          value={formData.status}
                          onChange={handleDropdownStatusType}
                          >
                          <option disabled value="NA">Select an option</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="block">Block</option>
                      </select>
                      {errors.status && <span className="error text-red-600">{errors.status}</span>}
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
                <button onClick={handleNextPage} 
                 disabled={sendForm}
                  className={`h-10 ${sendForm ? 'bg-gray-500' : 'bg-accent2'} text-lg font-semibold text-white border-none rounded-2xl`}>
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
const Page2 = ({currentPage,formData,setFormData,nextPage,previousPage,display}) =>{
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
  


  function validateForm() {
    let errors = []

    // // Validate blood_group
    // if (!formData.blood_group) {
    //   errors.push(1);
    // }
  
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
  const [sendForm,setSendForm]=useState(false);

  useEffect(()=>{
    const errors=validateForm();
    if(errors.length==0) setSendForm(false);
    else setSendForm(true)
    console.log(errors.length);
  },[formData])

  return (
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form>
        <div className="form-progress flex justify-around items-center mt-8">
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>1</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic Details</p></div>
          </div>

          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 2 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>2</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Medical Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Parents and College Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 4 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>4</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Attachments</p></div>
          </div>
        </div>
        {/* Form Data */}

        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-8 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
            <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className=' font-popins'>Medical</p>
            </div>
              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium " htmlFor="email_id">Blood Group <p className='inline text-xl text-red-600'></p></div>
                    <select
                    disabled={display}
                        className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5 ' 
                        value={formData?.blood_group} 
                        onChange={changeBloodGroup}
                        >
                        <option value=''>Select Blood Group</option>
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
                      disabled={display}
                      type="text"
                      id="medical_history"
                      name="medical_history"
                      value={formData?.medical_history}
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
                      disabled={display}
                      id="medicine_taken"
                      name="medicine_taken"
                      value={formData?.medicine_taken}
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
                      disabled={display}
                      id="birth_mark"
                      name="birth_mark"
                      value={formData?.birth_mark}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.birth_mark && <span className="error text-red-500">{errors.birth_mark}</span>}
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
                <button onClick={handleNextPage} 
                  disabled={sendForm}
                  className={`h-10 ${sendForm ? 'bg-gray-500' : 'bg-accent2'} text-lg font-semibold text-white border-none rounded-2xl`}>
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

const Page3 = ({currentPage,formData,setFormData,nextPage,previousPage,display}) =>{
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

  const allowNumbers = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      handleChange(event)
    }
  };


  const validateForm = () => {
    let errors = [];
    // Validate personal_mobile
    if (formData.personal_mobile && formData.personal_mobile.length!=10) {
      errors.push(1);
    }
  
    // Validate parent_mobile
    if (formData.parent_mobile && formData.parent_mobile.length!=10) {
      errors.push(1);
    }
  
    // // Validate teacher_mobile
    if (formData.teacher_mobile && formData.teacher_mobile.length!=10) {
      errors.push(1);
    }
  
    // Validate college_address1
    if (!formData.college_address1) {
      errors.push(1);
    }
  
    // // Validate personal_email
    if (!formData.personal_email) {
      errors.push(1);
    }
  
    // Validate parent_email
    // if (!formData.parent_email) {
    //   errors.push(1);
    // }
  
    // // Validate teacher_email
    // if (!formData.teacher_email) {
    //   errors.teacher_email = "Teacher email is required";
    // }
  
    // Validate collage_name
    if (!formData.collage_name) {
      errors.push(1);
    }
  
    // Validate principle_name
    if (!formData.principle_name) {
      errors.push(1);
    }

  
    // Set the errors using setErrors
    // setErrors(errors);
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

  const [sendForm,setSendForm]=useState(false);

  useEffect(()=>{
    const errors=validateForm();
    if(errors.length==0) setSendForm(false);
    else setSendForm(true)
    console.log(errors.length);
  },[formData])

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
    useEffect(() => {
      hostel_name_and_id_fetch();
    }, []);

    const handleChange1 = (event) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        hostel_name_or_id: event.target.value,
      }));
    };

  return (
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form>
        {/* Header */}
        <div className="form-progress flex justify-around items-center mt-8">
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>1</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic Details</p></div>
          </div>

          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 2 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>2</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Medical Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Parents and College Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 4 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>4</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Attachments</p></div>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white  w-10/12 h-auto mt-8 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}

              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className=' font-popins'>Hostel Selection </p>
              </div>

              <div className='w-full h-auto flex flex-col mt-1'>
                <div className="mb-1 font-popins text-lg font-medium" htmlFor="description">Select Hostel Name or ID *</div>
              <select
                id="hostel_name_or_id"
                name="hostel_name_or_id"
                value={formData.hostel_name_or_id} // Use formData.hostel_name_or_id to pre-select the dropdown option based on the state
                onChange={handleChange1} // Use handleChange for handling dropdown change
                className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
              >
                <option value="">-- Select an option --</option>
                {hostel_name_and_id.map((item) => (
                  <option value={item[0]}>{item[1] + "  |  " + item[0]}</option>
                ))}
              </select>
              {errors.hostel_name_or_id && <span className="error">{errors.hostel_name_or_id}</span>}
            </div>

              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-2xl pt-3 mb-3 font-popins'>
                <p className=' font-popins'>Parent details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Personal Contact Number <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type='text'
                      id="personal_mobile"
                      name="personal_mobile"
                      disabled={display}
                      maxLength={10}
                      onChange={allowNumbers}
                      value={formData.personal_mobile}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.personal_mobile && <span className="error text-red-600">{errors.personal_mobile}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Parents Contact Number <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="parent_mobile"
                      name="parent_mobile"
                      disabled={display}
                      value={formData.parent_mobile}
                      maxLength={10}
                      onChange={allowNumbers}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.parent_mobile && <span className="error text-red-600">{errors.parent_mobile}</span>}
                </div>
                </div>
              </div>

              

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Personal Email ID<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="personal_email"
                      name="personal_email"
                      disabled={display}
                      value={formData.personal_email}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.personal_email && <span className="error text-red-600">{errors.personal_email}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Parents Email ID<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="parent_email"
                      name="parent_email"
                      disabled={display}
                      value={formData.parent_email}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.parent_email && <span className="error text-red-600">{errors.parent_email}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2 flex flex-col items-start'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Family Income (lakh per annum)<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="number"
                      id="income"
                      disabled={display}
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.income && <span className="error text-red-600">{errors.income}</span>}
                </div>
                </div>
              </div>

              <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>College details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">College Name<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="collage_name"
                      name="collage_name"
                      disabled={display}
                      value={formData.collage_name}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.collage_name && <span className="error text-red-600">{errors.collage_name}</span>}
                </div>

                
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">College Address Line 1<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="college_address1"
                      name="college_address1"
                      disabled={display}
                      value={formData.college_address1}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.college_address1 && <span className="error text-red-500">{errors.college_address1}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">College Address Line 2 <p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="college_address2"
                      name="college_address2"
                      disabled={display}
                      value={formData.college_address2}
                      onChange={handleChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.college_address2 && <span className="error text-red-500">{errors.college_address2}</span>}
                </div>
                </div>
              </div>
              
              <div className='w-full h-auto flex justify-between mt-3'>
              <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Principle Name<p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="principle_name"
                      name="principle_name"
                      disabled={display}
                      value={formData.principle_name}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.principle_name && <span className="error text-red-500">{errors.principle_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium   " htmlFor="email_id">Principle Contact Number <p className='inline text-xl text-red-600'>*</p></div>
                    <input
                      type="text"
                      id="teacher_mobile"
                      name="teacher_mobile"
                      disabled={display}
                      value={formData.teacher_mobile}
                      maxLength={10}
                      onChange={allowNumbers}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.teacher_mobile && <span className="error text-red-500">{errors.teacher_mobile}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mt-3'>
              <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Principle Email ID<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      id="teacher_email"
                      name="teacher_email"
                      disabled={display}
                      value={formData.teacher_email}
                      onChange={handleChange}
                      className='w-11/12 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5'
                    />
                    {errors.teacher_email && <span className="error text-red-500">{errors.teacher_email}</span>}
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
                <button onClick={handleNextPage} 
                disabled={sendForm}
                className={`h-10 ${sendForm ? 'bg-gray-500' : 'bg-accent2'}  text-lg font-semibold text-white border-none rounded-2xl mt-5`}>
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

const Page4 = ({currentPage,previousPage,formData,setFormData,display,edit,review}) =>{
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = [];
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted successfully!');
      axios.post('http://localhost:7000/student/registration', formData)
      .then((response) => {
        // alert
        console.log('API response:', formData);
        alert(response.data);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('API request error:', formData);
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
    const errors = [];
    // Validate photo_file
  if (!formData.photo_file) {
    errors.push(1);
  }

  // Validate aadhar_file
  if (!formData.aadhar_file) {
    errors.push(1);
  }

  // Validate caste_file
  if (!formData.caste_file) {
    errors.push(1);
  }

  // Validate medical_file
  // if (!formData.medical_file) {
  //   errors.medical_file = "Medical file is required";
  // }
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

  const [IselectedFile, IsetSelectedFile] = useState(null);
  const handleIncomeChange = (e) => {
    const file = e.target.files[0];
    IsetSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      income_cer: file
    }));
  };


  const [BDselectedFile, BDsetSelectedFile] = useState(null);
  const handleBDChange = (e) => {
    const file = e.target.files[0];
    BDsetSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      bank_details: file
    }));
  };
  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
  }

  const [sendForm,setSendForm]=useState(false);

  useEffect(()=>{
    const errors=validateForm();
    if(errors.length==0) setSendForm(false);
    else setSendForm(true)
    console.log(errors.length);
  },[formData])

  return (
    <div className="flex bg-defaultBg" >
      {/* Main Content */}
      <div className="w-full h-full">
      <form>
          <div className="form-progress flex justify-around items-center mt-8">
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 1 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>1</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Basic Details</p></div>
          </div>

          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 2 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>2</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Medical Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 3 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>3</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Parents and College Details</p></div>
          </div>
          <div className='pl-2 pr-2 flex-col justify-center'>
            <div className='flex justify-center'>
                    <div
                        className={`step ${currentPage >= 4 ? 'align-middle rounded-full bg-green-500 w-9 h-9 flex-col justify-center' : 'rounded-full bg-gray-400 w-10 h-10 flex-col justify-center align-middle'}`}
                    >
                        <p className='text-center font-extrabold text-2xl align-middle'>4</p>
                    </div>
            </div>
            <div><p className='font-popins font-sm text-sm text-gray-500'>Attachments</p></div>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-10/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
            <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-1 font-popins'>
                <p className=' font-popins'>Bank Details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Account Holder Name<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Bank name<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">IFSC<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="text"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Account Number<p className='inline text-xl text-red-600'></p></div>
                    <input
                      type="number"
                      disabled={display}
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

              <div className='underline  underline-offset-1 text-sky-950 text-2xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Attachments </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-4'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Photo <p className='inline text-xl text-red-600'>*</p></div>
                    <input 
                      type="file"
                      disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Aadhar<p className='inline text-xl text-red-600'>*</p></div>
                  <input 
                      type="file" 
                      disabled={display}
                      id="photo" 
                      accept=".pdf"
                      onChange={handleAadharChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {AselectedFile && (
                        <iframe
                        disabled={display}
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Caste Certificate  <p className='inline text-xl text-red-600'>*</p></div>
                    <input 
                      type="file"
                      disabled={display} 
                      id="photo" 
                      accept=".pdf"
                      onChange={handleCasteChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {CselectedFile && (
                        <iframe
                        disabled={display}
                        src={URL.createObjectURL(CselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat' 
                      />
                    )}
                    {errors.photo_file && <span className="error text-red-500">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Medical Certificates<p className='inline text-xl text-red-600'></p></div>
                  <input 
                      type="file"
                      disabled={display}
                      id="photo" 
                      accept=".pdf"
                      onChange={handleMedicalChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {MselectedFile && (
                        <iframe
                        disabled={display}
                        src={URL.createObjectURL(MselectedFile)}
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
                  <div className="mb-1 font-popins text-lg font-medium  " htmlFor="email_id">Income Certificate  <p className='inline text-xl text-red-600'></p></div>
                    <input 
                      type="file" 
                      disabled={display}
                      id="photo" 
                      accept=".pdf"
                      onChange={handleIncomeChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {IselectedFile && (
                        <iframe
                        disabled={display}
                        src={URL.createObjectURL(IselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat' 
                      />
                    )}
                    {errors.photo_file && <span className="error text-red-500">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-lg font-medium" htmlFor="email_id">Bank Details<p className='inline text-xl text-red-600'></p></div>
                  <input 
                      type="file"
                      disabled={display}
                      id="photo" 
                      accept=".pdf"
                      onChange={handleBDChange}
                      className='w-full border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                    />
                    {BDselectedFile && (
                        <iframe
                        disabled={display}
                        src={URL.createObjectURL(BDselectedFile)}
                        title="PDF Preview"
                        className='w-32 h-32 border-gray-400 rounded-md font-montserrat px-1 py-1 focus:outline-none border-1 focus:border-orange-600 focus:border-1.5' 
                      />
                    )}
                    {errors.aadhar_file && <span className="error text-red-500">{errors.aadhar_file}</span>}
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
                <button className={`h-10 ${sendForm ? 'bg-gray-500' : 'bg-accent2'}  text-lg font-semibold text-white border-none rounded-2xl mt-5`} 
                disabled={sendForm} onClick={handleSubmit}
                >
                  Save 
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

const StudentRegistartion = (props) =>{
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:'',
    father_name:'',
    mother_name:'',
    address1:'',
    address2:'',
    country:'India',
    state:'',
    status:'active',
    city:'',
    pincode:'',
    gender:'',
    aadhar_id:'',
    dob:'',
    height:'',
    weight:'',
    blood_group:'',
    medical_history:'',
    medicine_taken:'',
    birth_mark:'',
    handicapped:'false',
    handicapped_per:'',
    handicapped_type:'nil',
    orphan:'',
    personal_mobile:'',
    parent_mobile:'',
    teacher_mobile:'',
    personal_email:'',
    parent_email:'',
    teacher_email:'',
    collage_name:'',
    principle_name:'',
    religon:'',
    category:'',
    income:'',
    college_address1:'',
    college_address2:'',
    photo_file:'',
    aadhar_file:'',
    caste_file:'',
    medical_file:'',
    income_cer:'',
    bank_details:'',
    account_holder_name:'',
    bank_name:'',
    ifsc:'',
    account_number:'',
    hostel_name_or_id:''
  });

  const [existingformData, setExistingFormData] = useState(null)

  useEffect(()=>{
    if(props.ExistingFormData){
      setFormData(props.ExistingFormData)
      // setFormData((prevData) => ({
      //   ...prevData,
      //   dob: ''
      // }));
    }
  },[])

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
    }, 100000);

    clearInterval(intervalId);
    
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
        </div>
        </div>
      {currentPage === 1 && (
        <Page1 currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} display={props.display}/>
      )}
      {currentPage === 2 && (
        <Page2 currentPage={currentPage} formData={existingformData ? formData:existingformData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} display={props.display}/>
      )}
      {currentPage === 3 && (
        <Page3  currentPage={currentPage} formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} display={props.display}/>
      )}
      {currentPage === 4 && (
        <Page4  currentPage={currentPage} formData={formData} setFormData={setFormData} previousPage={previousPage} display={props.display} edit={props.edit} review={props.Review}/>
      )}
    </>
    
  );
}
export default StudentRegistartion;