import React, { useRef } from 'react';
import '../styles/StoriesScroller.css';
import { stories } from '../data/storiesData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StoriesScroller = () => {
  const scrollerRef = useRef(null);

  const scrollLeft = () => {
    scrollerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="stories-carousel">
      <button className="carousel-btn left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>

      <div className="stories-wrapper" ref={scrollerRef}>
        {stories.map((story, index) => (
          <div className="story-item" key={index}>
            <div
              className={`story-img ${story.isLive ? 'live' : ''} ${
                story.username === 'Your Story' ? 'your-story' : ''
              }`}
              style={{ backgroundImage: `url(${story.image})` }}
            >
              {story.isLive && <span className="live-tag">LIVE</span>}
            </div>
            <small>{story.username}</small>
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={scrollRight}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default StoriesScroller;
