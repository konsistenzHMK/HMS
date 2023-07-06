import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';

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
      <div className="w-full h-full">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-1/2 my-auto ml-10 drop-shadow-xl border-none rounded-lg'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Wing Registration Form</p>
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
              
              {/* 1.1 */}
              <div className='w-full h-auto flex flex-col mt-1'>
                <div className="mb-1 font-popins text-xl font-medium  " htmlFor="description">Tower Name or ID *</div>
                <input
                  id="hostel_id"
                  name="hostel_id"
                  value={formData.hostel_id}
                  onChange={handleChange}
                  className='w-full border-2 border-sky-500 rounded-md'
                ></input>
                {errors.hostel_id && <span className="error">{errors.hostel_id}</span>}
              </div>

            {/* 1.2 */}
              {/*  --> UUID */}

            <div className='w-full h-auto flex flex-col mb-2 mt-2'>
            <div className="mb-1 font-popins text-xl font-medium " htmlFor="description">Wing Name*</div>
            <input
                id="tower_name"
                name="tower_name"
                value={formData.tower_name}
                onChange={handleChange}
                className='w-full border-2 border-sky-500 rounded-md'
            ></input>
            {errors.tower_name && <span className="error">{errors.tower_name}</span>}
            </div>

            <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">No of Rooms **</div>
                    <input
                      type="Number"
                      id="no_wings"
                      name="no_wings"
                      value={formData.no_wings}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md'
                    />
                    {errors.no_wings && <span className="error">{errors.no_wings}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Capacity **</div>
                    <input
                      type="number"
                      id="no_rooms"
                      name="no_rooms"
                      value={formData.no_rooms}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md'
                    />
                    {errors.no_rooms && <span className="error">{errors.no_rooms}</span>}
                </div>
                </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Total Area (sq.ft) **</div>
                    <input
                      type="Number"
                      id="no_wings"
                      name="no_wings"
                      value={formData.no_wings}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md'
                    />
                    {errors.no_wings && <span className="error">{errors.no_wings}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end mb-2 mt-1'>
                  <div className='w-11/12'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Other facility **</div>
                    <input
                      type="text"
                      id="no_rooms"
                      name="no_rooms"
                      value={formData.no_rooms}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md'
                    />
                    {errors.no_rooms && <span className="error">{errors.no_rooms}</span>}
                </div>
                </div>
              </div>
              <div className='w-full h-auto flex justify-between mb-2 mt-1'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Type **</div>
                    <input
                      type="text"
                      id="other_facilities"
                      name="other_facilities"
                      value={formData.other_facilities}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md'
                    />
                    {errors.other_facilities && <span className="error">{errors.other_facilities}</span>}
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
                <div className='text-orange-600 text-2xl font-semibold'>Wing Registration Form ✨</div>
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

  );
};

export default TowerRegistartion;