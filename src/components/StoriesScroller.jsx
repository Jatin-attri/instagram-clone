import React, { useEffect, useState, useRef } from "react";
import "../styles/StoriesScroller.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StoryModal from "./StoryModal"; // 👈 Import the modal

const StoriesScroller = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); // 👈 Modal state
  const scrollerRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/stories")
      .then((res) => res.json())
      .then(setStories);
  }, []);

  const scrollLeft = () => {
    scrollerRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollerRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="stories-carousel">
      <button className="carousel-btn left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>

      <div className="stories-wrapper" ref={scrollerRef}>
        {stories.map((story) => (
          <div
            className="story-item"
            key={story.id}
            onClick={() => setSelectedStory(story)} // 👈 Open modal on click
          >
            {story.mediaType === "video" ? (
              <video
                src={story.mediaUrl}
                className="story-video"
                muted
                autoPlay
                loop
              />
            ) : (
              <div
                className="story-img"
                style={{ backgroundImage: `url(${story.mediaUrl})` }}
              />
            )}
            <small>{story.user?.username || "Unknown"}</small>
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={scrollRight}>
        <FaChevronRight />
      </button>

      {/* 👁️ Modal Viewer */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
};

export default StoriesScroller;
