import React from 'react';
import '../styles/profileheader.css';

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <img src="../src/assets/images/user.png" alt="Jatin" className="profile-pic" />
      <div className="profile-info">
        <h2>Jatin Attri</h2>
        <p className="bio">Digital goodies designer @pixsellz<br />Everything is designed.</p>
        <div className="stats">
          <span><strong>54</strong> posts</span>
          <span><strong>834</strong> followers</span>
          <span><strong>162</strong> following</span>
        </div>
        <br />
        <div className='profilebtn'>
          <div class="container">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button">Follow</button>
              <button class="btn btn-primary" type="button">Message</button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
