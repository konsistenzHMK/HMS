import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';

const TowerRegistartion = () =>{
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
    dob:'',
    height:Number,
    weight:Number,
    blood_group:'',
    medicle_history:'',
    medicine_taken:'',
    birth_mark:'',
    handicapped:Boolean,
    handicapped_per:Number,
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
    // attchments
    // Bank Details
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
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Lastname **</div>
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

              {/* 2 -- Parents Name  */}
              <div className='w-full h-auto flex justify-between mt-2'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Father's Name **</div>
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
                  <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Mother's Name **</div>
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

              </div>
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

export default TowerRegistartion;