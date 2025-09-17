import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Stories from "./components/Stories";
import ProfileHeader from "./components/ProfileHeader";
import HighlightIcons from "./components/HighlightIcons";
import ProfilePage from "./components/ProfilePage";
import Register from "./components/Register";
import Notifications from "./components/Notifications";
import TopNavbar from "./components/TopNavbar";
import BottomNav from "./components/BottomNav";
import CreatePost from "./components/CreatePost";
import CameraCapture from "./components/CameraCapture";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatBot from "./components/ChatBot";
import Search from "./components/Search";
import CreateStory from "./components/CreateStory";


const clientId = "300382350887-o35r9nh92o7nfl4fsfcvnt0b4vd1oott.apps.googleusercontent.com";

// import Profile from "./pages/Profile";
// import Explore from "./pages/Explore";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <TopNavbar />
          <Routes>

            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/CameraCapture" element={<CameraCapture />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/search" element={<Search />} />
            <Route path="/createstory" element={<CreateStory />} />

          </Routes>
          <BottomNav />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
