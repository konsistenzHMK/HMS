import React from 'react'
import ReactDOM from 'react-dom/client';
import HostelRegistration from '../Pages/HostelRegistration';
import TowerRegistartion from '../Pages/TowerRegistartion';
import WingRegistration from '../Pages/WingRegistration';
import RoomRegistration from '../Pages/RoomRegistration';
import StudentRegistartion from '../Pages/StudentRegistration';
import ExpenseForm from '../Pages/ExpenseForm';

import { useHistory } from 'react-router-dom';
import DashboardPage from '../Components/DashboardPage'

import circularImage from './Ellipse 93.png';
import RoomAllocation from '../Pages/RoomAllocation';
import HostelReviewForm from '../Pages/HostelReviewForm';
import StudentReviewForm from '../Pages/StudentReviewForm';

import {
    useNavigate,
} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="w-1/6 h-screen bg-accent flex flex-col sticky top-0">
    {/* Image & Name*/}
    <div className='flex flex-row justify-center w-full mt-10 mb-10'>
        <div className='w-5/6 flex flex-col justify-center'>
            {/* Image + Name  */}
            <div className='w-full flex'>
                <div className="h-15 flex justify-center mr-3.5">
                    <img src={circularImage} alt="Circular" className='w-12'/>
                </div>
                <div className='justify-start'>
                    <p className='font-popins font-semibold overflow-x-hidden'>Rajesh <br />Bhatachariya</p>
                </div>
            </div>

            {/* Info */}
            <div className='w-full justify-center mt-4'>
                <p className='w-full text-center font-popins text-xs text-slate-700'>IIT Bombay, Hostel Rector</p>
            </div>
        </div>
    </div>

    <div className='flex ml-6'>
        <button className="bg-none border-2 py-2 px-4 border-slate-950 rounded-l-full rounded-r-full">
            <p className='w-full text-center font-popins text-sm text-slate-700'>Logout <p className='inline text-base ml-1'>✦</p></p>
        </button>
    </div>


    {/* All Buttons */}
    <div className='w-full flex flex-row justify-center mt-20'>
        <button className="bg-slate-100 w-2/3 bg-sl border-2 py-2 px-4 border-slate-950 rounded-l-full rounded-r-full" onClick={()=>{navigate('/')}}>
            <p className='w-full text-center font-popins text-sm text-slate-700'>Dashboard <p className='inline text-orange-400 text-base ml-1'>✦</p></p>
        </button>
    </div>

    <div className='w-full flex flex-row justify-center mt-2'>
        <button className="bg-slate-100 w-2/3 bg-sl border-2 py-2 px-4 border-slate-950 rounded-l-full rounded-r-full">
            <p className='w-full text-center font-popins text-sm text-slate-700'>Edit Profile <p className='inline text-orange-400 text-base ml-1'>✦</p></p>
        </button>
    </div>
    <div className='w-full flex flex-row justify-center mt-2'>
        <button className="bg-slate-100 w-2/3 bg-sl border-2 py-2 px-4 border-slate-950 rounded-l-full rounded-r-full">
            <p className='w-full text-center font-popins text-sm text-slate-700'>Contact Us <p className='inline text-orange-400 text-base ml-1'>✦</p></p>
        </button>
    </div>
    <div className='w-full flex flex-row justify-center mt-2'>
        <button className="bg-slate-100 w-2/3 bg-sl border-2 py-2 px-4 border-slate-950 rounded-l-full rounded-r-full">
            <p className='w-full text-center font-popins text-sm text-slate-700'>FAQs? <p className='inline text-orange-400 text-base ml-1'>✦</p></p>
        </button>
    </div>

    <div className='w-5/6 m-5 h-1/2 mt-12 '>
        <p className='w-full text-center font-popins text-xs text-slate-700'>Konsistenz Software LPP</p>
    </div>
  </div>
  )
}

export default Dashboard