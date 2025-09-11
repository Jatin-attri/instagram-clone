import React from 'react';
import '../styles/TopNavbar.css';
import { FiCamera, FiSend } from 'react-icons/fi';
import { MdOutlineNotificationsNone } from 'react-icons/md';

const TopNavbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="top-navbar">
        <div className="nav-icon">
          <FiCamera size={24} />
        </div>
        <div className="nav-logo">Instagram</div>
        <div className="nav-actions">
          <div className="nav-icon notification">
            <MdOutlineNotificationsNone size={24} />
            <span className="red-dot"></span>
          </div>
          <div className="nav-icon">
            <FiSend size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
