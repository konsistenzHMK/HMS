import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import Dropdown from 'react-dropdown';

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
      // setFormData({
      //   hostel_name: '',
      //   description:'',
      //   address1:'',
      //   address2:'',
      //   country:'',
      //   state:'',
      //   region:'',
      //   district:'',
      //   city:'',
      //   pincode:'',
      //   uuid:'',
      //   rector_name:'',
      //   categ1:'',
      //   categ2:'',
      //   categ3:'',
      //   tower:'',
      //   floor:'',
      //   room:'',
      //   scapacity:'',
      //   bcapacity:'',
      //   area:'',
      //   mess:'',
      //   other_facility:'',
      //   status:'',
      //   email_id:'',
      //   website:'',
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
    <div className="flex">
      {/* Side Navbar */}
      <div className="w-1/6 bg-accent">

      </div>

      {/* Main Content */}
      <div className="w-5/6 h-full">
      <form onSubmit={handleSubmit}>
        {/* Header */}
        <div className='w-full bg-defaultBg h-36 flex '>
          <div className='h-auto bg-white w-11/12 my-auto ml-10 drop-shadow-xl border-none rounded-lg font-popins'>
            <p className='pl-10 pt-4  text-sky-800 font-extrabold text-3xl font-popins'>Hostel Mangement System 🎉</p>
            <p className='pl-10 pb-4 text-orange-400 font-semibold text-2xl font-popins'>Hostel Registration Form</p>
          </div>
        </div>

        {/* Form Data */}
        <div className='w-full h-full bg-defaultBg flex justify-center font-popins'>
          <div className="bg-white w-11/12 h-auto mt-10 border-none rounded-lg flex justify-center font-popins">
            <div className='w-5/6 h-auto mt-5 mb-5 ml-6 mr-6 flex flex-col font-popins'>
              {/* 1 --> Basic Details */}
              <div className='font-semibold underline  underline-offset-1 text-sky-950 text-3xl pt-3 mb-3 font-popins'>
                <p className='font-popins'>Basic Details</p>
              </div>
              
              {/* 1.1 */}
              <div className='w-full h-auto flex flex-col mt-3 font-popins'>
                <div className="mb-1 font-popins text-xl font-medium  " htmlFor="description">Hostel Name *</div>
                <input
                  id="hostel_name"
                  name="hostel_name"
                  value={formData.hostel_name}
                  onChange={handleChange}
                  className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                ></input>
                {errors.hostel_name && <span className="error">{errors.hostel_name}</span>}
              </div>

              {/* 1.2 */}
              <div className='w-full h-auto flex flex-col mt-3 font-popins'>
                <div className="mb-1 font-popins text-xl font-medium  " htmlFor="description">Hostel Description *</div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                ></textarea>
                {errors.description && <span className="error">{errors.description}</span>}
              </div>

            {/* 2 --> Address*/}
            <div className='underline  underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mb-3 font-popins'>
                <p className=' font-popins'>Address </p>
            </div>
            {/* 2.1 */}

            <div className='w-full h-auto flex justify-between'>
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
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
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
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
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

              {/* 4 */}
              <div className='underline underline-offset-1 text-sky-950 text-3xl font-semibold pt-4 mb-3 font-popins'>
                <p className=''>Advance Details</p>
            </div>

            {/* 4.1 --> 1*/}
            <div className='w-full h-auto flex justify-between'>
                <div className='w-full'>
                  <div className="w-full mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Hostel Rector *</div>
                    <input
                      type="text"
                      id="rector_name"
                      name="rector_name"
                      value={formData.rector_name}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.rector_name && <span className="error">{errors.rector_name}</span>}
                </div>
              </div>

              {/* 4.2 -->3 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium  " htmlFor="email_id">Category-1 **</div>
                      <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={category1} 
                        onChange={handleDropdownCat1}
                        >
                        <option value="">Select an option</option>
                        <option value="girls">Girls</option>
                        <option value="boys">Boys</option>
                        <option value="coed">Co-Ed</option>
                      </select>
                      {errors.categ1 && <span className="error">{errors.categ1}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Category-2 **</div>
                      <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={category2} 
                        onChange={handleDropdownCat2}
                        >
                        <option value="">Select an option</option>
                        <option value="t-1">type-1</option>
                        <option value="t-2">type-2</option>
                        <option value="t-3">type-3</option>
                      </select>
                      {errors.categ2 && <span className="error">{errors.categ2}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">Category-3 **</div>
                      <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={category3} 
                        onChange={handleDropdownCat3}
                        >
                        <option value="">Select an option</option>
                        <option value="rented">Rented</option>
                        <option value="government">Government</option>
                      </select>
                      {errors.categ3 && <span className="error">{errors.categ3}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.3 -> 3*/}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">No of Towers **</div>
                      <input
                        type="number"
                        id="tower"
                        name="tower"
                        value={formData.tower}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.tower && <span className="error">{errors.tower}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">No of Floors **</div>
                      <input
                        type="number"
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.floor && <span className="error">{errors.floor}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium   " htmlFor="email_id">No of Rooms **</div>
                      <input
                        type="number"
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.room && <span className="error">{errors.room}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.4 -->3 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Sanctioned Capacity **</div>
                      <input
                        type="number"
                        id="scapacity"
                        name="scapacity"
                        value={formData.scapacity}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.scapacity && <span className="error">{errors.scapacity}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Building Capacity **</div>
                      <input
                        type="number"
                        id="bcapacity"
                        name="bcapacity"
                        value={formData.bcapacity}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.bcapacity && <span className="error">{errors.bcapacity}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Total Area (sq.ft) *</div>
                      <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.area && <span className="error">{errors.area}</span>}
                  </div>
                  </div>
              </div>

              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/3 flex flex-col items-start'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium" htmlFor="email_id">Mess Type **</div>
                    <select 
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1' 
                        value={messType} 
                        onChange={handleDropdownMessType}
                        >
                        <option value="">Select an option</option>
                        <option value="government">Government</option>
                        <option value="contract">Contract</option>
                        <option value="other">Other</option>
                        <option value="not">Not Applicable</option>
                      </select>
                      {errors.mess && <span className="error">{errors.mess}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-center'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Other Facility **</div>
                      <input
                        type="text"
                        id="other_facility"
                        name="other_facility"
                        value={formData.other_facility}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.other_facility && <span className="error">{errors.other_facility}</span>}
                  </div>
                  </div>
                  <div className='w-1/3 flex flex-col items-end'>
                    <div className='w-11/12'>
                    <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Status *</div>
                      <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                      />
                      {errors.status && <span className="error">{errors.status}</span>}
                  </div>
                  </div>
              </div>

              {/* 4.5 */}
              <div className='w-full h-auto flex justify-between mt-3'>
                <div className='w-1/2'>
                  <div className="mb-1 font-popins text-xl font-medium " htmlFor="email_id">Hostel Email *</div>
                    <input
                      type="text"
                      id="email_id"
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleChange}
                      className='w-11/12 border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.email_id && <span className="error">{errors.email_id}</span>}
                </div>

                <div className='w-1/2 flex flex-col items-end'>
                  <div className='w-11/12'>
                  <div htmlFor="email_id" className='mb-1 font-popins text-xl font-medium'>Hostel Website *</div>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className='w-full border-2 border-sky-500 rounded-md font-montserrat px-1 py-1'
                    />
                    {errors.website && <span className="error">{errors.website}</span>}
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
              <div className='w-auto flex flex-col justify-center items-start'>
                {/* Logo */}
                <div className='text-sky-950 text-3xl font-bold font-sans'>Hostel Management System 🎉</div>
                <div className='text-orange-600 text-2xl font-semibold'>Hostel Registration Form ✨</div>
              </div>
              <div className='w-1/4 flex flex-col justify-center'>
                <button className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl'>
                  Save
                </button>
                <button className='h-1/2 bg-sky-600 text-xl font-semibold text-white border-none rounded-xl mt-5'>
                  Send for Approval
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

export default App;