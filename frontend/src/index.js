import React from 'react';
import ReactDOM from 'react-dom/client';

import Dashboard from './Components/Dashboard'

import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

import HostelRegistration from './Pages/HostelRegistration';
import TowerRegistartion from './Pages/TowerRegistartion';
import WingRegistration from './Pages/WingRegistration';
import RoomRegistration from './Pages/RoomRegistration';
import StudentRegistartion from './Pages/StudentRegistration';
import ExpenseForm from './Pages/ExpenseForm';

import DashboardPage from './Components/DashboardPage'

import circularImage from './Components/Ellipse 93.png';
import RoomAllocation from './Pages/RoomAllocation';
import HostelReviewForm from './Pages/HostelReviewForm';
import StudentReviewForm from './Pages/StudentReviewForm';
import TowerReviewForm from './Pages/TowerReviewForm';
import WingReviewForm from './Pages/WingReviewForm';
import RoomReviewForm from './Pages/RoomReviewForm';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <div className="flex">
      {/* Side Navbar */}
      <Dashboard />
      <div className="w-5/6">
      
      <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/hostel-Registration" element={<HostelRegistration />} />
          <Route path="/tower-Registration" element={<TowerRegistartion />} />
          <Route path="/wing-Registration" element={<WingRegistration />} />
          <Route path="/room-Registration" element={<RoomRegistration />} />
          <Route path="/student-Registration" element={<StudentRegistartion />} />
          <Route path="/expense-Allocation" element={<ExpenseForm />} />
          <Route path="/room-Allocation" element={<RoomAllocation />} />
          <Route path="/hostel-FormReview" element={<HostelReviewForm />} />
          <Route path="/student-FormReview" element={<StudentReviewForm />} />
          <Route path="Tower-FormReview" element={<TowerReviewForm/>}/>
          <Route path="Wing-FormReview" element={<WingReviewForm/>}/>
          <Route path='Room-FormReview' element={<RoomReviewForm/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

