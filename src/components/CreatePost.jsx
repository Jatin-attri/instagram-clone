import React, { useState, useEffect } from "react";
import "../styles/createPost.css";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const fakeUrl = URL.createObjectURL(file);
    setImageUrl(fakeUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not found. Please log in again.");

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, imageUrl, caption }),
    });

    if (res.ok) {
      alert("Post created!");
      setCaption("");
      setImageUrl("");
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create new post</h2>
      <div className="upload-box">
        {imageUrl ? (
          <img src={imageUrl} alt="Preview" className="preview-img" />
        ) : (
          <>
            <div className="upload-icons">📷 🎥</div>
            <p>Drag photos and videos here</p>
            <input type="file" onChange={handleImageUpload} />
          </>
        )}
      </div>

      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="caption-input"
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Post
      </button>
    </div>
  );
}
