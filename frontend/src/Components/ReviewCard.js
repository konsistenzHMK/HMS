import React, { useState } from 'react'

const ReviewCard = (props) => {
    const [formData,setFormData]=useState(props.data);
  return (
    <div className='w-full flex mt-10 mb-10'>
        {/* Details */}
        <div className='w-4/5 bg-gray-200 flex-col p-3'>
            {/* Hostel name */}
            <div className='mb-1 font-popins text-medium text-blue-500 font-medium flex justify-start text-lg'>
                <div>Hostel Name :<p className='inline ml-5 text-black'>{formData.hostel_name}</p></div>
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
        <div className='w-1/5 bg-stone-400 pt-10'>
            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10'>
                <p className='font-popins text-normal'>Edit</p>
            </button>

            <button className='bg-defaultBg w-32 h-8 border-2 border-slate-950 rounded-l-full rounded-r-full ml-10 mt-2'>
                <p className='font-popins text-normal'>Delete</p>
            </button>
        </div>
    </div>
  )
}

export default ReviewCard