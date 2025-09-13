import React, { useState, useEffect } from "react";
import "../styles/createPost.css";

export default function CreatePost() {
  const [urlInput, setUrlInput] = useState("");
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.id) setUserId(stored.id);
  }, []);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrlInput(val);
    setPreview(val);
  };

  const handleReset = () => {
    setUrlInput("");
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !urlInput) {
      return alert("Missing user or URL");
    }

    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        imageUrl: urlInput, // still called imageUrl in backend
        caption,
      }),
    });

    if (res.ok) {
      alert("Post created!");
      setCaption("");
      setCharCount(0);
      handleReset();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to create post");
    }
  };

  // Helpers to detect media type
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => /\.(jpe?g|png|gif|bmp|svg)$/i.test(url);

  return (
    <div className="create-post-container">
      <h2>🌐 Share Any Media URL</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Paste image, GIF or video URL"
          value={urlInput}
          onChange={handleUrlChange}
          className="url-input"
          required
        />

        {preview && (
          <div className="preview-box">
            {isVideo(preview) ? (
              <video
                src={preview}
                controls
                className="preview-video"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="preview-img"
              />
            )}
            <button
              type="button"
              className="btn-reset"
              onClick={handleReset}
            >
              ❌ Remove
            </button>
          </div>
        )}

        <textarea
          placeholder="Write a caption..."
          value={caption}
          maxLength={200}
          onChange={(e) => {
            setCaption(e.target.value);
            setCharCount(e.target.value.length);
          }}
          className="caption-input"
        />
        <div className="char-count">{charCount}/200</div>

        <button type="submit" className="btn-primary">
          🚀 Post
        </button>
      </form>
    </div>
  );
}
