import React from 'react';
import ReactDOM from 'react-dom/client';
import HostelRegistration from './Pages/HostelRegistration';
import TowerRegistartion from './Pages/TowerRegistartion';

import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/hostel-Registration" element={<HostelRegistration />} />
        <Route path="/tower-Registration" element={<TowerRegistartion />} />
      </Routes>
  </BrowserRouter>
);

