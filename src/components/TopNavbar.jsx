import React from 'react';
import '../styles/TopNavbar.css';
import { FiCamera, FiSend } from 'react-icons/fi';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Link } from "react-router-dom";
import CameraCapture from './CameraCapture';

const TopNavbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="top-navbar">
        <div className="nav-icon">
         <Link to="/CameraCapture" ><FiCamera size={24} /></Link>
        </div>
        <div className="nav-logo">Instagram</div>
        <div className="nav-actions">
          <div className="nav-icon notification">
           <Link to="/Notifications" ><MdOutlineNotificationsNone size={24} /></Link>
            <span className="red-dot"></span>
          </div>
          <div className="nav-icon">
            <Link to='/chat'><FiSend size={24} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
