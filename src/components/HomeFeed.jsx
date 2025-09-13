import React, { useEffect, useState } from "react";
import "../styles/feed.css";

export default function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setComment] = useState({});
  const [userId, setUserId] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored?.id) setUserId(stored.id);
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Post Liked 👍",
  showConfirmButton: false,
  timer: 1500
});
    await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: "POST",
      
      
    });
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  const handleCommentPost = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text || !userId) return;

    await fetch(
      `http://localhost:5000/api/posts/${postId}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text }),
      }
    );
    Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Comment Posted 💖",
  showConfirmButton: false,
  timer: 1500
});

    setComment((prev) => ({ ...prev, [postId]: "" }));
    fetchPosts();
  };

  // Helpers
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => /\.(jpe?g|png|gif|bmp|svg)$/i.test(url);

  return (
    <div className="feed-container">
      <h2>Recent Posts</h2>

      {posts.map((post) => (
        <div key={post.id} className="post-card">
          {isVideo(post.imageUrl) ? (
            <video
              src={post.imageUrl}
              controls
              className="post-video"
            />
          ) : (
            <img
              src={post.imageUrl}
              alt="Post"
              className="post-img"
            />
          )}

          <div className="post-body">
            <strong>@{post.user.username}</strong>
            <p>{post.caption}</p>

            <button
              onClick={() => handleLike(post.id)}
              className="btn-like"
            >
              ❤️ {post.likes}
            </button>

            <div className="comments-section">
              {post.comments.map((c) => (
                <div key={c.id} className="comment">
                  <strong>@{c.user.username}</strong>: {c.text}
                </div>
              ))}

              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText[post.id] || ""}
                  onChange={(e) =>
                    setComment((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="btn-comment"
                  onClick={() => handleCommentPost(post.id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
