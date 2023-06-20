import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page4 = () =>{
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

export default StudentRegistartion;