import React from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="register-card p-4 shadow-sm">
        {/* Logo */}
        <h1 className="text-center mb-4 register-logo">Instagram</h1>

        {/* Registration Form */}
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
          />

          <button className="btn btn-primary w-100 mb-3 "><Link to="/profile">Sign Up</Link></button>

          <div className="text-center text-muted small">
            By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-4">
          <small>
            Already have an account? <Link to="/login">Login</Link> 
          </small>
        </div>
      </div>
    </div>
  );
}
