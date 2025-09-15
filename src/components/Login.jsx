import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "../styles/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire({ title: "Login Successful!", icon: "success" });
        navigate("/profile");
      } else {
        Swal.fire({ title: "Login Failed", text: data.error, icon: "error" });
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire({ title: "Server Error", icon: "error" });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-logo">Instagram</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="login-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="login-forgot">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="login-btn-primary">Log In</button>

          <div className="login-divider">OR</div>

          <button type="button" className="login-btn-facebook">
            <FaFacebookSquare size={18} /> Log in with Facebook
          </button>

          <GoogleLogin
            onSuccess={(res) => console.log("Google login:", res)}
            onError={() => console.log("Google login failed")}
          />
        </form>

        <div className="login-footer">
          <small>
            Don’t have an account? <Link to="/">Sign Up</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
