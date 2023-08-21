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
                <div>Name :<p className='inline ml-2 text-black'>{formData.first_name} {formData.last_name} ({formData.student_id})</p></div>
            </div>

            {/* Country and State */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>Gender :<p className='inline ml-5 text-black'>{formData.gender.toUpperCase()}</p></div>
                <div className='ml-40'>DOB :<p className='inline ml-5 text-black'>{formData.dob.split('T')[0]}</p></div>
            </div>

            {/* Country and State */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>State :<p className='inline ml-5 text-black'>{formData.state}</p></div>
                <div className='ml-16'>Taluka :<p className='inline ml-5 text-black'>{formData.city}</p></div>
            </div>

        </div>

        {/* Buttons */}
        <div className='w-1/5 bg-stone-400 pt-2 pb-2'>
            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'
                onClick={setAll}
            >
                <p className='font-popins text-normal'>Edit</p>
            </button>
            {/* <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10 mt-2'
                onClick={setEdi2}
            >
                <p className='font-popins text-normal'>Review</p>
            </button> */}
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