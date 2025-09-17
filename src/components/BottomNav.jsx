import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import "../styles/BottomNav.css";

export default function BottomNav() {
  return (
    <div className="bottom-nav-wrapper">
      <div className="bottom-nav-inner">
        <NavLink to="/" className="nav-btn">
          <Link to='/home' ><FaHome /></Link>

        </NavLink>
        <NavLink to="/createstory" className="nav-btn">
          <Link to="/createstory"><FaSearch /></Link>
        </NavLink>
        <NavLink to="/createpost" className="nav-btn">
          <Link to="/createpost"><FaPlusSquare /></Link>
        </NavLink>
        <NavLink to="/Notifications" className="nav-btn">
          <Link to="/Notifications"><FaHeart /></Link>
        </NavLink>
        <NavLink to="/profile" className="nav-btn">
          <FaUserCircle />
        </NavLink>
      </div>
    </div>
  );
}
