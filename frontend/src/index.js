import React from 'react';
import ReactDOM from 'react-dom/client';
import HostelRegistration from './Pages/HostelRegistration';
import TowerRegistartion from './Pages/TowerRegistartion';
import WingRegistration from './Pages/WingRegistration';
import RoomRegistration from './Pages/RoomRegistration';
import StudentRegistartion from './Pages/StudentRegistration';

import Dashboard from './Components/Dashboard'

import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Dashboard />
);

