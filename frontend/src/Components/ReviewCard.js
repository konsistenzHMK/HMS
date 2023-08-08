import React, { useState } from 'react'

const ReviewCard = (props) => {
    const [formData,setFormData]=useState(props.data);
    const setAll=()=>{
        props.setFormDataOut(formData);
        props.setShowForm(true);
    }

    const setEdi2=()=>{
        props.setFormDataOut(formData);
        props.setEdit2(true);
    }

    const setDisplay=()=>{
        props.setFormDataOut(formData);
        props.setDisplay(true);
    }
  return (
    <div className='w-full flex mt-10 mb-10 border-0 rounded-lg'>
        {/* Details */}
        <div className='w-4/5 bg-gray-200 flex-col p-3'>
            {/* Hostel name */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>Hostel Name :<p className='inline ml-2 text-black'>{formData.hostel_name} ({formData.uuid}) </p></div>
                <div className='ml-20'>Status :<p className='inline text-black'> {formData.status}</p></div>
            </div>

            {/* Address */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>Address :<p className='inline ml-5 text-black'>{formData.address1}</p></div>
            </div>

            {/* Country and State */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>Country :<p className='inline ml-5 text-black'>{formData.country}</p></div>
                <div className='ml-40'>State :<p className='inline ml-5 text-black'>{formData.state}</p></div>
            </div>

            {/* District and Taluka */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>District :<p className='inline ml-5 text-black'>{formData.district}</p></div>
                <div className='ml-40'>Taluka :<p className='inline ml-5 text-black'>{formData.city}</p></div>
            </div>
        </div>

        {/* Buttons */}
        <div className='w-1/5 bg-stone-400 pt-5'>
            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                onClick={setAll}
            >
                <p className='font-popins text-normal'>Edit</p>
            </button>
            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10 mt-2'
                onClick={setEdi2}
            >
                <p className='font-popins text-normal'>Review</p>
            </button>
            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10 mt-2'
                onClick={setDisplay}
            >
                <p className='font-popins text-normal'>View</p>
            </button>
        </div>
    </div>
  )
}

export default ReviewCard