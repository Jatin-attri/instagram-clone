import React from "react";
import "../styles/StoryModal.css";

export default function StoryModal({ story, onClose }) {
    if (!story) return null;

    return (
        <div className="story-modal-overlay" onClick={onClose}>
            <div className="story-modal-content" onClick={(e) => e.stopPropagation()}>
                {story.mediaType === "video" ? (
                    <video
                        src={story.mediaUrl}
                        controls
                        autoPlay
                        className="story-modal-media"
                    />
                ) : (
                    <img
                        src={story.mediaUrl}
                        alt="Story"
                        className="story-modal-media"
                    />
                )}
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>
            </div>
        </div>
    );
}
