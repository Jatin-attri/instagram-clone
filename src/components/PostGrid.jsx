import React, { useEffect, useState } from 'react';
import '../styles/PostGrid.css';

const PostGrid = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.id) {
      setUserId(storedUser.id);
      fetchUserPosts(storedUser.id);
    }
  }, []);

  const fetchUserPosts = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/${id}`);
      const data = await res.json();
      const sortedPosts = (data.posts || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserPosts(sortedPosts);
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
    }
  };

  return (
    <div className="post-grid-container">
      <div className="post-nav">
        <div className="nav-icon active">
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </div>
        <div className="nav-icon">
          <i className="bi bi-person"></i>
        </div>
      </div>

      <div className="post-grid">
        {userPosts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>
            No posts yet.
          </p>
        ) : (
          userPosts.map((post) => (
            <div className="post-item" key={post.id}>
              <img src={post.imageUrl} alt={post.caption || 'Post'} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostGrid;
