import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page1 = ({ formData, setFormData, nextPage }) =>{
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
    return {};
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
    nextPage();
  }

  return (
    <div className="flex bg-defaultBg" >
      {/* Side Navbar */}
      <div className="w-1/6 bg-accent">

      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full">
      <form >
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-1/2 my-auto ml-10 drop-shadow-xl border-none rounded-lg'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Student Registration Form</p>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-11/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              <div className='font-bold underline  underline-offset-1 text-sky-950 text-xl mb-3'>
                <p className='text-3xl font-semibold pt-4 mb-3 font-popins '>Basic Details</p>
              </div>
              {/* 1.1 -- Student Name*/}
              <div className='w-full h-auto flex justify-between'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Firstname **</div>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.first_name && <span className="error">{errors.first_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Lastname **</div>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.last_name && <span className="error">{errors.last_name}</span>}
                </div>
                </div>
              </div>

              {/* 2 -- Parents Name  */}
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Father's Name **</div>
                    <input
                      type="text"
                      id="father_name"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.father_name && <span className="error">{errors.father_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Mother's Name **</div>
                    <input
                      type="text"
                      id="mother_name"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.address2 && <span className="error">{errors.address2}</span>}
                </div>
                </div>
              </div>

            <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mb-3 font-popins'>
                <p className=' font-popins'>Address </p>
            </div>
            
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Address Line 1 **</div>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.address1 && <span className="error">{errors.address1}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Address Line 2 **</div>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.address2 && <span className="error">{errors.address2}</span>}
                </div>
                </div>
              </div>
              {/* 2.2 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Country **</div>
                    <input
                      type="text"
                      id="state"
                      name="country"
                      value={'India'}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md bg-slate-200 font-montserrat px-1 py-1'
                    />
                    {errors.country && <span className="error">{errors.country}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">State **</div>
                    <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={State} 
                        onChange={handleChangeState}
                        >
                        <option value="">Select an option</option>
                        <option value="Maharashtra">Maharashtra</option>
                    </select>
                    {errors.state && <span className="error">{errors.state}</span>}
                </div>
                </div>
              </div>

              {/* 2.3 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Region **</div>
                      <select 
                        className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
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
                    {errors.region && <span className="error">{errors.region}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">District **</div>
                      <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
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
                    {errors.district && <span className="error">{errors.district}</span>}
                </div>
                </div>

              </div>

              {/* 2.4 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">City **</div>
                    <select 
                        className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
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
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Pincode **</div>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.pincode && <span className="error">{errors.pincode}</span>}
                </div>    
            </div>
            </div>
            <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Address Type **</div>
                    <select 
                        className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={formData.address_type} 
                        onChange={changeAddress}
                        >
                        <option value="none">Select an option</option>
                        <option value="Permanent Address">Permanent Address</option>
                        <option value="Relative Address">Relative Address</option>
                        <option value="College Address">College Address</option>
                        <option value="School Address">School Address</option>
                      </select>
                      {errors.mess && <span className="error">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Aadhar Number **</div>
                    <input
                      type="Number"
                      id="aadhar_id"
                      name="aadhar_id"
                      value={formData.aadhar_id}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.pincode && <span className="error">{errors.pincode}</span>}
                </div>
                </div> 
              </div>
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Gender **</div>
                    <select 
                        className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={formData.gender} 
                        onChange={changeGender}
                        >
                        <option value="none">Select an option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-Binary</option>
                      
                      </select>
                      {errors.mess && <span className="error">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Date of Birth **</div>
                    <DatePicker
                      selected={formData.dob}
                      onChange={changeDate}
                      dateFormat="yyyy-MM-dd"
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.pincode && <span className="error">{errors.pincode}</span>}
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
              <div className='w-auto flex flex-col justify-center items-start'>
                {/* Logo */}
                <div className='text-sky-950 text-3xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-2xl font-semibold'>Student Registration Form ✨</div>
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
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
const Page2 = ({formData,setFormData,nextPage,previousPage}) =>{
  const [errors, setErrors] = useState({});
  
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

  const handleNextPage =(e) =>{
    e.preventDefault();
    nextPage();
  }

  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
  }
  return (
    <div className="flex bg-defaultBg" >
      {/* Side Navbar */}
      <div className="w-1/6 bg-accent">

      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full">
      <form>
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-1/2 my-auto ml-10 drop-shadow-xl border-none rounded-lg'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Student Registration Form</p>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-11/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
            <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Medical History </p>
            </div>

            <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Height (in cm)**</div>
                    <input
                      type="Number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.height && <span className="error">{errors.height}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Weight (in kg) **</div>
                    <input
                      type="Number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.weight && <span className="error">{errors.weight}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Blood Group **</div>
                    <select
                        className='overflow-y-scroll max-h-10 w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1 ' 
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
                      {errors.mess && <span className="error">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="medical_history"> Medical History **</div>
                    <input
                      type="text"
                      id="medical_history"
                      name="medical_history"
                      value={formData.medical_history}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.medical_history && <span className="error">{errors.medical_history}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Medicine taken</div>
                    <input
                      type="text"
                      id="medicine_taken"
                      name="medicine_taken"
                      value={formData.medicine_taken}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.medicine_taken && <span className="error">{errors.medicine_taken}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Birth Mark</div>
                    <input
                      type="text"
                      id="birth_mark"
                      name="birth_mark"
                      value={formData.birth_mark}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.birth_mark && <span className="error">{errors.birth_mark}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Handicapped **</div>
                    <select
                        className='overflow-y-scroll max-h-10 w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1 ' 
                        value={formData.handicapped} 
                        onChange={changeHandicappStatus}
                        >
                        <option value="none">Handicapped Status</option>
                        <option value='true'>Yes</option>
                        <option value='partial'>Partially</option>
                        <option value='false'>No</option>
                      </select>
                      {errors.mess && <span className="error">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="medical_history">Handicapped Percentage**</div>
                    <input
                      type="number"
                      id="handicapped_per"
                      name="handicapped_per"
                      value={formData.handicapped_per}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.handicapped_per && <span className="error">{errors.handicapped_per}</span>}
                </div>
                </div> 
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Handicapped Type **</div>
                    <select
                        className='overflow-y-scroll max-h-10 w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1 ' 
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
                      {errors.mess && <span className="error">{errors.mess}</span>}
                </div>
                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="medical_history">Orphan**</div>
                    <select
                          className='overflow-y-scroll max-h-10 w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1 ' 
                          value={formData.orphan} 
                          onChange={changeOrphan}
                          >
                          <option value="">Select status </option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.mess && <span className="error">{errors.mess}</span>}
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
              <div className='w-auto flex flex-col justify-center items-start'>
                {/* Logo */}
                <div className='text-sky-950 text-3xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-2xl font-semibold'>Student Registration Form ✨</div>
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
                  Next Page
                </button>
                <button onClick={handlePrevPage} className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
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

const Page3 = ({formData,setFormData,nextPage,previousPage}) =>{
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextPage =(e) =>{
    e.preventDefault();
    nextPage();
  }

  const handlePrevPage =(e) =>{
    e.preventDefault();
    previousPage();
  }



  const validateForm = () => {
    const errors = {};
    return {};
  };


  return (
    <div className="flex bg-defaultBg" >
      {/* Side Navbar */}
      <div className="w-1/6 bg-accent">

      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full">
      <form>
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-1/2 my-auto ml-10 drop-shadow-xl border-none rounded-lg'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Student Registration Form</p>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-11/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              

              <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Contact details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Personal Mobile no **</div>
                    <input
                      type="Number"
                      id="personal_mobile"
                      name="personal_mobile"
                      value={formData.personal_mobile}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.personal_mobile && <span className="error">{errors.personal_mobile}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Parents Mobile no **</div>
                    <input
                      type="Number"
                      id="parent_mobile"
                      name="parent_mobile"
                      value={formData.parent_mobile}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.parent_mobile && <span className="error">{errors.parent_mobile}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Teacher Mobile no**</div>
                    <input
                      type="Number"
                      id="teacher_mobile"
                      name="teacher_mobile"
                      value={formData.teacher_mobile}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.teacher_mobile && <span className="error">{errors.teacher_mobile}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Emergency Contact no**</div>
                    <input
                      type="Number"
                      id="emergency_number"
                      name="emergency_number"
                      value={formData.emergency_number}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.weight && <span className="error">{errors.weight}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Personal Email ID**</div>
                    <input
                      type="text"
                      id="personal_email"
                      name="personal_email"
                      value={formData.personal_email}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.personal_email && <span className="error">{errors.personal_email}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Parents Email ID**</div>
                    <input
                      type="text"
                      id="parent_email"
                      name="parent_email"
                      value={formData.parent_email}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.parent_email && <span className="error">{errors.parent_email}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Teacher Email ID**</div>
                    <input
                      type="text"
                      id="teacher_email"
                      name="teacher_email"
                      value={formData.teacher_email}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.teacher_email && <span className="error">{errors.teacher_email}</span>}
                </div>
              </div>

              <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Other details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">College Name**</div>
                    <input
                      type="text"
                      id="collage_name"
                      name="collage_name"
                      value={formData.collage_name}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.collage_name && <span className="error">{errors.collage_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Principle Name**</div>
                    <input
                      type="text"
                      id="principle_name"
                      name="principle_name"
                      value={formData.principle_name}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.principle_name && <span className="error">{errors.principle_name}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Religon**</div>
                    <input
                      type="text"
                      id="religon"
                      name="religon"
                      value={formData.religon}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.religon && <span className="error">{errors.religon}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Category**</div>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.category && <span className="error">{errors.category}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Sub Category**</div>
                    <input
                      type="text"
                      id="subCategory"
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.subCategory && <span className="error">{errors.subCategory}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Family Income (lakh per annum)**</div>
                    <input
                      type="number"
                      id="income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.income && <span className="error">{errors.income}</span>}
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
              <div className='w-auto flex flex-col justify-center items-start'>
                {/* Logo */}
                <div className='text-sky-950 text-3xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-2xl font-semibold'>Student Registration Form ✨</div>
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button onClick={handleNextPage} className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
                  Next Page
                </button>
                <button onClick={handlePrevPage} className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
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

const Page4 = ({formData,setFormData}) =>{
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
    return {};
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    setFormData((prevData) => ({
      ...prevData,
      photo_file: file
    }));
  };


  const handleAadharChange = (e) => {
    const file = e.target.files[0];
    
    setFormData((prevData) => ({
      ...prevData,
      aadhar_file: file
    }));
  };

  return (
    <div className="flex bg-defaultBg" >
      {/* Side Navbar */}
      <div className="w-1/6 bg-accent">

      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-1/2 my-auto ml-10 drop-shadow-xl border-none rounded-lg'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Student Registration Form</p>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-11/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Attachments </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Photo Attachment **</div>
                    <input 
                      type="file" 
                      id="photo" 
                      accept=".jpg, .jpeg, .png"
                      onChange={handlePhotoChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.photo_file && <span className="error">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Upload Aadhar**</div>
                  <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handleAadharChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.aadhar_file && <span className="error">{errors.aadhar_file}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Caste Certificate  **</div>
                    <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handlePhotoChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.photo_file && <span className="error">{errors.photo_file}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Medical Certificates**</div>
                  <input 
                      type="file" 
                      id="photo" 
                      accept=".pdf"
                      onChange={handlePhotoChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                    />
                    {errors.aadhar_file && <span className="error">{errors.aadhar_file}</span>}
                </div>
                </div>
              </div>

              <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mt-1 mb-3 font-popins'>
                <p className=' font-popins'>Bank Details </p>
              </div>

              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Account Holder Name**</div>
                    <input
                      type="text"
                      id="account_holder_name"
                      name="account_holder_name"
                      value={formData.account_holder_name}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.account_holder_name && <span className="error">{errors.account_holder_name}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Bank name**</div>
                    <input
                      type="text"
                      id="bank_name"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.bank_name && <span className="error">{errors.bank_name}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">IFSC**</div>
                    <input
                      type="text"
                      id="ifsc"
                      name="ifsc"
                      value={formData.ifsc}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.ifsc && <span className="error">{errors.ifsc}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Account Number**</div>
                    <input
                      type="Number"
                      id="account_number"
                      name="account_number"
                      value={formData.account_number}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.account_number && <span className="error">{errors.account_number}</span>}
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
              <div className='w-auto flex flex-col justify-center items-start'>
                {/* Logo */}
                <div className='text-sky-950 text-3xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-2xl font-semibold'>Student Registration Form ✨</div>
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
                  Submit 
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
    personal_mobile:Number,
    parent_mobile:Number,
    teacher_mobile:Number,
    emergency_number:Number,
    personal_email:'',
    parent_email:'',
    teacher_email:'',
    collage_name:'',
    principle_name:'',
    class:'',
    result:'',
    religon:'',
    category:'',
    subCategory:'',
    income:'',
    quota:'',
    photo_file:null,
    aadhar_file:null,
    // Bank Details
    account_holder_name:'',
    bank_name:'',
    ifsc:'',
    account_number:Number
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
        <Page1 formData={formData} setFormData={setFormData} nextPage={nextPage} />
      )}
      {currentPage === 2 && (
        <Page2 formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} />
      )}
      {currentPage === 3 && (
        <Page3 formData={formData} setFormData={setFormData} nextPage={nextPage} previousPage={previousPage} />
      )}
      {currentPage === 4 && (
        <Page4 formData={formData} setFormData={setFormData} />
      )}
    </>
    
  );
}
export default StudentRegistartion;