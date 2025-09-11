import React from 'react';
import ProfileHeader from './ProfileHeader';
import HighlightIcons from './HighlightIcons';
import PostGrid from './PostGrid';
import BottomNav from './BottomNav';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="container mt-4">
      <ProfileHeader/>
      <hr />
   <HighlightIcons/>
 
   <PostGrid/>
   <hr />
   <BottomNav/>
   
    </div>
  );
};

export default ProfilePage;
