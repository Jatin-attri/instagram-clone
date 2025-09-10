import React from 'react';
import '../styles/stories.css';

const storiesData = [
  { username: 'Your Story', image: 'your-profile.jpg', isLive: false },
  { username: 'karennne', image: 'karennne.jpg', isLive: true },
  { username: 'zackjohn', image: 'zackjohn.jpg', isLive: false },
  { username: 'kieron_d', image: 'kieron.jpg', isLive: false },
  { username: 'craig_', image: 'craig.jpg', isLive: false },
];

const Stories = () => {
  return (
    <div className="stories-bar">
      {storiesData.map((story, index) => (
        <div className="story-item" key={index}>
          <div
            className={`story-img ${story.isLive ? 'live-story' : ''} ${
              story.username === 'Your Story' ? 'your-story' : ''
            }`}
            style={{ backgroundImage: `url(${story.image})` }}
          ></div>
          <small>{story.username}</small>
        </div>
      ))}
    </div>
  );
};

export default Stories();
