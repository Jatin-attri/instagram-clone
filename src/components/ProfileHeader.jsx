// import React from 'react';
// import '../styles/profileheader.css';

// const ProfileHeader = () => {
//   return (
//     <div className="profile-header">
//       <img src="../src/assets/images/user.png" alt="Jatin" className="profile-pic" />
//       <div className="profile-info">
//         <h2>Jatin Attri</h2>
//         <p className="bio">Digital goodies designer @pixsellz<br />Everything is designed.</p>
//         <div className="stats">
//           <span><strong>54</strong> posts</span>
//           <span><strong>834</strong> followers</span>
//           <span><strong>162</strong> following</span>
//         </div>
//         <br />
//         <div className='profilebtn'>
//           <div class="container">
//             <div class="d-grid gap-2">
//               <button class="btn btn-primary" type="button">Follow</button>
//               <button class="btn btn-primary" type="button">Message</button>
//             </div>


//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;

import React, { useEffect, useState } from 'react';
import '../styles/profileheader.css';

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFollowers(generateRandom(1, 1000000));
      setFollowing(generateRandom(1, 1000));
    }
  }, []);

  const generateRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-header">
      <img src={user.avatar || "/assets/images/user.png"} alt={user.fullName} className="profile-pic" />
      <div className="profile-info">
        <h2>{user.fullName}</h2>
        <p className="username">@{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="gender">Gender: {user.gender}</p>
        {user.bio && <p className="bio">"{user.bio}"</p>}

        <div className="stats">
          <span><strong>{followers.toLocaleString()}</strong> followers</span>
          <span><strong>{following}</strong> following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
