import React, { useState } from "react";
import "../styles/register.css";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const avatars = {
  male: [
    "../src/assets/avatar/male/1.png",
   "../src/assets/avatar/male/2.jpg",
   "../src/assets/avatar/male/3.jpg",
   "../src/assets/avatar/male/4.jpg",
   
  ],
  female: [
    "../src/assets/avatar/female/1.jpg",
    "../src/assets/avatar/female/2.jpg",
    "../src/assets/avatar/female/3.jpg",
    "../src/assets/avatar/female/4.jpg",
    
  ]
};

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
    avatar: avatars.male[0],
    bio: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFormData({
      ...formData,
      gender,
      avatar: avatars[gender][0] // default avatar for selected gender
    });
  };

  const handleAvatarSelect = (url) => {
    setFormData({ ...formData, avatar: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire({ title: "Registration Complete!", icon: "success" });
        navigate("/profile");
      } else {
        const data = await res.json();
        alert(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
      <div className="register-card p-4 shadow-sm">
        <h1 className="text-center mb-4 register-logo">Instagram</h1>

        <form onSubmit={handleSubmit}>
          <input name="fullName" type="text" placeholder="Full Name" className="form-control mb-2" onChange={handleChange} required />
          <input name="username" type="text" placeholder="Username" className="form-control mb-2" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={handleChange} required />

          <select name="gender" className="form-control mb-2" value={formData.gender} onChange={handleGenderChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <div className="avatar-selection mb-2">
            {avatars[formData.gender].map((url) => (
              <img
                key={url}
                src={url}
                alt="avatar"
                className={`avatar-option ${formData.avatar === url ? "selected" : ""}`}
                onClick={() => handleAvatarSelect(url)}
              />
            ))}
          </div>

          <textarea
            name="bio"
            placeholder="Write your bio..."
            className="form-control mb-3"
            onChange={handleChange}
            value={formData.bio}
          />

          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
        </form>

        <GoogleLogin
          onSuccess={() => alert("Google login not yet customized")}
          onError={() => alert("Google login failed")}
        />

        <div className="text-center mt-4">
          <small>Already have an account? <Link to="/login">Login</Link></small>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import "../styles/register.css";
// import { useNavigate, Link } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         localStorage.setItem("user", JSON.stringify(data.user));
//         Swal.fire({
//   title: "Registration Complete!",
//   icon: "success",
//   draggable: true
// });
//         navigate("/profile");
//       } else {
//         const data = await res.json();
//         alert(data.error || "Registration failed. Try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error.");
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const decoded = jwtDecode(credentialResponse.credential);
//       console.log("Decoded Google user:", decoded);

//       const googleUser = {
//         fullName: decoded.name,
//         email: decoded.email,
//         username: decoded.email.split("@")[0],
//         googleId: decoded.sub,
//       };

//       const res = await fetch("http://localhost:5000/api/google-auth", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(googleUser),
//       });

//       if (res.ok) {
//         const data = await res.json();
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/home");
//       } else {
//         const data = await res.json();
//         alert(data.error || "Google authentication failed.");
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       alert("Something went wrong with Google login.");
//     }
//   };

//   return (
//     <div className="register-container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="register-card p-4 shadow-sm">
//         <h1 className="text-center mb-4 register-logo">Instagram</h1>

//         <form onSubmit={handleSubmit}>
//           <input
//             name="fullName"
//             type="text"
//             placeholder="Full Name"
//             className="form-control mb-2"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="username"
//             type="text"
//             placeholder="Username"
//             className="form-control mb-2"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             className="form-control mb-2"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             autoComplete="current-password"
//             className="form-control mb-3"
//             onChange={handleChange}
//             required
//           />

//           <button type="submit" className="btn btn-primary w-100 mb-3">
//             Sign Up
//           </button>
//         </form>

//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => alert("Google login failed")}
//         />

//         <div className="text-center text-muted small mt-3">
//           By signing up, you agree to our <a href="#">Terms</a>,{" "}
//           <a href="#">Privacy Policy</a>, and <a href="#">Cookies Policy</a>.
//         </div>

//         <div className="text-center mt-4">
//           <small>
//             Already have an account? <Link to="/login">Login</Link>
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// }
