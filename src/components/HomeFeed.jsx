import React, { useEffect, useState } from "react";
import "../styles/feed.css";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleLike = (postId) => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (!likedPosts[postId]) {
      likedPosts[postId] = true;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        )
      );
    }
  };

  return (
    <div className="feed-container">
      {posts.map((post) => {
        const liked = JSON.parse(localStorage.getItem("likedPosts"))?.[post.id];
        return (
          <div key={post.id} className="post-card">
            <img src={post.imageUrl} alt="Post" className="post-img" />
            <div className="post-details">
              <strong>@{post.user.username}</strong>
              <p>{post.caption}</p>
              <button
                className={`btn ${liked ? "btn-secondary" : "btn-outline-primary"}`}
                onClick={() => handleLike(post.id)}
                disabled={liked}
              >
                ❤️ {post.likes} {liked ? "Liked" : "Like"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
